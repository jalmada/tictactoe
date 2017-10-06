import TicTacToePro from './tictactoepro.js';
import './style.css'
import Enums from './enums.js';
import $ from 'jquery';

var ticTacToe = new TicTacToePro("tictactoe", 3, 3, Enums.Shapes.Circle);
ticTacToe.draw();
ticTacToe.setMoves([{x:0,y:0,s:-1},{x:1,y:1,s:9},{x:2,y:2,s:-1}]);

$("#reset").on("click", (e) => ticTacToe.reset())
$("#paintCross").on("click", (e) => ticTacToe.runNextTurn(parseInt($("#xcoord").val(),10), parseInt($("#ycoord").val(),10), e.target.value));
$("#paintCircle").on("click", (e) => ticTacToe.runNextTurn(parseInt($("#xcoord").val(),10), parseInt($("#ycoord").val(),10), e.target.value));
$("#nextTurn").on("click", (e) => ticTacToe.runNextTurn(parseInt($("#xcoord").val(),10), parseInt($("#ycoord").val(),10)));