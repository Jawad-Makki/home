//
// Author: Jawad Makki
//
// Purpose: To control the display of the game and the surroundings of the game
//

// The different buttons in settings
const keyControls = document.querySelector(".keys-btn");
const mouseControls = document.querySelector(".mouse-btn");
const touchControls = document.querySelector(".touch-btn");
const easyDiff = document.querySelector(".easy-btn");
const mediumDiff = document.querySelector(".medium-btn");
const hardDiff = document.querySelector(".hard-btn");
const impossibleDiff = document.querySelector(".impossible-btn");
const darkDisplay = document.querySelector(".dark-btn");
const lightDisplay = document.querySelector(".light-btn");

const setScreen = document.querySelector(".set-screen-container");
const startScreen = document.querySelector(".start-screen-container");
const gameScreen = document.querySelector(".game-container");
const endScreen = document.querySelector(".end-screen-container");

// So I can change variable CSS colors
const root = document.querySelector(":root");

// Booleans for which options are selected
var keys = true;
var mouse = false;
var touchMode = false;
var easy = true;
var medium = false;
var hard = false;
var impossible = false;
var dark = true;
var light = false;

// Array of the above buttons
const btnsArray = [keyControls, mouseControls, touchControls, 
                   easyDiff, mediumDiff, hardDiff, impossibleDiff,
                   darkDisplay, lightDisplay];

// If it is switched to the settings page
function settings () {
    startScreen.style.display = "none";
    setScreen.style.display = "flex";
    endScreen.style.display = "none";
}

// If it is switched back off the settings page, to the home page
function back () {
    startScreen.style.display = "flex";
    setScreen.style.display = "none";
    gameScreen.style.display = "none";
}

// The function that switches to the game screen
function play () {
    startScreen.style.display = "none";
    gameScreen.style.display = "flex";
    endScreen.style.display = "none";
    
    if (isDead == false)
        return;

    if (keys === true) {
        pressEnter.style.display = "inline";
        startGameButton.style.display = "none";
    }

    if (mouse === true || touchMode === true) {
        startGameButton.style.display = "inline";
        pressEnter.style.display = "none";
    }

    playingGame = true;
}

// Displaying the end screen when the game is over
function displayEndScreen () {
    endScreen.style.display = "flex";
    winOrLose.style.display = "inline";
    gameScreen.style.display = "none";
}

// After the game, once it is switched back to the home page
function goHome () {
    endScreen.style.display = "none";
    startScreen.style.display = "flex";
    winOrLose.style.display = "none";
}

// General function to change which buttons appear to be selected and not selected
function changeSelected (array1, array2, startIndex) {
    for (i = 0; i < array2.length; i++) {
        if (array2[i] == true) {
            array1[i + startIndex].style.background = "var(--selectedBtnColor)";
            array1[i + startIndex].style.border = "3px solid var(--regularColor)";
            array1[i + startIndex].style.color = "var(--regularColor)";
        } 
        
        else {
            array1[i + startIndex].style.background = "var(--defaultBtnColor)";
            array1[i + startIndex].style.border = "3px solid var(--defaultOutline)";
            array1[i + startIndex].style.color = "var(--defaultOutline)";
        }
    }

    // Resets everything if a setting is changed
    reset(); // In gameplay.js
}

// If the control method is changed
function controlSelect (e) {
   
    // If it is changed to keys
    if (e.target == keyControls) {
        keys = true;
        mouse = false;
        touchMode = false;
    }
  
    // If it is changed to mouse
    else if (e.target == mouseControls) {
        keys = false;
        mouse = true;
        touchMode = false;
    }
    
    // If it is changed to touch (for mobile or other touchscreens)
    else {
        keys = false;
        mouse = false;
        touchMode = true;
    }

    // Defining the array of booleans
    let boolsArray = [keys, mouse, touchMode];

    // Changing the appearances of the buttons
    changeSelected(btnsArray, boolsArray, 0);
}

// If the difficulty level is changed
function difficultySelect (e) {
    
    // If it is changed to easy mode
    if (e.target == easyDiff) {
        easy = true;
        medium = false;
        hard = false;
        impossible = false;    
    }

    // If it is changed to medium mode
    else if (e.target == mediumDiff) {
        easy = false;
        medium = true;
        hard = false;
        impossible = false;
    }

    // If it is changed to hard mode
    else if (e.target == hardDiff) {
        easy = false;
        medium = false;
        hard = true;
        impossible = false;
    }
    
    // If it is changed to impossible mode
    else {
        easy = false;
        medium = false;
        hard = false;
        impossible = true;
    }
   
    // Defining the array of booleans
    let boolsArray = [easy, medium, hard, impossible];
    
    // Changing the appearances of the buttons
    changeSelected(btnsArray, boolsArray, 3);
}

// The function to switch to dark mode
function darkMode () {
    // Changing the booleans
    dark = true;
    light = false;

    // Changing the variable colors to be dark themed
    root.style.setProperty('--regularColor', 'white');
    root.style.setProperty('--backgroundColor', 'darkslategray');
    root.style.setProperty('--selectedBtnColor', 'slategray');
    root.style.setProperty('--defaultBtnColor', 'whitesmoke');

    // Defining the array of booleans
    let boolsArray = [keys, mouse, touchMode, easy, medium, hard, impossible, dark, light];
    
    // Changing the appearances of the buttons
    changeSelected(btnsArray, boolsArray, 0);
}

// The function to switch to light mode
function lightMode () {
    // Changing the booleans
    light = true;
    dark = false;

    // Changing the variable colors to be light themed
    root.style.setProperty('--regularColor', 'black');
    root.style.setProperty('--backgroundColor', 'lightsteelblue');
    root.style.setProperty('--selectedBtnColor', 'royalblue');
    root.style.setProperty('--defaultBtnColor', 'white');
        
    // Defining the array of booleans
    let boolsArray = [keys, mouse, touchMode, easy, medium, hard, impossible, dark, light];
    
    // Changing the appearances of the buttons
    changeSelected(btnsArray, boolsArray, 0);
}