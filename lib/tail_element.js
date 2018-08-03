class TailElement {
  constructor(positionX, positionY) {
    this.positionX = positionX;
    this.positionY = positionY;
    this.prevYPos = null;
    this.radius = 15;
    this.color = this.getColor();
  }

  updateHorizontalPosition(position, blocks) {
    let newPosition = this.getHorizontalPosition(position, blocks);

    if (newPosition >= 15 && newPosition <= 435) {
      this.positionX = newPosition;
    }
  }

  getHorizontalPosition(position, blocks) {
    let newPosition = position;
    if (position < this.positionX) {
      newPosition = this.checkLeft(position, blocks);
    } else if (newPosition > this.positionX) {
      newPosition = this.checkRight(position, blocks);
    }

    return newPosition;
  }

  checkLeft(position, blocks) {
    let newPosition = position;
    let filteredBlocks = blocks.filter(block => block.positionX < this.positionX);
    if (filteredBlocks.length > 0) {
      let endBlock = filteredBlocks.reduce((end, block) => block.positionX > end.positionX ? block : end);
      if ((this.positionY - 15) < (endBlock.positionY + endBlock.width) && (this.positionY + 15) > endBlock.positionY) {
        if (newPosition <= endBlock.positionX + endBlock.width) {
          newPosition = endBlock.positionX + endBlock.width + 15;
        }
      }
    }

    return newPosition;
  }

  checkRight(position, blocks) {
    let newPosition = position;
    let filteredBlocks = blocks.filter(block => block.positionX > this.positionX);
    if (filteredBlocks.length > 0) {
      let endBlock = filteredBlocks.reduce((end, block) => block.positionX < end.positionX ? block : end);
      if ((this.positionY - 15) <= (endBlock.positionY + endBlock.width) && (this.positionY + 15) >= endBlock.positionY) {
        if (newPosition >= endBlock.positionX) {
          newPosition = endBlock.positionX - 15;
        }
      }
    }

    return newPosition;
  }

  getColor() {
    const colors = ["rgb(255, 0, 0)", "rgb(0, 255, 0)", "rgb(0, 0, 255)"];

    return colors[Math.floor(Math.random() * 3)];
  }

  draw(ctx) {
    ctx.strokeStyle = this.color;

    ctx.beginPath();
    ctx.arc(
      this.positionX, this.positionY, this.radius, 0, 2 * Math.PI, true
    );
    ctx.arc(
      this.positionX, this.positionY, this.radius - 1, 0, 2 * Math.PI, true
    );
    ctx.stroke();
  }
}

export default TailElement;
