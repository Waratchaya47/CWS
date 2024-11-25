window.onload = pageLoad;
function pageLoad()
{   
    if (document.cookie.includes('userid') && document.cookie.includes('username')) {
        document.querySelector('#register').style.display = 'none';
        document.querySelector('#login').style.display = 'none';
        document.querySelector('#logout').style.display = 'block';
        document.querySelector('#profile').style.display = 'block';
    } else {
        document.querySelector('#logout').style.display = 'none';
        document.querySelector('#profile').style.display = 'none';
    }

    // Click event for logout
    document.querySelector('#logout').onclick = async function() {
        let response = await fetch('/logout');
        // Change to home page again
        window.location.href = '/index.html';
    }

    document.querySelector('#profile').onclick = async function() {
        // Change to home page again
        window.location.href = `/profile.html?userid=${getCookie("userid")}`;
    }

    loadHome();

    // Add search functionality
    document.querySelector('.search-bar').addEventListener('input', async function() {
        // If empty, show all elements
        if (this.value === '') {
            let gridItems = document.querySelectorAll('.grid-item');
            gridItems.forEach(gridItem => {
                gridItem.style.display = 'block';
            });
            return;
        }

        let searchTerm = this.value.toLowerCase();
        // Hide elements that don't match the search term
        let gridItems = document.querySelectorAll('.grid-item');
        gridItems.forEach(gridItem => {
            let itemText = gridItem.querySelector('p').textContent.toLowerCase();
            if (itemText.includes(searchTerm)) {
                gridItem.style.display = 'block';
            } else {
                gridItem.style.display = 'none';
            }
        });

        // If there's 1 element left, put it in the main box
        let visibleItems = document.querySelectorAll('.grid-item[style="display: block;"]');
        if (visibleItems.length === 1) {
            let mainBox = document.querySelector('.main-box');
            mainBox.style.backgroundImage = visibleItems[0].style.backgroundImage;
            mainBox.querySelector('p').textContent = visibleItems[0].querySelector('p').textContent;
            mainBox.onclick = visibleItems[0].onclick;
        }
    });
    const createEventbutton = document.getElementById("create-event");
    createEventbutton.addEventListener("click", () => {
        if (!getCookie('userid')) {
            window.location.href = '/login.html';
            return;
        }

        if (!createEventbutton.classList.contains("registered")) {
            modal.style.display = "flex";
        }
    });
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

async function loadHome()
{
    let events = await fetch('/getevents');
    events = await events.json();

    let container = document.querySelector('.main-container');

    if (events.length > 0) {
        let firstEventImages = events.slice(0, 3); // เอารูปภาพ 3 รูปแรก
        let mainBox = document.createElement('div');
        mainBox.className = 'main-box';

        let slider = document.createElement('div');
        slider.className = 'slider';

        firstEventImages.forEach((event) => {
            let slide = document.createElement('div');
            slide.className = 'slide';
            slide.style.backgroundImage = `url('uploads/${event.event_image}')`;
            slide.onclick = function () {
                window.location.href = `/event.html?event_id=${event.event_id}`;
            };
            slide.style.cursor = 'pointer';
    
            let slideText = document.createElement('p');
            slideText.textContent = event.event_name;
            slide.appendChild(slideText);
            slider.appendChild(slide);
        });
    
        mainBox.appendChild(slider);
        container.appendChild(mainBox);
    
        let gridContainer = document.createElement('div');
        gridContainer.className = 'grid-container';
    
        for (let i = 3; i < events.length; i++) {
            let gridItem = document.createElement('div');
            gridItem.className = 'grid-item';
            gridItem.style.backgroundImage = `url('uploads/${events[i].event_image}')`;
            gridItem.style.cursor = 'pointer';
            gridItem.onclick = function () {
                window.location.href = `/event.html?event_id=${events[i].event_id}`;
            };
            let itemText = document.createElement('p');
            itemText.textContent = events[i].event_name;
            gridItem.appendChild(itemText);
            gridContainer.appendChild(gridItem);
        }
    
        container.appendChild(gridContainer);

        initializeSlider();
    }
    

    
}
function initializeSlider() {
    const slider = document.querySelector('.slider');
    let currentIndex = 0;

    setInterval(() => {
        currentIndex = (currentIndex + 1) % slider.children.length; // เลื่อนไปภาพถัดไปแบบวนลูป
        slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    }, 3000); // เลื่อนทุก 3 วินาที
}

let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}

