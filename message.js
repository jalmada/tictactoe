class Message {
    constructor(width, height, header, subheader){
        this.header = header || '';
        this.subheader = subheader || '';
        this.width = width;
        this.height = height;
        this.alpha = 0.9;
        this.bgcolor = "rgb(255,255,255)";
        this.fgcolor = "rgb(0,0,0)";
        this.headerFont = "30px Arial";
        this.subheaderFont = "15px Arial";
        this.textAlign="center";
        this.textX = this.width/2;
        this.textY = (this.height/2)-15;


    }

    paint(ctx, header, subheader){
        header = header || this.header;
        subheader = subheader || this.subheader;

        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.bgcolor;
        ctx.fillRect(0, 0, this.width, this.height);
        ctx.fillStyle = this.fgcolor;
        ctx.globalAlpha = 1.0;
        ctx.font = this.headerFont;
        ctx.textAlign= this.textAlign; 
        ctx.fillText(header,this.textX, this.textY);
        ctx.font = this.subheaderFont;                    
        ctx.fillText(subheader,this.textX, this.textY + 20);
        ctx.restore();
    }

}

export default Message;