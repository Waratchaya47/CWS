window.onload = pageLoad;

async function pageLoad()
{
    const urlparams = new URLSearchParams(window.location.search);
    const userid = urlparams.get('userid');
    
    const userprofile = await fetchUserProfile(userid);
    loadUserProfile(userprofile[0]);

    const joinedEvents = await fetchJoinedEvents(userid);
    loadJoinedEvents(joinedEvents);

    const hostedEvents = await fetchHostedEvents(userid);
    loadHostedEvents(hostedEvents);

    // Hide hosted events
    document.querySelector('.event_hosted').style.display = 'none';

    // Buttons
    const joinedButton = document.querySelector('.event_part_button');
    const hostedButton = document.querySelector('.event_hosted_button');

    joinedButton.addEventListener('click', () => {
        document.querySelector('.event_part').style.display = 'block';
        document.querySelector('.event_hosted').style.display = 'none';

        joinedButton.classList.add('active');
        hostedButton.classList.remove('active');
    });

    hostedButton.addEventListener('click', () => {
        document.querySelector('.event_part').style.display = 'none';
        document.querySelector('.event_hosted').style.display = 'block';
    
        hostedButton.classList.add('active');
        joinedButton.classList.remove('active');
    });
}

async function fetchJoinedEvents(userid)
{
    const response = await fetch("/getjoinedevents", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({userid: userid})
    });
    const data = await response.json();

    return data;
}

async function fetchHostedEvents(userid)
{
    const response = await fetch("/gethostedevents", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({userid: userid})
    });
    const data = await response.json();

    return data;
}

async function fetchUserProfile(userid)
{
    const response = await fetch("/getuserprofile", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({userid: userid})
    });
    const data = await response.json();

    return data;
}

function loadHostedEvents(hostedEvents)
{
    const hostedList = document.querySelector('.event_hosted');
    hostedList.innerHTML = '';

    const currentTime = new Date();

    hostedEvents.forEach(event => {
        console.log(event);
        const eventDiv = document.createElement('div');
        eventDiv.className = new Date(event.event_date + ' ' + event.event_time) > currentTime ? 'coming_event' : 'past_event';

        const img = document.createElement('img');
        img.className = 'eventpic';
        img.alt = '';
        img.src = `uploads/${event.event_image}`;

        const contentDiv = document.createElement('div');
        const nameContainer = document.createElement('div');
        nameContainer.className = 'name_container';

        const eventName = document.createElement('div');
        eventName.className = 'eventname';
        eventName.textContent = event.event_name;

        const eventInfo = document.createElement('div');
        eventInfo.className = 'eventinfo';

        const eventDate = document.createElement('div');
        eventDate.className = 'eventdate';
        eventDate.textContent = 'Date: ' + event.event_date;

        const eventTime = document.createElement('div');
        eventTime.className = 'eventtime';
        eventTime.textContent = 'Time: ' + event.event_time;

        const eventLocation = document.createElement('div');
        eventLocation.className = 'eventlocation';
        eventLocation.textContent = 'Location: ' + event.event_location;

        eventDiv.addEventListener('click', () => {
            window.location.href = `event.html?event_id=${event.event_id}`;
        });

        eventDiv.style.cursor = 'pointer';

        nameContainer.appendChild(eventName);
        eventInfo.append(eventDate, eventTime, eventLocation);
        contentDiv.append(nameContainer, eventInfo);
        eventDiv.append(img, contentDiv);
        hostedList.appendChild(eventDiv);
    });
}

function loadJoinedEvents(joinedEvents)
{
    const joinedList = document.querySelector('.event_part');
    joinedList.innerHTML = '';

    const currentTime = new Date();

    joinedEvents.forEach(event => {
        console.log(event);
        const eventDiv = document.createElement('div');
        eventDiv.className = new Date(event.event_date + ' ' + event.event_time) > currentTime ? 'coming_event' : 'past_event';

        const img = document.createElement('img');
        img.className = 'eventpic';
        img.alt = '';
        img.src = `uploads/${event.event_image}`;

        const contentDiv = document.createElement('div');
        const nameContainer = document.createElement('div');
        nameContainer.className = 'name_container';

        const eventName = document.createElement('div');
        eventName.className = 'eventname';
        eventName.textContent = event.event_name;

        const eventInfo = document.createElement('div');
        eventInfo.className = 'eventinfo';

        const eventData = document.createElement('div');
        eventData.className = 'eventdata';
        eventData.textContent = new Date(event.event_date + ' ' + event.event_time) > currentTime ? 'Coming' : 'Participated';

        const eventDate = document.createElement('div');
        eventDate.className = 'eventdate';
        eventDate.textContent = 'Date: ' + event.event_date;

        const eventTime = document.createElement('div');
        eventTime.className = 'eventtime';
        eventTime.textContent = 'Time: ' + event.event_time;

        const eventLocation = document.createElement('div');
        eventLocation.className = 'eventlocation';
        eventLocation.textContent = 'Location: ' + event.event_location;

        nameContainer.appendChild(eventName);
        eventInfo.append(eventData, eventDate, eventTime, eventLocation);
        contentDiv.append(nameContainer, eventInfo);
        eventDiv.append(img, contentDiv);
        joinedList.appendChild(eventDiv);
    });
}

function loadUserProfile(userprofile)
{
    const profilePic = document.getElementById('profilepic');
    const username = document.getElementById('username');
    const name = document.getElementById('name');
    const gender = document.getElementById('gender');
    const email = document.getElementById('email');
    const birthday = document.getElementById('birthday');
    profilePic.src = `/uploads/${userprofile.profilepicture}`;
    username.textContent = "Username: " + userprofile.username;
    name.textContent = "Name: " + userprofile.first_name + ' ' + userprofile.last_name;
    gender.textContent = "Gender: " + userprofile.sex;
    email.textContent = "Email: " + userprofile.email;
    birthday.textContent = "Birthday: " + userprofile.birthday;
}