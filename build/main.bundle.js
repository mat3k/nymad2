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


var _game = __webpack_require__(1);

var _game2 = _interopRequireDefault(_game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.onload = function () {
  var game = new _game2.default();
  game.draw();
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _player = __webpack_require__(2);

var _player2 = _interopRequireDefault(_player);

var _demo_island = __webpack_require__(3);

var _demo_island2 = _interopRequireDefault(_demo_island);

var _utils = __webpack_require__(4);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
  function Game() {
    _classCallCheck(this, Game);

    this.context = this.init_drawing();
    this.map = new _demo_island2.default();
    this.player = new _player2.default('Zoltung', 0, 0);
  }

  _createClass(Game, [{
    key: 'update',
    value: function update() {}
  }, {
    key: 'draw',
    value: function draw() {
      this.draw_world_map();
    }
  }, {
    key: 'draw_world_map',
    value: function draw_world_map() {
      var _this = this;

      var board = this.map.board();
      this.context.lineWidth = 1;
      this.context.strokeStyle = "red";

      board.forEach(function (row, y) {
        row.forEach(function (_, x) {
          var sprite = _this.map.board()[y][x];
          var sx = sprite[0];
          var sy = sprite[1];
          (0, _utils2.default)(_this.context, _this.map.sprites, sx, sy, x * 32, y * 32);
        });
      });
    }
  }, {
    key: 'init_drawing',
    value: function init_drawing() {
      return document.getElementById("game").getContext('2d');
    }
  }]);

  return Game;
}();

exports.default = Game;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Player = function Player(name) {
  _classCallCheck(this, Player);

  this.name = name;
};

exports.default = Player;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DemoIsland = function () {
  function DemoIsland() {
    _classCallCheck(this, DemoIsland);

    this.name = 'Demo Island';
    this.width = 6;
    this.height = 6;
    this.sprites = this.get_sprites();
  }

  _createClass(DemoIsland, [{
    key: 'board',
    value: function board() {
      return [[[0, 2], [1, 2], [1, 2], [1, 2], [1, 2], [2, 2]], [[0, 3], [1, 3], [1, 3], [1, 3], [1, 3], [2, 3]], [[0, 3], [1, 3], [1, 3], [1, 3], [1, 3], [2, 3]], [[0, 3], [1, 3], [1, 3], [1, 3], [1, 3], [2, 3]], [[0, 3], [1, 3], [1, 3], [1, 3], [1, 3], [2, 3]], [[0, 4], [1, 4], [1, 4], [1, 4], [1, 4], [2, 4]]];
    }
  }, {
    key: 'get_sprites',
    value: function get_sprites() {
      var image = new Image(32, 32);
      image.src = 'build/assets/wiptiles.png';
      return image;
    }
  }, {
    key: 'sprites',
    value: function sprites() {
      return this.sprites;
    }
  }]);

  return DemoIsland;
}();

exports.default = DemoIsland;
;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = draw_sprite;
function draw_sprite(ctx, image, sx, sy, dx, dy) {
  ctx.drawImage(image, sx * 32, sy * 32, 32, 32, dx, dy, 32, 32);
}

/***/ })
/******/ ]);
//# sourceMappingURL=main.bundle.js.map