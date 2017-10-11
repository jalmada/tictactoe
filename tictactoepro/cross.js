class Cross {
    constructor (x,y,width, height, lineWidth){
        this.lineWidth = lineWidth || 10;            
        this.offset = this.lineWidth * 1.2;            
        this.x = x + this.offset;
        this.y = y + this.offset;
        this.width = width - (this.offset * 2);
        this.height = height - (this.offset * 2);
    }

    paint(ctx){
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
    }

}

export default Cross;