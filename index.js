import Enums from './tictactoepro/enums.js';
import TicTacToeProRec from './tictactoeprorec/tictactoeprorec.js';

import './style.css'
import $ from 'jquery';

var ticTacToeRec = new TicTacToeProRec("tictactoerec", 3, 3, Enums.Shapes.Circle, 3);
ticTacToeRec.draw( 800, 800);


$("#clear").on("click", (e) => ticTacToeRec.clear())
$("#paintCross").on("click", (e) => ticTacToeRec.drawShape(parseInt($("#xcoord").val(),10), parseInt($("#ycoord").val(),10), e.target.value));
$("#paintCircle").on("click", (e) => ticTacToeRec.drawShape(parseInt($("#xcoord").val(),10), parseInt($("#ycoord").val(),10), e.target.value));
$("#nextTurn").on("click", (e) => ticTacToeRec.runNextTurn(parseInt($("#xcoord").val(),10), parseInt($("#ycoord").val(),10)));