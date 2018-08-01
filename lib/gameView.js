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
      window.alert(`Ha! You only scored ${this.game.score} points.\nPress Ctrl/Cmd + R to start a new game.`);
      return;
    } else {
      this.game.draw(this.ctx);
    }
    this.lastTime = time;
    window.requestAnimationFrame(this.animate.bind(this));
  }
}

export default GameView;
