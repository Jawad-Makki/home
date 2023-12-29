
// TODO:
//
// add typing to move
// add settings
//
// Long term ideas:
//
// add time options
// make two turn chess
// make the ability to play with people online
// make chess AI
//

var board;

var boardStartX;
var boardStartY;
var squareLength;

var held = null;
var mouseX;
var mouseY;
var initialPositionX;
var initialPositionY;

var oldRow;
var oldColumn;
var oldSquare;
var newColumn;
var newRow;

var flipped = false;
var checked = false;
var mouseDown = false;
var clicked = false;
var turn = 0;
var boardCache = new Map();
var pieceTakenCache = new Map();

var promoting = false;
var promoteRow;
var promoteColumn;
var promoteColor;

window.addEventListener("load", reset);
window.addEventListener("resize", setScreenDimensions);
window.addEventListener("mousedown", selectPiece);
window.addEventListener("mousemove", dragPiece);
window.addEventListener("mouseup", releasePiece);

window.addEventListener("touchstart", (e) => {
    if (e.touches.length == 1) {
        selectPiece(e.touches[0]);
    }
});

window.addEventListener("touchmove", (e) => {
    if (e.touches.length == 1) {
        dragPiece(e.touches[0]);
    }
});

window.addEventListener("touchend", (e) => {
    if (e.changedTouches.length == 1) {
        releasePiece(e.changedTouches[0]);
    }
});

window.addEventListener("keydown", (e) => {
    if (e.key == "ArrowLeft") {
        previousMove();
    } else if (e.key == "ArrowRight") {
        nextMove();
    }
});

// resets the game
function reset () {
    setScreenDimensions();
    board = new ChessBoard();

    board.addPiece(7, 0, "white", "rook");
    board.addPiece(7, 1, "white", "knight");
    board.addPiece(7, 2, "white", "bishop");
    board.addPiece(7, 3, "white", "queen");
    board.addPiece(7, 4, "white", "king");
    board.addPiece(7, 5, "white", "bishop");
    board.addPiece(7, 6, "white", "knight");
    board.addPiece(7, 7, "white", "rook");

    for (i = 0; i < 8; i++) {
        board.addPiece(6, i, "white", "pawn");
    }

    board.addPiece(0, 0, "black", "rook");
    board.addPiece(0, 1, "black", "knight");
    board.addPiece(0, 2, "black", "bishop");
    board.addPiece(0, 3, "black", "queen");
    board.addPiece(0, 4, "black", "king");
    board.addPiece(0, 5, "black", "bishop");
    board.addPiece(0, 6, "black", "knight");
    board.addPiece(0, 7, "black", "rook");

    for (i = 0; i < 8; i++) {
        board.addPiece(1, i, "black", "pawn");
    }

    checked = false;
    mouseDown = false;
    clicked = false;
    turn = 0;
    promoting = false;
    boardCache = new Map();
    boardCache.set(turn, new ChessBoard(board));
    pieceTakenCache.set(turn, true);
    gameOverBanner.style.display = "none";
    updateBoard();
}

// adjusts the dimensions of the screen and board when the website is loaded or when it's size changes
function setScreenDimensions () {

    var screenWidth = window.innerWidth;
    var screenHeight = window.innerHeight;

    var boardLength = 0.88 * Math.min(screenHeight, screenWidth) + 16;
    squareLength = boardLength / 8;

    boardStartX = 0.5 * (screenWidth - boardLength);

    if (promoteOptionsWhite.style.display == "flex") {
        promoteOptionsWhite.style.left = squareLength * newColumn * 0.78  + "px";
    } else if (promoteOptionsBlack.style.display == "flex") {
        promoteOptionsBlack.style.left = squareLength * newColumn * 0.78  + "px";
    }
}

// makes the displayed board up to date with the internal representation of it
function updateBoard () {

    for (i = 0; i < 8; i++) {
        for (j = 0; j < 8; j++) {

            if (!board.containsPiece(i, j)) {
                squareArray[flipIndex(i)][flipIndex(j)].innerHTML = null;
            }

            else {
                squareArray[flipIndex(i)][flipIndex(j)].innerHTML = getImage(board.getPiece(i, j).getType(), board.getPiece(i, j).getColor());
            }
        }
    }

    makeSelectableOnTurn();
    flashCheckedKingRed();
}

// picks up a piece to be moved
function selectPiece (e) {

    mouseDown = true;

    if (!e.target.classList.contains("piece") || promoting == true || e.target.style.cursor != "pointer") {
        return;
    }

    if (held != null && e.target.className != held.className) {
        clicked = true;
        return;
    }

    
    held = e.target;
    oldSquare = held.parentNode;

    initialPositionX = e.clientX;
    initialPositionY = e.clientY;
    
    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
            if (oldSquare == squareArray[i][j]) {
                oldRow = flipIndex(i);
                oldColumn = flipIndex(j);
                break;
            }
        }
    }

    e.target.style.zIndex = "1";
}

// makes the piece follow the cursor after being picked up
function dragPiece (e) {
    if (held == null) {
        return;
    }
    
    if (mouseDown) {
        held.style.opacity = "1";
        clicked = false;
    }
    
    mouseX = e.clientX - initialPositionX;
    mouseY = e.clientY - initialPositionY;

    held.style.left = mouseX + "px";
    held.style.top = mouseY + "px";
}

// attempts to place the piece where it was dropped
function releasePiece (e) {
    
    mouseDown = false;
    
    if (held == null) {
        return;
    }
    
    // sets the new position
    if (clicked) {
        for (var i = 0; i < 8; i++) {
            for (var j = 0; j < 8; j++) {
                if ((e.target.classList.contains("piece") && e.target.parentNode == squareArray[i][j])
                    || (e.target.classList.contains("square") && e.target == squareArray[i][j])) {
                    newRow = flipIndex(i);
                    newColumn = flipIndex(j);
                    clicked = false;
                    break;
                }
            }
        }
    } else {
        mouseX = e.clientX - initialPositionX;
        mouseY = e.clientY - initialPositionY;
        newColumn = oldColumn + Math.round(mouseX / squareLength) * flipDirection();
        newRow = oldRow + Math.round(mouseY / squareLength) * flipDirection();
    }

    if ((newRow >= 0 && newRow < 8 && newColumn >= 0 && newColumn < 8) 
        && ((turn % 2 == 0 && board.getPiece(oldRow, oldColumn).getColor() == "white")
            || (turn % 2 != 0 && board.getPiece(oldRow, oldColumn).getColor() == "black"))) {
    
        // to prevent held being set back to null if moving via clicking instead of dragging
        if (newRow == oldRow && newColumn == oldColumn) {
            held.style.left = 0;
            held.style.top = 0;
            held.style.zIndex = "auto";
            updateBoard();
            oldSquare.firstElementChild.style.opacity = "0.8";
            clicked = true;
            return;
        }

        if (board.movePiece(oldRow, oldColumn, newRow, newColumn, true) || board.overrides) {

            // white promotion
            if (newRow == 0 && board.containsPiece(newRow, newColumn) 
                && board.getPiece(newRow, newColumn).getType() == "pawn" 
                && board.getPiece(newRow, newColumn).getColor() == "white") {
                promoteOptionsWhite.style.display = "flex";
                promoteOptionsWhite.style.left = squareLength * newColumn * 0.78  + "px";
                promoting = true;
                promoteRow = newRow;
                promoteColumn = newColumn;
                promoteColor = "white";
            }

            // black promotion
            else if (newRow == 7 && board.containsPiece(newRow, newColumn) 
                    && board.getPiece(newRow, newColumn).getType() == "pawn" 
                    && board.getPiece(newRow, newColumn).getColor() == "black") {
                promoteOptionsBlack.style.display = "flex";
                promoteOptionsBlack.style.left = squareLength * newColumn * 0.78 + "px";
                promoting = true;
                promoteRow = newRow;
                promoteColumn = newColumn;
                promoteColor = "black";
            }

            board.overrides = false;
            turn++;

            if (board.pieceTaken) {
                board.pieceTaken = false;
                pieceTakenCache.set(turn, true);
            } else {
                pieceTakenCache.set(turn, false);
            }

            boardCache.set(turn, new ChessBoard(board));
    
            // checks if the player who just moved is in check - if so then it undoes the move.
            if ((turn % 2 == 0 && board.checkIfInCheck("black")) || (turn % 2 == 1 && board.checkIfInCheck("white"))) {
                boardCache.delete(turn);
                pieceTakenCache.delete(turn);
                turn--;
                board = new ChessBoard(boardCache.get(turn));
                checked = true;
            } else {
                checkForMates();
                
                var index = turn + 1;
                while (boardCache.has(index)) {
                    boardCache.delete(index);
                    pieceTakenCache.delete(index);
                    index++;
                }
            }
        }
    }

    held.style.left = 0;
    held.style.top = 0;
    held.style.zIndex = "auto";
    held = null;
    updateBoard();
}

// checks if the board is in checkmate, stalemate, check, or a draw by various methods
function checkForMates () {
    // checks if the player who goes next is in checkmate
    if ((turn % 2 == 0 && board.checkIfInStalemate("white") && board.checkIfInCheck("white")) 
            || (turn % 2 == 1 && board.checkIfInStalemate("black") && board.checkIfInCheck("black"))) {
        gameOver("Checkmate!");
    }

    // checks if the player who goes next is in check (not a mate)
    else if ((turn % 2 == 0 && board.checkIfInCheck("white")) || (turn % 2 == 1 && board.checkIfInCheck("black"))) {
        checked = true;
    }

    // checks if the player who goes next is in stalemate
    else if ((turn % 2 == 0 && board.checkIfInStalemate("white")) || (turn % 2 == 1 && board.checkIfInStalemate("black"))) {
        gameOver("Stalemate!");
    }

    // checks if there is a draw by repetition
    else if (turn > 8 && boardCache.get(turn).equals(boardCache.get(turn - 4)) 
            && boardCache.get(turn - 4).equals(boardCache.get(turn - 8))) {
        gameOver("Draw by repetition!");
    }

    // checks if there is a draw by 50 moves
    else if (turn - lastTurnWithTakenPiece() > 100) {
        gameOver("Draw by 50 moves!");
    }

    // checks if there is a draw by lack of material
    else if (onlyKings()) {
        gameOver("Draw by lack of material!");
    }
}

// returns true if there are only the kings on the board, false otherwise.
function onlyKings () {
    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
            if (board.containsPiece(i, j) && board.getPiece(i, j).getType() != "king") {
                return false;
            }
        }
    }

    return true;
}

// goes to the previous move of the current game if there is one
function previousMove () {
    if (turn > 0) {
        turn--;
        board = new ChessBoard(boardCache.get(turn));
        updateBoard();
    }
}

// goes to the next move of the current game if there is one
function nextMove () {
    if (boardCache.has(turn + 1)) {
        turn++;
        board = new ChessBoard(boardCache.get(turn));
        updateBoard();
    }
}

// displays the banner that says the game is over and displays a given message
function gameOver (message) {
    gameOverBanner.innerHTML = message;
    gameOverBanner.style.display = "flex";
}

// for promoting a pawn to a chosen piece
function chosePiece (chosenPiece) {
    board.addPiece(promoteRow, promoteColumn, promoteColor, chosenPiece);
    promoteOptionsWhite.style.display = "none";
    promoteOptionsBlack.style.display = "none";
    promoting = false;
    boardCache.set(turn, new ChessBoard(board));
    updateBoard();
}

// finds the last turn (including the one that just happened) that a piece was taken
function lastTurnWithTakenPiece () {
    for (var index = turn; index >= 0; index--) {
        if (pieceTakenCache.get(index)) {
            return index;
        }
    }

    return 0;
}

function flashCheckedKingRed () {

    if (!checked) {
        return;
    }

    var kingRow;
    var kingColumn;
    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
            if (board.containsPiece(i, j) && board.getPiece(i, j).getType() == "king"
                && ((turn % 2 == 0 && board.getPiece(i, j).getColor() == "white") 
                    || (turn % 2 == 1 && board.getPiece(i, j).getColor() == "black"))) {
                kingRow = flipIndex(i);
                kingColumn = flipIndex(j);
                break;
            }
        }
    }
    
    if (squareArray[kingRow][kingColumn].classList.contains("squareW")) {
        squareArray[kingRow][kingColumn].style.animation = "flash-red-white-square 0.4s linear 0s 2 normal";
    } else {
        squareArray[kingRow][kingColumn].style.animation = "flash-red-black-square 0.4s linear 0s 2 normal";
    }
    
    checked = false;

    setTimeout(() => {
        squareArray[kingRow][kingColumn].style.animation = "none";
    }, 800);
}

function flipBoard () {
    flipped = !flipped;
    updateBoard();

    promoteOptionsWhite.style.top = "default";
    promoteOptionsWhite.style.bottom = squareLength * 1.75 + "px";
    promoteOptionsBlack.style.bottom = "default";
    promoteOptionsBlack.style.top = squareLength * 1.75 + "px";
}

function flipIndex (index) {
    if (flipped) {
        return 7 - index;
    }

    return index;
}

function flipDirection () {
    if (flipped) {
        return -1;
    } else {
        return 1;
    }
}