import Game from './game';

class GameView {
  constructor(canvas, ctx) {
    this.game = new Game();
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
      this.game = new Game();
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
    this.ctx.font = "35px Do Hyeon";
    this.ctx.strokeStyle = "cyan";
    this.ctx.textAlign = "center";
    this.ctx.strokeText(`You scored ${this.game.score} points!`, 225, 150);
    this.ctx.strokeText(`Your High Score is ${highScore} points!`, 225, 250);

    let newGameStr = "Hit Space Bar to try again!";
    this.ctx.fillStyle = "red";
    this.ctx.fillText(newGameStr, 225, 450);
  }
}

export default GameView;
