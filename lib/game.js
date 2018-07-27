import Snake from './snake';
import LengthBall from './lengthBall';
import Block from './block';

class Game {
  constructor() {
    this.snake = new Snake();
    this.inCollision = false;
    this.collidingObj = null;
    this.velocity = 2;
    this.objects = [ new LengthBall(204, this.velocity), new Block(400, this.velocity) ];
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
      if (obj instanceof LengthBall) {
        let distance = this.calculateDistance(obj);
        if (distance < this.snake.radius + obj.radius) {
          this.snake.addLength(obj.value);
          this.objects.splice(i, 1);
        }
      } else if (obj instanceof Block) {
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

export default Game;
