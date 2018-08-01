class Block {
  constructor(positionX, value) {
    this.positionX = positionX;
    this.value = value;
    this.positionY = -92;
    this.width = 90;
    this.radius = 10;
  }

  getColor() {
    if(this.value === 1) {
      return '#69F0AE';
    } else if(this.value <= 4) {
      return '#00E676';
    } else if(this.value <= 8) {
      return '#00C853';
    } else if (this.value <= 12) {
      return '#FFD54F';
    } else if(this.value <= 16) {
      return '#FFCA28';
    } else if(this.value <= 20) {
      return '#FF8F00';
    } else if(this.value >= 21) {
      return '#D84315';
    }
  }

  draw(ctx, velocity) {
    this.positionY += velocity;

    ctx.fillStyle = this.getColor();
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
    ctx.fill();
    ctx.font = "20px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText(`${this.value}`, this.positionX + (this.width / 2), this.positionY + this.radius + (this.width / 2));
  }
}

export default Block;
