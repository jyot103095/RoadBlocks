import Game from './game';

class GameView {
  constructor(canvas, ctx) {
    this.game = new Game();
    this.ctx = ctx;
    this.canvas = canvas;
    this.animation = null;
    this.game.draw(this.ctx);
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
    }
  }

  animate(time) {
    const timeDelta = time - this.lastTime;
    if (this.game.over()) {
      window.cancelAnimationFrame(this.animation);
      this.game.draw(this.ctx);
      // this.drawGameOver();
      this.game = new Game();
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

  drawGameOver() {
    // this.ctx.moveTo(90, )
  }
}

export default GameView;
