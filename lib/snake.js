import TailElement from './tail_element';

class Snake {
  constructor() {
    this.length = 5;
    this.positionX = 225;
    this.positionY = 400;
    this.nextPosition = 225;
    this.radius = 15;
    this.velocityX = 0;
    this.velocityY = 0;
    this.tail = this.generateTail();
    this.generateTail.bind(this);
  }

  generateTail() {
    const tailElements = [];

    for (let i = 0; i < this.length; i++) {
      let positionY = this.positionY + (i * 30);
      tailElements.push(new TailElement(this.positionX, positionY));
    }

    return tailElements;
  }

  addLength(value) {
    let positionX = this.tail[this.length - 1].positionX;
    for (let i = 1; i <= value; i++) {
      let positionY = this.tail[this.length - 1].positionY;
      positionY = positionY + (i * 30);

      let newTailEl = new TailElement(positionX, positionY);
      this.tail.push(newTailEl);
    }
    this.length += value;
  }

  removeHead() {
    this.length--;
    this.tail.shift();
    if (this.tail[0]) {
      this.positionY = this.tail[0].positionY;
    }
  }

  updatePosition() {
    if (this.positionX + this.velocityX >= 15 && this.positionX + this.velocityX <= 435) {
      this.nextPosition += this.velocityX;
      this.positionX = this.nextPosition;
    }
 
    if (this.positionY > 400) {
      this.positionY += this.velocityY;
    } else {
      this.velocityY = 0;
    }
  }

  move(blocks) {
    this.updatePosition();
    let head = this.tail[0];
    if (head) {
      head.updateHorizontalPosition(this.nextPosition, blocks);
      head.positionY = this.positionY;
    }

    for (let i = 1; i < this.length; i++) {
      let tailEl = this.tail[i];
      let prevEl = this.tail[i - 1];
      let distance = tailEl.positionX - prevEl.positionX;
      let velocityX = Math.abs(tailEl.positionX - prevEl.positionX) / 4;

      if (tailEl.positionX < prevEl.positionX) {
        let newPosition = tailEl.positionX + velocityX;
        tailEl.updateHorizontalPosition(newPosition, blocks);
      } else if (tailEl.positionX > prevEl.positionX) {
        let newPosition = tailEl.positionX - velocityX;
        tailEl.updateHorizontalPosition(newPosition, blocks);
      }


      tailEl.positionY += this.velocityY;
    }
  }

  draw(ctx) {
    if (this.tail[0]) {
      ctx.font = "bold 14px Comic Sans MS";
      ctx.fontWeight = 600;
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText(`${this.length}`, this.tail[0].positionX, this.positionY - 20);
    }

    this.tail.forEach(el => el.draw(ctx));
  }
}

export default Snake;
