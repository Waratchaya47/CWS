window.onload = pageLoad;

async function pageLoad()
{
    const registerButton = document.getElementById("register-button");
    const modal = document.getElementById("modal");
    const confirmButton = document.getElementById("confirm-button");
    const cancelButton = document.getElementById("cancel-button");

    // เปิด Modal
    registerButton.addEventListener("click", () => {
        if (!getCookie('userid')) {
            window.location.href = '/login.html';
            return;
        }

        if (!registerButton.classList.contains("registered")) {
            modal.style.display = "flex";
        }
    });
    
    console.log(getCookie('userid'));

    const profile = document.querySelector(".profile-icon");
    profile.addEventListener("click", () => {
        if (getCookie('userid')) {
            window.location.href = '/profile.html?userid=' + getCookie('userid');
        } else {
            window.location.href = '/login.html';
        }
    });

    const home = document.querySelector(".home-icon");
    home.addEventListener("click", () => {
        window.location.href = '/index.html';
    });

    // ยืนยันการลงทะเบียน
    confirmButton.addEventListener("click", () => {
        registerButton.textContent = "ลงทะเบียนแล้ว";
        registerButton.classList.add("registered");
        registerButton.disabled = true; // ไม่ให้คลิกได้อีก
        modal.style.display = "none";

        const urlParams = new URLSearchParams(window.location.search);
        const event_id = urlParams.get('event_id');

        registerToEvent(event_id);
    });

    // ยกเลิก
    cancelButton.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Get event from website param
    const urlParams = new URLSearchParams(window.location.search);
    const event_id = urlParams.get('event_id');

    const event = await fetchEvent(event_id);
    const isRegistered = event.isRegistered === 1;

    if (isRegistered) {
        registerButton.textContent = "ลงทะเบียนแล้ว";
        registerButton.classList.add("registered");
        registerButton.disabled
    }
    
    loadEvent(event);
}

function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

async function registerToEvent(event_id) {
    const response = await fetch("/registerevent", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ event_id }),
    });
}

async function fetchEvent(event_id) {
    const response = await fetch("/getevent", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ event_id, userid: getCookie("userid") }),
    });

    const data = await response.json();
    return data[0];
}

async function loadEvent(event) {
    const eventTitle = document.getElementById("event-title");
    const eventDescription = document.getElementById("event-description");
    const eventDate = document.getElementById("event-date");
    const eventTime = document.getElementById("event-time");
    const eventLocation = document.getElementById("event-location");
    const eventPoster = document.getElementById("poster");
    console.log(event);
    eventTitle.textContent = event.event_name;
    eventDescription.textContent = event.event_desc;
    eventDate.textContent = `Date: ${event.event_date}`;
    eventTime.textContent = `Time: ${event.event_time}`;
    eventLocation.textContent = `Location: ${event.event_location}`;
    eventPoster.src = `/uploads/${event.event_poster}`;
}