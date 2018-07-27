import Snake from './snake';
import LengthBall from './lengthBall';
import Block from './block';

class Game {
  constructor() {
    this.snake = new Snake();
    this.inCollision = false;
    this.collidingObj = null;
    this.velocity = 4;
    this.blocks = [ new Block(0, this.velocity), new Block(90, this.velocity),
      new Block(180, this.velocity), new Block(270, this.velocity), new Block(360, this.velocity) ];
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
      let stillColliding = false;
      this.blocks.forEach(block => {
        if (this.snake.positionX >= block.positionX && this.snake.positionX <= (block.positionX + block.width)) {
          stillColliding = true;
        }
      });
      this.inCollision = stillColliding;
    }
    for (let i = 0; i < this.blocks.length; i++) {
      let obj = this.blocks[i];
      if (obj instanceof LengthBall) {
        let distance = this.calculateDistance(obj);
        if (distance < this.snake.radius + obj.radius) {
          this.snake.addLength(obj.value);
          this.blocks.splice(i, 1);
        }
      } else if (obj instanceof Block) {
        if ((10 + obj.width + obj.positionY) === this.snake.positionY) {
          if (this.snake.positionX >= obj.positionX && this.snake.positionX <= (obj.positionX + obj.width)) {
            this.handleBlockCollision(obj, i);
            break;
          }
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

  gameOver() {
    return this.snake.length === 0;
  }

  draw(ctx) {
    if (this.inCollision) {
      this.velocity = 0;
    } else {
      this.velocity = 4;
    }

    ctx.clearRect(0, 0, 450, 600);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 450, 600);

    this.snake.draw(ctx);
    this.blocks.forEach(obj => obj.draw(ctx, this.velocity));

    this.collisionDetection();
    this.snake.move();
  }
}

export default Game;
