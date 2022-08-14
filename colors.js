const nameContainer = document.querySelector(".name-container");
const nameBg = document.querySelector(".name-bg");

const portfolioContainer = document.querySelector(".portfolio-container");
const portfolioBg = document.querySelector(".portfolio-bg");

const contactContainer = document.querySelector(".contact-container");
const contactBg = document.querySelector(".contact-bg");

const sites = document.querySelectorAll(".site");

var red = false;
var dark = false;

function lightMode() {
    nameContainer.style.background = "white";
    portfolioBg.style.background = "white";
    contactContainer.style.background = "white";

    if (red == true) {
        for (l = 0; l < sites.length; l++) {
            sites[l].style.color = "rgb(30, 1, 1)"
        }
    } else {
        for (l = 0; l < sites.length; l++) {
            sites[l].style.color = "rgb(0, 48, 45)"
        }
    }

    dark = false;
}

function darkMode() {
    nameContainer.style.background = "rgb(2, 35, 43)";
    portfolioBg.style.background = "rgb(2, 35, 43)";
    contactContainer.style.background = "rgb(2, 35, 43)";

    for (l = 0; l < sites.length; l++) {
        sites[l].style.color = "white";
    }

    dark = true;
}

function redMode() {
    nameBg.style.background = "rgb(120, 20, 2)";
    portfolioContainer.style.background = "rgb(120, 20, 2)";
    contactBg.style.background = "rgb(120, 20, 2)";

    if (dark == false) {
        for (l = 0; l < sites.length; l++) {
            sites[l].style.color = "rgb(30, 1, 1)"
        }
    } else {
        for (l = 0; l < sites.length; l++) {
            sites[l].style.color = "white"
        }
    }

    red = true;
}

function blueMode() {
    nameBg.style.background = "rgb(10, 116, 109)";
    portfolioContainer.style.background = "rgb(10, 116, 109)";
    contactBg.style.background = "rgb(10, 116, 109)";

    if (dark == false) {
        for (l = 0; l < sites.length; l++) {
            sites[l].style.color = "rgb(0, 48, 45)"
        }
    } else {
        for (l = 0; l < sites.length; l++) {
            sites[l].style.color = "white"
        }
    }

    red = false;
}