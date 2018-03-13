    import Circle from './circle.js';
    import Cross from './cross.js';
    import Mesh from './mesh.js';
    import Message from './message.js';
    import Utils from '../common/utils.js';
    import Enums from './enums.js';
    import _ from 'lodash';

    class TicTacToePro {
        constructor(containerId, xcells, ycells, initialShape, initialBoard, color){

            //Shape validation
            this.initialShape = initialShape || Enums.Shapes.Cross;            
            if(this.initialShape != Enums.Shapes.Circle && this.initialShape != Enums.Shapes.Cross){
                throw "Invalid Shape Type, only 1 (Cross) and -1 (Circle) are supported";
            }

            //CanvasId validation
            this.containerId = containerId;
            this.container = document.getElementById(this.containerId);
            
            if(!this.container){
                throw `Container element ${this.containerId} was not found.`
            }         
            
            this.xcells = xcells;
            this.ycells = ycells;
            if(this.xcells < 1 || this.ycells < 1){
                throw `Number of rows and columns must be positive. X: ${this.xcells}, Y: ${this.ycells}`;
            }

            this.canvasWidth = 300;
            this.canvasHeight = 300;

            this.diagonalAmount = (Math.abs(this.xcells - this.ycells) + 1) * 2;
            this.shapeLimit = this.xcells * this.ycells;
            this.diagonalLines = Math.abs(this.xcells - this.ycells) + 1;

            this.board = [[]];
            this.initialBoard = initialBoard;
            this.Color = color || "rgb(0,0,0)";
            let validInitialBoard = !!initialBoard;

            if(this.initialBoard && Array.isArray(this.initialBoard) && this.initialBoard.length == this.xcells){
                for(let x = 0; x < this.initialBoard.length; x++){
                    if(!(this.initialBoard[x] && Array.isArray(this.initialBoard[x]) && this.initialBoard[x].length == this.ycells)){
                        validInitialBoard = false;
                        break;
                    }
                }
            }
            
            if(!validInitialBoard){
                this._initBoard();     
            } else {
                this.board = this.initialBoard;
            }
        }

        _onCanvasClick(e){
            let pos = Utils._getMousePos(e, this.canvas);
            let x = Math.floor(pos.x/ this.elementWidth);
            let y = Math.floor(pos.y/ this.elementHeight);

            this.winner = this.runNextTurn(x, y);
        }

        setTurn(x, y, shapeType)
        {
            if(isNaN(x) || isNaN(y) || isNaN(shapeType)){
                throw "X, Y or ShapeType is not a numbers";
            }

            if(this.board.length <= x){
                throw `X: ${x} is out of bounds`;
            }

            if(this.board[x].length <= y){
                throw `Y: ${y} is out of bounds`;
            }

            if (this.board[x][y] != 0) {
                throw `X: ${x}, Y: ${y}, is already taken, please make another selection`;
            }

            if(shapeType != Enums.Shapes.Circle && shapeType != Enums.Shapes.Cross){
                throw `Shape Type: ${shapeType}, is not a valid shape`;
            }

            this.board[x][y] = shapeType;
            this.moves.push({x:x, y:y, s:shapeType});
            this.shapeCount++;
            
            let winner = this._getWinner(x, y, shapeType);
            return winner;
        }

        runNextTurn(x, y, shapeType){
            shapeType = shapeType || this.currentShape;
            if(this.shapeCount > this.shapeLimit){
                this.clear();
                return;
            }

            let winner = this.setTurn(x, y, shapeType);
            this.drawShape(x, y, shapeType);

            if(winner != null) this._printWinnerMessage(winner);

            this.currentShape = shapeType == -1 ? 1 : -1;
            return winner;
        }

        _initCanvas(){
            
            this.canvas = document.createElement("canvas");
            this.canvas.width = this.container.clientWidth;
            this.canvas.height = this.container.clientHeight;

            this.canvas.width = this.canvasWidth;
            this.canvas.height = this.canvasHeight;
            
            this.container.appendChild(this.canvas);
            this.ctx = this.canvas.getContext('2d');
            this.canvas.addEventListener('click', this._onCanvasClick.bind(this), false); 
            this.elementWidth = Math.ceil(this.canvas.width / this.xcells);
            this.elementHeight = Math.ceil(this.canvas.height / this.ycells);
            this.elementRadiusx = Math.ceil((this.canvas.width / this.xcells)/2);
            this.elementRadiusy = Math.ceil((this.canvas.height / this.ycells)/2);

            this.lineWidth = ((this.canvas.width + this.canvas.height) / 2) * .02 ;
            this.message = new Message(this.canvas.width, this.canvas.height);                   
            
        }

        //draw the initial board
        draw(width, height, color) {
            
            this.canvasWidth = width || this.canvasWidth;
            this.canvasHeight = height || this.canvasHeight;
            this.Color = color || this.Color;

            if(!this.canvas){
                this._initCanvas();
            }

            if (this.canvas.getContext) {

                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                var mesh = new Mesh(this.xcells,this.ycells,this.canvas.width,this.canvas.height, this.lineWidth / 2, this.Color);
                mesh.paint(this.ctx);

                this.board.forEach((valx, x) => {
                    valx.forEach((s, y) => {
                        if(s == Enums.Shapes.Circle || s == Enums.Shapes.Cross){
                            this.drawShape(x, y, s);
                        }
                    });
                });                
            }
        }

        //Draw the provided shape in the mesh coordinates
        drawShape(x, y, shapeType){

            if(isNaN(x) || isNaN(y) || isNaN(shapeType)){
                throw "X, Y or ShapeType is not a numbers";
            }

            if(x > this.xcells || y > this.ycells) {
                throw `x: ${x}, y: ${y} is out of bounds`;
            }

            if(shapeType != Enums.Shapes.Circle && shapeType != Enums.Shapes.Cross){
                throw `Shape Type: ${shapeType}, is not a valid shape`;
            }

            let xcoord = x * this.elementWidth;
            let ycoord = y * this.elementHeight;

            let shape = shapeType == 1 
                ? new Cross(xcoord, ycoord, this.elementWidth, this.elementHeight, this.lineWidth)
                : new Circle(xcoord, ycoord , this.elementRadiusx, this.elementRadiusy, this.lineWidth);
            shape.paint(this.ctx, this.Color);
        }     

        setMoves(moves){
            moves = Array.isArray(moves) ? moves : [moves];
            moves.forEach(function(m) {
                try{
                    this.winner = this.runNextTurn(m.x, m.y, m.s);
                } catch (e) {
                    console.error(e);
                }
            }, this);

            this.moves = moves
        }

        get Winner(){
            return this.winner;
        }

        get LastMove(){
            return this.moves.length > 0 ? this.moves[this.moves.length -1] : null;
        }

        reset(){
            this.board = this.initialBoard;
            this.draw();
        }

        clear(){
            this._initBoard();            
            this.draw();
        }
        
        _removeCanvas(){
            if(this.canvas){
                this.canvas.parentElement.removeChild(this.canvas);
                this.canvas = null;
            }
        }

        _getWinner(x, y, shapeType){
            shapeType = shapeType || this.currentShape;
            this.winningLines[x] += shapeType;
            if(Math.abs(this.winningLines[x]) == this.ycells) return shapeType;

            this.winningLines[y + this.xcells] += shapeType;
            if(Math.abs(this.winningLines[y + this.xcells ]) == this.xcells) return shapeType;

            let lowestCoord = Math.min(this.xcells, this.ycells);   
            let initialTopDownDiagIndex = this.xcells + this.ycells;
            let initialDownTopDiagIndex = initialTopDownDiagIndex + this.diagonalLines;

            for(let dn = 0; dn < this.diagonalLines; dn++){
                if(this.xcells <= this.ycells){
                    if(x - (y - dn) == 0){
                        this.winningLines[initialTopDownDiagIndex + dn] += shapeType;
                        if(Math.abs(this.winningLines[initialTopDownDiagIndex + dn]) == lowestCoord) return shapeType;
                    }

                    if((x + (y - dn)) == lowestCoord - 1){
                        this.winningLines[initialDownTopDiagIndex + dn] += shapeType;
                        if(Math.abs(this.winningLines[initialDownTopDiagIndex + dn]) == lowestCoord) return shapeType;
                    }
                } else {
                    if(y - (x - dn) == 0){
                        this.winningLines[initialTopDownDiagIndex + dn] += shapeType;
                        if(Math.abs(this.winningLines[initialTopDownDiagIndex + dn]) == lowestCoord) return shapeType;
                    } 

                    if((y + (x - dn)) == lowestCoord - 1){
                        this.winningLines[initialDownTopDiagIndex + dn] += shapeType;
                        if(Math.abs(this.winningLines[initialDownTopDiagIndex + dn]) == lowestCoord) return shapeType;
                    }
                }
            }

            if(this.shapeCount == this.shapeLimit){
                return 0;
            }
            return null;

        }

        _printWinnerMessage(winner){
            if(winner != 0){
                this.message.paint(this.ctx, `${winner == -1 ? "Circle" : "Cross"} Won`, 'Click to try Again');    
                this.shapeCount = this.shapeLimit + 1;
            } else {
                this.message.paint(this.ctx, 'Draw', 'Click to Try Again');
                this.shapeCount++;
                return;
            }
        }
        

        _initBoard(){
            this.board = [[]];
            for(var x = 0; x < this.xcells; x++){
                this.board.push([]);
                for(var y = 0; y <this.ycells; y++){
                    this.board[x].push(0);
                }
            }

            this.winningLines = _.times(this.xcells + this.ycells + (this.diagonalLines * 2), _.constant(0));
            this.shapeCount = 0;
            this.currentShape = this.initialShape;
            this.winner = null;
            this.moves = [];
        }
    }

    export default TicTacToePro;
    export {Enums};