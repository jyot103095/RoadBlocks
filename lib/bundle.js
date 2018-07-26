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

/***/ "./lib/block.js":
/*!**********************!*\
  !*** ./lib/block.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class Block {
  constructor(positionX) {
    this.positionX = positionX;
    this.value = 3;
    this.positionY = -5;
    this.velocityY = 2;
    this.width = 50;
    this.radius = 10;
    this.move = this.move.bind(this);
  }

  move() {
    this.positionY += this.velocityY;
  }

  draw(ctx) {
    this.move();

    ctx.fillStyle = "#00ffff";
    ctx.beginPath();
    ctx.moveTo(this.positionX + this.radius, this.positionY);
    ctx.lineTo(this.positionX + this.width - this.radius, this.positionY);
    ctx.quadraticCurveTo(this.positionX + this.width, this.positionY, this.positionX + this.width, this.positionY + this.radius);
    ctx.lineTo(this.positionX + this.width, this.positionY + this.width - this.radius);
    ctx.quadraticCurveTo(this.positionX + this.width, this.positionY + this.width, this.positionX + this.width - this.radius, this.positionY + this.width);
    ctx.lineTo(this.positionX + this.radius, this.positionY + this.width);
    ctx.quadraticCurveTo(this.positionX, this.positionY + this.width, this.positionX, this.positionY + this.width - this.radius);
    ctx.lineTo(this.positionX, this.positionY + this.radius);
    ctx.quadraticCurveTo(this.positionX, this.positionY, this.positionX + this.radius, this.positionY);
    ctx.closePath();
    ctx.fill();
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Block);


/***/ }),

/***/ "./lib/game.js":
/*!*********************!*\
  !*** ./lib/game.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _snake__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./snake */ "./lib/snake.js");
/* harmony import */ var _lengthBall__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lengthBall */ "./lib/lengthBall.js");
/* harmony import */ var _block__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./block */ "./lib/block.js");




class Game {
  constructor() {
    this.snake = new _snake__WEBPACK_IMPORTED_MODULE_0__["default"]();
    this.objects = [ new _lengthBall__WEBPACK_IMPORTED_MODULE_1__["default"](204), new _block__WEBPACK_IMPORTED_MODULE_2__["default"](400) ];
  }

  moveSnake(e, canvas) {
    let relativeX = e.clientX - canvas.offsetLeft;
    let positionX;
    if(relativeX >= 15 && relativeX <= 435) {
      positionX = relativeX;
      this.snake.velocityX = 0;
      this.snake.positionX = positionX;
    } else if (relativeX < 15) {
      this.snake.velocityX = -1;
    } else {
      this.snake.velocityX = 1;
    }
  }

  calculateDistance(object) {
    let snakePosX = this.snake.positionX;
    let snakePosY = this.snake.positionY;
    let objPosX = object.positionX;
    let objPosY = object.positionY;
    return Math.sqrt((snakePosX - objPosX)**2 + (snakePosY - objPosY)**2);
  }

  collisionDetection() {
    this.objects.forEach((obj, idx) => {
      let distance = this.calculateDistance(obj);
      if (obj instanceof _lengthBall__WEBPACK_IMPORTED_MODULE_1__["default"]) {
        if (distance < this.snake.radius + obj.radius) {
          this.snake.addLength(obj.value);
          this.objects.splice(idx, 1);
        }
      } else if (obj instanceof _block__WEBPACK_IMPORTED_MODULE_2__["default"]) {
        
      }
    });
  }

  draw(ctx) {
    ctx.clearRect(0, 0, 450, 600);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 450, 600);

    this.snake.draw(ctx);
    this.objects.forEach(obj => obj.draw(ctx));

    this.collisionDetection();
    this.snake.move();
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
    this.game.draw(this.ctx);
    this.lastTime = time;
    requestAnimationFrame(this.animate.bind(this));
  }
}

/* harmony default export */ __webpack_exports__["default"] = (GameView);


/***/ }),

/***/ "./lib/lengthBall.js":
/*!***************************!*\
  !*** ./lib/lengthBall.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class LengthBall {
  constructor(positionX) {
    this.positionX = positionX;
    this.positionY = -5;
    this.radius = 10;
    this.value = 5;
    this.velocityY = 2;
  }

  draw(ctx) {
    this.positionY += this.velocityY;
    ctx.fillStyle = "blue";

    ctx.beginPath();
    ctx.arc(
      this.positionX, this.positionY, this.radius, 0, 2 * Math.PI, true
    );
    ctx.fill();
  }
}

/* harmony default export */ __webpack_exports__["default"] = (LengthBall);


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
  canvasEl.height = 600;
  const ctx = canvasEl.getContext("2d");
  const game = new _game__WEBPACK_IMPORTED_MODULE_0__["default"]();
  const gameView = new _gameView__WEBPACK_IMPORTED_MODULE_1__["default"](game, ctx);
  let prevPos;
  document.addEventListener("mousemove", (e) => {
    if (!prevPos) {
      prevPos = e.clientX;
      game.moveSnake(e, canvasEl);
    } else if (!Math.abs(prevPos - e.clientX) < 3) {
      prevPos = e.clientX;
      game.moveSnake(e, canvasEl);
    }
  });
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
/* harmony import */ var _tail_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tail_element */ "./lib/tail_element.js");


class Snake {
  constructor() {
    this.length = 4;
    this.tail = this.generateTail();
    this.positionX = 225;
    this.positionY = 400;
    this.radius = 15;
    this.velocityX = 0;
    // this.velocityY = -1;
    // this.moveTail = this.moveTail.bind(this);
    this.generateTail.bind(this);
  }

  generateTail() {
    const tailElements = [];

    for (let i = 0; i < this.length; i++) {
      let positionY = this.positionY + (i * 30);
      tailElements.push(new _tail_element__WEBPACK_IMPORTED_MODULE_0__["default"](this.positionX, positionY));
    }

    return tailElements;
  }

  addLength(value) {
    this.length += value;
    this.tail = this.generateTail();
  }

  updatePosition() {
    if (this.positionX + this.velocityX >= 15 && this.positionX + this.velocityX <= 435) {
      this.positionX += this.velocityX;
    }
  }

  move() {
    let head = this.tail[0];
    head.prevPos = head.positionX;
    this.updatePosition();
    head.positionX = this.positionX;

    for (let i = 1; i < this.length; i++) {
      // this.tail[i].prevPos = this.tail[i].positionX;
      // this.tail[i].positionX = this.tail[i - 1].prevPos;

      let tailEl = this.tail[i];
      let prevEl = this.tail[i - 1];
      let distance = Math.sqrt((tailEl.positionX - prevEl.positionX)**2);
      let speed = Math.abs(tailEl.positionX - prevEl.positionX) / 2;

      if(distance < speed) {
        tailEl.positionX = prevEl.positionX;
      }
      else if(tailEl.positionX > prevEl.positionX && (tailEl.positionX - speed) >= 15) {
        tailEl.positionX -= speed;
      }
      else if(tailEl.positionX < prevEl.positionX && (tailEl.positionX - speed) <= 435) {
        tailEl.positionX += speed;
      }
    }
  }

  draw(ctx) {
    this.tail.forEach(el => el.draw(ctx));
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Snake);


/***/ }),

/***/ "./lib/tail_element.js":
/*!*****************************!*\
  !*** ./lib/tail_element.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class TailElement {
  constructor(positionX, positionY) {
    this.positionX = positionX;
    this.positionY = positionY;
    this.prevPos = null;
    this.radius = 15;
    // this.toPosition = null;
  }

  // move() {
  //   if (this.toPosition) {
  //     if (this.toPosition > this.positionX) {
  //       this.positionX += 1;
  //     } else if (this.toPosition < this.positionX) {
  //       this.positionX -= 1;
  //     }
  //   }
  // }

  draw(ctx) {
    ctx.fillStyle = "#FF0000";

    ctx.beginPath();
    ctx.arc(
      this.positionX, this.positionY, this.radius, 0, 2 * Math.PI, true
    );
    ctx.fill();
  }
}

/* harmony default export */ __webpack_exports__["default"] = (TailElement);


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map