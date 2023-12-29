class Pawn extends ChessPiece {

    constructor (row, column, pieceColor, chessBoard, ...bools) {

        super(row, column, pieceColor, chessBoard);

        if (pieceColor == "white") {
            this.moveDirection = -1;
        } else {
            this.moveDirection = 1;
        }

        if (bools.length == 0) {
            this.canMoveTwo = true;
        } else {
            this.canMoveTwo = bools[0];
            this.enPassantPossible = bools[1];
        }
    }

    getType () {
        return "pawn";
    }

    isEnPassantPossible() {
        return this.enPassantPossible;
    }

    move (newRow, newColumn, actuallyMove) {
        
        if (this.row == newRow && this.column == newColumn) {
            return false;
        }
        
        // taking a piece
        if (newRow == this.row + this.moveDirection && Math.abs(newColumn - this.column) == 1) {
            return this.takePiece(newRow, newColumn, actuallyMove);
        }

        // moving one
        else if (newColumn == this.column && newRow == this.row + this.moveDirection
                && !this.getBoard().containsPiece(newRow, newColumn)) {
            
            if (actuallyMove) {
                this.row = newRow;
                this.canMoveTwo = false;
                this.enPassantPossible = false;
            }

            return true;
        }

        // moving two
        else if (newColumn == this.column && newRow == this.row + this.moveDirection * 2 
                && this.canMoveTwo && !this.getBoard().containsPiece(this.row + this.moveDirection, newColumn)
                && !this.getBoard().containsPiece(newRow, newColumn)) {
            
            if (actuallyMove) {
                this.row = newRow;
                this.canMoveTwo = false;
                this.enPassantPossible = true;
            }
            
            return true;
        }

        return false;
    }
    
    takePiece (newRow, newColumn, actuallyMove) {
        
        // regular taking
        if (this.getBoard().containsPiece(newRow, newColumn)
                && this.getBoard().getPiece(newRow, newColumn).getColor() != this.pieceColor) {
        

            if (actuallyMove) {
                this.row = newRow;
                this.column = newColumn;
                this.canMoveTwo = false;
                this.enPassantPossible = false;
            }

            return true;
        }

        // taking en passant
        else if (!this.getBoard().containsPiece(newRow, newColumn)
                && this.getBoard().containsPiece(this.row, newColumn)
                && this.getBoard().getPiece(this.row, newColumn).getColor() != this.pieceColor
                && this.getBoard().getPiece(this.row, newColumn).isEnPassantPossible()) {

            if (actuallyMove) {
                this.getBoard().removePiece(this.row, newColumn);
                this.row = newRow;
                this.column = newColumn;
            }

            return true;
        }

        return false;
    }
}