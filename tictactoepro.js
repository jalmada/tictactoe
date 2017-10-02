    import Circle from './circle.js';
    import Cross from './cross.js';
    import Mesh from './mesh.js';
    import Message from './message.js';
    import Utils from './utils.js';
    import Enums from './enums.js';
    import _ from 'lodash';

    class TicTacToePro {
        constructor(canvasId, xcells, ycells, initialShape){

            //Shape validation
            this.initialShape = initialShape || Enums.Shapes.Cross;            
            if(this.initialShape != Enums.Shapes.Circle && this.initialShape != Enums.Cross){
                throw "Invalid Shape Type, only 1 (Cross) and -1 (Circle) are supported";
            }

            //CanvasId validation
            this.canvasId = canvasId;
            this.canvas = document.getElementById(this.canvasId);
            if(!this.canvas){
                throw `Canvas element ${canvasId} was not found.`
            }
            if(this.canvas.tagName.toLowerCase() != 'canvas'){
                throw `Provided container id: ${canvasId} is not of type <canvas>`;
            }            
            
            this.xcells = xcells;
            this.ycells = ycells;
            if(this.xcells < 1 || this.ycells < 1){
                throw `Number of rows and columns must be positive. X: ${this.xcells}, Y: ${this.ycells}`;
            }

            this.ctx = this.canvas.getContext('2d');
            
            this.elementWidth = Math.ceil(this.canvas.width / this.xcells);
            this.elementHeight = Math.ceil(this.canvas.height / this.ycells);
            this.elementRadiusx = Math.ceil((this.canvas.width / this.xcells)/2);
            this.elementRadiusy = Math.ceil((this.canvas.height / this.ycells)/2);

            this.diagonalAmount = (Math.abs(this.xcells - this.ycells) + 1) * 2;

            this.shapeLimit = this.xcells * this.ycells;
            this.lineWidth = ((this.canvas.width + this.canvas.height) / 2) * .02 ;

            this.message = new Message(this.canvas.width, this.canvas.height);
            this.diagonalLines = Math.abs(this.xcells - this.ycells) + 1;

            this.canvas.addEventListener('click', this._onCanvasClick.bind(this), false);
            this._initBoard();            
        }

        _onCanvasClick(e){
            let pos = Utils._getMousePos(e, this.canvas);
            let x = Math.floor(pos.x/ this.elementWidth);
            let y = Math.floor(pos.y/ this.elementHeight);

            this.runNextTurn(x, y);
        }

        runNextTurn(x, y){
            if(this.shapeCount > this.shapeLimit){
                this.reset();
                return;
            }

            if (this.board[x][y] != 0) {
                throw `X: ${x}, Y: ${y}, is already taken, please make another selection`;
            }

            this.board[x][y] = this.currentShape;
            this.drawShape(x, y, this.currentShape);
            this.shapeCount++;

            let winner = this._getWinner(x, y);
            if(winner != null) this._printWinnerMessage(winner);

            this.currentShape = this.currentShape == -1 ? 1 : -1;
        }

        //draw the initial board
        draw() {
            if (this.canvas.getContext) {
                
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this._initBoard();

                var mesh = new Mesh(this.xcells,this.ycells,this.canvas.width,this.canvas.height, this.lineWidth / 2);
                mesh.paint(this.ctx);
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

            let xcoord = x * this.elementWidth;
            let ycoord = y * this.elementHeight;

            let shape = shapeType == 1 
                ? new Cross(xcoord, ycoord, this.elementWidth, this.elementHeight, this.lineWidth)
                : new Circle(xcoord, ycoord , this.elementRadiusx, this.elementRadiusy, this.lineWidth);
            shape.paint(this.ctx);
        }      
        
        reset(){
            this.draw();
            this._initBoard();
        }

        _getWinner(x, y){

            if(this.shapeCount == this.shapeLimit){
                return 0;
            }
            this.winningLines[x] += this.currentShape;
            if(Math.abs(this.winningLines[x]) == this.ycells) return this.currentShape;

            this.winningLines[y + this.xcells] += this.currentShape;
            if(Math.abs(this.winningLines[y + this.xcells ]) == this.xcells) return this.currentShape;

            let lowestCoord = Math.min(this.xcells, this.ycells);   
            let initialTopDownDiagIndex = this.xcells + this.ycells;
            let initialDownTopDiagIndex = initialTopDownDiagIndex + this.diagonalLines;

            for(let dn = 0; dn < this.diagonalLines; dn++){
                if(this.xcells <= this.ycells){
                    if(x - (y - dn) == 0){
                        this.winningLines[initialTopDownDiagIndex + dn] += this.currentShape;
                        if(Math.abs(this.winningLines[initialTopDownDiagIndex + dn]) == lowestCoord) return this.currentShape;
                    }

                    if((x + (y - dn)) == lowestCoord - 1){
                        this.winningLines[initialDownTopDiagIndex + dn] += this.currentShape;
                        if(Math.abs(this.winningLines[initialDownTopDiagIndex + dn]) == lowestCoord) return this.currentShape;
                    }
                } else {
                    if(y - (x - dn) == 0){
                        this.winningLines[initialTopDownDiagIndex + dn] += this.currentShape;
                        if(Math.abs(this.winningLines[initialTopDownDiagIndex + dn]) == lowestCoord) return this.currentShape;
                    } 

                    if((y + (x - dn)) == lowestCoord - 1){
                        this.winningLines[initialDownTopDiagIndex + dn] += this.currentShape;
                        if(Math.abs(this.winningLines[initialDownTopDiagIndex + dn]) == lowestCoord) return this.currentShape;
                    }
                }
            }
            return null;

        }

        _printWinnerMessage(winner){
            if(winner != 0){
                this.message.paint(this.ctx, `${this.currentShape == -1 ? "Circle" : "Cross"} Won`, 'Click to try Again');    
                this.shapeCount = this.shapeLimit + 1;
            } else {
                this.message.paint(this.ctx, 'Draw', 'Click to Try Again');
                this.shapeCount++;
                return;
            }
        }
        
        _initBoard(){
            this.board = [];
            for(var x = 0; x < this.xcells; x++){
                this.board.push([]);
                for(var y = 0; y <this.ycells; y++){
                    this.board[x].push(0);
                }
            }

            this.winningLines = _.times(this.xcells + this.ycells + (this.diagonalLines * 2), _.constant(0));
            this.shapeCount = 0;
            this.currentShape = this.initialShape;
        }
    }

    export default TicTacToePro;