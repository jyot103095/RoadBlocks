class Block {
  constructor(positionX, value) {
    this.positionX = positionX;
    this.value = value;
    this.positionY = -92;
    this.width = 90;
    this.radius = 10;
  }

  getColor() {
    let rgb = [255, 0, 0];
    if (this.value >= 45) {
      return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
    } else if (this.value >= 30) {
      rgb[1] = (45 - this.value) * 17;
      return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
    } else if (this.value >= 15) {
      rgb[1] = 255;
      rgb[0] = (this.value - 15) * 17;
      return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
    } else {
      rgb[0] = 0;
      rgb[1] = 255;
      rgb[2] = (15 - this.value) * 17;
      return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
    }
  }

  draw(ctx, velocity) {
    this.positionY += velocity;

    ctx.strokeStyle = this.getColor();
    // ctx.strokeStyle = "black";
    ctx.beginPath();
    ctx.moveTo(this.positionX + this.radius, this.positionY);
    ctx.lineTo(this.positionX + this.width - this.radius, this.positionY);
    ctx.quadraticCurveTo(this.positionX + this.width, this.positionY, this.positionX + this.width, this.positionY + this.radius);
    ctx.lineTo(this.positionX + this.width, this.positionY + this.width - this.radius);
    ctx.quadraticCurveTo(this.positionX + this.width, this.positionY + this.width, this.positionX + this.width - this.radius, this.positionY + this.width);
    ctx.lineTo(this.positionX + this.radius, this.positionY + this.width);
    ctx.quadraticCurveTo(this.positionX, this.positionY + this.width, this.positionX, this.positionY + this.width - this.radius);
    ctx.lineTo(this.positionX, this.positionY + this.radius);
    ctx.quadraticCurveTo(this.positionX, this.positionY, this.positionX + this.radius, this.positionY);
    ctx.closePath();
    ctx.stroke();
    // ctx.stroke();
    ctx.font = "bold 20px Arial";
    ctx.fillStyle = this.getColor();
    ctx.textAlign = "center";
    ctx.fillText(`${this.value}`, this.positionX + (this.width / 2), this.positionY + this.radius + (this.width / 2));
  }
}

export default Block;
