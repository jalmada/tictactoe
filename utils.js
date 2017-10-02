class Utils{
    static  _getMousePos(evt, element) {
        
        var rect = element ?  element.getBoundingClientRect() : window;
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    } 

    static _printConsoleBoard() {
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
}

export default Utils