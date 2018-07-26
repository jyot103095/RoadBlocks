import Snake from './snake';
import LengthBall from './lengthBall';

class Game {
  constructor() {
    this.snake = new Snake();
    this.objects = [ new LengthBall(204) ];
  }

  moveSnake(e, canvas) {
    let relativeX = e.clientX - canvas.offsetLeft;
    let positionX;
    if(relativeX >= 15 && relativeX <= 585) {
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
      if (obj instanceof LengthBall) {
        if (distance < this.snake.radius + obj.radius) {
          this.snake.addLength(obj.value);
          this.objects.splice(idx, 1);
        }
      }
    });
  }

  draw(ctx) {
    ctx.clearRect(0, 0, 600, 800);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 600, 800);

    this.snake.draw(ctx);
    this.objects.forEach(obj => obj.draw(ctx));

    this.collisionDetection();
  }
}

export default Game;
