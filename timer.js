var countUpFrom = new Date("April 16, 2022 00:00:00").getTime();
var x = setInterval(updateTime, 1000);

var now;
var distance;
var totalDays;
var months;
var days;
var years = 0;

updateTime();

function updateTime(){
    now = new Date().getTime();
    distance = now - countUpFrom;
    totalDays = Math.floor(distance / (1000 * 60 * 60 * 24));

    if (totalDays / 365 >= 1) {
        years = Math.floor(distance / (1000 * 60 * 60 * 24 * 365));
        totalDays = Math.floor(distance % (1000 * 60 * 60 * 24 * 365) / (1000 * 60 * 60 * 24));
    }

    differentMonths();
    
    if (years != 0) {
        if (years == 1 && months == 1) {
            document.querySelector(".coding-for").innerHTML = "been coding for " + years + " year and " + months + " month";
        } else if (years != 1 && months == 1) {
            document.querySelector(".coding-for").innerHTML = "been coding for " + years + " years and " + months + " month";
        } else if (years == 1 && months != 1) {
            document.querySelector(".coding-for").innerHTML = "been coding for " + years + " year and " + months + " months";
        } else {
            document.querySelector(".coding-for").innerHTML = "been coding for " + years + " years and " + months + " months";
        }
    } else {
        if (days == 1) {
            document.querySelector(".coding-for").innerHTML = "been coding for " + months + " months and " + days + " day";
        } else {
            document.querySelector(".coding-for").innerHTML = "been coding for " + months + " months and " + days + " days";
        }
    }
}

function differentMonths() {
    if (totalDays <= 30) { // april
        months = 0;
        days = totalDays;
    } else if (totalDays <= 61) { // may
        months = 1;
        days = totalDays - 30;
    } else if (totalDays <= 91) { // june
        months = 2;
        days = totalDays - 61;
    } else if (totalDays <= 122) { // july
        months = 3;
        days = totalDays - 91;
    } else if (totalDays <= 153) { // august
        months = 4;
        days = totalDays - 122;
    } else if (totalDays <= 183) { // september
        months = 5;
        days = totalDays - 153;
    } else if (totalDays <= 214) { // october
        months = 6;
        days = totalDays - 183;
    } else if (totalDays <= 244) { // november
        months = 7;
        days = totalDays - 214;
    } else if (totalDays <= 275) { // december
        months = 8;
        days = totalDays - 244;
    } else if (totalDays <= 306) { // january
        months = 9;
        days = totalDays - 275;
    } else if (totalDays <= 334) { // february
        months = 10;
        days = totalDays - 306;
    } else if (totalDays <= 365) { // march
        months = 11
        days = totalDays - 334;
    }
}