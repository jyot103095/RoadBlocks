import LengthPoint from './lengthPoints';
import Block from './block';

export const generateBlocks = (snakeLength) => {
	let blocks = [];
  const blockPositions = [1, 92, 183, 274, 365];
  let positionsArr = [];

  let i = 0;
  while (i < 5) {
    let newPosIdx = getRandomIndex();
    if (!positionsArr.includes(blockPositions[newPosIdx])) {
      positionsArr.push(blockPositions[newPosIdx]);
      i++;
    }
  }

  let lowBlockValue = Math.floor((Math.random() * snakeLength));
  let lowValueBlock;
  if (lowBlockValue > 0) {
    lowValueBlock = new Block(positionsArr[0], lowBlockValue);
    blocks.push(lowValueBlock);
  }


  positionsArr.slice(1).forEach(pos => {
    let newBlock = new Block(pos, getRandomBlockValue());
    blocks.push(newBlock);
  });
  return blocks;
};

export const generateLengthPoint = (blocks) => {
  const pointPositions = [45, 135, 225, 315, 405];
  let newPointPos = pointPositions[getRandomIndex()];
  let newLengthPoint = new LengthPoint(newPointPos, getRandomPointValue());
  return newLengthPoint;
};

function getRandomIndex () {
  return Math.floor(Math.random() * 5);
}

export function getRandomBlockValue () {
  return Math.floor((Math.random() * 50) + 1);
}

export function getRandomPointValue() {
  return Math.floor((Math.random() * 5) + 1); 
}