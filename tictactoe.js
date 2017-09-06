    
    import Circle from './circle.js';
    import Cross from './cross.js';
    import Mesh from './mesh.js';

    class TicTacToe {
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

            this.currentShape = 1;
            this.shapeLimit = this.xcells * this.ycells;
            this.shapeCount = 0;

            this.board = [];
            this.lineWidth = ((this.canvas.width + this.canvas.height) / 2) * .02 ;

            this.canvas.addEventListener('click', this.onCanvasClick.bind(this), false);
            document.getElementById("reset").onclick = this.reset.bind(this);
        }

        getCellToUse(v, q){
            var i = q;
            var p = 0
            while( i < v){
                p++;
                i = i + q;
            }
            return p;
        }

        onCanvasClick(e){
            if(this.shapeCount > this.shapeLimit){
                this.reset();
                return;
            }

            if(this.shapeCount == this.shapeLimit){

                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.ctx.font = "30px Arial";
                this.ctx.textAlign="center"; 
                this.ctx.fillText("Game Over",this.canvas.width/2,(this.canvas.height/2)-15);
                this.ctx.font = "15px Arial";                    
                this.ctx.fillText("Click to try Again",this.canvas.width/2,(this.canvas.height/2)+5);

                this.shapeCount++;
                return;
            }

            var pos = this.getMousePos(e);

            var cposx = this.getCellToUse(pos.x, this.elementWidth);
            var cposy = this.getCellToUse(pos.y, this.elementHeight);
            
            var placeX = cposx * this.elementWidth;
            var placeY = cposy * this.elementHeight;

            if(this.board[cposx][cposy] < 0){
                this.board[cposx][cposy] = this.currentShape;
                this.drawNextShape(placeX, placeY);
                this.currentShape = this.currentShape == 0 ? 1 : 0;
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
                    this.board[x].push(-1);
                }
            }
        }

        draw() {
            if (this.canvas.getContext) {
                
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.initBoard();
                this.currentShape = 1;
                this.shapeCount = 0;

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
            } else {
                var circle = new Circle(x, y , this.elementRadiusx, this.elementRadiusy, this.lineWidth);
                circle.paint(this.ctx);             
            }
            this.shapeCount++;
        }

        reset(){
            this.draw();
        }
    }

    export default TicTacToe;