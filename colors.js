//
// Author: Jawad Makki
//
// Purpose: Change the colors of the website
//

// Getting all of the background/container elements
const nameContainer = document.getElementById("name-container");
const nameBg = document.getElementById("name-bg");

const portfolioContainer = document.getElementById("portfolio-container");
const portfolioBg = document.getElementById("portfolio-bg");

const contactContainer = document.getElementById("contact-container");
const contactBg = document.getElementById("contact-bg");

const myProjects = document.querySelector(".my-projects");

const btnContainer = document.querySelector(".btns-container");
const palette = document.querySelector(".palette");

const colorBtns = document.getElementsByClassName("color-btn");
const btnGroup = document.getElementsByClassName("button-group");

var isRedMode = false;
var isDarkMode = false;

// Start or stop displaying the buttons
window.addEventListener("click", (e) => {
    if (e.target != palette && e.target != btnContainer) {
        
        for (i = 0; i < colorBtns.length; i++)
            if (e.target == colorBtns[i])
                return;
        
        for (i = 0; i < btnGroup.length; i++)
            if ( e.target == btnGroup[i])
                return;

        btnContainer.style.display = "none";
        palette.style.opacity = "0.7";
    }
});

function changePalette () {
    if (btnContainer.style.display != "flex") {
        btnContainer.style.display = "flex";
        palette.style.opacity = "1";
    }

    else {
        btnContainer.style.display = "none";
        palette.style.opacity = "0.7";
    }
}

// If the button to change it to light mode is clicked
function lightMode () {
    isDarkMode = false;
    darkOrLightColors();
}

// If the button to change it to dark mode is clicked
function darkMode () {
    isDarkMode = true;
    darkOrLightColors();
}

// If the button to change it to red mode is clicked
function redMode () {
    nameBg.style.background = "rgb(120, 20, 2)";
    portfolioContainer.style.background = "rgb(120, 20, 2)";
    contactBg.style.background = "rgb(120, 20, 2)";

    isRedMode = true;
    darkOrLightColors();
}

// If the button to change it to blue mode is clicked
function blueMode () {
    nameBg.style.background = "rgb(10, 116, 109)";
    portfolioContainer.style.background = "rgb(10, 116, 109)";
    contactBg.style.background = "rgb(10, 116, 109)";

    isRedMode = false;
    darkOrLightColors();
}

function darkOrLightColors () {
    
    if (isDarkMode == true) {
        
        myProjects.style.color = "white";

        if (isRedMode == true) {
            nameContainer.style.background = "rgb(30, 2, 2)";
            portfolioBg.style.background = "rgb(30, 2, 2)";
            contactContainer.style.background = "rgb(30, 2, 2)";
        }

        else {
            nameContainer.style.background = "rgb(2, 35, 43)";
            portfolioBg.style.background = "rgb(2, 35, 43)";
            contactContainer.style.background = "rgb(2, 35, 43)";
        }
    }

    else {
        if (isRedMode == true)
            myProjects.style.color = "rgb(35, 2, 2)";
        
        else
            myProjects.style.color = "rgb(0, 26, 24)";

        nameContainer.style.background = "white";
        portfolioBg.style.background = "white";
        contactContainer.style.background = "white";
    }
}