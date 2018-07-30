import Snake from './snake';
import LengthBall from './lengthBall';
import Block from './block';

class Game {
  constructor() {
    this.snake = new Snake();
    this.inCollision = false;
    this.collidingObj = null;
    this.velocity = 2;
    this.points = [];
    this.blocks = [ new Block(0, this.velocity), new Block(270, this.velocity), new Block(360, this.velocity) ];
  }

  moveSnake(e, canvas) {
    let relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX >= 10 && relativeX <= 440) {
      this.snake.velocityX = 0;
      this.snake.nextPosition = relativeX;
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
      let stillColliding = false;
      this.blocks.forEach(block => {
        if (this.snake.positionX >= block.positionX && this.snake.positionX <= (block.positionX + block.width)) {
          stillColliding = true;
        }
      });
      this.inCollision = stillColliding;
    }

    this.checkPoints();
    this.checkBlocks();
  }

  checkPoints() {
    for (let i = 0; i < this.points.length; i++) {
      let point = this.points[i];
      let distance = this.calculateDistance(point);
      if (distance < this.snake.radius + point.radius) {
        this.snake.addLength(point.value);
        this.points.splice(i, 1);
      }
    }
  }

  checkBlocks() {
    for (let i = 0; i < this.blocks.length; i++) {
      let block = this.blocks[i];
      if ((10 + block.width + block.positionY) === this.snake.positionY) {
        if (this.snake.positionX >= block.positionX && this.snake.positionX <= (block.positionX + block.width)) {
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


  draw(ctx) {
    if (this.inCollision) {
      this.velocity = 0;
    } else {
      this.velocity = 4;
    }

    ctx.clearRect(0, 0, 450, 600);

    this.snake.draw(ctx);
    this.blocks.forEach(obj => obj.draw(ctx, this.velocity));

    this.collisionDetection();
    this.snake.move(this.blocks);
  }
}

export default Game;
