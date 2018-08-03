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
    let rgb = [255, 0, 0];
    if (this.value >= 45) {
      return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
    } else if (this.value >= 30) {
      rgb[1] = (45 - this.value) * 17;
      return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
    } else if (this.value >= 15) {
      rgb[1] = 255;
      rgb[0] = (this.value - 15) * 17;
      return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
    } else {
      rgb[0] = 0;
      rgb[1] = 255;
      rgb[2] = (15 - this.value) * 17;
      return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
    }
  }

  draw(ctx, velocity) {
    this.positionY += velocity;

    ctx.strokeStyle = this.getColor();
    // ctx.strokeStyle = "black";
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
    ctx.stroke();
    // ctx.stroke();
    ctx.font = "bold 20px Arial";
    ctx.fillStyle = this.getColor();
    ctx.textAlign = "center";
    ctx.fillText(`${this.value}`, this.positionX + (this.width / 2), this.positionY + this.radius + (this.width / 2));
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Block);


/***/ }),

/***/ "./lib/break.js":
/*!**********************!*\
  !*** ./lib/break.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _particle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./particle */ "./lib/particle.js");


class Break {
	constructor(posX, posY, color) {
		this.posX = posX;
		this.posY = posY;
		this.color = color;
		this.particles = this.generateParticles();
	}

	generateParticles() {
		let particles = [];
		
		for (let i = 0; i < 10; i++) {
			let randX = (Math.random() * 10) - (Math.random() * 10);
			let randY = (Math.random() * 10) - (Math.random() * 10);
			particles.push(new _particle__WEBPACK_IMPORTED_MODULE_0__["default"](this.posX, this.posY, randX, randY, this.color));
		}

		return particles;
	}

	move() {
		this.particles.forEach((particle, idx) => {
			particle.move();
			if (particle.alpha <= 0) {
				this.particles.splice(idx, 1);
			}
		});
	}

	draw(ctx) {
		this.move();
		this.particles.forEach(particle => particle.draw(ctx));
	}
}

/* harmony default export */ __webpack_exports__["default"] = (Break);

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
/* harmony import */ var _break__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./break */ "./lib/break.js");





class Game {
  constructor() {
    this.snake = new _snake__WEBPACK_IMPORTED_MODULE_0__["default"]();
    this.inCollision = false;
    this.collidingObj = null;
    this.velocity = 2;
    this.score = 0;
    this.lengthPoints = [ new _lengthPoints__WEBPACK_IMPORTED_MODULE_1__["default"](45, 2), new _lengthPoints__WEBPACK_IMPORTED_MODULE_1__["default"](225, 5) ];
    this.blocks = [ new _block__WEBPACK_IMPORTED_MODULE_2__["default"](1, 1), new _block__WEBPACK_IMPORTED_MODULE_2__["default"](92, 1), new _block__WEBPACK_IMPORTED_MODULE_2__["default"](183, 1), new _block__WEBPACK_IMPORTED_MODULE_2__["default"](274, 2), new _block__WEBPACK_IMPORTED_MODULE_2__["default"](365, 1) ];
    this.breaks = [];
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
    const blockPositions = [1, 92, 183, 274, 365];
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

    let lowBlockValue = Math.floor((Math.random() * this.snake.length) + 1);
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
    return Math.floor((Math.random() * 50) + 1);
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
    if(relativeX >= 15 && relativeX <= 435) {
      this.snake.velocityX = 0;
      this.snake.nextPosition = relativeX;
    } else if (relativeX < 15) {
      this.snake.velocityX = -1;
    } else {
      this.snake.velocityX = 1;
    }
  }

  calculateDistance(object) {
    if (object instanceof _lengthPoints__WEBPACK_IMPORTED_MODULE_1__["default"]) {
      let dX = this.snake.tail[0].positionX - object.positionX;
      let dY = this.snake.positionY - object.positionY;
      return Math.sqrt((dX * dX) + (dY * dY));
    } else {
      let dy = this.snake.positionY - 15 - object.positionY;
      return dy;
    }
  }

  collisionDetection() {
    if (this.inCollision) {
      let stillColliding = false;
      this.blocks.forEach(block => {
        if (this.snake.tail[0].positionX - block.positionX >= 0 && (this.snake.tail[0].positionX - block.positionX) <= block.width) {
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

      if (block.positionY < 0) {
        continue;
      } else if (block.positionY > 700) {
        this.blocks.splice(i, 1);
        break;
      } else if ((block.positionY + block.width) >= 385 && (block.positionY + block.width) <= 400) {
        if (this.calculateDistance(block) <= (block.width + this.snake.radius)) {
          if (this.snake.tail[0].positionX - block.positionX >= 0 && (this.snake.tail[0].positionX - block.positionX) <= block.width) {
            this.handleBlockCollision(block, i);
            break;
          }
        }
      }

    }
  }

  handleBlockCollision(block, i) {
    block.value--;
    this.score++;
    let previousColor = this.snake.tail[0].color;
    this.snake.removeHead();
    this.breaks.push(new _break__WEBPACK_IMPORTED_MODULE_3__["default"](this.snake.positionX, block.positionY + block.width, previousColor));

    if (block.value === 0) {
      this.blocks.splice(i, 1);
      this.inCollision = false;
    } else {
      this.inCollision = true;
    }
    this.snake.velocityY = -(this.velocity * 0.75);
  }

  over() {
    if (this.snake.length === 0) {
      let highScore = localStorage.getItem("highScore");

      if (!highScore) {
        localStorage.highScore = this.score;
      } else if (this.score > highScore) {
        localStorage.highScore = this.score;
      }

      return true;
    }

    return false;
  }

  getVelocity() {
    if (this.score < 15) {
      return 4;
    } else if (this.score < 50) {
      return 4.5;
    } else if (this.score < 150) {
      return 5;
    } else if (this.score < 250) {
      return 5.5;
    } else {
      return 6;
    }
  }

  draw(ctx) {
    let tempVelocity;
    if (this.inCollision) {
      tempVelocity = 0;
    } else {
      tempVelocity = this.velocity;
      this.velocity = this.getVelocity();
    }

    ctx.clearRect(0, 0, 455, 700);

    this.snake.draw(ctx);
    this.blocks.forEach(block => block.draw(ctx, tempVelocity));
    this.lengthPoints.forEach(point => point.draw(ctx, tempVelocity));
    this.breaks.forEach(b => b.draw(ctx));

    if (this.snake.length > 0) {
      this.collisionDetection();
      this.snake.move(this.blocks);
    }

    if (this.getHighestBlock()) {
      let distanceBetween = 450;
      if (this.score > 150) {
        distanceBetween = 300;
      }

      if (this.getHighestBlock().positionY > distanceBetween) {
        this.generateBlocks();
      }        
    }

    if (this.getHighestPoint() && this.getHighestPoint().positionY > 270) {
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
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ "./lib/game.js");


class GameView {
  constructor(canvas, ctx) {
    this.game = new _game__WEBPACK_IMPORTED_MODULE_0__["default"]();
    this.ctx = ctx;
    this.canvas = canvas;
    this.animation = null;
    this.game.draw(this.ctx);
    document.fonts.load("25px Do Hyeon").then(this.drawInitial.bind(this));
    this.isPaused = false;
  }

  start() {
    this.lastTime = 0;
    this.animation = window.requestAnimationFrame(this.animate.bind(this));
    document.addEventListener("mousemove", (e) => {
      this.game.moveSnake.call(this.game, e, this.canvas);
    });
  }

  pause() {
    this.isPaused = !this.isPaused;
    if (!this.isPaused) {
      window.requestAnimationFrame(this.animate.bind(this));
    } else {
      this.drawPaused();
    }
  }

  animate(time) {
    const timeDelta = time - this.lastTime;
    if (this.game.over()) {
      window.cancelAnimationFrame(this.animation);
      this.game.draw(this.ctx);
      let highScore = localStorage.getItem("highScore");
      this.drawGameOver(highScore);
      this.game = new _game__WEBPACK_IMPORTED_MODULE_0__["default"]();
      this.isPaused = true;
      return;
    } else if (this.isPaused) {
      window.cancelAnimationFrame(this.animation);
      return;
    } else {
      this.game.draw(this.ctx);
    }

    this.lastTime = time;
    window.requestAnimationFrame(this.animate.bind(this));
  }

  drawInitial() {
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.9)";
    this.ctx.fillRect(0, 0, 455, 700);
    this.ctx.fill();
    this.ctx.font = "30px Do Hyeon";
    this.ctx.strokeStyle = "cyan";
    this.ctx.textAlign = "center";
    this.ctx.strokeText(`Hit Space Bar to begin the game`, 225, 350);
  }

  drawPaused() {
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.9)";
    this.ctx.fillRect(0, 0, 455, 700);
    this.ctx.fill();
    this.ctx.font = "28px Do Hyeon";
    this.ctx.strokeStyle = "cyan";
    this.ctx.textAlign = "center";
    this.ctx.strokeText(`Hit Space Bar to continue the game`, 225, 350);
  }

  drawGameOver(highScore) {
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.9)";
    this.ctx.fillRect(0, 0, 455, 700);
    this.ctx.fill();
    this.ctx.font = "30px Do Hyeon";
    this.ctx.strokeStyle = "cyan";
    this.ctx.textAlign = "center";
    this.ctx.strokeText(`You scored ${this.game.score} points!`, 225, 150);
    this.ctx.strokeText(`Your High Score ${highScore} points!`, 225, 250);

    let newGameStr = "Hit Space Bar to try again!";
    this.ctx.fillStyle = "red";
    this.ctx.fillText(newGameStr, 225, 450);
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
    this.positionY = -45;
    this.radius = 15;
    this.value = value;
    // this.velocityY = velocityY;
  }

  draw(ctx, velocity) {
    this.positionY += velocity;
    ctx.strokeStyle = "red";

    ctx.beginPath();
    ctx.arc(
      this.positionX, this.positionY, this.radius, 0, 2 * Math.PI, true
    );
    ctx.arc(
      this.positionX, this.positionY, this.radius - 1, 0, 2 * Math.PI, true
    );
    ctx.stroke();
    ctx.font = "bold 12px Arial";
    ctx.fillStyle = "white";
    ctx.fillText(`${this.value}`, this.positionX, this.positionY + 5);
  }
}

/* harmony default export */ __webpack_exports__["default"] = (LengthPoint);


/***/ }),

/***/ "./lib/particle.js":
/*!*************************!*\
  !*** ./lib/particle.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class Particle {
	constructor(posX, posY, velX, velY, color) {
		this.posX = posX;
		this.posY = posY;
		this.velX = velX;
		this.velY = velY;
		this.alpha = 1;
		this.color = color;
	}

	move() {
		this.posX += this.velX;
		this.posY += this.velY;
		this.alpha -= 0.05;
	}

	getColor() {
		let colorWAlpha = this.color.slice(0, 3) + "a" + this.color.slice(3, 4);
		let values = this.color.slice(4, 13).split(",");
		values.push(`${this.alpha}`);

		return colorWAlpha + values.join(", ") + this.color[13];
	}

	draw(ctx) {
		ctx.beginPath();
		ctx.strokeStyle = this.getColor();
		ctx.arc(
      this.posX, this.posY, 5, 0, 2 * Math.PI, true
    );
		ctx.stroke();
	}
}

/* harmony default export */ __webpack_exports__["default"] = (Particle);

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
  canvasEl.width = 455;
  canvasEl.height = 700;
  const ctx = canvasEl.getContext("2d");
  const gameView = new _gameView__WEBPACK_IMPORTED_MODULE_1__["default"](canvasEl, ctx);
  
  function startGame(e) {
    if (e.keyCode === 32) {
      gameView.start();
    }

    document.removeEventListener("keypress", startGame);
    document.addEventListener("keypress", (e) => {
      if (e.keyCode === 32) {
        gameView.pause();
      }
    });
  }
  
  document.addEventListener("keypress", startGame);
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
    this.radius = 15;
    this.velocityX = 0;
    this.velocityY = 0;
    this.tail = this.generateTail();
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
    let positionX = this.tail[this.length - 1].positionX;
    for (let i = 1; i <= value; i++) {
      let positionY = this.tail[this.length - 1].positionY;
      positionY = positionY + (i * 30);

      let newTailEl = new _tail_element__WEBPACK_IMPORTED_MODULE_0__["default"](positionX, positionY);
      this.tail.push(newTailEl);
    }
    this.length += value;
  }

  removeHead() {
    this.length--;
    this.tail.shift();
    if (this.tail[0]) {
      this.positionY = this.tail[0].positionY;
    }
  }

  updatePosition() {
    if (this.positionX + this.velocityX >= 15 && this.positionX + this.velocityX <= 435) {
      this.nextPosition += this.velocityX;
      this.positionX = this.nextPosition;
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
      let velocityX = Math.abs(tailEl.positionX - prevEl.positionX) / 6;

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
    if (this.tail[0]) {
      ctx.font = "bold 14px Comic Sans MS";
      ctx.fontWeight = 600;
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText(`${this.length}`, this.tail[0].positionX, this.positionY - 20);
    }

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
    this.radius = 15;
    this.color = this.getColor();
  }

  updateHorizontalPosition(position, blocks) {
    let newPosition = this.getHorizontalPosition(position, blocks);

    if (newPosition >= 15 && newPosition <= 435) {
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
      if ((this.positionY - 15) < (endBlock.positionY + endBlock.width) && (this.positionY + 15) > endBlock.positionY) {
        if (newPosition <= endBlock.positionX + endBlock.width) {
          newPosition = endBlock.positionX + endBlock.width + 15;
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
      if ((this.positionY - 15) <= (endBlock.positionY + endBlock.width) && (this.positionY + 15) >= endBlock.positionY) {
        if (newPosition >= endBlock.positionX) {
          newPosition = endBlock.positionX - 15;
        }
      }
    }

    return newPosition;
  }

  getColor() {
    const colors = ["rgb(255, 0, 0)", "rgb(0, 255, 0)", "rgb(0, 0, 255)"];

    return colors[Math.floor(Math.random() * 3)];
  }

  draw(ctx) {
    ctx.strokeStyle = this.color;

    ctx.beginPath();
    ctx.arc(
      this.positionX, this.positionY, this.radius, 0, 2 * Math.PI, true
    );
    ctx.arc(
      this.positionX, this.positionY, this.radius - 1, 0, 2 * Math.PI, true
    );
    ctx.stroke();
  }
}

/* harmony default export */ __webpack_exports__["default"] = (TailElement);


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map