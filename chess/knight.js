class Knight extends ChessPiece {
    
    constructor (row, column, pieceColor, chessBoard) {
        super(row, column, pieceColor, chessBoard);
    }

    getType () {
        return "knight";
    }

    move (newRow, newColumn, actuallyMove) {

        if (this.row == newRow && this.column == newColumn) {
            return false;
        }

        // moving
        if (((Math.abs(newRow - this.row) == 1 && Math.abs(newColumn - this.column) == 2)
            || (Math.abs(newRow - this.row) == 2 && Math.abs(newColumn - this.column) == 1))
            && (!this.getBoard().containsPiece(newRow, newColumn)
                || (this.getBoard().containsPiece(newRow, newColumn) 
                    && this.getBoard().getPiece(newRow, newColumn).getColor() != this.pieceColor))) {
            
            if (actuallyMove) {
                this.row = newRow;
                this.column = newColumn;
            }

            return true;
        } 

        return false;
    }
}
