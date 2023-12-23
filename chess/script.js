
// TODO:
//
// add ability to change screen size mid-game.
// add check alerts
// add flipping the board
// add typing to move
// add time option?
// make 50 move draw work with the previous and next move functions (array/map to log the turns a piece was taken?)
// add settings
// add option to move via click-click
// add option to go back/forward moves with arrow keys
//
// make two turn chess?
//
// make the ability to play with people online?
//

var board;

var screenWidth;
var screenHeight;
var boardStartX;
var boardStartY;
var boardLength;
var squareLength;

var squarePositionsX = [];
var squarePositionsY = [];

var held = null;
var mouseX;
var mouseY;
var initialPositionX;
var initialPositionY;

var oldRow;
var oldColumn;
var newColumn;
var newRow;

var turn = 0;
var lastTurnWithTakenPiece = 0;
var boardCache = new Map();

promoting = false;
promoteRow = -1;
promoteColumn = -1;
promoteColor = null;

window.addEventListener("load", reset());
window.addEventListener("resize", setScreenDimensions());

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

    turn = 0;
    lastTurnWithTakenPiece = 0;
    promoting = false;
    promoteRow = -1;
    promoteColumn = -1;
    promoteColor = null;
    boardCache = new Map();
    boardCache.set(turn, new ChessBoard(board));
    gameOverBanner.style.display = "none";
    updateBoard();
}

function setScreenDimensions () {

    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;

    if (screenWidth >= screenHeight) {
        boardLength = 0.88 * screenHeight + 16;
    } else {
        boardLength = 0.88 * screenWidth + 16;
    }
    
    boardStartX = 0.5 * (screenWidth - boardLength);
    boardStartY = 0.5 * (screenHeight - boardLength);

    squareLength = boardLength / 8;

    for (i = 0; i < 8; i++) {
        squarePositionsX[i] = boardStartX + squareLength * (i + 0.5);
        squarePositionsY[i] = boardStartY + squareLength * (i + 0.5);
    }
}

function updateBoard () {
    for (i = 0; i < 8; i++) {
        for (j = 0; j < 8; j++) {

            if (!board.containsPiece(i, j)) {
                squareArray[i][j].innerHTML = null;
            }

            else {
                squareArray[i][j].innerHTML = getImage(board.getPiece(i, j).getType(), board.getPiece(i, j).getColor());
            }
        }
    }
}

window.addEventListener ("mousedown", (e) => {

    if (!e.target.classList.contains("piece") || promoting == true) {
        return;
    }

    held = e.target;

    initialPositionX = e.clientX;
    initialPositionY = e.clientY;

    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
            
            if (e.target.parentNode == squareArray[i][j]) {
                oldRow = i;
                oldColumn = j;
                break;
            }
        }
    }

    e.target.style.zIndex = "1";
});

window.addEventListener ("mousemove", (e) => {
    if (held == null || promoting == true) {
        return;
    }
    
    mouseX = e.clientX - initialPositionX;
    mouseY = e.clientY - initialPositionY;

    held.style.left = mouseX + "px";
    held.style.top = mouseY + "px";
})

window.addEventListener ("mouseup", (e) => {

    if (held == null || promoting == true) {
        return;
    }

    // sets the new position
    newRow = oldRow + Math.round(mouseY / squareLength);
    newColumn = oldColumn + Math.round(mouseX / squareLength);

    if ((newRow >= 0 && newRow < 8 && newColumn >= 0 && newColumn < 8) 
        && ((turn % 2 == 0 && board.getPiece(oldRow, oldColumn).getColor() == "white")
        || (turn % 2 != 0 && board.getPiece(oldRow, oldColumn).getColor() == "black"))) {
        
        if (board.movePiece(oldRow, oldColumn, newRow, newColumn, true) || board.overrides) {

            // white promotion
            if (newRow == 0 && board.containsPiece(newRow, newColumn) 
                && board.getPiece(newRow, newColumn).getType() == "pawn" 
                && board.getPiece(newRow, newColumn).getColor() == "white") {
                promoteOptionsWhite.style.display = "flex";
                promoteOptionsWhite.style.left = boardStartX + squareLength * newColumn + "px";
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
                promoteOptionsBlack.style.left = boardStartX + squareLength * newColumn + "px";
                promoting = true;
                promoteRow = newRow;
                promoteColumn = newColumn;
                promoteColor = "black";
            }

            board.overrides = false;
            turn++;

            if (board.pieceTaken) {
                board.pieceTaken = false;
                lastTurnWithTakenPiece = turn;
            }

            boardCache.set(turn, new ChessBoard(board));
    
            // checks if the player who just moved is in check - if so then it undoes the move.
            if ((turn % 2 == 0 && board.checkIfInCheck("black")) || (turn % 2 == 1 && board.checkIfInCheck("white"))) {
                boardCache.delete(turn);
                turn--;
                board = new ChessBoard(boardCache.get(turn));
            } else {
                checkForMates();
            }   
        }
    }

    held.style.left = 0;
    held.style.top = 0;
    held.style.zIndex = "auto";
    held = null;
    updateBoard();
});

function checkForMates () {
    // checks if the player who goes next is in checkmate
    if ((turn % 2 == 0 && board.checkIfInStalemate("white") && board.checkIfInCheck("white")) 
            || (turn % 2 == 1 && board.checkIfInStalemate("black") && board.checkIfInCheck("black"))) {
        gameOver("Checkmate!");
    }

    // checks if the player who goes next is in check (not a mate)
    else if ((turn % 2 == 0 && board.checkIfInCheck("white")) || (turn % 2 == 1 && board.checkIfInCheck("black"))) {
        console.log("check!");
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
    else if (turn - lastTurnWithTakenPiece > 100) {
        gameOver("Draw by 50 moves!");
    }

    // checks if there is a draw by lack of material
    else if (onlyKings()) {
        gameOver("Draw by lack of material!");
    }
}

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

function previousMove () {
    if (turn > 0) {
        turn--;
        board = new ChessBoard(boardCache.get(turn));
        updateBoard();
    }
}

function nextMove () {
    if (boardCache.has(turn + 1)) {
        turn++;
        board = new ChessBoard(boardCache.get(turn));
        updateBoard();
    }
}

function gameOver (message) {
    gameOverBanner.innerHTML = message;
    gameOverBanner.style.display = "flex";
}

function chosePiece (chosenPiece) {
    board.addPiece(promoteRow, promoteColumn, promoteColor, chosenPiece);

    promoteOptionsWhite.style.display = "none";
    promoteOptionsBlack.style.display = "none";
    promoting = false;
    boardCache.set(turn, new ChessBoard(board));
    updateBoard();
}