class Snake {
  constructor() {
    this.length = 4;
    this.positionX = 225;
    this.positionY = 500;
    this.velocityX = 0;
    this.velocityY = -1;
    this.getPosition = this.getPosition.bind(this);
  }

  getPosition() {
    if (this.positionX + this.velocityX <= 580 && this.positionX + this.velocityX >= 20) {
      this.positionX += (this.velocityX);
    }

    this.positionY += this.velocityY;

    return {
      x: this.positionX,
      y: this.positionY
    };
  }

  draw(ctx) {
    let pos = this.getPosition();

    ctx.fillStyle = "#FF0000";

    ctx.beginPath();
    ctx.arc(
      pos.x, pos.y, 20, 0, 2 * Math.PI, true
    );
    ctx.fill();
  }
}

export default Snake;
