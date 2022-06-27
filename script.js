const nameContainer = document.querySelector(".name-container");

const myName = document.querySelector(".jawad-makki");
const developer = document.querySelector(".developer");

const portfolioContainer = document.querySelector(".portfolio-container");
const portfolioBg = document.querySelector(".portfolio-bg");
const sites = document.querySelectorAll(".site");
const contact = document.querySelector(".contact");

const contactContainer = document.querySelector(".contact-container");

function lightMode () {
    nameContainer.style.background = "white";
    portfolioBg.style.background = "white";
    contactContainer.style.background = "white";
    myName.style.color = "white";
    developer.style.color = "white";
    contact.style.color = "white";
    for (i = 0; i < sites.length; i++) {
        sites[i].style.background = "white";
        sites[i].style.color = "rgb(1, 12, 15)"
    }
}

function darkMode () {
    nameContainer.style.background = "rgb(2, 35, 43)";
    portfolioBg.style.background = "rgb(2, 35, 43)";
    contactContainer.style.background = "rgb(2, 35, 43)";
    myName.style.color = "rgb(1, 12, 15)";
    developer.style.color = "rgb(1, 12, 15)";
    contact.style.color = "rgb(1, 12, 15)";
    for (i = 0; i < sites.length; i++) {
        sites[i].style.background = "rgb(2, 35, 43)";
        sites[i].style.color = "white";
    }
}
