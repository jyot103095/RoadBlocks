import Snake from './snake';
import LengthPoint from './lengthPoints';
import Block from './block';

class Game {
  constructor() {
    this.snake = new Snake();
    this.inCollision = false;
    this.collidingObj = null;
    this.velocity = 2;
    this.score = 0;
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

    let lowBlockValue = Math.floor((Math.random() * this.snake.length) + 1);
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
    if(relativeX >= 15 && relativeX <= 435) {
      this.snake.velocityX = 0;
      this.snake.nextPosition = relativeX;
    } else if (relativeX < 15) {
      this.snake.velocityX = -1;
    } else {
      this.snake.velocityX = 1;
    }
  }

  calculateDistance(object) {
    if (object instanceof LengthPoint) {
      let dX = this.snake.tail[0].positionX - object.positionX;
      let dY = this.snake.positionY - object.positionY;
      return Math.sqrt((dX * dX) + (dY * dY));
    } else {
      let dy = this.snake.positionY - 15 - object.positionY;
      return dy;
    }
  }

  collisionDetection() {
    if (this.inCollision) {
      let stillColliding = false;
      this.blocks.forEach(block => {
        if (this.snake.tail[0].positionX - block.positionX >= 0 && (this.snake.tail[0].positionX - block.positionX) <= block.width) {
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

      if (block.positionY < 0) {
        continue;
      } else if (block.positionY > 700) {
        this.blocks.splice(i, 1);
        break;
      } else if ((block.positionY + block.width) >= 385 && (block.positionY + block.width) <= 400) {
        if (this.calculateDistance(block) <= (block.width + this.snake.radius)) {
          if (this.snake.tail[0].positionX - block.positionX >= 0 && (this.snake.tail[0].positionX - block.positionX) <= block.width) {
            this.handleBlockCollision(block, i);
            break;
          }
        }
      }

    }
  }

  handleBlockCollision(obj, i) {
    obj.value--;
    this.score++;
    this.snake.removeHead();
    if (obj.value === 0) {
      this.blocks.splice(i, 1);
      this.inCollision = false;
    } else {
      this.inCollision = true;
    }
    this.snake.velocityY = -(this.velocity * 0.75);
  }

  over() {
    return this.snake.length === 0;
  }

  getVelocity() {
    if (this.score < 25) {
      return 4;
    } else if (this.score < 50) {
      return 4.5;
    } else if (this.score < 100) {
      return 5;
    } else if (this.score < 150) {
      return 5.5;
    } else {
      return 6;
    }
  }

  draw(ctx) {
    let tempVelocity;
    if (this.inCollision) {
      tempVelocity = 0;
    } else {
      tempVelocity = this.velocity;
      this.velocity = this.getVelocity();
    }

    ctx.clearRect(0, 0, 450, 700);

    this.snake.draw(ctx);
    this.blocks.forEach(block => block.draw(ctx, tempVelocity));
    this.lengthPoints.forEach(point => point.draw(ctx, tempVelocity));

    if (this.snake.length > 0) {
      this.collisionDetection();
      this.snake.move(this.blocks);
    }

    if (this.getHighestBlock()) {
      let distanceBetween = 450;
      if (this.score > 150) {
        distanceBetween = 300;
      }

      if (this.getHighestBlock().positionY > distanceBetween) {
        this.generateBlocks();
      }        
    }

    if (this.getHighestPoint() && this.getHighestPoint().positionY > 270) {
      this.generateLengthPoints();
    }
  }
}

export default Game;
