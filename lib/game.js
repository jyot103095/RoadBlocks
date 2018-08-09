import Snake from './snake';
import LengthPoint from './lengthPoints';
import Block from './block';
import Break from './break';
import * as Util from './util';

class Game {
  constructor() {
    this.snake = new Snake();
    this.inCollision = false;
    this.collidingObj = null;
    this.velocity = 2;
    this.score = 0;
    this.lengthPoints = [ new LengthPoint(45, Util.getRandomPointValue(), 225), new LengthPoint(225, Util.getRandomPointValue(), 225) ];
    this.blocks = [ new Block(1, 1), new Block(92, 1), new Block(183, 1), new Block(274, 2), new Block(365, 1) ];
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

  getHighestPoint() {
    let highest = this.lengthPoints[0];

    for (let i = 1; i < this.lengthPoints.length; i++) {
      if (this.lengthPoints[i].positionY < highest.positionY) {
        highest = this.lengthPoints[i];
      }
    }

    console.log(highest);
    return highest;
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
    if (object instanceof LengthPoint) {
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
    this.breaks.push(new Break(this.snake.positionX, block.positionY + block.width, previousColor));

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
      return 6;
    } else {
      return 7;
    }
  }

  draw(ctx) {
    ctx.clearRect(0, 0, 455, 700);

    this.snake.draw(ctx);
    this.blocks.forEach(block => block.draw(ctx));
    this.lengthPoints.forEach(point => point.draw(ctx));
    this.breaks.forEach(b => b.draw(ctx));

    let distanceBetweenBlocks = 450;

    let highestBlock = this.getHighestBlock();

    if (highestBlock) {
      if (this.score > 150) {
        distanceBetweenBlocks = 375;
      }

      if (highestBlock.positionY >= distanceBetweenBlocks) {
        this.blocks = this.blocks.concat(Util.generateBlocks(this.snake.length));
        this.lengthPoints.push(Util.generateLengthPoint());
      }
    }

    ctx.font = "bold 30px Comic Sans MS";
    ctx.strokeStyle = "white";
    ctx.textAlign = "right";
    ctx.strokeText(`${this.score}`, 450, 30);
  }

  move() {
    let tempVelocity;
    if (!this.inCollision) {
      tempVelocity = this.velocity;
      this.velocity = this.getVelocity();
    } else {
      tempVelocity = 0;
    }

    if (this.snake.length > 0) {
      this.collisionDetection();
      this.snake.move(this.blocks);
    }

    this.blocks.forEach(block => block.move(tempVelocity));
    this.lengthPoints.forEach(point => point.move(tempVelocity));
    this.breaks.forEach(b => b.move());

  }
}

export default Game;
