import TicTacToePro from '../tictactoepro/tictactoepro.js';
import Utils from '../common/utils.js';

class TicTacToeProRec extends TicTacToePro{
    constructor(containerId, xcells, ycells, initialShape, levels, parentBoard, upperX, upperY){
        super(containerId, xcells, ycells, initialShape);

        this.levels = levels || 1;

        this.subBoards = [];
        this.mainBoard = this;
        this.subBoardsNum = this.xcells * this.ycells;
        this.parentBoard = parentBoard;
        this.upperX = upperX;
        this.upperY = upperY;
        
        this._initBoards();

    }

    runNextTurn(x, y, shapeType)
    {
        if(!!this.subBoards && x < this.subBoards.length && y < this.subBoards[x].length  && !this.subBoards[x][y].Winner){
            this.goToSubBoard(x,y);
        } else {
            let winner = super.runNextTurn(x, y, shapeType);
            this.winner = winner;
            if(winner && this.parentBoard){
                this.parentBoard.runNextTurn(this.upperX, this.upperY, winner);
            }
        }

        
    }

    _onCanvasClick(e){

        let pos = Utils._getMousePos(e, this.canvas);
        let x = Math.floor(pos.x/ this.elementWidth);
        let y = Math.floor(pos.y/ this.elementHeight);


        this.runNextTurn(x, y);
    }

    goToSubBoard(x, y){
        if(this.subBoards.length <= x){
            throw `Index x: ${x} out of bounds`;
        }
        if(this.subBoards[x].length <= y){
            throw `Index y: ${y} out of bounds`;
        }

        if(this.subBoards[x][y]){
            this.subBoards[x][y].draw(800, 800, "rgb(255,0,0)");

        }
    }

    _initBoards(){         
        if(this.levels > 1){
            this.subBoards = [];
            for(var x = 0; x < this.xcells; x++){
                this.subBoards.push([]);
                for(var y = 0; y <this.ycells; y++){
                    let newSubboard = new TicTacToeProRec(this.containerId, this.xcells, this.ycells, this.initialShape, this.levels - 1, this, x, y);
                    this.subBoards[x].push(newSubboard);                    
                }
            }
        }
    }

}

export default TicTacToeProRec