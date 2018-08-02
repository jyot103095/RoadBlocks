class LengthPoint {
  constructor(positionX, value) {
    this.positionX = positionX;
    this.positionY = -5;
    this.radius = 15;
    this.value = value;
    // this.velocityY = velocityY;
  }

  draw(ctx, velocity) {
    this.positionY += velocity;
    ctx.strokeStyle = "red";

    ctx.beginPath();
    ctx.arc(
      this.positionX, this.positionY, this.radius, 0, 2 * Math.PI, true
    );
    ctx.arc(
      this.positionX, this.positionY, this.radius - 1, 0, 2 * Math.PI, true
    );
    ctx.stroke();
    ctx.font = "bold 12px Arial";
    ctx.fillStyle = "white";
    ctx.fillText(`${this.value}`, this.positionX, this.positionY + 5);
  }
}

export default LengthPoint;
