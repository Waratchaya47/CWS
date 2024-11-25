const express = require('express');
const app = express();
const fs = require('fs');
const hostname = 'localhost';
const port = 3000;
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql');
const cookieParser = require('cookie-parser');
const multer = require('multer');

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "chaiwongsakul"
})

function queryDB(sql) {
    return new Promise((resolve, reject) => {
        con.query(sql, (err, result, fields) => {
            if (err) reject(err);
            else
                resolve(result);
        })
    })
}

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, 'uploads/');
    },

    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });

const imageFilter = (req, file, cb) => {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

const upload = multer({ storage: storage });

app.post("/event", upload.fields([{ name: 'event-image' }, { name: 'event-poster' }]), (req, res) => {
    console.log(req.body);

    const eventname = req.body['event-name'];
    const eventdescription = req.body['event-description'];
    const eventdate = req.body['date'];
    const eventtime = req.body['time'];
    const eventlocation = req.body['location'];
    const eventcapacity = req.body['capacity'];
    const userid = req.cookies['userid'];

    if (!req.files['event-image']) {
        req.files['event-image'] = [{ filename: 'default.png' }];
    }

    if (!req.files['event-poster']) {
        req.files['event-poster'] = [{ filename: 'default.png' }];
    }

    const eventImage = req.files['event-image'][0].filename;
    const eventPoster = req.files['event-poster'][0].filename;

    const response = queryDB(`INSERT INTO booked_events (event_name, event_desc, event_date, event_time, event_location, event_capacity, event_image, event_poster, user_id) VALUES ('${eventname}', '${eventdescription}', '${eventdate}', '${eventtime}', '${eventlocation}', '${eventcapacity}', '${eventImage}', '${eventPoster}', '${userid}')`);

    if (response) {
        console.log('Event created');
        res.redirect('/index.html');
    }
});

app.post("/login", async (req, res) => {
    try {
        const username = req.body['username'];
        const password = req.body['password'];

        const response = await queryDB(`SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`);
        if (response.length > 0) {
            res.cookie('username', username);
            res.cookie('userid', response[0].user_id);
            res.redirect('/index.html');
        } else {
            res.redirect('/login.html?error=1');
        }
    }
    catch (err) {
        console.log(err);
    }
});

app.post("/register", upload.fields([{ name: 'profile-picture' }]),  async (req, res) => {
    // firstname, lastname, gender, bday, email, username, password
    const firstname = req.body['firstname'];
    const lastname = req.body['lastname'];
    const gender = req.body['gender'];
    const bday = req.body['bday'];
    const email = req.body['email'];
    const username = req.body['username'];
    const password = req.body['password'][0];

    if (!req.files['avatar']) {
        req.files['avatar'] = [{ filename: 'default.png' }];
    }

    const profilePicture = req.files['profile-picture'][0].filename;

    const response = await queryDB(`INSERT INTO users (first_name, last_name, 
        sex, birthday, email, username, password, profilepicture) VALUES ('${firstname}', '${lastname}', 
        '${gender}', '${bday}', '${email}', '${username}', '${password}', '${profilePicture}')`);


    if (response) {
        res.redirect('/login.html');
    } else {
        res.redirect('/register.html');
    }
});

app.get("/getevents", async (req, res) => {
    const events = await queryDB("SELECT * FROM booked_events");
    res.json(events);
});

app.get('/proflie_img', (req, res) => {
    res.cookie('username', username);
    res.cookie('userid', userid);
    res.redirect('/help/Proflie_1.html');
});

app.get("/logout", (req, res) => {
    res.clearCookie('username');
    res.clearCookie('userid');
    res.json({ message: 'Logged out' });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
