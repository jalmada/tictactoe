import Enums from './tictactoepro/enums.js';
import RecEnums from './tictactoeprorec/enums.js';
import TicTacToeProRec from './tictactoeprorec/tictactoeprorec.js';

import './style.css'
import $ from 'jquery';

var ticTacToeRec = new TicTacToeProRec("tictactoerec", 3, 3, Enums.Shapes.Circle, 3, null, null, null, null, RecEnums.GameMode.NewLevelRestart, null);
ticTacToeRec.draw( 800, 800,"rgb(0,0,0)");


$("#clear").on("click", (e) => ticTacToeRec.clear())
$("#gotoparent").on("click", (e) => ticTacToeRec.currentBoard.goToParentBoard())
$("#paintCross").on("click", (e) => ticTacToeRec.drawShape(parseInt($("#xcoord").val(),10), parseInt($("#ycoord").val(),10), e.target.value));
$("#paintCircle").on("click", (e) => ticTacToeRec.drawShape(parseInt($("#xcoord").val(),10), parseInt($("#ycoord").val(),10), e.target.value));
$("#nextTurn").on("click", (e) => ticTacToeRec.runNextTurn(parseInt($("#xcoord").val(),10), parseInt($("#ycoord").val(),10)));