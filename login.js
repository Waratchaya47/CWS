window.onload = pageLoad;

async function pageLoad()
{
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

    console.log(getCookie('userid'));


    const home = document.querySelector(".home-icon");
    home.addEventListener("click", () => {
        window.location.href = '/index.html';
    });
}