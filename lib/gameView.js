import Game from './game';

class GameView {
  constructor(canvas, ctx) {
    this.game = new Game();
    this.ctx = ctx;
    this.canvas = canvas;
    this.animation = null;
    this.game.draw(this.ctx);
    this.drawInitial();
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
      this.drawGameOver();
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
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    this.ctx.fillRect(0, 0, 450, 700);
    this.ctx.stroke();
    this.ctx.font = "25px Monoton";
    this.ctx.fillStyle = "white";
    this.ctx.textAlign = "center";
    this.ctx.fillText(`Hit Space Bar to begin the game`, 225, 350);
  }

  drawPaused() {
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    this.ctx.fillRect(0, 0, 450, 700);
    this.ctx.stroke();
    this.ctx.font = "20px Monoton";
    this.ctx.fillStyle = "white";
    this.ctx.textAlign = "center";
    this.ctx.fillText(`Hit Space Bar to continue the game`, 225, 350);
  }

  drawGameOver() {
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    this.ctx.fillRect(0, 0, 450, 700);
    this.ctx.stroke();
    this.ctx.font = "18px Monoton";
    this.ctx.fillStyle = "white";
    this.ctx.textAlign = "center";
    this.ctx.fillText(`Oh man! You only scored ${this.game.score} points.`, 225, 300);

    let newGameStr = "Hit Space Bar again if you don't suck!";
    this.ctx.fillText(newGameStr, 225, 400);
  }
}

export default GameView;
