import TailElement from './tail_element';

class Snake {
  constructor() {
    this.length = 4;
    this.tail = this.generateTail();
    this.positionX = 225;
    this.positionY = 500;
    this.radius = 15;
    this.velocityX = 0;
    // this.velocityY = -1;
    // this.moveTail = this.moveTail.bind(this);
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
    this.length += value;
    this.tail = this.generateTail();
  }

  updatePosition() {
    if (this.positionX + this.velocityX >= 15 && this.positionX + this.velocityX <= 585) {
      this.positionX += this.velocityX;
    }
  }

  move() {
    let head = this.tail[0];
    head.prevPos = this.positionX;
    this.updatePosition();
    head.positionX = this.positionX;

    for (let i = 1; i < this.length; i++) {
      this.tail[i].prevPos = this.tail[i].positionX;
      this.tail[i].positionX = this.tail[i - 1].prevPos;
    }
    // this.tail.unshift(newHead);
    // this.moveTail();
  }

  // moveTail() {
  //   this.tail.forEach((el, idx) => {
  //     if (idx !== 0) {
  //       el.positionY += 30;
  //     }
  //   });
  // }

  draw(ctx) {
    this.tail.forEach(el => el.draw(ctx));
  }
}

export default Snake;
