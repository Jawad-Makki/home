//
// Author: Jawad Makki
//
// Purpose: Drop down the letters in my name to make it look all fancy
//

// Getting each letter as a constant
const letterJ = document.getElementById("letterJ");
const letterA1 = document.getElementById("letterA1");
const letterW = document.getElementById("letterW");
const letterA2 = document.getElementById("letterA2");
const letterD = document.getElementById("letterD");
const letterM = document.getElementById("letterM");
const letterA3 = document.getElementById("letterA3");
const letterK1 = document.getElementById("letterK1");
const letterK2 = document.getElementById("letterK2");
const letterI = document.getElementById("letterI");

// The arrays of letters
var letters1 = [letterJ, letterA1, letterW, letterA2, letterD, 
                letterM, letterA3, letterK1, letterK2, letterI];
var letters2 = [];
var letters3 = [];
var letters4 = [];

// Delay in asynchronous loop
var wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// The initial dropping down of the letters
window.addEventListener("load", () => {

    // Drops down the letters
    for (i = 0, time = 2; i < letters1.length; i++, time -= 0.15) {
        letters1[i].style.animation = "letter-drop 0.6s ease " + time + "s 1 normal forwards";
    }
    
    setTimeout(() => { // Executes after the letters are done dropping
        resetLetterPosition(letters1);
        resetLetterPosition(letters2);
        resetLetterPosition(letters3);
        resetLetterPosition(letters4);
    }, 2600);

    // Changes click me text to tap me if the device has a touch screen
    if ("ontouchstart" in document) {
        document.getElementById("click-me").innerHTML = "tap me!"
    }
})

// Sets the default positioning of the letters
function resetLetterPosition (letterArray) {
    for (i = 0; i < letterArray.length; i++) {
        letterArray[i].style.top = "0";
    }
}

// Executing the code when a letter is clicked
window.addEventListener("click", (e) => {

    // Making sure the clicked element was a letter
    if (e.target.className != "first-name-letter" && e.target.className != "last-name-letter")
        return;

    correctArray(e.target);


    if (window.innerWidth > 1240) {      
        letterLoop(letters1);
        setTimeout(() => { // Adding a delay to the second loop so it doesn't start with two letters
            letterLoop(letters2);
        }, 100);
    }

    else {
        if (e.target.className == "first-name-letter") {
            smallScreen(letters1, letters2, letters3, letters4);
        }
    
        else {  
            smallScreen(letters3, letters4, letters1, letters2);
        }
    }
})

// The bopping up of the letters when a letter is clicked
const letterLoop = async (letterArray) => {
    for (const element of letterArray) {

        element.style.animation = "letter-up 0.25s ease-out 0s 2 alternate forwards";
        
        setTimeout(() => {
            element.style.animation = "";
        }, 500);
        
        await wait(100);
    }
}

// Bops arrays of letters up with delay specific to the clicked letter when
// the first name is above the last name
function smallScreen (array1, array2, array3, array4) {
    letterLoop(array1);
    setTimeout(() => {
        letterLoop(array2);
        letterLoop(array3);

        setTimeout(() => {
            letterLoop(array4);
        }, 100);

    }, 100);
}

// The shifting of the letters to be in the correct array based on the clicked letter
function correctArray (letter) {

    // If the first and last name are side by side
    if (window.innerWidth > 1240) { 

        // Resetting the arrays to original letters
        letters1 = [letterJ, letterA1, letterW, letterA2, letterD, 
                    letterM, letterA3, letterK1, letterK2, letterI];
        letters2 = [];

        // Shifting until what we want
        while (letters1[0] != letter) {
            letters2.unshift(letters1[0]);
            letters1.shift();
        }
    }

    // If the last name is below the first name
    else { 

        // Resetting the arrays to original letters
        letters1 = [letterJ, letterA1, letterW, letterA2, letterD]
        letters2 = [];

        letters3 = [letterM, letterA3, letterK1, letterK2, letterI];
        letters4 = [];

        // Shifting until what we want
        while (letters1[0] != letter && letters3[0] != letter) {
            letters2.unshift(letters1[0]);
            letters1.shift();

            letters4.unshift(letters3[0]);
            letters3.shift();
        }
    }
}