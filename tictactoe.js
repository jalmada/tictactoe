    Circle = function(x,y,radiusx, radiusy, lineWidth){
        this.x = x;
        this.y = y;
        this.radiusx = radiusx;
        this.radiusy = radiusy;
        this.lineWidth = lineWidth || 10;
        this.offset = this.lineWidth * 1.2;
        this.radiusOffsetx = this.radiusx - this.offset;
        this.radiusOffsety = this.radiusy - this.offset;

        this.paint = (function(ctx){
            ctx.strokeStyle = "rgb(0,0,0)";
            ctx.lineWidth=this.lineWidth;
            ctx.beginPath();

            for (var i = 0; i < 2 * Math.PI; i += 0.01 ) {
                xPos = this.x + this.radiusx - (this.radiusOffsetx * Math.cos(i));
                yPos = this.y + this.radiusy + (this.radiusOffsety * Math.sin(i));
            
                if (i == 0) {
                    ctx.moveTo(xPos, yPos);
                } else {
                    ctx.lineTo(xPos, yPos);
                }
            }

            // ctx.arc(this.x + this.radius, this.y + this.radius, this.radius - this.offset, 0,2 * Math.PI , true)
            ctx.stroke();
        }).bind(this);
    }

    Cross = function(x,y,width, height, lineWidth){
        this.lineWidth = lineWidth || 10;            
        this.offset = this.lineWidth * 1.2;            
        this.x = x + this.offset;
        this.y = y + this.offset;
        this.width = width - (this.offset * 2);
        this.height = height - (this.offset * 2);
        

        this.paint = (function(ctx){
            ctx.strokeStyle = "rgb(0,0,0)";
            ctx.lineWidth=this.lineWidth;
            ctx.beginPath();
            ctx.moveTo(this.x,this.y);
            ctx.lineTo(this.x + this.width,this.y + this.height);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(this.x + this.width,this.y);
            ctx.lineTo(this.x, this.y + this.height);
            ctx.stroke();
        }).bind(this);

    }

    Mesh = function(cellsx, cellsy, width, height, lineWidth){
        this.cellsx = cellsx;
        this.cellsy = cellsy;
        this.width = width;
        this.height = height;
        this.lineWidth = lineWidth || 5;

        this.countVLines = cellsx - 1;
        this.countHLines = cellsy - 1;
        this.cellwidth = Math.ceil(width/cellsx);
        this.cellheight = Math.ceil(height/cellsy);

        this.paint = (function(ctx){
            for(var x = 0, xpos = this.cellwidth; x < this.countVLines; x++, xpos = xpos + this.cellwidth){
                ctx.strokeStyle = "rgb(0,0,0)";
                ctx.lineWidth=this.lineWidth;
                ctx.beginPath();
                ctx.moveTo(xpos,5);
                ctx.lineTo(xpos, this.height - 5);
                ctx.stroke();
            }

            for(var y = 0, ypos = this.cellheight; y < this.countHLines; y++, ypos = ypos + this.cellheight){
                ctx.strokeStyle = "rgb(0,0,0)";
                ctx.lineWidth=this.lineWidth;
                ctx.beginPath();
                ctx.moveTo(5,ypos);
                ctx.lineTo(this.width - 5, ypos);
                ctx.stroke();
            }           
        }).bind(this);  
    }

    TicTacToe = function(canvasId, xcells, ycells){

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

            this.getCellToUse = (function(v, q){
                var i = q;
                var p = 0
                while( i < v){
                    p++;
                    i = i + q;
                }
                return p;
            }).bind(this);


            this.onCanvasClick = (function(e){
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
            }).bind(this);

            this.printConsoleBoard = (function() {
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

            }).bind(this);

            this.initBoard = (function(){
                this.board = [];
                for(var x = 0; x < this.xcells; x++){
                    this.board.push([]);
                    for(var y = 0; y <this.ycells; y++){
                        this.board[x].push(-1);
                    }
                }
            }).bind(this);

            this.draw = (function() {
                if (this.canvas.getContext) {
                    
                    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                    this.initBoard();
                    this.currentShape = 1;
                    this.shapeCount = 0;

                    var mesh = new Mesh(this.xcells,this.ycells,this.canvas.width,this.canvas.height, this.lineWidth / 2);
                    mesh.paint(this.ctx);
                }
            }).bind(this);

            this.getMousePos = (function(evt) {
                var rect = this.canvas.getBoundingClientRect();
                return {
                    x: evt.clientX - rect.left,
                    y: evt.clientY - rect.top
                };
            }).bind(this);        

            this.drawNextShape = (function(x,y){
                
                if(this.currentShape == 1){
                    var cross = new Cross(x,y, this.elementWidth, this.elementHeight, this.lineWidth);
                    cross.paint(this.ctx);
                } else {
                    var circle = new Circle(x, y , this.elementRadiusx, this.elementRadiusy, this.lineWidth);
                    circle.paint(this.ctx);             
                }
                this.shapeCount++;
            }).bind(this);

            this.reset = (function(){
                this.draw();
            }).bind(this);

            this.canvas.addEventListener('click', this.onCanvasClick, false);
            document.getElementById("reset").onclick = this.reset;
            
           

            return {
                draw: this.draw
            }
    }