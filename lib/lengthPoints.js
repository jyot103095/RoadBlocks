class LengthPoint {
  constructor(positionX, value, positionY) {
    this.positionX = positionX;
    this.positionY = positionY || -315;
    this.radius = 15;
    this.value = value;
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
    ctx.font = "bold 15px Arial";
    ctx.fillStyle = "white";
    ctx.fillText(`${this.value}`, this.positionX, this.positionY + 5);
  }
}

export default LengthPoint;
