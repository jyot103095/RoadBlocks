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

  move(positionX) {
    let newHead = this.tail.pop();
    newHead.positionX = positionX + this.velocityX;
    newHead.positionY = 500;
    this.tail.unshift(newHead);
    this.moveTail(newHead.positionX);
  }

  moveTail(position) {
    let previousElPosition = position;
    this.tail.forEach((el, idx) => {
      if (idx !== 0) {
        el.positionY += 45;
        el.toPosition = previousElPosition;
        previousElPosition = el.positionX;
        el.move();
      }
    });
  }

  draw(ctx) {
    this.tail.forEach(el => el.draw(ctx));
  }
}

export default Snake;
