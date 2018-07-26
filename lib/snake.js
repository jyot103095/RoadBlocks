import TailElement from './tail_element';

class Snake {
  constructor() {
    this.length = 4;
    this.tail = this.generateTail();
    this.positionX = 225;
    this.positionY = 400;
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
    if (this.positionX + this.velocityX >= 15 && this.positionX + this.velocityX <= 435) {
      this.positionX += this.velocityX;
    }
  }

  move() {
    let head = this.tail[0];
    head.prevPos = head.positionX;
    this.updatePosition();
    head.positionX = this.positionX;

    for (let i = 1; i < this.length; i++) {
      // this.tail[i].prevPos = this.tail[i].positionX;
      // this.tail[i].positionX = this.tail[i - 1].prevPos;

      let tailEl = this.tail[i];
      let prevEl = this.tail[i - 1];
      let distance = Math.sqrt((tailEl.positionX - prevEl.positionX)**2);
      let speed = Math.abs(tailEl.positionX - prevEl.positionX) / 2;

      if(distance < speed) {
        tailEl.positionX = prevEl.positionX;
      }
      else if(tailEl.positionX > prevEl.positionX && (tailEl.positionX - speed) >= 15) {
        tailEl.positionX -= speed;
      }
      else if(tailEl.positionX < prevEl.positionX && (tailEl.positionX - speed) <= 435) {
        tailEl.positionX += speed;
      }
    }
  }

  draw(ctx) {
    this.tail.forEach(el => el.draw(ctx));
  }
}

export default Snake;
