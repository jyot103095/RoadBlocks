import Snake from './snake';

class Game {
  constructor() {
    this.snake = new Snake();
  }

  moveSnake(e) {
    let relativeX = e.clientX;
    let positionX;
    if(relativeX >= 15 && relativeX <= 445) {
      positionX = relativeX - 5;
    }
    this.snake.positionX = positionX;
  }

  draw(ctx) {
    ctx.clearRect(0, 0, 450, 650);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 450, 650);
    this.snake.draw(ctx);
  }
}

export default Game;
