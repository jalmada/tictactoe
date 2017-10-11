import TicTacToePro from './tictactoepro/tictactoepro.js';

class TicTacToeProRec {
    constructor(canvasId, xcells, ycells, initialShape, levels){
        this.canvasId = canvasId;
        this.xcells = xcells;
        this.ycells = ycells;
        this.initialShape = initialShape;
        this.levels = levels;

        this.subBoards = [];
        this.mainBoard = null;
        this.subBoardsNum = this.xcells * this.ycells;

        _initBoards();
    }

    drawMainBoard(){
        if(this.mainBoard){
            this.mainBoard.draw();
        }
    }

    drawSubboard(x, y){
        if(this.subBoards.length <= x){
            throw `Index x: ${x} out of bounds`;
        }
        if(this.subBoards[x].length <= y){
            throw `Index y: ${y} out of bounds`;
        }

        if(this.subBoards[x][y]){
            this.subBoards[x][y].draw();
        }
    }

    _initBoards(){
        if(this.levels > 0){
            this.mainBoard = new TicTacToePro(this.canvasId, this.xcells, this.ycells, this.initialShape);
        }
        if(this.levels > 1){
            this.subBoards = [];
            for(var x = 0; x < this.xcells; x++){
                this.board.push([]);
                for(var y = 0; y <this.ycells; y++){
                    this.board[x].push(new TicTacToePro(this.canvasId, this.xcells, this.ycells, this.initialShape));
                }
            }
        }
    }

}

export default TicTacToeProRec