class Rook extends ChessPiece {
    
    constructor (row, column, pieceColor, chessBoard, ...canCastle) {
        super(row, column, pieceColor, chessBoard);
        
        if (canCastle.length == 0) {
            this.canCastle = true;
        } else {
            this.canCastle = canCastle[0];
        }
    }

    getType () {
        return "rook";
    }

    getCanCastle () {
        return this.canCastle;
    }

    move (newRow, newColumn, actuallyMove) {

        if (this.row == newRow && this.column == newColumn) {
            return false;
        }

        // moving horizontally
        if (this.row == newRow) {

            if (newColumn > this.column) {
                var direction = 1;
            } else {
                var direction = -1;
            }
            
            for (var i = 1; i < Math.abs(newColumn - this.column); i++) {
                if (this.getBoard().containsPiece(this.row, this.column + i * direction)) {
                    return false;
                }
            }

            if (!this.getBoard().containsPiece(this.row, newColumn)
                || (this.getBoard().containsPiece(this.row, newColumn) 
                    && this.getBoard().getPiece(this.row, newColumn).getColor() != this.pieceColor)) {
                
                if (actuallyMove) {
                    this.column = newColumn;
                    this.canCastle = false;
                }

                return true;
            }            
        } 
        
        // moving vertically
        else if (this.column == newColumn) {

            if (newRow > this.row) {
                var direction = 1;
            } else {
                var direction = -1;
            }
            
            for (var i = 1; i < Math.abs(newRow - this.row); i++) {
                if (this.getBoard().containsPiece(this.row + i * direction, this.column)) {
                    return false;
                }
            }

            if (!this.getBoard().containsPiece(newRow, this.column)
                || (this.getBoard().containsPiece(newRow, this.column) 
                    && this.getBoard().getPiece(newRow, this.column).getColor() != this.pieceColor)) {
                
                if (actuallyMove) {
                    this.row = newRow;
                    this.canCastle = false;
                }
                
                return true;
            }            
        }

        return false;
    }
}
