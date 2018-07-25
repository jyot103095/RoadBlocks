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
    requestAnimationFrame(this.animate.bind(this));
  }

  draw (delta) {
    totalSeconds += delta;

    let vx = 100; // the background scrolls with a speed of 100 pixels/sec
    let numImages = Math.ceil(canvas.width / img.width) + 1;
    let xpos = totalSeconds * vx % img.width;

    context.save();
    context.translate(-xpos, 0);
    for (let i = 0; i < numImages; i++) {
        context.drawImage(img, i * img.width, 0);
    }
    context.restore();
  }
}

export default GameView;
