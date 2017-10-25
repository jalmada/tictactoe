import TicTacToePro from '../tictactoepro/tictactoepro.js';
import Utils from '../common/utils.js';

class TicTacToeProRec extends TicTacToePro{
    constructor(canvasId, xcells, ycells, initialShape, levels, parentBoard){
        super(canvasId, xcells, ycells, initialShape);

        this.levels = levels || 1;

        this.subBoards = [];
        this.mainBoard = this;
        this.subBoardsNum = this.xcells * this.ycells;
        this.parentBoard = parentBoard;
        
        this._initBoards();

    }

    runNextTurn(x, y){
        if(!!this.subBoards && x < this.subBoards.length && y < this.subBoards[x].length  && !this.subBoards[x][y].Winner){
            this.goToSubBoard(x,y);
        } else {
            super.runNextTurn(x, y);
        }
    }

    _onCanvasClick(e){

        let pos = Utils._getMousePos(e, this.canvas);
        let x = Math.floor(pos.x/ this.elementWidth);
        let y = Math.floor(pos.y/ this.elementHeight);


        var winner = this.runNextTurn(x, y);


        if(winner && this.parentBoard){
            //this.parentBoard.runNextTurn() //Save the origin position to be used here where the subboard is solved
        }
    }

    goToSubBoard(x, y){
        if(this.subBoards.length <= x){
            throw `Index x: ${x} out of bounds`;
        }
        if(this.subBoards[x].length <= y){
            throw `Index y: ${y} out of bounds`;
        }

        if(this.subBoards[x][y]){
            this.subBoards[x][y].draw("rgb(255,0,0)");           
            this.canvas.removeEventListener("click");
            this.canvas.addEventListener("click", this.subBoards[x][y]._onCanvasClick);

        }
    }

    _initBoards(){         
        if(this.levels > 1){
            this.subBoards = [];
            for(var x = 0; x < this.xcells; x++){
                this.board.push([]);
                for(var y = 0; y <this.ycells; y++){
                    let newSubboard = new TicTacToeProRec(this.canvasId, this.xcells, this.ycells, this.initialShape, this.levels - 1, this);
                    this.board[x].push(newSubboard);                    
                }
            }
        }
    }

}

export default TicTacToeProRec