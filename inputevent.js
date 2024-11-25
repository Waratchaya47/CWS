window.onload = pageLoad;

async function pageLoad()
{
    const submitButton = document.getElementById("submit-button");
    submitButton.addEventListener("click", () => {
        if (!getCookie('userid')) {
            window.location.href = '/login.html';
            return;
        }

        if (!submitButton.classList.contains("registered")) {
            modal.style.display = "flex";
        }
    });

    console.log(getCookie('userid'));
    
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
}