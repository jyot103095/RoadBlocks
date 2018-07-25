class Snake {
  constructor() {
    this.length = 4;
    this.positionX = 225;
  }

  move(pos) {
    
  }

  draw(ctx, positionX) {
    ctx.fillStyle = "#FF0000";

    ctx.beginPath();
    ctx.arc(
      this.positionX, 450, 10, 0, 2 * Math.PI, true
    );
    ctx.fill();
  }
}

export default Snake;
