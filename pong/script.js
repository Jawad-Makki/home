
const startScreen = document.querySelector(".start-screen-container");
const startScreenBg = document.querySelector(".start-screen-bg");
const title = document.querySelector(".title");
const playButton = document.querySelector(".play");
const setButton = document.querySelector(".settings");

const gameScreen = document.querySelector(".game-container");
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
const leftScoreHeader = document.querySelector(".left-score");
const rightScoreHeader = document.querySelector(".right-score");

const setScreen = document.querySelector(".set-screen-container");
const setBg = document.querySelector(".set-bg");
const controls = document.querySelector(".controls");
const difficulty = document.querySelector(".difficulty");
const display = document.querySelector(".display");
const backButton = document.querySelector(".back-button");
const backButton2 = document.querySelector(".back-button-2");

const pauseButton = document.querySelector(".pause-button");
const pressEnter = document.querySelector(".press-enter");
const startGameButton = document.querySelector(".start-game-button");
const midLine = document.querySelector(".middle-line");

const endScreen = document.querySelector(".end-screen-container");
const endScreenBg = document.querySelector(".end-screen-bg");
const youWin = document.querySelector(".you-win");
const youLose = document.querySelector(".you-lose");
const homeButton = document.querySelector(".home-button");
    
const keyControls = document.querySelector(".keys");
const mouseControls = document.querySelector(".mouse");
const touchControls = document.querySelector(".touch-btn");
const easyDiff = document.querySelector(".easy");
const mediumDiff = document.querySelector(".medium");
const hardDiff = document.querySelector(".hard");
const impossibleDiff = document.querySelector(".impossible");
const darkDisp = document.querySelector(".dark");
const lightDisp = document.querySelector(".light");

var downSpeedInterval;
var upSpeedInterval;
var ballSpeedIncrInt;

var mouse = false;
var keys = true;
var touchMode = false;
var easy = true;
var medium = false;
var hard = false;
var impossible = false;
var dark = true;
var light = true;

var playingGame = false;
var setBoolean = false;
var isDead = true;
var pause = false;
var satisfied = true;

var y = window.innerHeight;
var x = window.innerWidth;

var rightY = y/2 - y/10;
var leftY = y/2 - y/10;
var rightX = x/2 - x/10;
var leftX = x/2 - x/10;
var ballX = x/2;
var ballY = y/2;
var initialDir = 0;
var xDir = 0;
var yDir = 0;
var yInc = 0;

var leftScore = 0;
var rightScore = 0;

var upSpeed;
var downSpeed;
var leftSpeed;
var rightSpeed;
var ballSpeed;

var upIsHeld = false;
var downIsHeld = false;
var leftIsHeld = false;
var rightIsHeld = false;

function play(){
    startScreen.style.display = "none";
    gameScreen.style.display = "flex";
    endScreen.style.display = "none";
    playingGame = true;
    
    if (keys === true) {
        pressEnter.style.display = "inline";
        startGameButton.style.display = "none";
    }

    if (mouse === true || touchMode === true) {
        startGameButton.style.display = "inline";
        pressEnter.style.display = "none";
    }

    if (x >= y) {
        upSpeed = 5;
        downSpeed = 5;
        leftSpeed = 5;
        rightSpeed = 5;
        ballSpeed = 4;
    } else {
        upSpeed = 3;
        downSpeed = 3;
        leftSpeed = 3;
        rightSpeed = 3;
        ballSpeed = 2;
    }
}

function settings(){
    startScreen.style.display = "none";
    setScreen.style.display = "flex";
    endScreen.style.display = "none";
}

function back(){
    startScreen.style.display = "flex";
    setScreen.style.display = "none";
    gameScreen.style.display = "none";
    playingGame = false;
    isDead = true;
    leftScore = 0;
    rightScore = 0;
}

function selected(element, boolean){
    if (boolean === true) {
        element.style.background = "slategray"
        element.style.border = "3px solid white";
        element.style.color = "white";
    } else {
        element.style.background = "whitesmoke";
        element.style.border = "3px solid black";
        element.style.color = "black";
    }
}

function selectedLight(element, boolean){
    if (boolean === true) {
        element.style.background = "white"
        element.style.border = "3px solid steelblue";
        element.style.color = "steelblue";
    } else {
        element.style.background = "lightskyblue";
        element.style.border = "3px solid black";
        element.style.color = "black";
    }
}

function mouseFunction(){
    mouse = true;
    keys = false;
    touchMode = false;
    
    if (dark === true) {
        selected(keyControls, keys);
        selected(mouseControls, mouse);
        selected(touchControls, touchMode);
    } else {
        selectedLight(keyControls, keys);
        selectedLight(mouseControls, mouse);
        selectedLight(touchControls, touchMode);
    }
}

function keysFunction(){
    mouse = false;
    keys = true;
    touchMode = false;

    if (dark === true) {
        selected(keyControls, keys);
        selected(mouseControls, mouse);
        selected(touchControls, touchMode);
    } else {
        selectedLight(keyControls, keys);
        selectedLight(mouseControls, mouse);
        selectedLight(touchControls, touchMode);
    }
}

function touchFunction(){
    mouse = false;
    keys = false;
    touchMode = true;

    if (dark === true) {
        selected(keyControls, keys);
        selected(mouseControls, mouse);
        selected(touchControls, touchMode);
    } else {
        selectedLight(keyControls, keys);
        selectedLight(mouseControls, mouse);
        selectedLight(touchControls, touchMode);
    }
}

function easyMode(){
    easy = true;
    medium = false;
    hard = false;
    impossible = false;

    if (dark === true) {
        selected(easyDiff, easy);
        selected(mediumDiff, medium);
        selected(hardDiff, hard);
        selected(impossibleDiff, impossible);
    } else {
        selectedLight(easyDiff, easy);
        selectedLight(mediumDiff, medium);
        selectedLight(hardDiff, hard);
        selectedLight(impossibleDiff, impossible);
    }
}

function mediumMode(){
    easy = false;
    medium = true;
    hard = false;
    impossible = false;
    
    if (dark === true) {
        selected(easyDiff, easy);
        selected(mediumDiff, medium);
        selected(hardDiff, hard);
        selected(impossibleDiff, impossible);
    } else {
        selectedLight(easyDiff, easy);
        selectedLight(mediumDiff, medium);
        selectedLight(hardDiff, hard);
        selectedLight(impossibleDiff, impossible);
    }
}

function hardMode(){
    easy = false;
    medium = false;
    hard = true;
    impossible = false;
    
    if (dark === true) {
        selected(easyDiff, easy);
        selected(mediumDiff, medium);
        selected(hardDiff, hard);
        selected(impossibleDiff, impossible);
    } else {
        selectedLight(easyDiff, easy);
        selectedLight(mediumDiff, medium);
        selectedLight(hardDiff, hard);
        selectedLight(impossibleDiff, impossible);
    }
}

function impossibleMode(){
    easy = false;
    medium = false;
    hard = false;
    impossible = true;
    
    if(dark === true){
        selected(easyDiff, easy);
        selected(mediumDiff, medium);
        selected(hardDiff, hard);
        selected(impossibleDiff, impossible);
    }    else{
        selectedLight(easyDiff, easy);
        selectedLight(mediumDiff, medium);
        selectedLight(hardDiff, hard);
        selectedLight(impossibleDiff, impossible);
    }
}

function darkMode(){
    dark = true;
    light = false;

    selected(darkDisp, dark);
    selected(lightDisp, light);
    selected(keyControls, keys);
    selected(mouseControls, mouse);
    selected(easyDiff, easy);
    selected(mediumDiff, medium);
    selected(hardDiff, hard);
    selected(impossibleDiff, impossible);
    selected(playButton, false);
    selected(setButton, false);
    selected(homeButton, false);

    setBg.style.background = "darkslategray";
    controls.style.color = "white";
    difficulty.style.color = "white";
    display.style.color = "white";
    backButton.style.background = "darkslategray";
    backButton.style.color = "white";

    startScreenBg.style.background = "darkslategray";
    title.style.border = "3px solid white";
    title.style.background = "lightslategray";
    title.style.color = "white";

    canvas.style.background = "darkslategray";
    backButton2.style.background = "darkslategray";
    backButton2.style.color = "white";

    midLine.style.borderRight = "2px dashed white";
    pressEnter.style.background = "slategray";
    pressEnter.style.color = "white";
    leftScoreHeader.style.color = "white";
    rightScoreHeader.style.color = "white";
    pauseButton.style.color = "white";
    pauseButton.style.background = "darkslategray";

    endScreenBg.style.background = "darkslategray";
    youWin.style.color = "white";
    youLose.style.color = "white";

    function hover1(e, element){
        if(e.target === element){
            element.style.background = "slategray";
            element.style.color = "white";
            element.style.border = "3px solid white";
        }
    }

    function notHover1(e, element, boolean){
        if(e.target === element && boolean === false){
            element.style.background = "whitesmoke";
            element.style.color = "black";
            element.style.border = "3px solid black";
        }
    }
    
    document.addEventListener("mouseover", hoverDark);
    document.addEventListener("mouseout", notHoverDark);

    function hoverDark(e){
        hover1(e, keyControls);
        hover1(e, mouseControls);
        hover1(e, easyDiff);
        hover1(e, mediumDiff);
        hover1(e, hardDiff);
        hover1(e, impossibleDiff);
        hover1(e, lightDisp);
        hover1(e, darkDisp);
        hover1(e, playButton);
        hover1(e, setButton);
        hover1(e, homeButton);
    }
    
    function notHoverDark(e){
        notHover1(e, keyControls, keys);
        notHover1(e, mouseControls, mouse);
        notHover1(e, easyDiff, easy);
        notHover1(e, mediumDiff, medium);
        notHover1(e, hardDiff, hard);
        notHover1(e, impossibleDiff, impossible);
        notHover1(e, lightDisp, light);
        notHover1(e, darkDisp, dark);
        notHover1(e, playButton, false);
        notHover1(e, setButton, false);
        notHover1(e, homeButton, false);
    }
}

function lightMode(){
    light = true;
    dark = false;

    selectedLight(darkDisp, dark);
    selectedLight(lightDisp, light);
    selectedLight(keyControls, keys);
    selectedLight(mouseControls, mouse);
    selectedLight(easyDiff, easy);
    selectedLight(mediumDiff, medium);
    selectedLight(hardDiff, hard);
    selectedLight(impossibleDiff, impossible);
    selectedLight(playButton, false);
    selectedLight(setButton, false);
    selectedLight(homeButton, false);
    
    setBg.style.background = "whitesmoke";
    controls.style.color = "black";
    difficulty.style.color = "black";
    display.style.color = "black";
    backButton.style.background = "whitesmoke";
    backButton.style.color = "black";

    startScreenBg.style.background = "whitesmoke";
    title.style.border = "3px solid steelblue";
    title.style.color = "steelblue";
    title.style.background = "white";

    canvas.style.background = "whitesmoke";
    backButton2.style.background = "whitesmoke";
    backButton2.style.color = "black";

    midLine.style.borderRight = "2px dashed steelblue";
    pressEnter.style.background = "whitesmoke";
    pressEnter.style.color = "black";
    leftScoreHeader.style.color = "black";
    rightScoreHeader.style.color = "black";
    pauseButton.style.color = "black";
    pauseButton.style.background = "whitesmoke";

    endScreenBg.style.background = "whitesmoke";
    youWin.style.color = "black";
    youLose.style.color = "black";
    
    
    function hover2(e, element){
        if(e.target === element){
            element.style.background = "white"
            element.style.border = "3px solid steelblue";
            element.style.color = "steelblue";
        }
    }
    
    function notHover2(e, element, boolean){
        if(e.target === element && boolean === false){
            element.style.background = "lightskyblue";
            element.style.border = "3px solid black";
            element.style.color = "black";
        }
    }
    
    document.addEventListener("mouseover", hoverLight);
    document.addEventListener("mouseout", notHoverLight);

    function hoverLight(e){
        hover2(e, keyControls);
        hover2(e, mouseControls);
        hover2(e, easyDiff);
        hover2(e, mediumDiff);
        hover2(e, hardDiff);
        hover2(e, impossibleDiff);;
        hover2(e, lightDisp);
        hover2(e, darkDisp);
        hover2(e, playButton);
        hover2(e, setButton);
        hover2(e, homeButton);
    }
    
    function notHoverLight(e){
        notHover2(e, keyControls, keys);
        notHover2(e, mouseControls, mouse);
        notHover2(e, easyDiff, easy);
        notHover2(e, mediumDiff, medium);
        notHover2(e, hardDiff, hard);
        notHover2(e, impossibleDiff, impossible)
        notHover2(e, lightDisp, light);
        notHover2(e, darkDisp, dark);
        notHover2(e, playButton, false);
        notHover2(e, setButton, false);
        notHover2(e, homeButton, false);
    }
}

document.addEventListener("mousemove", mouseMove);

function mouseMove(e){
    if (x >= y) {
        if(mouse === true && gameScreen.style.display === "flex" && 0 <= e.clientY - y/10 && e.clientY - y/10 <= y - y/5 && pause === false){
            rightY = e.clientY - y/10;
        }
    } else {
        if(mouse === true && gameScreen.style.display === "flex" && 0 <= e.clientX - x/10 && e.clientX - x/10 <= x - x/5 && pause === false){
            rightX = e.clientX - x/10;
        }
    }
}

document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

function keyDown(event){

    if(event.key === "Enter" && playingGame === true && isDead === true && keys === true){
        startGame();
    }

    if(event.key === " " && playingGame === true && isDead === false){
        pauseScreen();
    }
    
    event.preventDefault();
    if(keys === true  && playingGame === true){
        if (x >= y) {
            if(event.key === "ArrowDown"){
                downIsHeld = true;
            }
    
            if(event.key === "ArrowUp"){
                upIsHeld = true;
            }
        } else {
            if(event.key === "ArrowLeft"){
                rightIsHeld = true;
            }
    
            if(event.key === "ArrowRight"){
                leftIsHeld = true;
            }
        }
    }
}

function keyUp(event){
    event.preventDefault();
    if (x >= y) {
        if(keys === true && playingGame === true){
            if(event.key === "ArrowDown"){
                downIsHeld = false;
            }
    
            if(event.key === "ArrowUp"){
                upIsHeld = false;
            }
        }

    } else {
        if(keys === true && playingGame === true){
            if(event.key === "ArrowLeft"){
                rightIsHeld = false;
            }
    
            if(event.key === "ArrowRight"){
                leftIsHeld = false;
            }
        }
    }
}

function moveRight(){
    if (x >= y) {
        if(downIsHeld === true && rightY <= y - y/5){
            rightY += downSpeed;
        }
        
        if(upIsHeld === true && rightY >= 0){
            rightY -= upSpeed;
        }

    } else {
        if(leftIsHeld === true && rightX <= x - x/5){
            rightX += leftSpeed;
        }
        
        if(rightIsHeld === true && rightX >= 0){
            rightX -= rightSpeed;
        }
    }
}

function rightMovement(){
    if(keys === true){
        if(isDead === false){
            moveRight();
        }
        
        if(isDead === true){
            rightY = y/2 - y/10;
            rightX = x/2 - x/10;
        }
    }
}

function randomInt(min, max){
    return Math.floor(Math.random() * (max - min) ) + min;
}

function moveBall(xDir, yDir, yInc, ballSpeed){
    if(pause === false && isDead === false){
        if (x >= y) {
            ballX += xDir * ballSpeed;
            ballY += yDir * ballSpeed/3 + yInc;
        } else {
            ballY += xDir * ballSpeed;
            ballX += yDir * ballSpeed/3 + yInc;
        }
    }
}

function startGame() {
    ballX = x/2;
    ballY = y/2;
    pressEnter.style.display = "none";
    startGameButton.style.display = "none";
    initialDir = randomInt(1, 6);
    isDead = false;
    ballSpeed = 4;
    xDir = 0;
    yDir = 0;
    yInc = 0;

    ballSpeedIncrInt = setInterval(ballSpeedIncr, 6000);
}

function ballMovement() {
    if (initialDir == 1) {
        xDir = 1;
        yDir = -1;
    } else if (initialDir == 2) {
        xDir = 1;
        yDir = 0;
    } else if (initialDir == 3) {
        xDir = 1;
        yDir = 1;
    } else if (initialDir == 4) {
        xDir = -1;
        yDir = 1;
    } else if (initialDir == 5) {
        xDir = -1;
        yDir = 0;
    } else if (initialDir == 6) {
        xDir = 1;
        yDir = -1;
    }

    if (x >= y) {
        if (ballY - 17 < 0 && yDir == 0) {
            initialDir = 0;
            yDir = 1;
            yInc *= -1;
        } else if (ballY + 17 > y && yDir == 0) {
            initialDir = 0;
            yDir = -1;
            yInc *= -1;
        } else if (ballY - 17 < 0 && yDir != 0|| ballY + 17 > y && yDir != 0){
            initialDir = 0;
            yDir *= -1;
            yInc *= -1;
        } 
    } else {
        if (ballX - 17 < 0 && yDir == 0) {
            initialDir = 0;
            yDir = 1;
            yInc *= -1;
        } else if (ballX + 17 > x && yDir == 0) {
            initialDir = 0;
            yDir = -1;
            yInc *= -1;
        } else if (ballX - 17 < 0 && yDir != 0|| ballX + 17 > x && yDir != 0){
            initialDir = 0;
            yDir *= -1;
            yInc *= -1;
        }
    }


    if (x >= y) {
        if (x/50 < ballX + 17 && ballX - 17 < x/50 + 20 && leftY <= ballY + 17 && ballY - 17 <= leftY + y/5) {
            initialDir = 0;
            xDir = 1;
    
            // high hit
            if (leftY <= ballY + 17 && ballY - 17 < leftY + y/10 - 17) {
                yInc -= 1;
            }
            // middle hit
            if (leftY + y/10 - 17 < ballY + 17 && ballY - 17 < leftY + y/10 + 17) {
                // y direction doesn't change
            }
            // low hit
            if (leftY + y/10 + 17 < ballY + 17 && ballY - 17 <= leftY + y/5) {
                yInc += 1;
            }
        } 
        
        if (x - x/50 - 20 < ballX + 17 && ballX - 17 < x - x/50 && rightY <= ballY + 17 && ballY - 17 <= rightY + y/5) {
            initialDir = 0;
            xDir = -1;
            
            // high hit
            if (rightY <= ballY + 17 && ballY - 17 < rightY + y/10 - 17) {
                yInc -= 1;
            }
            // middle hit
            if (rightY + y/10 - 17 < ballY + 17 && ballY - 17 < rightY + y/10 + 17) {
                // y direction doesn't change
            }
            // low hit
            if (rightY + y/10 + 17 < ballY + 17 && ballY - 17 <= rightY + y/5) {
                yInc += 1;
            }
        }
    } else {
        if (y/50 < ballY + 17 && ballY - 17 < y/50 + 20 && leftX <= ballX + 17 && ballX - 17 <= leftX + x/5) {
            initialDir = 0;
            xDir = 1;
    
            // high hit
            if (leftX <= ballX + 17 && ballX - 17 < leftX + x/10 - 17) {
                yInc -= 1;
            }
            // middle hit
            if (leftX + x/10 - 17 < ballX + 17 && ballX - 17 < leftX + x/10 + 17) {
                // x direction doesn't change
            }
            // low hit
            if (leftX + x/10 + 17 < ballX + 17 && ballX - 17 <= leftX + x/5) {
                yInc += 1;
            }
        } 
        
        if (y - y/50 - 20 < ballY + 17 && ballY - 17 < y - y/50 && rightX <= ballX + 17 && ballX - 17 <= rightX + x/5) {
            initialDir = 0;
            xDir = -1;
            
            // high hit
            if (rightX <= ballX + 17 && ballX - 17 < rightX + x/10 - 17) {
                yInc -= 1;
            }
            // middle hit
            if (rightX + x/10 - 17 < ballX + 17 && ballX - 17 < rightX + x/10 + 17) {
                // x direction doesn't change
            }
            // low hit
            if (rightX + x/10 + 17 < ballX + 17 && ballX - 17 <= rightX + x/5) {
                yInc += 1;
            }
        }
    }
    
    if (x >= y) {
        if(ballX < 0){
            isDead = true;
            rightScore ++;
        } 
        
        if(ballX > x){
            isDead = true;
            leftScore ++;
        }
    } else {
        if(ballY < 0){
            isDead = true;
            rightScore ++;
        } 
        
        if(ballY > y){
            isDead = true;
            leftScore ++;
        }
    }

    if(isDead === true){
        if(keys === true){
            pressEnter.style.display = "inline";
        }
    
        if(mouse === true){
            startGameButton.style.display = "inline";
        }

        ballX = x/2;
        ballY = y/2;
    
        clearInterval(ballSpeedIncrInt);
    }

    if (isDead === false) {
        moveBall(xDir, yDir, yInc, ballSpeed);
    }
}

function leftMovement() {
    if (x >= y) {
        if (isDead === false && easy === true && ballX < 2*x/5 && xDir < 0) {
            if (ballY < leftY + y/10 && leftY > 0) {
                leftY -= 2;
            }
        
            if (ballY > leftY + y/10 && leftY + y/5 < y) {
                leftY += 2;
            }
        }
    
        if(isDead === false && medium === true && ballX < x/3 && xDir < 0){
            if(ballY < leftY + y/10 && leftY > 0){
                leftY -= 3;
            }
        
            if(ballY > leftY + y/10 && leftY + y/5 < y){
                leftY += 3;
            } 
        }
    
        if(isDead === false && hard === true && ballX < x/3 && xDir < 0){
            if(ballY < leftY + y/10 && leftY > 0){
                leftY -= 4;
            }
        
            if(ballY > leftY + y/10 && leftY + y/5 < y){
                leftY += 4;
            } 
        }
    
        if(isDead === false && impossible === true){
            if(ballY < leftY + y/10 && leftY > 0){
                leftY -= 8;
            }
        
            if(ballY > leftY + y/10 && leftY + y/5 < y){
                leftY += 8;
            } 
        }
    
        if(isDead === true){
            leftY = y/2 - y/10;
        }
        
    } else {
        if (isDead === false && easy === true && ballY < 2*y/5 && xDir < 0) {
            if (ballX < leftX + x/10 && leftX > 0) {
                leftX -= 2;
            }
        
            if (ballX > leftX + x/10 && leftX + x/5 < x) {
                leftX += 2;
            }
        }
    
        if (isDead === false && medium === true && ballY < y/3 && xDir < 0) {
            if(ballX < leftX + x/10 && leftX > 0){
                leftX -= 3;
            }
        
            if(ballX > leftX + x/10 && leftX + x/5 < x){
                leftX += 3;
            } 
        }
    
        if(isDead === false && hard === true && ballY < y/3 && xDir < 0){
            if(ballX < leftX + x/10 && leftX > 0){
                leftX -= 4;
            }
        
            if(ballX > leftX + x/10 && leftX + x/5 < x){
                leftX += 4;
            } 
        }
    
        if(isDead === false && impossible === true){
            if(ballX < leftX + x/10 && leftX > 0){
                leftX -= 8;
            }
        
            if(ballX > leftX + x/10 && leftX + x/5 < x){
                leftX += 8;
            } 
        }
    
        if(isDead === true){
            leftX = x/2 - x/10;
        }
    }
    
}

function scoreBoard(){
    leftScoreHeader.innerHTML = leftScore;
    rightScoreHeader.innerHTML = rightScore;
}

function ballSpeedIncr(){
    if(isDead === false){
        ballSpeed ++;
    }
}

function pauseScreen(){
    satisfied = false;
    if(pause === false && satisfied === false && isDead === false){
        pause = true;
        satisfied = true;
        pauseButton.innerHTML = `<i class="fa-solid fa-play"></i>`
    }

    if(pause === true && satisfied === false && isDead === false){
        pause = false;
        satisfied = true;
        pauseButton.innerHTML = `<i class="fas fa-pause"></i>`;
    }
}

function gameOver(){
    if(leftScore == 10){
        endScreen.style.display = "flex";
        youLose.style.display = "inline";
        gameScreen.style.display = "none";
        leftScore = 0;
        rightScore = 0;
    }

    if(rightScore == 10 || rightScore == 1 && impossible === true){
        endScreen.style.display = "flex";
        youWin.style.display = "inline";
        gameScreen.style.display = "none";
        leftScore = 0;
        rightScore = 0;
    }
}

function homeFunction(){
    endScreen.style.display = "none";
    startScreen.style.display = "flex";
    youLose.style.display = "none";
    youWin.style.display = "none";
}

window.addEventListener("resize", resize);

function resize() {
    x = window.innerWidth;
    y = window.innerHeight;

    canvas.height = y;
    canvas.width = x;

    context.scale(canvas.width / x, canvas.height / y);
    mainLoop();
}

function mainLoop() {
    gameOver();
    scoreBoard();
    leftMovement();
    ballMovement();
    rightMovement();

    pressEnter.style.left = x/2 - 72.75 + "px";
    startGameButton.style.left = x/2 - 120 + "px";

    canvas.width = x;
    canvas.height = y;

    if (x >= y) {
        c.beginPath();
        c.setLineDash([7, 7]);
        c.moveTo(x/2, 0);
        c.lineTo(x/2, y);
        c.strokeStyle = "white";
        c.stroke();
    
        c.beginPath();
        c.setLineDash([0,0]);
        c.strokeStyle = "#333"
        c.lineWidth = 3;
        c.arc(ballX, ballY, 17, 0, 2 * Math.PI);
        c.fillStyle = "white";
        c.fill();
        c.stroke();
    
        c.beginPath();
        c.rect(x/50, leftY, 20, y/5);
        c.rect(x - x/50 - 20, rightY, 20, y/5);
        c.fill();
        c.stroke();
    } else {
        c.beginPath();
        c.setLineDash([7, 7]);
        c.moveTo(0, y/2);
        c.lineTo(x, y/2);
        c.strokeStyle = "white";
        c.stroke();
    
        c.beginPath();
        c.setLineDash([0,0]);
        c.strokeStyle = "#333"
        c.lineWidth = 3;
        c.arc(ballX, ballY, 17, 0, 2 * Math.PI);
        c.fillStyle = "white";
        c.fill();
        c.stroke();
        
        c.beginPath();
        c.rect(leftX, y/50, x/5, 20);
        c.rect(rightX, y - y/50 - 20, x/5, 20);
        c.fill();
        c.stroke();
    }
}

setInterval(mainLoop, 1);

document.addEventListener('touchstart', handleTouchEvent);
document.addEventListener('touchmove', handleTouchEvent);
document.addEventListener('touchend', handleTouchEvent);
document.addEventListener('touchcancel', handleTouchEvent);

function handleTouchEvent(e) {
    if (e.touches.length === 0 ) return;
    e.preventDefault();
    e.stopPropagation();
    var touch = e.touches[0];

    if (x >= y) {
        if(touchMode === true && gameScreen.style.display === "flex" && 0 <= touch.pageY - y/10 && touch.pageY - y/10 <= y - y/5 && pause === false){
            rightY = touch.pageY - y/10;
        }
    } else {
        if(touchMode === true && gameScreen.style.display === "flex" && 0 <= touch.pagetX - x/10 && touch.pageX - x/10 <= x - x/5 && pause === false){
            rightX = touch.pageX - x/10;
        }
    }
}
