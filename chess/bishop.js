class Bishop extends ChessPiece {
    
    constructor (row, column, pieceColor, chessBoard) {
        super(row, column, pieceColor, chessBoard);
    }

    getType () {
        return "bishop";
    }

    move (newRow, newColumn, actuallyMove) {

        if ((this.row == newRow && this.column == newColumn)
            || (Math.abs(this.row - newRow) != Math.abs(this.column - newColumn))) {
            return false;
        }

        if (newRow > this.row) {
            var rowDirection = 1;
        } else {
            var rowDirection = -1;
        }

        if (newColumn > this.column) {
            var columnDirection = 1;
        } else {
            var columnDirection = -1;
        }

        for (var i = 1; i < Math.abs(this.row - newRow); i++) {
            if (this.getBoard().containsPiece(this.row + i * rowDirection, this.column + i * columnDirection)) {
                return false;
            }
        }

        if (!this.getBoard().containsPiece(newRow, newColumn)
            || (this.getBoard().containsPiece(newRow, newColumn) 
                && this.getBoard().getPiece(newRow, newColumn).getColor() != this.pieceColor)) {
            
            if (actuallyMove) {
                this.column = newColumn;
                this.row = newRow;
            }

            return true;
        }            
        
        return false;
    }
}
