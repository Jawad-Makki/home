class ChessBoard {

    constructor (...boards) {
        this.board = [[],[],[],[],[],[],[],[]]; 
        this.overrides = false;
        this.pieceTaken = false;

        for (var i = 0; i < 8; i++) {
            for (var j = 0; j < 8; j++) {
                this.board[i][j] = null;
            }
        }

        if (boards.length != 1) {
            return;
        }

        for (var i = 0; i < 8; i++) {
            for (var j = 0; j < 8; j++) {

                if (!boards[0].containsPiece(i, j)) {
                    continue;
                }
                
                if (boards[0].getPiece(i, j).getType() == "pawn") {
                    this.board[i][j] = new Pawn(i, j, boards[0].getPiece(i, j).getColor(), this, 
                        boards[0].getPiece(i, j).canMoveTwo, boards[0].getPiece(i, j).isEnPassantPossible());
                }

                else if (boards[0].getPiece(i, j).getType() == "king") {
                    this.board[i][j] = new King(i, j, boards[0].getPiece(i, j).getColor(), this, 
                        boards[0].getPiece(i, j).getCanCastle());
                }

                else if (boards[0].getPiece(i, j).getType() == "rook") {
                    this.board[i][j] = new Rook(i, j, boards[0].getPiece(i, j).getColor(), this, 
                        boards[0].getPiece(i, j).getCanCastle());
                }
                
                else if (boards[0].getPiece(i, j).getType() == "bishop") {
                    this.board[i][j] = new Bishop(i, j, boards[0].getPiece(i, j).getColor(), this);
                }
                
                else if (boards[0].getPiece(i, j).getType() == "knight") {
                    this.board[i][j] = new Knight(i, j, boards[0].getPiece(i, j).getColor(), this);
                }

                else if (boards[0].getPiece(i, j).getType() == "queen") {
                    this.board[i][j] = new Queen(i, j, boards[0].getPiece(i, j).getColor(), this);
                }
            }
        }
    }

    getPiece (row, column) {
        return this.board[row][column];
    }

    containsPiece (row, column) {

        if (row < 0 || row > 7 || column < 0 || column > 7) {
            return false;
        }

        return this.board[row][column] != null;
    }

    addPiece (row, column, color, piece) {

        switch (piece) {
            case "pawn": this.board[row][column] = new Pawn(row, column, color, this); break;
            case "rook": this.board[row][column] = new Rook(row, column, color, this); break;
            case "knight": this.board[row][column] = new Knight(row, column, color, this); break;
            case "bishop": this.board[row][column] = new Bishop(row, column, color, this); break;
            case "queen": this.board[row][column] = new Queen(row, column, color, this); break;
            case "king": this.board[row][column] = new King(row, column, color, this);
        }
    }

    movePiece (oldRow, oldColumn, newRow, newColumn, actuallyMove) {
        
        
        if (this.getPiece(oldRow, oldColumn).move(newRow, newColumn, actuallyMove)) {
            if (actuallyMove) {
                if (this.containsPiece(newRow, newColumn)) {
                    this.pieceTaken = true;
                }
                
                this.board[newRow][newColumn] = this.board[oldRow][oldColumn];
                this.board[oldRow][oldColumn] = null;
            }
            
            return true;
        }
        
        return false;
    }

    removePiece (row, column) {
        this.board[row][column] = null;
    }

    moveCastleOverride (oldRow, oldColumn, newRow, newColumn) {
        this.board[newRow][newColumn] = this.board[oldRow][oldColumn];
        this.board[oldRow][oldColumn] = null;
        this.overrides = true;
    }

    checkIfInCheck (color) {

        var kingRow = -1;
        var kingColumn = -1;
        for (var i = 0; i < 8; i++) {
            for (var j = 0; j < 8; j++) {
                if (this.containsPiece(i, j) && this.getPiece(i, j).getType() == "king" && this.getPiece(i, j).getColor() == color) {
                    kingRow = i;
                    kingColumn = j;
                }
            }
        }
        
        for (var i = 0; i < 8; i++) {
            for (var j = 0; j < 8; j++) {
                if (this.containsPiece(i, j) && this.getPiece(i, j).getColor() != color
                        && this.movePiece(i, j, kingRow, kingColumn, false)) {
                    return true;
                }
            }
        }
            
        return false;
    }

    checkIfInStalemate (color) {

        for (var i = 0; i < 8; i++) {
            for (var j = 0; j < 8; j++) {
                if (!this.containsPiece(i, j) || this.getPiece(i, j).getColor() != color) {
                    continue;
                }

                for (var k = 0; k < 8; k++) {
                    for (var l = 0; l < 8; l++) {
                        
                        var testBoard = new ChessBoard(this);

                        if ((testBoard.movePiece(i, j, k, l, true) || testBoard.overrides) && !testBoard.checkIfInCheck(color)) {
                            return false;
                        }
                    }
                }
            }
        }
    
        return true;
    }

    equals (board) {
        for (var i = 0; i < 8; i++) {
            for (var j = 0; j < 8; j++) {

                if (!board.containsPiece(i, j) && !this.containsPiece(i, j)) {
                    continue;
                }

                else if (!board.containsPiece(i, j) || !this.containsPiece(i, j)) {
                    return false;
                }

                else if (!board.getPiece(i, j).equals(this.getPiece(i , j))) {
                    return false;
                }
            }
        }

        return true;
    }
}
