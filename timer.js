//
// Author: Jawad Makki
//
// Purpose: Determine and display the amount of time that I have been coding for (since April 16, 2022)
//

// Getting the element to change the words in it
const codingFor = document.getElementById("coding-for");

// Conversion factors
const msToSec = 1000;
const secToMin = 60;
const minToHour = 60;
const hourToDay = 24;
const dayToYear = 365;

// Getting the date to count up from
var countUpFrom = new Date("April 16, 2022 00:00:00").getTime();

// Updates the time every second
var x = setInterval(updateTime, 1000);

// Initialising Variables
var now;
var totalTime;
var totalDays;
var months;
var days;
var years;
var currentYear;

// Boolean for determining if it is a leap year
var isLeapYear = false;

// The day of the month that it is (From April to March)
var monthLengths = [0, 30, 61, 91, 122, 153, 183, 214, 244, 275, 306, 334, 365];

updateTime(); // So that it updates immediately after loading instead of after one second

// Figuring out the correct output
function updateTime () {
    now = new Date().getTime();
    totalTime = now - countUpFrom;

    totalDays = Math.floor(totalTime / (msToSec * secToMin * minToHour * hourToDay));
    currentYear = Math.floor(now / (msToSec * secToMin * minToHour * hourToDay * dayToYear));
    years = Math.floor(totalDays / dayToYear);
    totalDays -= years * dayToYear;
    
    differentMonths();
    
    // Output
    if (years != 0) {
        codingFor.innerHTML = "been coding for " + years + " year and " + months + " month";
        
        if (years != 1)
            codingFor.innerHTML =  "been coding for " + years + " years and " + months + " month";
        
        if (months != 1)
            codingFor.innerHTML += "s";
    } 
    
    else {
        codingFor.innerHTML = "been coding for " + months + " months and " + days + " day";
         
        if (days > 1)
            codingFor.innerHTML += "s";
    }
}

// Determining how many days and months in we are
function differentMonths () {
    leapYear();

    if (isLeapYear) {
        monthLengths[11] = 335;
        monthLengths[12] = 366;
    }

    for (i = 0; i < monthLengths.length; i++) {
        if (totalDays >= monthLengths[i]) {
            days = totalDays - monthLengths[i];
            months = i;
        }
    }
}

// Determining if the current year is a leap year or not
function leapYear () {

    // checking if it is divisible by 100 but not by 400
    if (currentYear % 100 == 0 && currentYear % 400 != 0) {
        isLeapYear = false;
    }
    
    // checking if the year is divisible by 4
    else if (currentYear % 4 == 0) {
        isLeapYear = true;
    }
    
    // it is not a leap year if it made it this far
    else {
        isLeapYear = false;
    }
}