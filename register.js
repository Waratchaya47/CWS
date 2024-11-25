window.onload = pageLoad;


function pageLoad()
{   
    var firstname = document.forms["myRegister"]["firstname"];
    var lastname = document.forms["myRegister"]["lastname"];
    var gender = document.forms["myRegister"]["gender"];
    var bday = document.forms["myRegister"]["bday"];
    var email = document.forms["myRegister"]["email"];
    var username = document.forms["myRegister"]["username"];
    var password = document.forms["myRegister"]["password"][0];
    var retypePassword = document.forms["myRegister"]["password"][1];
    var forms = document.getElementById("myRegister");
	forms.onsubmit = validateForm;

}

function validateForm() 
{
    var firstname = document.forms["myRegister"]["firstname"];
    var lastname = document.forms["myRegister"]["lastname"];
    var gender = document.forms["myRegister"]["gender"];
    var bday = document.forms["myRegister"]["bday"];
    var email = document.forms["myRegister"]["email"];
    var username = document.forms["myRegister"]["username"];
    var password = document.forms["myRegister"]["password"][0];
    var retypePassword = document.forms["myRegister"]["password"][1];
    
    var errorMsg = document.getElementById("errormsg");

    if(firstname.value == "")
    {
        errorMsg.innerHTML = "กรอกข้อมูลไม่ครบ กรุณาลองใหม่!";
        return false;
    }
    if(lastname.value == "")
    {
        errorMsg.innerHTML = "กรอกข้อมูลไม่ครบ กรุณาลองใหม่!";

        return false;
    }

    if(gender.value == "")
    {
        errorMsg.innerHTML = "กรอกข้อมูลไม่ครบ กรุณาลองใหม่!";
        return false;
    }
    if(bday.value == "")
    {
        errorMsg.innerHTML = "กรอกข้อมูลไม่ครบ กรุณาลองใหม่!";
        return false;
    }
    if(email.value == "")
    {
        errorMsg.innerHTML = "กรอกข้อมูลไม่ครบ กรุณาลองใหม่!";
        return false;
    }
    if(username.value == "")
    {
        errorMsg.innerHTML = "กรอกข้อมูลไม่ครบ กรุณาลองใหม่!";
        return false;
    }
    
    if(password.value != retypePassword.value)
    {
        errorMsg.innerHTML = "รหัสผ่านไม่ตรงกัน!";
        return false;
    }
}
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