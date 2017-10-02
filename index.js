import TicTacToePro from './tictactoepro.js';
import './style.css'
import $ from 'jquery';

var ticTacToe = new TicTacToePro("tictactoe", 3, 3)
ticTacToe.draw();

$("#reset").on("click", (e) => ticTacToe.reset())
$("#paintCross").on("click", (e) => ticTacToe.drawShape(parseInt($("#xcoord").val(),10), parseInt($("#ycoord").val(),10), e.target.value));
$("#paintCircle").on("click", (e) => ticTacToe.drawShape(parseInt($("#xcoord").val(),10), parseInt($("#ycoord").val(),10), e.target.value));