
const gameOverBanner = document.getElementById("game-over-banner");

const rookAB = document.getElementById("rookAB");
const knightBB = document.getElementById("knightBB");
const bishopCB = document.getElementById("bishopCB");
const queenB = document.getElementById("queenB");
const kingB = document.getElementById("kingB");
const bishopFB = document.getElementById("bishopFB");
const knightGB = document.getElementById("knightGB");
const rookHB = document.getElementById("rookHB");
const pawnAB = document.getElementById("pawnAB");
const pawnBB = document.getElementById("pawnBB");
const pawnCB = document.getElementById("pawnCB");
const pawnDB = document.getElementById("pawnDB");
const pawnEB = document.getElementById("pawnEB");
const pawnFB = document.getElementById("pawnFB");
const pawnGB = document.getElementById("pawnGB");
const pawnHB = document.getElementById("pawnHB");
const rookAW = document.getElementById("rookAW");
const knightBW = document.getElementById("knightBW");
const bishopCW = document.getElementById("bishopCW");
const queenW = document.getElementById("queenW");
const kingW = document.getElementById("kingW");
const bishopFW = document.getElementById("bishopFW");
const knightGW = document.getElementById("knightGW");
const rookHW = document.getElementById("rookHW");
const pawnAW = document.getElementById("pawnAW");
const pawnBW = document.getElementById("pawnBW");
const pawnCW = document.getElementById("pawnCW");
const pawnDW = document.getElementById("pawnDW");
const pawnEW = document.getElementById("pawnEW");
const pawnFW = document.getElementById("pawnFW");
const pawnGW = document.getElementById("pawnGW");
const pawnHW = document.getElementById("pawnHW");

const pieceArray = [
    rookAB, knightBB, bishopCB, queenB, kingB, bishopFB, knightGB, rookHB,
    pawnAB, pawnBB, pawnCB, pawnDB, pawnEB, pawnFB, pawnGB, pawnHB, 
    pawnAW, pawnBW, pawnCW, pawnDW, pawnEW, pawnFW, pawnGW, pawnHW, 
    rookAW, knightBW, bishopCW, queenW, kingW, bishopFW, knightGW, rookHW, 
];

const A8 = document.getElementById("A8");
const B8 = document.getElementById("B8");
const C8 = document.getElementById("C8");
const D8 = document.getElementById("D8");
const E8 = document.getElementById("E8");
const F8 = document.getElementById("F8");
const G8 = document.getElementById("G8");
const H8 = document.getElementById("H8");
const A7 = document.getElementById("A7");
const B7 = document.getElementById("B7");
const C7 = document.getElementById("C7");
const D7 = document.getElementById("D7");
const E7 = document.getElementById("E7");
const F7 = document.getElementById("F7");
const G7 = document.getElementById("G7");
const H7 = document.getElementById("H7");
const A6 = document.getElementById("A6");
const B6 = document.getElementById("B6");
const C6 = document.getElementById("C6");
const D6 = document.getElementById("D6");
const E6 = document.getElementById("E6");
const F6 = document.getElementById("F6");
const G6 = document.getElementById("G6");
const H6 = document.getElementById("H6");
const A5 = document.getElementById("A5");
const B5 = document.getElementById("B5");
const C5 = document.getElementById("C5");
const D5 = document.getElementById("D5");
const E5 = document.getElementById("E5");
const F5 = document.getElementById("F5");
const G5 = document.getElementById("G5");
const H5 = document.getElementById("H5");
const A4 = document.getElementById("A4");
const B4 = document.getElementById("B4");
const C4 = document.getElementById("C4");
const D4 = document.getElementById("D4");
const E4 = document.getElementById("E4");
const F4 = document.getElementById("F4");
const G4 = document.getElementById("G4");
const H4 = document.getElementById("H4");
const A3 = document.getElementById("A3");
const B3 = document.getElementById("B3");
const C3 = document.getElementById("C3");
const D3 = document.getElementById("D3");
const E3 = document.getElementById("E3");
const F3 = document.getElementById("F3");
const G3 = document.getElementById("G3");
const H3 = document.getElementById("H3");
const A2 = document.getElementById("A2");
const B2 = document.getElementById("B2");
const C2 = document.getElementById("C2");
const D2 = document.getElementById("D2");
const E2 = document.getElementById("E2");
const F2 = document.getElementById("F2");
const G2 = document.getElementById("G2");
const H2 = document.getElementById("H2");
const A1 = document.getElementById("A1");
const B1 = document.getElementById("B1");
const C1 = document.getElementById("C1");
const D1 = document.getElementById("D1");
const E1 = document.getElementById("E1");
const F1 = document.getElementById("F1");
const G1 = document.getElementById("G1");
const H1 = document.getElementById("H1");

const squareArray = [
    [A8, B8, C8, D8, E8, F8, G8, H8],
    [A7, B7, C7, D7, E7, F7, G7, H7],
    [A6, B6, C6, D6, E6, F6, G6, H6],
    [A5, B5, C5, D5, E5, F5, G5, H5],
    [A4, B4, C4, D4, E4, F4, G4, H4],
    [A3, B3, C3, D3, E3, F3, G3, H3],
    [A2, B2, C2, D2, E2, F2, G2, H2],
    [A1, B1, C1, D1, E1, F1, G1, H1],
];

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

var oldX;
var oldY;
var newX;
var newY;

var turnCount = 1;

var canShortCastleB = true;
var canLongCastleB = true;
var canShortCastleW = true;
var canLongCastleW = true;

var takenPiece;

window.addEventListener("load", setScreen());
window.addEventListener("resize", setScreen());

function setScreen () {

    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;

    if (screenWidth >= screenHeight)
        boardLength = 0.96 * screenHeight + 16;
    else
        boardLength = 0.96 * screenWidth + 16;
    
    boardStartX = 0.5 * (screenWidth - boardLength);
    boardStartY = 0.5 * (screenHeight - boardLength);

    squareLength = boardLength / 8;

    for (i = 0; i < 8; i++) {
        squarePositionsX[i] = boardStartX + squareLength * (i + 0.5);
        squarePositionsY[i] = boardStartY + squareLength * (i + 0.5);
    }
}

window.addEventListener ("mousedown", (e) => {
    for (i = 0; i < pieceArray.length; i++) {
        if (e.target == pieceArray[i])
            held = pieceArray[i];
    }

    if (held == null) {
        return;
    }

    initialPositionX = e.clientX;
    initialPositionY = e.clientY;

    var minDistance = screenWidth;
    var distance;

    for (i = 0; i < 8; i++) {
        for (j = 0; j < 8; j++) {
            distance = Math.sqrt(Math.pow(e.clientX - squarePositionsX[j], 2) + Math.pow(e.clientY - squarePositionsY[i], 2));
            
            if (distance < minDistance) {
                minDistance = distance;
                oldX = j;
                oldY = i;
            }
        }
    }

    e.target.style.zIndex = "1";
});

window.addEventListener ("mousemove", (e) => {
    if (held == null)
        return;
        
    for (i = 0; i < pieceArray.length; i++) {
        mouseX = e.clientX - initialPositionX;
        mouseY = e.clientY - initialPositionY;

        if (pieceArray[i] == held) {
            pieceArray[i].style.left = mouseX + "px";
            pieceArray[i].style.top = mouseY + "px";
        }
    }
})

window.addEventListener ("mouseup", (e) => {

    if (held == null)
        return;

    var minDistance = squareLength;
    var distance;

    for (i = 0; i < 8; i++) {
        for (j = 0; j < 8; j++) {
            distance = Math.sqrt(Math.pow(e.clientX - squarePositionsX[j], 2) + Math.pow(e.clientY - squarePositionsY[i], 2));
            
            if (distance < minDistance) {
                minDistance = distance;
                newX = j;
                newY = i;
            }
        }
    }

    if (checkTurn(e.target))
        checkIfLegalMove(e.target, true);
    
    if (checkIfInMate(e.target)) {
        gameOverBanner.style.display = "flex";
    }

    e.target.style.left = 0;
    e.target.style.top = 0;
    e.target.style.zIndex = "auto";
    held = null;
});

function checkIfLegalMove (target, actuallyHappening) {

    var newSquare = squareArray[newY][newX];
    var oldSquare = squareArray[oldY][oldX];

    if (oldSquare == newSquare) 
        return false;

    if (newSquare.firstElementChild != null) {
        takenPiece = newSquare.firstElementChild;
        var canTake = checkIfCanTake(target, newSquare);
        
        if (checkIfCanMove(target, newSquare) && canTake) {
            newSquare.firstElementChild.replaceWith(target);
            canTake = false;
        }
        
        else
            return false;
    }

    else if (checkIfCanMove(target, newSquare)) {
        takenPiece = null;
        newSquare.appendChild(target);
    }
    
    else
        return false;
    
    var tempX = newX;
    var tempY = newY;

    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
            if ((squareArray[i][j].firstElementChild == kingB || squareArray[i][j].firstElementChild == kingW) && squareArray[i][j].firstElementChild.className == target.className) {
                
                newY = i;
                newX = j;
                
                if (checkIfInCheck(target.className, squareArray[i][j])) {
                    oldSquare.appendChild(target);
                    if (takenPiece != null) {
                        newSquare.appendChild(takenPiece);
                        takenPiece = null;
                    }
                }

            }
        }
    }

    newX = tempX;
    newY = tempY;

    if (oldSquare.firstElementChild == target)
        return false;
    
    var dontChange = false;
    for (i = 8; i < 24; i++) {
        if (target == pieceArray[i]) {
            dontChange = true;
        }
    }

    if (!dontChange)
        enPassantSquare = null;

    if (actuallyHappening == true) {
        checkCastling(target);
        turnCount++;
    }

    return true;
}

function checkIfCanMove (target, newSquare) {

    var isAllowed;

    for (i = 8; i < 24; i++) {
        if (target == pieceArray[i]) {
            isAllowed = pawnMovement(target, newSquare);
        }
    }

    if (target == pieceArray[0] || target == pieceArray[7] || target == pieceArray[24] || target == pieceArray[31]) {
        isAllowed = rookMovement();
    }

    else if (target == pieceArray[1] || target == pieceArray[6] || target == pieceArray[25] || target == pieceArray[30]) {
        isAllowed = knightMovement();
    }

    else if (target == pieceArray[2] || target == pieceArray[5] || target == pieceArray[26] || target == pieceArray[29]) {
        isAllowed = bishopMovement();
    }

    else if (target == pieceArray[3] || target == pieceArray[27]) {
        isAllowed = queenMovement();
    }
    
    else if (target == pieceArray[4] || target == pieceArray[28]) {
        isAllowed = kingMovement(target, newSquare, true);
    }
        
    return isAllowed;
}

var enPassantPawn;
var enPassantSquare;
var pawnSquare;

function pawnMovement (target, newSquare) {
    
    var increment;
    var canMoveTwo = false;

    if (target.className == "pieceB")
        increment = 1;
    else
        increment = -1;
    
    // Checks if its a black pawn on its original square
    if (oldY == 1 && increment == 1) {
        canMoveTwo = true;
    }
    
    // Checks if its a white pawn on its original square
    else if (oldY == 6 && increment == -1) {
        canMoveTwo = true;
    }

    if (oldX == newX) {    
        if (newY - oldY == increment && newSquare.firstElementChild == null) {
            enPassantSquare = null;
            return true;
        }
         
        else if (newY - oldY == 2 * increment && canMoveTwo == true && squareArray[oldY + increment][oldX].firstElementChild == null && newSquare.firstElementChild == null) {
            enPassantPawn = target;
            pawnSquare = newSquare;
            enPassantSquare = squareArray[oldY + increment][oldX];
            return true;
        }
    }

    else if (Math.abs(newX - oldX) == 1 && newY - oldY == increment) {
        
        if (newSquare.firstElementChild != null && checkIfCanTake(target, newSquare)) {
            enPassantSquare = null;
            return true;
        }

        else if (newSquare.firstElementChild == null && enPassantSquare == newSquare) {
            enPassantSquare.appendChild(enPassantPawn);
            
            if (checkIfCanTake(target, newSquare)) {
                enPassantSquare.innerHTML = null;
                enPassantSquare = null;
                return true;
            }

            pawnSquare.appendChild(enPassantPawn);
        }
    }

    return false;
}

function rookMovement () {

    if (newX != oldX && newY != oldY)
        return false;

    var increment;

    if (newX > oldX || newY > oldY)
        increment = 1;
    else
        increment = -1;

    if (newX == oldX) {
        for (i = oldY + increment; i * increment < newY * increment; i += increment) {
            if (squareArray[i][oldX].firstElementChild != null)
                return false;
        }
    }

    else {
        for (i = oldX + increment; i * increment < newX * increment; i += increment) {
            if (squareArray[oldY][i].firstElementChild != null)
                return false; 
        }
    }

    return true;
}

function knightMovement () {
    if (Math.abs(newX - oldX) == 1 && Math.abs(newY - oldY) == 2)
        return true;

    else if (Math.abs(newX - oldX) == 2 && Math.abs(newY - oldY) == 1)
        return true;

    return false;
}

function bishopMovement () {
    if (Math.abs(newX - oldX) != Math.abs(newY - oldY))
        return false;

    var incrementX;
    var incrementY;

    if (newX > oldX)
        incrementX = 1;
    else
        incrementX = -1;

    if (newY > oldY)
        incrementY = 1;
    else 
        incrementY = -1;

    for (i = oldX + incrementX, j = oldY + incrementY; i * incrementX < newX * incrementX, j * incrementY < newY * incrementY; i += incrementX, j += incrementY) {
        if (squareArray[j][i].firstElementChild != null) {
            return false;
        }
    }
    
    return true;
}

function queenMovement () {
    if (newX == oldX || newY == oldY) {
        var increment;
    
        if (newX > oldX || newY > oldY)
            increment = 1;
        else
            increment = -1;
    
        if (newX == oldX) {
            for (i = oldY + increment; i * increment < newY * increment; i += increment) {
                if (squareArray[i][oldX].firstElementChild != null)
                    return false;
            }
        }
    
        else if (newY == oldY) {
            for (i = oldX + increment; i * increment < newX * increment; i += increment) {
                if (squareArray[oldY][i].firstElementChild != null)
                    return false; 
            }
        }

        return true;
    }

    else if (Math.abs(newX - oldX) == Math.abs(newY - oldY)) {
        var incrementX;
        var incrementY;

        if (newX > oldX)
            incrementX = 1;
        else
            incrementX = -1;

        if (newY > oldY)
            incrementY = 1;
        else 
            incrementY = -1;

        for (i = oldX + incrementX, j = oldY + incrementY; i * incrementX < newX * incrementX, j * incrementY < newY * incrementY; i += incrementX, j += incrementY) {
            if (squareArray[j][i].firstElementChild != null) {
                return false;
            }
        }

        return true;
    }

    return false;
}

function kingMovement (target, newSquare, isTheKingThatsMoving) {
    
    if (Math.abs(newY - oldY) > 1 || Math.abs(newX - oldX) > 2)
        return false;
    
    if (!isTheKingThatsMoving)
        return true;
    
    var wouldBeInCheck = false;
    var square;
    var rookSquare;
    var rook;
    var king;

    if (Math.abs(newX - oldX) == 2) {

        if (checkIfInCheck(target.className, squareArray[oldY][oldX]))
            return false;

        if (newX - oldX == -2 && target.className == "pieceB" && canLongCastleB && squareArray[oldY][oldX - 1].firstElementChild == null) {
            square = squareArray[oldY][oldX - 1];
            rookSquare = squareArray[oldY][oldX - 2];
            rook = rookAB;
            king = kingB;
        }

        else if (newX - oldX == 2 && target.className == "pieceB" && canShortCastleB && squareArray[oldY][oldX + 1].firstElementChild == null) {
            square = squareArray[oldY][oldX + 1];
            rookSquare = squareArray[oldY][oldX + 2];
            rook = rookHB;
            king = kingB;
        }

        else if (newX - oldX == -2 && target.className == "pieceW" && canLongCastleW && squareArray[oldY][oldX - 1].firstElementChild == null) {
            square = squareArray[oldY][oldX - 1];
            rookSquare = squareArray[oldY][oldX - 2];
            rook = rookAW;
            king = kingW;
        }

        else if (newX - oldX == 2 && target.className == "pieceW" && canShortCastleW && squareArray[oldY][oldX + 1].firstElementChild == null) {
            square = squareArray[oldY][oldX + 1];
            rookSquare = squareArray[oldY][oldX + 2];
            rook = rookHW;
            king = kingW;
        }
        
        else {
            return false;
        }
        
        square.appendChild(king);
        wouldBeInCheck = checkIfInCheck(king.className, square);
        square.innerHTML = null;

        if (wouldBeInCheck) {
            squareArray[oldY][oldX].appendChild(king);
            return false;
        }

        newSquare.appendChild(king);
        square.appendChild(rook);
        wouldBeInCheck = checkIfInCheck(king.className, newSquare);

        if (wouldBeInCheck) {
            squareArray[oldY][oldX].appendChild(king);
            rookSquare.appendChild(rook);
            return false;
        }

    }

    return true;
}

function checkIfCanTake (target, newSquare) {
    if (target.className == newSquare.firstElementChild.className)
        return false;

    return true;
}

function checkIfInCheck (kingClass, kingSquare) {
    var inCheck = false;

    var tempOldX = oldX;
    var tempOldY = oldY;
    var tempNewX = newX;
    var tempNewY = newY;

    for (var i0 = 0; i0 < 8; i0++) {
        for (var j0 = 0; j0 < 8; j0++) {
            if (squareArray[i0][j0] == kingSquare) {
                newY = i0;
                newX = j0;
            }
        }
    }

    for (var i1 = 0; i1 < 8; i1++) {
        for (var j1 = 0; j1 < 8; j1++) {
            if (squareArray[i1][j1].firstElementChild != null && squareArray[i1][j1].firstElementChild.className != kingClass) {
                oldY = i1;
                oldX = j1;
                
                if (squareArray[i1][j1].firstElementChild == kingW || squareArray[i1][j1].firstElementChild == kingB)
                    inCheck = kingMovement(squareArray[i1][j1].firstElementChild, kingSquare, false);
                
                else 
                    inCheck = checkIfCanMove(squareArray[i1][j1].firstElementChild, kingSquare);
            }

            if (inCheck) {
                oldX = tempOldX;
                oldY = tempOldY;
                newX = tempNewX;
                newY = tempNewY;
                return inCheck;
            }
        }
    }

    oldX = tempOldX;
    oldY = tempOldY;
    newX = tempNewX;
    newY = tempNewY;
    return inCheck;
}

function checkTurn (target) {
    if ((turnCount % 2 == 1 && target.className == "pieceW") || (turnCount % 2 == 0 && target.className == "pieceB")) 
        return true;
    
    return false;
}

function checkCastling (target) {
    if (target == kingB) {
        canLongCastleB = false;
        canShortCastleB = false;
    }

    else if (target == rookAB) {
        canLongCastleB = false;
    }

    else if (target == rookHB) {
        canShortCastleB = false;
    }

    else if (target == kingW) {
        canLongCastleW = false;
        canShortCastleW = false;
    }

    else if (target == rookAW) {
        canLongCastleW = false;
    }

    else if (target == rookHW) {
        canShortCastleW = false;
    }
}

function checkIfInMate (target) {

    var tempSquare = enPassantSquare;

    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {

            oldY = i;
            oldX = j;

            if (squareArray[i][j].firstElementChild != null && squareArray[i][j].firstElementChild.className != target.className) {
                for (var k = 0; k < 8; k++) {
                    for (var l = 0; l < 8; l++) {

                        enPassantSquare = tempSquare;
                        newY = k;
                        newX = l;

                        if (checkIfLegalMove(squareArray[i][j].firstElementChild, false)) {

                            squareArray[i][j].appendChild(squareArray[k][l].firstElementChild);
                            
                            if (takenPiece != null)
                                squareArray[k][l].appendChild(takenPiece);

                            return false;
                        }
                    }
                }
            }
        }
    }
    
    return true;
}