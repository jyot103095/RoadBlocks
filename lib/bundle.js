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
  constructor(positionX, value) {
    this.positionX = positionX;
    this.value = value;
    this.positionY = -92;
    this.width = 90;
    this.radius = 10;
  }

  getColor() {
    if(this.value === 1) {
      return '#69F0AE';
    } else if(this.value <= 4) {
      return '#00E676';
    } else if(this.value <= 8) {
      return '#00C853';
    } else if (this.value <= 12) {
      return '#FFD54F';
    } else if(this.value <= 16) {
      return '#FFCA28';
    } else if(this.value <= 20) {
      return '#FF8F00';
    } else if(this.value >= 21) {
      return '#D84315';
    }
  }

  draw(ctx, velocity) {
    this.positionY += velocity;

    ctx.fillStyle = this.getColor();
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
    ctx.font = "20px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText(`${this.value}`, this.positionX + (this.width / 2), this.positionY + this.radius + (this.width / 2));
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
/* harmony import */ var _lengthPoints__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lengthPoints */ "./lib/lengthPoints.js");
/* harmony import */ var _block__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./block */ "./lib/block.js");




class Game {
  constructor() {
    this.snake = new _snake__WEBPACK_IMPORTED_MODULE_0__["default"]();
    this.inCollision = false;
    this.collidingObj = null;
    this.velocity = 2;
    this.lengthPoints = [ new _lengthPoints__WEBPACK_IMPORTED_MODULE_1__["default"](45, 2), new _lengthPoints__WEBPACK_IMPORTED_MODULE_1__["default"](225, 5) ];
    this.blocks = [ new _block__WEBPACK_IMPORTED_MODULE_2__["default"](0, 1), new _block__WEBPACK_IMPORTED_MODULE_2__["default"](90, 1), new _block__WEBPACK_IMPORTED_MODULE_2__["default"](180, 1), new _block__WEBPACK_IMPORTED_MODULE_2__["default"](270, 2), new _block__WEBPACK_IMPORTED_MODULE_2__["default"](360, 1) ];
  }

  getHighestBlock() {
    let highest = this.blocks[0];

    for (let i = 1; i < this.blocks.length; i++) {
      if (this.blocks[i].positionY < highest.positionY) {
        highest = this.blocks[i];
      }
    }

    return highest;
  }

  generateBlocks() {
    const blockPositions = [0, 90, 180, 270, 360];
    let numBlocks = this.getRandomNumber();
    let positionsArr = [];

    let i = 0;
    while (i < 5) {
      let newPosIdx = this.getRandomIndex();
      if (!positionsArr.includes(blockPositions[newPosIdx])) {
        positionsArr.push(blockPositions[newPosIdx]);
        i++;
      }
    }

    let lowBlockValue = Math.floor((Math.random() * 10) + 1);
    let lowValueBlock = new _block__WEBPACK_IMPORTED_MODULE_2__["default"](positionsArr[0], lowBlockValue);

    this.blocks.push(lowValueBlock);

    positionsArr.slice(1).forEach(pos => {
      let newBlock = new _block__WEBPACK_IMPORTED_MODULE_2__["default"](pos, this.getRandomBlockValue());
      this.blocks.push(newBlock);
    });
  }

  getRandomIndex() {
    return Math.floor(Math.random() * 5);
  }

  getRandomBlockValue() {
    return Math.floor((Math.random() * 40) + 1);
  }

  getRandomNumber() {
    return Math.floor((Math.random() * 6));
  }

  generateLengthPoints() {
    const pointPositions = [45, 135, 225, 315, 405];
    let newPointPos = pointPositions[this.getRandomIndex()];
    let newLengthPoint = new _lengthPoints__WEBPACK_IMPORTED_MODULE_1__["default"](newPointPos, this.getRandomPointValue());

    this.lengthPoints.push(newLengthPoint);
  }

  getHighestPoint() {
    let highest = this.lengthPoints[0];

    for (let i = 1; i < this.lengthPoints.length; i++) {
      if (this.lengthPoints[i].positionY < highest.positionY) {
        highest = this.lengthPoints[i];
      }
    }

    return highest;
  }

  getRandomPointValue() {
   return Math.floor((Math.random() * 5) + 1); 
  }

  moveSnake(e, canvas) {
    let relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX >= 10 && relativeX <= 440) {
      this.snake.velocityX = 0;
      this.snake.nextPosition = relativeX;
    } else if (relativeX < 10) {
      this.snake.velocityX = -1;
    } else {
      this.snake.velocityX = 1;
    }
  }

  calculateDistance(object) {
    let dX = this.snake.tail[0].positionX - object.positionX;
    let dY = this.snake.positionY - object.positionY;
    return Math.sqrt((dX * dX) + (dY * dY));
  }

  collisionDetection() {
    if (this.inCollision) {
      let stillColliding = false;
      this.blocks.forEach(block => {
        if (this.snake.tail[0].positionX >= block.positionX && this.snake.tail[0].positionX <= (block.positionX + block.width)) {
          stillColliding = true;
        }
      });
      this.inCollision = stillColliding;
    }

    this.checkPoints();
    this.checkBlocks();
  }

  checkPoints() {
    for (let i = 0; i < this.lengthPoints.length; i++) {
      let point = this.lengthPoints[i];
      let distance = this.calculateDistance(point);
      if (distance < this.snake.radius + point.radius) {
        this.snake.addLength(point.value);
        this.lengthPoints.splice(i, 1);
      }
    }
  }

  checkBlocks() {
    for (let i = 0; i < this.blocks.length; i++) {
      let block = this.blocks[i];
      if (block.positionY > 600) {
        this.blocks.splice(i, 1);
        break;
      }

      if ((10 + block.width + block.positionY) === this.snake.positionY) {
        if (this.snake.tail[0].positionX >= block.positionX && this.snake.tail[0].positionX <= (block.positionX + block.width)) {
          this.handleBlockCollision(block, i);
          break;
        }
      }
    }
  }

  handleBlockCollision(obj, i) {
    obj.value--;
    this.snake.removeHead();
    if (obj.value === 0) {
      this.blocks.splice(i, 1);
      this.inCollision = false;
    } else {
      this.inCollision = true;
    }
    this.snake.velocityY = -2;
  }

  over() {
    return this.snake.length === 0;
  }


  draw(ctx) {
    if (this.inCollision) {
      this.velocity = 0;
    } else {
      this.velocity = 4;
    }

    ctx.clearRect(0, 0, 450, 600);

    this.snake.draw(ctx);
    this.blocks.forEach(block => block.draw(ctx, this.velocity));
    this.lengthPoints.forEach(point => point.draw(ctx, this.velocity));

    if (this.snake.length > 0) {
      this.collisionDetection();
      this.snake.move(this.blocks);
    }

    if (this.getHighestBlock() && this.getHighestBlock().positionY > 360) {
      this.generateBlocks();
    }

    if (this.getHighestPoint() && this.getHighestPoint().positionY > 180) {
      this.generateLengthPoints();
    }
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
    this.animation = null;
  }

  start() {
    this.lastTime = 0;
    this.animation = window.requestAnimationFrame(this.animate.bind(this));
  }

  animate(time) {
    const timeDelta = time - this.lastTime;
    if (this.game.over()) {
      window.cancelAnimationFrame(this.animation);
      this.game.draw(this.ctx);
      return;
    } else {
      this.game.draw(this.ctx);
    }
    this.lastTime = time;
    window.requestAnimationFrame(this.animate.bind(this));
  }
}

/* harmony default export */ __webpack_exports__["default"] = (GameView);


/***/ }),

/***/ "./lib/lengthPoints.js":
/*!*****************************!*\
  !*** ./lib/lengthPoints.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class LengthPoint {
  constructor(positionX, value) {
    this.positionX = positionX;
    this.positionY = -5;
    this.radius = 10;
    this.value = value;
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
    ctx.font = "12px Arial";
    ctx.fillStyle = "white";
    ctx.fillText(`${this.value}`, this.positionX, this.positionY + 5);
  }
}

/* harmony default export */ __webpack_exports__["default"] = (LengthPoint);


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
    game.moveSnake.call(game, e, canvasEl);
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
    this.nextPosition = 225;
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
    if (this.tail[0]) {
      this.positionY = this.tail[0].positionY;
    }
  }

  updatePosition() {
    if (this.positionX + this.velocityX >= 10 && this.positionX + this.velocityX <= 440) {
      this.nextPosition += this.velocityX;
    }

    if (this.positionY > 400) {
      this.positionY += this.velocityY;
    } else {
      this.velocityY = 0;
    }
  }

  move(blocks) {
    this.updatePosition();
    let head = this.tail[0];
    if (head) {
      head.updateHorizontalPosition(this.nextPosition, blocks);
      head.positionY = this.positionY;
    }

    for (let i = 1; i < this.length; i++) {
      let tailEl = this.tail[i];
      let prevEl = this.tail[i - 1];
      let distance = tailEl.positionX - prevEl.positionX;
      let velocityX = Math.abs(tailEl.positionX - prevEl.positionX) / 2;

      if (tailEl.positionX < prevEl.positionX) {
        let newPosition = tailEl.positionX + velocityX;
        tailEl.updateHorizontalPosition(newPosition, blocks);
      } else if (tailEl.positionX > prevEl.positionX) {
        let newPosition = tailEl.positionX - velocityX;
        tailEl.updateHorizontalPosition(newPosition, blocks);
      }


      tailEl.positionY += this.velocityY;
    }
  }

  draw(ctx) {
    let head = this.tail[0];

    if (head) {
      head.draw(ctx);
      ctx.font = "12px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText(`${this.length}`, head.positionX, head.positionY + 4);
    }


    this.tail.slice(1).forEach(el => el.draw(ctx));
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

  updateHorizontalPosition(position, blocks) {
    let newPosition = this.getHorizontalPosition(position, blocks);

    if (newPosition >= 10 && newPosition <= 440) {
      this.positionX = newPosition;
    }
  }

  getHorizontalPosition(position, blocks) {
    let newPosition = position;
    if (position < this.positionX) {
      newPosition = this.checkLeft(position, blocks);
    } else if (newPosition > this.positionX) {
      newPosition = this.checkRight(position, blocks);
    }

    return newPosition;
  }

  checkLeft(position, blocks) {
    let newPosition = position;
    let filteredBlocks = blocks.filter(block => block.positionX < this.positionX);
    if (filteredBlocks.length > 0) {
      let endBlock = filteredBlocks.reduce((end, block) => block.positionX > end.positionX ? block : end);
      if ((this.positionY - 10) < (endBlock.positionY + endBlock.width) && (this.positionY + 10) > endBlock.positionY) {
        if (newPosition <= endBlock.positionX + endBlock.width) {
          newPosition = endBlock.positionX + endBlock.width + 10;
        }
      }
    }

    return newPosition;
  }

  checkRight(position, blocks) {
    let newPosition = position;
    let filteredBlocks = blocks.filter(block => block.positionX > this.positionX);
    if (filteredBlocks.length > 0) {
      let endBlock = filteredBlocks.reduce((end, block) => block.positionX < end.positionX ? block : end);
      if ((this.positionY - 10) < (endBlock.positionY + endBlock.width) && (this.positionY + 10) > endBlock.positionY) {
        if (newPosition >= endBlock.positionX) {
          newPosition = endBlock.positionX - 10;
        }
      }
    }

    return newPosition;
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