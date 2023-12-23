class King extends ChessPiece {
    
    constructor (row, column, pieceColor, chessBoard, ...canCastle) {
        super(row, column, pieceColor, chessBoard);

        if (canCastle.length == 0) {
            this.canCastle = true;
        } else {
            this.canCastle = canCastle[0];
        }
    }

    getType () {
        return "king";
    }

    getCanCastle () {
        return this.canCastle;
    }

    move (newRow, newColumn, actuallyMove) {

        if (this.row == newRow && this.column == newColumn) {
            return false;
        }

        // moving
        if (Math.abs(newRow - this.row) <= 1 && Math.abs(newColumn - this.column) <= 1
            && !this.getBoard().containsPiece(newRow, newColumn)) {
            
            if (actuallyMove) {
                this.row = newRow;
                this.column = newColumn;
                this.canCastle = false;
            }

            return true;
        } 
        
        // taking a piece
        else if (Math.abs(newRow - this.row) <= 1 && Math.abs(newColumn - this.column) <= 1
                && this.getBoard().containsPiece(newRow, newColumn)
                && this.getBoard().getPiece(newRow, newColumn).getColor() != this.pieceColor) {
            
            
            if (actuallyMove) {
                this.row = newRow;
                this.column = newColumn;
                this.canCastle = false;
            }
            
            return true;
        }

        // castling
        else if (newRow == this.row && this.canCastle) {

            var isLong = newColumn - this.column < 0;
            var direction = (newColumn - this.column) / Math.abs(newColumn - this.column);

            if (!this.getBoard().containsPiece(this.row, this.column + direction)
                && !this.getBoard().containsPiece(this.row, this.column + direction * 2)
                && (!isLong || (!this.getBoard().containsPiece(this.row, this.column + direction * 3) && isLong))) {

                // castling by dragging over rook
                if (this.getBoard().containsPiece(newRow, newColumn)
                    && this.getBoard().getPiece(newRow, newColumn).getColor() == this.pieceColor
                    && this.getBoard().getPiece(newRow, newColumn).getCanCastle()) {
                    
                    if (actuallyMove) {
                        this.getBoard().movePiece(newRow, newColumn, this.row, this.column + direction, true);
                        this.getBoard().moveCastleOverride(this.row, this.column, newRow, this.column + direction * 2);
                        this.column = this.column + direction * 2;
                        this.canCastle = false;
                        return false;
                    } 
                    
                    return true;
                }

                // castling by dragging king to new spot - short castle
                else if (!isLong && newColumn == this.column + 2 
                        && this.getBoard().containsPiece(newRow, 7)
                        && this.getBoard().getPiece(newRow, 7).getColor() == this.pieceColor
                        && this.getBoard().getPiece(newRow, 7).getCanCastle()) {
                    
                    if (actuallyMove) {
                        this.getBoard().movePiece(newRow, 7, this.row, this.column + 1, true);
                        this.getBoard().moveCastleOverride(this.row, this.column, newRow, this.column + 2);
                        this.column = this.column + 2;
                        this.canCastle = false;
                        return false;
                    }

                    return true;
                }

                // castling by dragging king to new spot - long castle
                else if (isLong && newColumn == this.column - 2
                        && this.getBoard().containsPiece(newRow, 0)
                        && this.getBoard().getPiece(newRow, 0).getColor() == this.pieceColor
                        && this.getBoard().getPiece(newRow, 0).getCanCastle()) {
                    
                    if (actuallyMove) {
                        this.getBoard().movePiece(newRow, 0, this.row, this.column - 1, true);
                        this.getBoard().moveCastleOverride(this.row, this.column, newRow, this.column - 2);
                        this.column = this.column - 2;
                        this.canCastle = false;
                        return false;
                    }

                    return true;
                }
            }
        }

        return false;
    }
}
