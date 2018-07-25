class TailElement {
  constructor(positionX, positionY) {
    this.positionX = positionX;
    this.positionY = positionY;
    // this.toPosition = null;
  }

  // move() {
  //   if (this.toPosition) {
  //     if (this.toPosition > this.positionX) {
  //       this.positionX += 1;
  //     } else if (this.toPosition < this.positionX) {
  //       this.positionX -= 1;
  //     }
  //   }
  // }

  draw(ctx) {
    ctx.fillStyle = "#FF0000";

    ctx.beginPath();
    ctx.arc(
      this.positionX, this.positionY, 20, 0, 2 * Math.PI, true
    );
    ctx.fill();
  }
}

export default TailElement;
