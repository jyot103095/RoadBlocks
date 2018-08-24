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
    this.canvas.addEventListener("mousemove", (e) => {
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
      document.getElementsByClassName("md-modal")[0].classList.add("md-show");
      this.isPaused = true;
      return;
    } else if (this.isPaused) {
      window.cancelAnimationFrame(this.animation);
      return;
    } else {
      this.game.move(timeDelta);
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

  getScore() {
    return this.game.score;
  }

  restartGame() {
    this.game = new Game();
    this.drawInitial();
  }
}

export default GameView;
