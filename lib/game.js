import Snake from './snake';
import LengthPoint from './lengthPoints';
import Block from './block';

class Game {
  constructor() {
    this.snake = new Snake();
    this.inCollision = false;
    this.collidingObj = null;
    this.velocity = 2;
    this.lengthPoints = [ new LengthPoint(45, 2), new LengthPoint(225, 5) ];
    this.blocks = [ new Block(0, 1), new Block(90, 1), new Block(180, 1), new Block(270, 2), new Block(360, 1) ];
  }

  getHighestBlock() {
    let highest = this.blocks[0];

    for (let i = 1; i < this.blocks.length; i++) {
      if (this.blocks[i].positionY < highest.positionY) {
        highest = this.blocks[i];
      }
    }

    return highest;
  }

  generateBlocks() {
    const blockPositions = [0, 90, 180, 270, 360];
    let numBlocks = this.getRandomNumber();
    let positionsArr = [];

    let i = 0;
    while (i < 5) {
      let newPosIdx = this.getRandomIndex();
      if (!positionsArr.includes(blockPositions[newPosIdx])) {
        positionsArr.push(blockPositions[newPosIdx]);
        i++;
      }
    }

    let lowBlockValue = Math.floor((Math.random() * 15) + 1);
    let lowValueBlock = new Block(positionsArr[0], lowBlockValue);

    this.blocks.push(lowValueBlock);

    positionsArr.slice(1).forEach(pos => {
      let newBlock = new Block(pos, this.getRandomBlockValue());
      this.blocks.push(newBlock);
    });
  }

  getRandomIndex() {
    return Math.floor(Math.random() * 5);
  }

  getRandomBlockValue() {
    return Math.floor((Math.random() * 50) + 1);
  }

  getRandomNumber() {
    return Math.floor((Math.random() * 6));
  }

  generateLengthPoints() {
    const pointPositions = [45, 135, 225, 315, 405];
    let newPointPos = pointPositions[this.getRandomIndex()];
    let newLengthPoint = new LengthPoint(newPointPos, this.getRandomPointValue());

    this.lengthPoints.push(newLengthPoint);
  }

  getHighestPoint() {
    let highest = this.lengthPoints[0];

    for (let i = 1; i < this.lengthPoints.length; i++) {
      if (this.lengthPoints[i].positionY < highest.positionY) {
        highest = this.lengthPoints[i];
      }
    }

    return highest;
  }

  getRandomPointValue() {
   return Math.floor((Math.random() * 5) + 1); 
  }

  moveSnake(e, canvas) {
    let relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX >= 10 && relativeX <= 440) {
      this.snake.velocityX = 0;
      this.snake.nextPosition = relativeX;
    } else if (relativeX < 10) {
      this.snake.velocityX = -1;
    } else {
      this.snake.velocityX = 1;
    }
  }

  calculateDistance(object) {
    let dX = this.snake.tail[0].positionX - object.positionX;
    let dY = this.snake.positionY - object.positionY;
    return Math.sqrt((dX * dX) + (dY * dY));
  }

  collisionDetection() {
    if (this.inCollision) {
      let stillColliding = false;
      this.blocks.forEach(block => {
        if (this.snake.tail[0].positionX >= block.positionX && this.snake.tail[0].positionX <= (block.positionX + block.width)) {
          stillColliding = true;
        }
      });
      this.inCollision = stillColliding;
    }

    this.checkPoints();
    this.checkBlocks();
  }

  checkPoints() {
    for (let i = 0; i < this.lengthPoints.length; i++) {
      let point = this.lengthPoints[i];
      let distance = this.calculateDistance(point);
      if (distance < this.snake.radius + point.radius) {
        this.snake.addLength(point.value);
        this.lengthPoints.splice(i, 1);
      }
    }
  }

  checkBlocks() {
    for (let i = 0; i < this.blocks.length; i++) {
      let block = this.blocks[i];
      if (block.positionY > 600) {
        this.blocks.splice(i, 1);
        break;
      }

      if ((10 + block.width + block.positionY) === this.snake.positionY) {
        if (this.snake.tail[0].positionX >= block.positionX && this.snake.tail[0].positionX <= (block.positionX + block.width)) {
          this.handleBlockCollision(block, i);
          break;
        }
      }
    }
  }

  handleBlockCollision(obj, i) {
    obj.value--;
    this.snake.removeHead();
    if (obj.value === 0) {
      this.blocks.splice(i, 1);
      this.inCollision = false;
    } else {
      this.inCollision = true;
    }
    this.snake.velocityY = -2;
  }

  over() {
    return this.snake.length === 0;
  }


  draw(ctx) {
    if (this.inCollision) {
      this.velocity = 0;
    } else {
      this.velocity = 4;
    }

    ctx.clearRect(0, 0, 450, 600);

    this.snake.draw(ctx);
    this.blocks.forEach(block => block.draw(ctx, this.velocity));
    this.lengthPoints.forEach(point => point.draw(ctx, this.velocity));

    if (this.snake.length > 0) {
      this.collisionDetection();
      this.snake.move(this.blocks);
    }

    if (this.getHighestBlock() && this.getHighestBlock().positionY > 360) {
      this.generateBlocks();
    }

    if (this.getHighestPoint() && this.getHighestPoint().positionY > 180) {
      this.generateLengthPoints();
    }
  }
}

export default Game;
