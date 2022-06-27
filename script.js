const nameContainer = document.querySelector(".name-container");

const myName = document.querySelector(".jawad-makki");
const developer = document.querySelector(".developer");

const portfolioContainer = document.querySelector(".portfolio-container");
const portfolioBg = document.querySelector(".portfolio-bg");

const contactContainer = document.querySelector(".contact-container");

function lightMode () {
    nameContainer.style.background = "white";
    portfolioBg.style.background = "white";
    contactContainer.style.background = "white";
    myName.style.color = "white";
    developer.style.color = "white";
}

function darkMode () {
    nameContainer.style.background = "rgb(2, 35, 43)";
    portfolioBg.style.background = "rgb(2, 35, 43)";
    contactContainer.style.background = "rgb(2, 35, 43)";
    myName.style.color = "rgb(1, 12, 15)";
    developer.style.color = "rgb(1, 12, 15)";
}