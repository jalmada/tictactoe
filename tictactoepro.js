    
    import Circle from './circle.js';
    import Cross from './cross.js';
    import Mesh from './mesh.js';
    import Message from './message.js';
    import _ from 'lodash';

    class TicTacToePro {
        constructor(canvasId, xcells, ycells){

            this.canvasId = canvasId;
            this.canvas = document.getElementById(this.canvasId);

            this.ctx = this.canvas.getContext('2d');;

            this.xcells = xcells;
            this.ycells = ycells;
            
            this.elementWidth = Math.ceil(this.canvas.width / this.xcells);
            this.elementHeight = Math.ceil(this.canvas.height / this.ycells);
            this.elementRadiusx = Math.ceil((this.canvas.width / this.xcells)/2);
            this.elementRadiusy = Math.ceil((this.canvas.height / this.ycells)/2);

            this.diagonalAmount = (Math.abs(this.xcells - this.ycells) + 1) * 2;

            this.shapeLimit = this.xcells * this.ycells;
            this.lineWidth = ((this.canvas.width + this.canvas.height) / 2) * .02 ;

            this.message = new Message(this.canvas.width, this.canvas.height);
            this.diagonalLines = Math.abs(this.xcells - this.ycells) + 1;


            this.canvas.addEventListener('click', this.onCanvasClick.bind(this), false);
            this.addResetButton();
            this.initBoard();            
        }

        addResetButton(){
            let resetButton = document.createElement('button');
            resetButton.id = 'reset';
            resetButton.innerHTML = 'Reset';
            resetButton.onclick = this.reset.bind(this);

            let br = document.createElement('br');

            this.canvas.parentNode.insertBefore(br, this.canvas.nextSibling);
            br.parentNode.insertBefore(resetButton, br.nextSibling);
        }
    
        onCanvasClick(e){
            if(this.shapeCount > this.shapeLimit){
                this.reset();
                return;
            }

            var pos = this.getMousePos(e);

            let getCoord = (pos, size) => Math.floor(pos/ size);

            var cposx = getCoord(pos.x, this.elementWidth);
            var cposy = getCoord(pos.y, this.elementHeight);
            
            var placeX = cposx * this.elementWidth;
            var placeY = cposy * this.elementHeight;

            if(this.board[cposx][cposy] == 0){
                
                this.board[cposx][cposy] = this.currentShape;

                this.drawNextShape(placeX, placeY);
                this.shapeCount++;

                let winner = this.getWinner(cposx, cposy)
  
                if(winner != 0){
                    this.message.paint(this.ctx, `${this.currentShape == -1 ? "Circle" : "Cross"} Won`, 'Click to try Again');    
                    this.shapeCount = this.shapeLimit + 1;
                } else if (this.shapeCount == this.shapeLimit){
                    this.message.paint(this.ctx, 'Draw', 'Click to Try Again');
                    this.shapeCount++;
                    return;
                }

                this.currentShape = this.currentShape == -1 ? 1 : -1;
            }
            
            this.printConsoleBoard();
        }

        printConsoleBoard() {
            var table = ''
            for(var y = 0; y < this.ycells; y++){
                var row = "[";
                for(var x = 0; x < this.xcells; x++){
                    row += this.board[x][y] + ",";
                }
                row += "]\n";
                table += row;
            }

            console.log(table);
        }

        initBoard(){
            this.board = [];
            for(var x = 0; x < this.xcells; x++){
                this.board.push([]);
                for(var y = 0; y <this.ycells; y++){
                    this.board[x].push(0);
                }
            }

<<<<<<< HEAD:tictactoe.js

            this.winningLines = _.times(this.xcells + this.ycells + this.diagonalAmount, _.constant(0));
=======
            this.winningLines = _.times(this.xcells + this.ycells + (this.diagonalLines * 2), _.constant(0));
>>>>>>> 81d0e391772d153adc7223cf512648cec6c835ff:tictactoepro.js
            this.currentShape = 1;
            this.shapeCount = 0;
        }

        draw() {
            if (this.canvas.getContext) {
                
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.initBoard();

                var mesh = new Mesh(this.xcells,this.ycells,this.canvas.width,this.canvas.height, this.lineWidth / 2);
                mesh.paint(this.ctx);
            }
        }

        getMousePos(evt) {
            var rect = this.canvas.getBoundingClientRect();
            return {
                x: evt.clientX - rect.left,
                y: evt.clientY - rect.top
            };
        }       

        drawNextShape(x,y){
            
            if(this.currentShape == 1){
                var cross = new Cross(x,y, this.elementWidth, this.elementHeight, this.lineWidth);
                cross.paint(this.ctx);
            } else if(this.currentShape == -1) {
                var circle = new Circle(x, y , this.elementRadiusx, this.elementRadiusy, this.lineWidth);
                circle.paint(this.ctx);             
            }
        }

        reset(){
            this.draw();
        }

        getWinner(x, y){

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
            return 0;

        }
    }

    export default TicTacToePro;