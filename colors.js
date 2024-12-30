//
// Author: Jawad Makki
//
// Purpose: Change the colors of the website
//

// Getting all of the background/container elements

const btnContainer = document.querySelector(".btns-container");
const palette = document.querySelector(".palette");

const colorBtns = document.getElementsByClassName("color-btn");
const btnGroup = document.getElementsByClassName("button-group");

var isRedMode = false;
var isDarkMode = false;

const RED = "rgb(80, 20, 2)";
const TEAL = "rgb(10, 116, 109)";
const WHITE = "white";
const BLACK = "black";
const LIGHT_GRAY = "rgb(180, 183, 182)";
const DARK_GRAY = "rgb(70, 78, 76)";
const RED_BLACK = "rgb(30, 2, 2)";
const TEAL_BLACK = "rgb(2, 35, 43)";
const TEAL_PROGRESS_CIRCLE = "rgb(184, 218, 213)";
const TEAL_SELECTED_PROGRESS_CIRCLE = "rgb(136, 165, 162)";
const RED_PROGRESS_CIRCLE = "rgb(218, 184, 184)";
const RED_SELECTED_PROGRESS_CIRCLE = "rgb(150, 120, 120)";

var r = document.querySelector(':root');
// r.style.setProperty('--teal', 'lightblue');

// Start or stop displaying the 
window.addEventListener("cbuttonslick", (e) => {
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
    r.style.setProperty('--teal', RED);
    isRedMode = true;
    darkOrLightColors();
}

// If the button to change it to blue mode is clicked
function blueMode () {
    r.style.setProperty('--teal', TEAL);
    isRedMode = false;
    darkOrLightColors();
}

function darkOrLightColors () {
    
    if (isDarkMode == true) {
        r.style.setProperty('--dark-letters', WHITE);
        r.style.setProperty('--alt-dark-letters', LIGHT_GRAY);
        r.style.setProperty('--black', WHITE);

        if (isRedMode == true) {
            r.style.setProperty('--white', RED_BLACK);
            r.style.setProperty('--progress-circles', RED_SELECTED_PROGRESS_CIRCLE);
            r.style.setProperty('--selected-progress-circle', RED_PROGRESS_CIRCLE);
        }

        else {
            r.style.setProperty('--white', TEAL_BLACK);
            r.style.setProperty('--progress-circles', TEAL_SELECTED_PROGRESS_CIRCLE);
            r.style.setProperty('--selected-progress-circle', TEAL_PROGRESS_CIRCLE);
        }
    }

    else {
        r.style.setProperty('--dark-letters', BLACK);
        r.style.setProperty('--alt-dark-letters', DARK_GRAY);
        r.style.setProperty('--white', WHITE);
        r.style.setProperty('--black', BLACK);

        if (isRedMode == true) {
            r.style.setProperty('--progress-circles', RED_PROGRESS_CIRCLE);
            r.style.setProperty('--selected-progress-circle', RED_SELECTED_PROGRESS_CIRCLE);
        }
    
        else {
            r.style.setProperty('--progress-circles', TEAL_PROGRESS_CIRCLE);
            r.style.setProperty('--selected-progress-circle', TEAL_SELECTED_PROGRESS_CIRCLE);
        }
    }
}