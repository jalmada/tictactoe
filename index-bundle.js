/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _tictactoe = __webpack_require__(1);

var _tictactoe2 = _interopRequireDefault(_tictactoe);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ticTacToe = new _tictactoe2.default("tictactoe", 3, 3);
ticTacToe.draw();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _circle = __webpack_require__(2);

var _circle2 = _interopRequireDefault(_circle);

var _cross = __webpack_require__(3);

var _cross2 = _interopRequireDefault(_cross);

var _mesh = __webpack_require__(4);

var _mesh2 = _interopRequireDefault(_mesh);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TicTacToe = function () {
    function TicTacToe(canvasId, xcells, ycells) {
        _classCallCheck(this, TicTacToe);

        this.canvasId = canvasId;
        this.canvas = document.getElementById(this.canvasId);

        this.ctx = this.canvas.getContext('2d');;

        this.xcells = xcells;
        this.ycells = ycells;

        this.elementWidth = Math.ceil(this.canvas.width / this.xcells);
        this.elementHeight = Math.ceil(this.canvas.height / this.ycells);
        this.elementRadiusx = Math.ceil(this.canvas.width / this.xcells / 2);
        this.elementRadiusy = Math.ceil(this.canvas.height / this.ycells / 2);

        this.currentShape = 1;
        this.shapeLimit = this.xcells * this.ycells;
        this.shapeCount = 0;

        this.board = [];
        this.lineWidth = (this.canvas.width + this.canvas.height) / 2 * .02;

        this.canvas.addEventListener('click', this.onCanvasClick.bind(this), false);
        document.getElementById("reset").onclick = this.reset.bind(this);
    }

    _createClass(TicTacToe, [{
        key: 'getCellToUse',
        value: function getCellToUse(v, q) {
            var i = q;
            var p = 0;
            while (i < v) {
                p++;
                i = i + q;
            }
            return p;
        }
    }, {
        key: 'onCanvasClick',
        value: function onCanvasClick(e) {
            if (this.shapeCount > this.shapeLimit) {
                this.reset();
                return;
            }

            if (this.shapeCount == this.shapeLimit) {

                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.ctx.font = "30px Arial";
                this.ctx.textAlign = "center";
                this.ctx.fillText("Game Over", this.canvas.width / 2, this.canvas.height / 2 - 15);
                this.ctx.font = "15px Arial";
                this.ctx.fillText("Click to try Again", this.canvas.width / 2, this.canvas.height / 2 + 5);

                this.shapeCount++;
                return;
            }

            var pos = this.getMousePos(e);

            var getCoord = function getCoord(pos, size) {
                return Math.floor(pos / size);
            };

            var cposx = getCoord(pos.x, this.elementWidth);
            var cposy = getCoord(pos.y, this.elementHeight);

            var placeX = cposx * this.elementWidth;
            var placeY = cposy * this.elementHeight;

            if (this.board[cposx][cposy] < 0) {
                this.board[cposx][cposy] = this.currentShape;
                this.drawNextShape(placeX, placeY);
                this.currentShape = this.currentShape == 0 ? 1 : 0;
            }
            this.printConsoleBoard();
        }
    }, {
        key: 'printConsoleBoard',
        value: function printConsoleBoard() {
            var table = '';
            for (var y = 0; y < this.ycells; y++) {
                var row = "[";
                for (var x = 0; x < this.xcells; x++) {
                    row += this.board[x][y] + ",";
                }
                row += "]\n";
                table += row;
            }
            console.log(table);
        }
    }, {
        key: 'initBoard',
        value: function initBoard() {
            this.board = [];
            for (var x = 0; x < this.xcells; x++) {
                this.board.push([]);
                for (var y = 0; y < this.ycells; y++) {
                    this.board[x].push(-1);
                }
            }
        }
    }, {
        key: 'draw',
        value: function draw() {
            if (this.canvas.getContext) {

                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.initBoard();
                this.currentShape = 1;
                this.shapeCount = 0;

                var mesh = new _mesh2.default(this.xcells, this.ycells, this.canvas.width, this.canvas.height, this.lineWidth / 2);
                mesh.paint(this.ctx);
            }
        }
    }, {
        key: 'getMousePos',
        value: function getMousePos(evt) {
            var rect = this.canvas.getBoundingClientRect();
            return {
                x: evt.clientX - rect.left,
                y: evt.clientY - rect.top
            };
        }
    }, {
        key: 'drawNextShape',
        value: function drawNextShape(x, y) {

            if (this.currentShape == 1) {
                var cross = new _cross2.default(x, y, this.elementWidth, this.elementHeight, this.lineWidth);
                cross.paint(this.ctx);
            } else {
                var circle = new _circle2.default(x, y, this.elementRadiusx, this.elementRadiusy, this.lineWidth);
                circle.paint(this.ctx);
            }
            this.shapeCount++;
        }
    }, {
        key: 'reset',
        value: function reset() {
            this.draw();
        }
    }]);

    return TicTacToe;
}();

exports.default = TicTacToe;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Circle = function () {
    function Circle(x, y, radiusx, radiusy, lineWidth) {
        _classCallCheck(this, Circle);

        this.x = x;
        this.y = y;
        this.radiusx = radiusx;
        this.radiusy = radiusy;
        this.lineWidth = lineWidth || 10;
        this.offset = this.lineWidth * 1.2;
        this.radiusOffsetx = this.radiusx - this.offset;
        this.radiusOffsety = this.radiusy - this.offset;
    }

    _createClass(Circle, [{
        key: "paint",
        value: function paint(ctx) {
            ctx.strokeStyle = "rgb(0,0,0)";
            ctx.lineWidth = this.lineWidth;
            ctx.beginPath();

            for (var i = 0; i < 2 * Math.PI + 1; i += 0.1) {

                var xPos = this.x + this.radiusx - this.radiusOffsetx * Math.cos(i);
                var yPos = this.y + this.radiusy + this.radiusOffsety * Math.sin(i);

                if (i == 0) {
                    ctx.moveTo(xPos, yPos);
                } else {
                    ctx.lineTo(xPos, yPos);
                }
            }

            ctx.stroke();
        }
    }]);

    return Circle;
}();

exports.default = Circle;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Cross = function () {
    function Cross(x, y, width, height, lineWidth) {
        _classCallCheck(this, Cross);

        this.lineWidth = lineWidth || 10;
        this.offset = this.lineWidth * 1.2;
        this.x = x + this.offset;
        this.y = y + this.offset;
        this.width = width - this.offset * 2;
        this.height = height - this.offset * 2;
    }

    _createClass(Cross, [{
        key: "paint",
        value: function paint(ctx) {
            ctx.strokeStyle = "rgb(0,0,0)";
            ctx.lineWidth = this.lineWidth;
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x + this.width, this.y + this.height);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(this.x + this.width, this.y);
            ctx.lineTo(this.x, this.y + this.height);
            ctx.stroke();
        }
    }]);

    return Cross;
}();

exports.default = Cross;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Mesh = function () {
    function Mesh(cellsx, cellsy, width, height, lineWidth) {
        _classCallCheck(this, Mesh);

        this.cellsx = cellsx;
        this.cellsy = cellsy;
        this.width = width;
        this.height = height;
        this.lineWidth = lineWidth || 5;

        this.countVLines = cellsx - 1;
        this.countHLines = cellsy - 1;
        this.cellwidth = Math.ceil(width / cellsx);
        this.cellheight = Math.ceil(height / cellsy);
    }

    _createClass(Mesh, [{
        key: "paint",
        value: function paint(ctx) {
            for (var x = 0, xpos = this.cellwidth; x < this.countVLines; x++, xpos = xpos + this.cellwidth) {
                ctx.strokeStyle = "rgb(0,0,0)";
                ctx.lineWidth = this.lineWidth;
                ctx.beginPath();
                ctx.moveTo(xpos, 5);
                ctx.lineTo(xpos, this.height - 5);
                ctx.stroke();
            }

            for (var y = 0, ypos = this.cellheight; y < this.countHLines; y++, ypos = ypos + this.cellheight) {
                ctx.strokeStyle = "rgb(0,0,0)";
                ctx.lineWidth = this.lineWidth;
                ctx.beginPath();
                ctx.moveTo(5, ypos);
                ctx.lineTo(this.width - 5, ypos);
                ctx.stroke();
            }
        }
    }]);

    return Mesh;
}();

exports.default = Mesh;

/***/ })
/******/ ]);