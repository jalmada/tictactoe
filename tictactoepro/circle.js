class Circle {
    constructor(x,y,radiusx, radiusy, lineWidth){
        this.x = x;
        this.y = y;
        this.radiusx = radiusx;
        this.radiusy = radiusy;
        this.lineWidth = lineWidth || 10;
        this.offset = this.lineWidth * 1.2;
        this.radiusOffsetx = this.radiusx - this.offset;
        this.radiusOffsety = this.radiusy - this.offset;
    }
    
    paint(ctx, color){
        ctx.strokeStyle = color || "rgb(0,0,0)";
        ctx.lineWidth=this.lineWidth;
        ctx.beginPath();

        for (var i = 0; i < 2 * Math.PI + 1; i += 0.1 ) {

            let xPos = this.x + this.radiusx - (this.radiusOffsetx * Math.cos(i));
            let yPos = this.y + this.radiusy + (this.radiusOffsety * Math.sin(i));
        
            if (i == 0) {
                ctx.moveTo(xPos, yPos);
            } else {
                ctx.lineTo(xPos, yPos);
            }
        }

        ctx.stroke();
    }
}

export default Circle;