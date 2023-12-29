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

const gameOverBanner = document.getElementById("game-over-banner");
const promoteOptionsWhite = document.getElementById("promote-options-white");
const promoteOptionsBlack = document.getElementById("promote-options-black");
const whiteSquares = document.getElementsByClassName("squareW");
const blackSquares = document.getElementsByClassName("squareB");

function getImage (type, color) {
    if (color == "white") {
        if (type == "pawn") {
            return '<img src="images/white-pawn.svg" alt="P" draggable="false" class="white piece">';
        } else if (type == "rook") {
            return '<img src="images/white-rook.svg" alt="R" draggable="false" class="white piece">';
        } else if (type == "knight") {
            return '<img src="images/white-knight.svg" alt="N" draggable="false" class="white piece">';
        } else if (type == "bishop") {
            return '<img src="images/white-bishop.svg" alt="B" draggable="false" class="white piece">';
        } else if (type == "queen") {
            return '<img src="images/white-queen.svg" alt="Q" draggable="false" class="white piece">';
        } else if (type == "king") {
            return '<img src="images/white-king.svg" alt="K" draggable="false" class="white piece">';
        }
    }

    else {
        if (type == "pawn") {
            return '<img src="images/black-pawn.svg" alt="P" draggable="false" class="black piece">';
        } else if (type == "rook") {
            return '<img src="images/black-rook.svg" alt="R" draggable="false" class="black piece">';
        } else if (type == "knight") {
            return '<img src="images/black-knight.svg" alt="N" draggable="false" class="black piece">';
        } else if (type == "bishop") {
            return '<img src="images/black-bishop.svg" alt="B" draggable="false" class="black piece">';
        } else if (type == "queen") {
            return '<img src="images/black-queen.svg" alt="Q" draggable="false" class="black piece">';
        } else if (type == "king") {
            return '<img src="images/black-king.svg" alt="K" draggable="false" class="black piece">';
        }
    }
}

function makeSelectableOnTurn () {
    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
            if (squareArray[i][j].firstElementChild == null) {
                continue;
            }

            if ((turn % 2 == 0 && squareArray[i][j].firstElementChild.classList.contains("white"))
                || (turn % 2 == 1 && squareArray[i][j].firstElementChild.classList.contains("black"))) {
                squareArray[i][j].firstElementChild.style.cursor = "pointer";
            } else {
                squareArray[i][j].firstElementChild.style.cursor = "default";
            }
        }
    }
}
