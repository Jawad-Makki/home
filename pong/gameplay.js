//
// Author: Jawad Makki
//
// Purpose: To control the game
//

/////////////////// Getting elements as constants ///////////////////

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
const leftScoreHeader = document.querySelector(".left-score");
const rightScoreHeader = document.querySelector(".right-score");

const pauseButton = document.querySelector(".pause-button");
const pressEnter = document.querySelector(".press-enter");
const startGameButton = document.querySelector(".start-game-button");
const winOrLose = document.querySelector(".win-or-lose");
    
/////////////////// Defining Variables ///////////////////

// Boolean for whether or not the ball is "dead"
var isDead = true;

// Boolean for whether or not the game is in play
var playingGame = false;

// Boolean for whether or not the game is paused
var pause = false;

// Dimensions of the window
var y = window.innerHeight;
var x = window.innerWidth;
var widescreen = true;

// Position of the right paddle
var rightY = y/2 - y/10;
var rightX = x - x/50 - 20;

// Position of the left paddle
var leftY = y/2 - y/10;
var leftX = x/50;

// Position of the ball
var ballX = x/2;
var ballY = y/2;

// Directions of travel
var initialAngle = 0;
var initialDir = 0;
var xDir = 0;
var yDir = 0;
var yInc = 0;

// Scores
var leftScore = 0;
var rightScore = 0;

// Different speeds
var leftSpeed;
var rightSpeed;
var ballSpeed;

// Booleans for if the arrow keys are held or not
var upIsHeld = false;
var downIsHeld = false;

/////////////////// The Functions ///////////////////

// Start of the Game //

function mainLoop () {
    
    // Setting the canvas (ball, paddles, and center line)
    setCanvas();
    widescreen = true;
    
    if (x < y) {
        x = window.innerHeight;
        y = window.innerWidth;
        widescreen = false;
    }

    // Updating the scoreboard
    scoreBoard();

    // Updating the position of the ball
    ballPosition();

    // Updating the position of the right paddle
    rightPaddlePosition();

    // Updating the position of the left paddle
    leftPaddlePosition();

    // If the game is over
    if (leftScore == 10 || (rightScore == 1 && impossible == true) || rightScore == 10) {
        // Determining if game is won or lost
        gameOver();
        
        // Displaying the endscreen (function is in display.js)
        displayEndScreen(); 
    }
}

// Setting a variable for when the previous run of code was
let lastTime;
var fpsInterval = 1000 / 60;

function playAnimation (time) {
    // Only runs if last time exists
    if (lastTime != null) {
        // Change in time since code ran
        const delta = time - lastTime;
            
        if (delta > fpsInterval) {
            delta == fpsInterval;
        }
        
        // Setting speeds
        rightSpeed = 0.6 * delta * y / 617;
        leftSpeed = 0.25 * delta * y / 617;

        ballSpeed = 0.65 * delta * x / 1366; 

        if (hard)
            ballSpeed = 0.85 * delta * x / 1366; 

        if (impossible)
            ballSpeed = delta * x / 1366;

        // Executing game loop
        mainLoop();
    }

    lastTime = time;

    // Running animation whitin itself to create a loop
    window.requestAnimationFrame(playAnimation);
}
window.requestAnimationFrame(playAnimation);


// End of the Game //


// Start of Game Setup //

// Gets a random number between a given minimum and maximum (inclusive)
function randomNumber (min, max) {
    return Math.random() * (max - min) + min;
}

// Randomly returns either negative 1 or positive 1
function randomSign () {
    let randomNum = Math.floor(Math.random() * 2); // either gives 0 or 1

    if (randomNum == 0)
        return -1;

    else
        return 1;
}

// Setting up the beginning of the game
function startGame () {
    // Displaying the ball in the correct position
    ballX = x/2;
    ballY = y/2;

    // Stopping the display of the buttons to start the game
    pressEnter.style.display = "none";
    startGameButton.style.display = "none";

    // Setting the initial direction of the ball
    initialAngle = randomNumber(-1 * Math.PI / 5, Math.PI / 5);
    initialDir = randomSign();

    if (widescreen) {
        xDir = initialDir * Math.cos(initialAngle);
        yDir = Math.sin(initialAngle);
    }

    else {
        xDir = initialDir * Math.cos(initialAngle);
        yDir = Math.sin(initialAngle);
    }

    yInc = 0;

    // Setting booleans
    isDead = false;
}

// Resets variables back to original
function reset() {

    // Positions of objects
    rightY = y/2 - y/10;
    rightX = x - x/50 - 20;

    leftY = y/2 - y/10;
    leftX = x/50;

    ballX = x/2;
    ballY = y/2;

    // Directions of travel
    initialAngle = 0;
    initialDir = 0;
    xDir = 0;
    yDir = 0;
    yInc = 0;

    // Scores
    leftScore = 0;
    rightScore = 0;

    // Booleans
    isDead = true;
    playingGame = false;
    pause = false;

    pauseButton.innerHTML = `<i class="fas fa-pause"></i>`;
}

function scoreBoard () {

    // Adjusting the scores shown when someone scores
    if (ballX < 0) {
        isDead = true;
        rightScore++;
    } 
    
    if (ballX > x) {
        isDead = true;
        leftScore++;
    }

    leftScoreHeader.innerHTML = leftScore;
    rightScoreHeader.innerHTML = rightScore;
}

// Stops or continues the game when the player chooses
function pauseOrUnpause () {
    
    // If they are pausing the game
    if (pause == false) {
        pauseGame();
    }

    // If they are unpausing the game
    else if (pause == true && isDead == false) {
        pause = false;
        pauseButton.innerHTML = `<i class="fas fa-pause"></i>`;
    }
}

// Pauses the game
function pauseGame () {
    if (isDead == false) {
        pause = true;
        pauseButton.innerHTML = `<i class="fa-solid fa-play"></i>`
    }
}

// Determines if the game is won or lost
function gameOver () {

    // If they lost the game
    if (leftScore == 10) {
        winOrLose.innerHTML = "YOU LOSE";
    }

    // If they won the game
    else {
        winOrLose.innerHTML = "YOU WIN!!!";
    }

    // Resetting the scores
    leftScore = 0;
    rightScore = 0;
}

// Sets the canvas
function setCanvas () {

    // Redefines x and y
    x = window.innerWidth;
    y = window.innerHeight;

    // Makes the canvas the same size as the screen
    canvas.width = x;
    canvas.height = y;

    if (widescreen) {
        // Dashed line diving the two sides
        c.beginPath();
        c.setLineDash([7, 7]);
        c.moveTo(x/2, 0);
        c.lineTo(x/2, y);
        c.strokeStyle = "var(--regularColor)";
        c.stroke();
        
        // The ball
        c.beginPath();
        c.setLineDash([0,0]);
        c.strokeStyle = "#333"
        c.lineWidth = 3;
        c.arc(ballX, ballY, 17, 0, 2 * Math.PI);
        c.fillStyle = "white";
        c.fill();
        c.stroke();

        // The paddles
        c.beginPath();
        c.rect(leftX, leftY, 20, y/5);
        c.rect(rightX, rightY, 20, y/5);
        c.fill();
        c.stroke();
    } 
   
    else {
        // Dashed line
        c.beginPath();
        c.setLineDash([7, 7]);
        c.moveTo(0, y/2);
        c.lineTo(x, y/2);
        c.strokeStyle = "var(--regularColor)";
        c.stroke();

        // The ball
        c.beginPath();
        c.setLineDash([0,0]);
        c.strokeStyle = "#333"
        c.lineWidth = 3;
        c.arc(ballY, ballX, 17, 0, 2 * Math.PI);
        c.fillStyle = "white";
        c.fill();
        c.stroke();
        
        // Paddles
        c.beginPath();
        c.rect(leftY, leftX, x/5, 20);
        c.rect(rightY, rightX, x/5, 20);
        c.fill();
        c.stroke();
    }
}

// End of Game Setup //


// Start of Event Listeners //

// The mouse controls
document.addEventListener ("mousemove", (e) => {
    
    // If the game is in play, then the right/bottom paddle follows the mouse cursor
    if (mouse == false || isDead == true || pause == true)
        return;

    if (widescreen == true && 0 <= e.clientY - y/10 && e.clientY - y/10 <= y - y/5) {
        rightY = e.clientY - y/10;
    }

    else if (widescreen == false && 0 <= e.clientX - y/10 && e.clientX - y/10 <= y - y/5) {
        rightY = e.clientX - y/10;
    }
});

// If a key is pressed down
document.addEventListener ("keydown", (e) => {
    
    if (playingGame == false)
        return;

    // If the enter key is pressed to start the game
    if (e.key == "Enter" && isDead == true && keys == true) {
        startGame();
    }
    
    // If the spacebar is pressed to pause the game
    if (e.key == " " && isDead == false) {
        pauseOrUnpause();
    }
    
    // Changing the arrow key booleans to say that they are pressed down
    if (keys == false)
        return; // Making sure keys mode is on

    // Changing up/down/left/right booleans
    if (e.key == "ArrowDown" || e.key == "ArrowRight") {
        downIsHeld = true;
    }

    if (e.key == "ArrowUp" || e.key == "ArrowLeft") {
        upIsHeld = true;
    }
});

// If an arrow key is released, it changes the booleans back to false to say they are not held down
document.addEventListener ("keyup", (e) => {
    if (keys == false)
        return; // Making sure keys mode is on
    
    // Changing up/down/left/right booleans
    if (e.key == "ArrowDown" || e.key == "ArrowRight") {
        downIsHeld = false;
    }

    if (e.key == "ArrowUp" || e.key == "ArrowLeft") {
        upIsHeld = false;
    }
});

// For touchscreen controls
document.addEventListener('touchstart', handleTouchEvent);
document.addEventListener('touchmove', handleTouchEvent);
document.addEventListener('touchend', handleTouchEvent);
document.addEventListener('touchcancel', handleTouchEvent);

function handleTouchEvent(e) {
    if (e.touches.length == 0 || touchMode == false || playingGame == false || pause == true) 
        return;
    
    e.stopPropagation();
    var touch = e.touches[0];

    if (widescreen == true && 0 <= touch.pageY - y/10 && touch.pageY - y/10 <= y - y/5) {
        rightY = touch.pageY - y/10;
    }

    else if (widescreen == false && 0 <= touch.pageX - y/10 && touch.pageX - y/10 <= y - y/5) {
        rightY = touch.pageX - y/10;
    }
}

// End of Event Listeners //


// Start of Movement Functions //

// Moves the right paddle when keys are held
function moveRightPaddle () {
    if (downIsHeld == true && rightY <= y - y/5) {
        rightY += rightSpeed;
    }
    
    if (upIsHeld == true && rightY >= 0) {
        rightY -= rightSpeed;
    }
}

// Controlling the position of the right paddle
function rightPaddlePosition () {
    if (keys == true) {
        rightX = x - x/50 - 20; 

        if (isDead == false) {
            moveRightPaddle();
        }
        
        if (isDead == true) {
            rightY = y/2 - y/10;
        }
    }
}

// The ball movement
function moveBall () {

    // If the ball hits the top of the screen
    if (ballY - 17 < 0 && yDir * ballSpeed + yInc < 0) {
        yDir *= -1;
        yInc *= -1;
    }

    // If the ball hits the bottom of the screen
    else if (ballY + 17 > y && yDir * ballSpeed + yInc > 0) {
        yDir *= -1;
        yInc *= -1;
    }
    
    // If the ball hits the opponent's paddle
    if (xDir < 0 && x/50 < ballX - 17 && ballX - 17 < x/50 + 20 
        && leftY < ballY + 17 && ballY - 17 < leftY + y/5) {
            
        xDir *= -1;
    }
    
    // If the ball hits the player's paddle
    if (rightX < ballX + 17 && ballX + 17 < rightX + 20 && 
        rightY < ballY + 17 && ballY - 17 < rightY + y/5 && xDir > 0) {
        
        xDir *= -1;
        
        // high hit
        if (rightY < ballY + 17 && ballY - 17 < rightY + y/10) {
            yInc -= 1;
        }

        // middle hit
        if (rightY + y/10 < ballY + 17 && ballY - 17 < rightY + y/10) {
            // y direction doesn't change
        }
        
        // low hit
        if (rightY + y/10 < ballY + 17 && ballY - 17 < rightY + y/5) {
            yInc += 1;
        }
    }
}

// Controlling the position of the ball
function ballPosition () {  

    // Maintains the balls position in the center of the screen if the game is not in play
    if (isDead == true) {
        if (keys == true) {
            pressEnter.style.display = "inline";
        }
    
        if (mouse == true || touchMode == true) {
            startGameButton.style.display = "inline";
        }

        ballX = x/2;
        ballY = y/2;
    }

    // Moves the ball if the game is in play
    if (isDead == false && pause == false) {
        moveBall();

        ballX += xDir * ballSpeed;
        ballY += yDir * ballSpeed + yInc;
    }
}

// Moves the left paddle based on the speed depending on the difficulty 
function moveLeftPaddle (LeftPaddleSpeed) {
    
    if (xDir > 0)
        return;

    // Move up
    if (ballY < leftY + y/10 && leftY > 0) {
        leftY -= LeftPaddleSpeed;
    }

    // Move down
    if (ballY > leftY + y/10 && leftY + y/5 < y) {
        leftY += LeftPaddleSpeed;
    }
}

// Controlling the position of the left paddle
function leftPaddlePosition () {
    
    // The resetting of the paddle position when the game is lost
    if (isDead == true) {
        leftY = y/2 - y/10;

        return;
    }

    // Make sure game isn't paused
    if (pause == true)
        return;

    // If easy mode, speed is slow
    if (easy == true && ballX < 2*x/5) {
        moveLeftPaddle(leftSpeed);
    }

    // If medium mode, speed is normal
    else if (medium == true && ballX < x/3) {
        moveLeftPaddle(leftSpeed * 1.5);
    }

    // If hard mode, speed is high
    else if (hard == true && ballX < x/2) {
        moveLeftPaddle(leftSpeed * 1.8);
    }

    // If impossible mode, speed is highest
    else if (impossible == true && ballX < x/2) {
        moveLeftPaddle(leftSpeed * 3); 
    }
}

// End of Movement Functions //