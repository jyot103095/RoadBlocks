import TailElement from './tail_element';

class Snake {
  constructor() {
    this.length = 3;
    this.positionX = 225;
    this.positionY = 400;
    this.nextPosition = 225;
    this.radius = 10;
    this.velocityX = 0;
    this.velocityY = 0;
    this.tail = this.generateTail();
    // this.velocityY = -1;
    // this.moveTail = this.moveTail.bind(this);
    this.generateTail.bind(this);
  }

  generateTail() {
    const tailElements = [];

    for (let i = 0; i < this.length; i++) {
      let positionY = this.positionY + (i * 20);
      tailElements.push(new TailElement(this.positionX, positionY));
    }

    return tailElements;
  }

  addLength(value) {
    this.length += value;
    this.tail = this.generateTail();
  }

  removeHead() {
    this.length--;
    this.tail.shift();
    if (this.tail[0]) {
      this.positionY = this.tail[0].positionY;
    }
  }

  updatePosition() {
    if (this.positionX + this.velocityX >= 10 && this.positionX + this.velocityX <= 440) {
      this.nextPosition += this.velocityX;
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
      let distance = Math.sqrt((tailEl.positionX - prevEl.positionX)**2);
      let velocityX = Math.abs(tailEl.positionX - prevEl.positionX) / 2;

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
    this.tail.forEach(el => el.draw(ctx));
  }
}

export default Snake;
