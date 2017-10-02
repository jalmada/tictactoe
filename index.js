import TicTacToePro from './tictactoepro.js';
import './style.css'
import Enums from './enums.js';
import $ from 'jquery';

var ticTacToe = new TicTacToePro("tictactoe", 3, 3, Enums.Shapes.Circle);
ticTacToe.draw();

$("#reset").on("click", (e) => ticTacToe.reset())
$("#paintCross").on("click", (e) => ticTacToe.drawShape(parseInt($("#xcoord").val(),10), parseInt($("#ycoord").val(),10), e.target.value));
$("#paintCircle").on("click", (e) => ticTacToe.drawShape(parseInt($("#xcoord").val(),10), parseInt($("#ycoord").val(),10), e.target.value));
$("#nextTurn").on("click", (e) => ticTacToe.runNextTurn(parseInt($("#xcoord").val(),10), parseInt($("#ycoord").val(),10)));