class GameView {
  constructor(game, ctx) {
    this.game = game;
    this.ctx = ctx;
  }

  start() {
    this.lastTime = 0;
    requestAnimationFrame(this.animate.bind(this));
  }

  animate(time) {
    const timeDelta = time - this.lastTime;
    this.game.draw(this.ctx);
    this.lastTime = time;
    if (this.game.gameOver()) {
      cancelAnimationFrame(this.animate.bind(this));
    } else {
      requestAnimationFrame(this.animate.bind(this));
    }
  }
}

export default GameView;
