class Mesh {
    constructor(cellsx, cellsy, width, height, lineWidth, color){
        this.cellsx = cellsx;
        this.cellsy = cellsy;
        this.width = width;
        this.height = height;
        this.lineWidth = lineWidth || 5;

        this.countVLines = cellsx - 1;
        this.countHLines = cellsy - 1;
        this.cellwidth = Math.ceil(width/cellsx);
        this.cellheight = Math.ceil(height/cellsy);
        this.color = color || "rgb(0,0,0)";
    }
    
    paint(ctx, color){
        var prevStrokeStyle = ctx.strokeStyle;
        this.color = color || this.color;
        
        for(var x = 0, xpos = this.cellwidth; x < this.countVLines; x++, xpos = xpos + this.cellwidth){
            ctx.strokeStyle = this.color;
            ctx.lineWidth=this.lineWidth;
            ctx.beginPath();
            ctx.moveTo(xpos,5);
            ctx.lineTo(xpos, this.height - 5);
            ctx.stroke();
        }

        for(var y = 0, ypos = this.cellheight; y < this.countHLines; y++, ypos = ypos + this.cellheight){
            ctx.strokeStyle = this.color;
            ctx.lineWidth=this.lineWidth;
            ctx.beginPath();
            ctx.moveTo(5,ypos);
            ctx.lineTo(this.width - 5, ypos);
            ctx.stroke();
        }           


        ctx.strokeStyle = prevStrokeStyle;
    }
}

export default Mesh