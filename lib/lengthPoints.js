class LengthPoint {
  constructor(positionX, value) {
    this.positionX = positionX;
    this.positionY = -5;
    this.radius = 10;
    this.value = value;
    // this.velocityY = velocityY;
  }

  draw(ctx, velocity) {
    this.positionY += velocity;
    ctx.fillStyle = "blue";

    ctx.beginPath();
    ctx.arc(
      this.positionX, this.positionY, this.radius, 0, 2 * Math.PI, true
    );
    ctx.fill();
    ctx.font = "12px Arial";
    ctx.fillStyle = "white";
    ctx.fillText(`${this.value}`, this.positionX, this.positionY + 5);
  }
}

export default LengthPoint;
