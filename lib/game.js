import Snake from './snake';

class Game {
  constructor() {
    this.snake = new Snake();
  }

  moveSnake(e, canvas) {
    let relativeX = e.clientX - canvas.offsetLeft;
    let positionX;
    if(relativeX >= 22 && relativeX <= 580) {
      positionX = relativeX - 5;
      this.snake.velocityX = 0;
      this.snake.positionX = positionX;
    } else if (relativeX < 22) {
      this.snake.velocityX = -1;
    } else {
      this.snake.velocityX = 1;
    }
  }

  draw(ctx) {
    ctx.clearRect(0, 0, 600, 800);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 600, 800);

    this.snake.draw(ctx);
  }
}

export default Game;
