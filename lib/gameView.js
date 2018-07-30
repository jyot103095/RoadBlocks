class GameView {
  constructor(game, ctx) {
    this.game = game;
    this.ctx = ctx;
    this.animation = null;
  }

  start() {
    this.lastTime = 0;
    this.animation = window.requestAnimationFrame(this.animate.bind(this));
  }

  animate(time) {
    const timeDelta = time - this.lastTime;
    if (this.game.over()) {
      window.cancelAnimationFrame(this.animation);
      this.game.draw(this.ctx);
      return;
    } else {
      this.game.draw(this.ctx);
    }
    this.lastTime = time;
    window.requestAnimationFrame(this.animate.bind(this));
  }
}

export default GameView;
