
class ChessPiece {

    constructor (row, column, pieceColor, chessBoard) {
        this.row = row;
        this.column = column;
        this.pieceColor = pieceColor;
        this.chessBoard = chessBoard;
    }

    getRow () {
        return this.row;
    }

    getColumn () {
        return this.column;
    }
    
    getColor () {
        return this.pieceColor;
    }

    getType () {
        return null;
    }

    getBoard () {
        return this.chessBoard;
    }

    isEnPassantPossible () {
        return false;
    }

    getCanCastle () {
        return false;
    }

    move (newRow, newColumn, actuallyMove) {
        return false;
    }

    equals (piece) {
        return this.getType() == piece.getType() && this.column == piece.getColumn() 
            && this.row == piece.getRow() && this.pieceColor == piece.getColor();
    }
}
