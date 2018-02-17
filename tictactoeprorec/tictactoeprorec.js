import TicTacToePro from '../tictactoepro/tictactoepro.js';
import Utils from '../common/utils.js';
import Enums from './enums.js';


class TicTacToeProRec extends TicTacToePro{
    constructor(containerId, xcells, ycells, initialShape, levels, parentBoard, upperX, upperY, color, gameMode, drawMode){
        super(containerId, xcells, ycells, initialShape, null,  color);

        this.levels = levels || 1;
        this.subBoards = [];
        this.mainBoard = this;
        this.subBoardsNum = this.xcells * this.ycells;
        this.parentBoard = parentBoard;
        this.upperX = upperX;
        this.upperY = upperY;
        this.gameMode = gameMode || Enums.GameMode.NewLevelGetsPrevLevel;
        this.drawMode = drawMode || Enums.DrawMode.NextTurnWins;
        this._initBoards();
    }

    runNextTurn(x, y, shapeType)
    {
        if(!!this.subBoards && x < this.subBoards.length && y < this.subBoards[x].length  && !this.subBoards[x][y].Winner && !this.Winner){
            this.goToSubBoard(x,y, this.gameMode == Enums.GameMode.NewLevelRestart ? 0 : shapeType);
        } else {
            this.winner = super.runNextTurn(x, y, shapeType);
            if(this.winner === 0){
                if(this.drawMode == Enums.DrawMode.Restart){
                    this.clear();
                } else if (this.drawMode == Enums.DrawMode.LeaveEmpty){
                    this.clear();
                    this._removeCanvas();
                    this.parentBoard.draw();                    
                } else if (this.drawMode == Enums.DrawMode.NextTurnWins){
                    this._removeCanvas();
                    this.parentBoard.draw();
                    this.winner = this.currentShape;
                    this.parentBoard.runNextTurn(this.upperX, this.upperY, this.winner); 
                }
            } else if(this.winner && this.parentBoard){
                this._removeCanvas();
                this.parentBoard.draw();
                this.parentBoard.runNextTurn(this.upperX, this.upperY, this.winner);
            }
        }        
    }

    _onCanvasClick(e){

        let pos = Utils._getMousePos(e, this.canvas);
        let x = Math.floor(pos.x/ this.elementWidth);
        let y = Math.floor(pos.y/ this.elementHeight);

        this.runNextTurn(x, y, this.currentShape);
    }

    goToSubBoard(x, y, shapeType){
        if(this.subBoards.length <= x){
            throw `Index x: ${x} out of bounds`;
        }
        if(this.subBoards[x].length <= y){
            throw `Index y: ${y} out of bounds`;
        }

        this._removeCanvas();

        if(this.subBoards[x][y]){
            this.subBoards[x][y].draw(this.canvasWidth, this.canvasWidth);
            if(!!shapeType){
                this.subBoards[x][y].runNextTurn(x, y, shapeType);
            }
        }
    }

    _initBoards(){         
        if(this.levels > 1){
            this.subBoards = [];
            for(var x = 0; x < this.xcells; x++){
                this.subBoards.push([]);
                for(var y = 0; y <this.ycells; y++){
                    let subcolor =  this.getLevelColor(this.levels - 1);
                    let newSubboard = new TicTacToeProRec(this.containerId, this.xcells, this.ycells, this.initialShape, this.levels - 1, this, x, y, subcolor, this.gameMode, this.drawMode);
                    this.subBoards[x].push(newSubboard);                    
                }
            }
        }
    }

    _clearSubBoards(){
        if(this.levels > 1){
            for(var x = 0; x < this.xcells; x++){
                for(var y = 0; y <this.ycells; y++){
                    let subboard = this.subBoards[x][y];
                    if(subboard){
                        subboard._removeCanvas();
                    }                    
                }
            }
        }

        this._initBoards();
    }

    clear(){
        super.clear();
        this._clearSubBoards();
    }

    getLevelColor(level){
        var colorToChange = level % 3;
        var colors = this.Color.replace("rgb","").replace("(","").replace(")","").trim().split(",");
        var newColorSection = parseInt(colors[colorToChange]) + 127;
        newColorSection = newColorSection > 255 ? 0 : newColorSection;
        colors[colorToChange] = newColorSection;

        var colorStr = `rgb(${colors.join(",")})`;
        return colorStr;
    }



}

export default TicTacToeProRec