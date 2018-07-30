class TailElement {
  constructor(positionX, positionY) {
    this.positionX = positionX;
    this.positionY = positionY;
    this.prevYPos = null;
    this.radius = 10;
  }

  updateHorizontalPosition(position, blocks) {
    let newPosition = this.getHorizontalPosition(position, blocks);

    if (newPosition >= 10 && newPosition <= 440) {
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
      if ((this.positionY - 10) < (endBlock.positionY + endBlock.width) && (this.positionY + 10) > endBlock.positionY) {
        debugger
        if (newPosition <= endBlock.positionX + endBlock.width) {
          newPosition = endBlock.positionX + endBlock.width + 10;
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
      if ((this.positionY - 10) < (endBlock.positionY + endBlock.width) && (this.positionY + 10) > endBlock.positionY) {
        if (newPosition >= endBlock.positionX) {
          newPosition = endBlock.positionX - 10;
        }
      }
    }

    return newPosition;
  }

  draw(ctx) {
    ctx.fillStyle = "#FF0000";

    ctx.beginPath();
    ctx.arc(
      this.positionX, this.positionY, this.radius, 0, 2 * Math.PI, true
    );
    ctx.fill();
  }
}

export default TailElement;
