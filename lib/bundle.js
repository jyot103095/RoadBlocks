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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/roadBlocks.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/game.js":
/*!*********************!*\
  !*** ./lib/game.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _snake__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./snake */ "./lib/snake.js");


class Game {
  constructor() {
    this.snake = new _snake__WEBPACK_IMPORTED_MODULE_0__["default"]();
  }

  moveSnake(e) {
    debugger
    let relativeX = e.clientX;
    let positionX;
    if(relativeX > 0 && relativeX < 450) {
      positionX = relativeX - 5;
      this.snake.positionX = positionX;
    }
  }

  draw(ctx) {
    ctx.clearRect(0, 0, 450, 650);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 450, 650);
    this.snake.draw(ctx);
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Game);


/***/ }),

/***/ "./lib/gameView.js":
/*!*************************!*\
  !*** ./lib/gameView.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class GameView {
  constructor(game, ctx) {
    this.game = game;
    this.ctx = ctx;
  }

  start() {
    this.lastTime = 0;
    requestAnimationFrame(this.animate.bind(this));
  }

  animate(time) {
    const timeDelta = time - this.lastTime;
    debugger
    this.game.draw(this.ctx);
    this.lastTime = time;
    requestAnimationFrame(this.animate.bind(this));
  }
}

/* harmony default export */ __webpack_exports__["default"] = (GameView);


/***/ }),

/***/ "./lib/roadBlocks.js":
/*!***************************!*\
  !*** ./lib/roadBlocks.js ***!
  \***************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ "./lib/game.js");
/* harmony import */ var _gameView__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gameView */ "./lib/gameView.js");



document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementsByTagName("canvas")[0];
  canvasEl.width = 450;
  canvasEl.height = 650;
  const ctx = canvasEl.getContext("2d");
  const game = new _game__WEBPACK_IMPORTED_MODULE_0__["default"]();
  const gameView = new _gameView__WEBPACK_IMPORTED_MODULE_1__["default"](game, ctx);
  document.addEventListener("mousemove", game.moveSnake);
  gameView.start();
});


/***/ }),

/***/ "./lib/snake.js":
/*!**********************!*\
  !*** ./lib/snake.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class Snake {
  constructor() {
    this.length = 4;
    this.positionX = 225;
  }

  draw(ctx, positionX) {
    ctx.fillStyle = "#FF0000";

    ctx.beginPath();
    ctx.arc(
      this.positionX, 450, 10, 0, 2 * Math.PI, true
    );
    ctx.fill();
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Snake);


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map