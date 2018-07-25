import TailElement from './tail_element';

class Snake {
  constructor() {
    this.length = 4;
    this.tail = this.generateTail();
    this.positionX = 225;
    this.velocityX = 0;
    // this.velocityY = -1;
    this.moveTail = this.moveTail.bind(this);
    this.generateTail.bind(this);
  }

  generateTail() {
    const tailElements = [];

    for (let i = 0; i < this.length; i++) {
      let positionY = 500 + (i * 25);
      tailElements.push(new TailElement(this.positionX, positionY));
    }

    return tailElements;
  }

  updatePosition() {
    if (this.positionX + this.velocityX >= 22 && this.positionX + this.velocityX <= 580) {
      this.positionX += this.velocityX;
    }
  }

  move() {
    let newHead = this.tail.pop();
    this.updatePosition();
    newHead.positionX = this.positionX;
    newHead.positionY = 500;
    this.tail.unshift(newHead);
    this.moveTail();
  }

  moveTail() {
    this.tail.forEach((el, idx) => {
      if (idx !== 0) {
        el.positionY += 45;
      }
    });
  }

  draw(ctx) {
    this.tail.forEach(el => el.draw(ctx));
  }
}

export default Snake;
