class LengthBall {
  constructor(positionX) {
    this.positionX = positionX;
    this.positionY = -5;
    this.radius = 10;
    this.value = 5;
    this.velocityY = 2;
  }

  draw(ctx) {
    this.positionY += this.velocityY;
    ctx.fillStyle = "blue";

    ctx.beginPath();
    ctx.arc(
      this.positionX, this.positionY, this.radius, 0, 2 * Math.PI, true
    );
    ctx.fill();
  }
}

export default LengthBall;