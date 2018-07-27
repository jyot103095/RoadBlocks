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
    this.value = 15;
    this.positionY = 100;
    this.width = 50;
    this.radius = 10;
    // this.move = this.move.bind(this);
  }

  // move() {
  //   this.positionY += this.velocityY;
  // }

  draw(ctx, velocity) {
    this.positionY += velocity;

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
    this.inCollision = false;
    this.collidingObj = null;
    this.velocity = 2;
    this.objects = [ new _lengthBall__WEBPACK_IMPORTED_MODULE_1__["default"](204, this.velocity), new _block__WEBPACK_IMPORTED_MODULE_2__["default"](400, this.velocity) ];
  }

  moveSnake(e, canvas) {
    let relativeX = e.clientX - canvas.offsetLeft;
    let positionX;
    if(relativeX >= 10 && relativeX <= 440) {
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
    if (this.inCollision) {
      if (!(this.snake.positionX > this.collidingObj.positionX && this.snake.positionX < (this.collidingObj.positionX + this.collidingObj.width))) {
        this.inCollision = false;
        this.collidingObj = null;
      }
    }
    for (let i = 0; i < this.objects.length; i++) {
      let obj = this.objects[i];
      if (obj instanceof _lengthBall__WEBPACK_IMPORTED_MODULE_1__["default"]) {
        let distance = this.calculateDistance(obj);
        if (distance < this.snake.radius + obj.radius) {
          this.snake.addLength(obj.value);
          this.objects.splice(i, 1);
        }
      } else if (obj instanceof _block__WEBPACK_IMPORTED_MODULE_2__["default"]) {
        if ((10 + obj.width + obj.positionY) === this.snake.positionY) {
          if (this.snake.positionX > obj.positionX && this.snake.positionX < (obj.positionX + obj.width)) {
            this.handleBlockCollision(obj, i);
            break;
          }
        }
      }
    }
  }

  handleBlockCollision(obj, i) {
    this.snake.removeHead();
    obj.value--;
    if (obj.value === 0) {
      this.objects.splice(i, 1);
    } else {
      this.collidingObj = obj;
      this.inCollision = true;
    }
    this.snake.velocityY = -this.velocity;
  }

  draw(ctx) {
    if (this.inCollision) {
      this.velocity = 0;
    } else {
      this.velocity = 2;
    }

    ctx.clearRect(0, 0, 450, 600);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 450, 600);

    this.snake.draw(ctx);
    this.objects.forEach(obj => obj.draw(ctx, this.velocity));

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
    // this.velocityY = velocityY;
  }

  draw(ctx, velocity) {
    this.positionY += velocity;
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
  document.addEventListener("mousemove", (e) => {
    game.moveSnake(e, canvasEl);
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
    this.length = 10;
    this.positionX = 225;
    this.positionY = 400;
    this.radius = 10;
    this.velocityX = 0;
    this.velocityY = 0;
    this.tail = this.generateTail();
    // this.velocityY = -1;
    // this.moveTail = this.moveTail.bind(this);
    this.generateTail.bind(this);
  }

  generateTail() {
    const tailElements = [];

    for (let i = 0; i < this.length; i++) {
      let positionY = this.positionY + (i * 20);
      tailElements.push(new _tail_element__WEBPACK_IMPORTED_MODULE_0__["default"](this.positionX, positionY));
    }

    return tailElements;
  }

  addLength(value) {
    this.length += value;
    this.tail = this.generateTail();
  }

  removeHead() {
    this.length--;
    this.tail.shift();
    this.positionY = this.tail[0].positionY;
  }

  updatePosition() {
    if (this.positionX + this.velocityX >= 10 && this.positionX + this.velocityX <= 440) {
      this.positionX += this.velocityX;
    }

    if (this.positionY > 400) {
      this.positionY += this.velocityY;
    } else {
      this.velocityY = 0;
    }
  }

  move() {
    this.updatePosition();
    let head = this.tail[0];
    head.positionX = this.positionX;
    head.positionY = this.positionY;

    for (let i = 1; i < this.length; i++) {
      let tailEl = this.tail[i];
      let prevEl = this.tail[i - 1];
      let distance = Math.sqrt((tailEl.positionX - prevEl.positionX)**2);
      let velocityX = Math.abs(tailEl.positionX - prevEl.positionX) / 2;

      if(distance < velocityX) {
        tailEl.positionX = prevEl.positionX;
      }
      else if(tailEl.positionX > prevEl.positionX && (tailEl.positionX - velocityX) >= 10) {
        tailEl.positionX -= velocityX;
      }
      else if(tailEl.positionX < prevEl.positionX && (tailEl.positionX - velocityX) <= 440) {
        tailEl.positionX += velocityX;
      }

      tailEl.positionY += this.velocityY;
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
    this.prevYPos = null;
    this.radius = 10;
  }

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