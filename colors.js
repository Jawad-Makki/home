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

// If the button to change it to light mode is clicked
function lightMode () {
    nameContainer.style.background = "white";
    portfolioBg.style.background = "white";
    contactContainer.style.background = "white";
}

// If the button to change it to dark mode is clicked
function darkMode () {
    nameContainer.style.background = "rgb(2, 35, 43)";
    portfolioBg.style.background = "rgb(2, 35, 43)";
    contactContainer.style.background = "rgb(2, 35, 43)";
}

// If the button to change it to red mode is clicked
function redMode () {
    nameBg.style.background = "rgb(120, 20, 2)";
    portfolioContainer.style.background = "rgb(120, 20, 2)";
    contactBg.style.background = "rgb(120, 20, 2)";
}

// If the button to change it to blue mode is clicked
function blueMode () {
    nameBg.style.background = "rgb(10, 116, 109)";
    portfolioContainer.style.background = "rgb(10, 116, 109)";
    contactBg.style.background = "rgb(10, 116, 109)";
}