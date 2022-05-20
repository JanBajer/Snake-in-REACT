const CANVAS_SIZE = [800, 800]; //we can change it to 1600,1600 so there will be 2x more squares
const SNAKE_START = [
  [8, 7],
  [8, 8],
  [8, 9],
];
const APPLE_START = [8, 3];
const SCORE = 0;
const SCALE = 40;
/* const SPEED = 100; */
const SPEED = {
  Easy: 250,
  Medium: 100,
  Hard: 50,
};
const DIRECTIONS = {
  38: [0, -1], // arrow up
  87: [0, -1], // W
  40: [0, 1], // arrow down
  83: [0, 1], // S
  37: [-1, 0], // arrow left
  65: [-1, 0], // A
  39: [1, 0], // right
  68: [1, 0], // D
};

export {
  CANVAS_SIZE,
  SNAKE_START,
  APPLE_START,
  SCALE,
  SPEED,
  SCORE,
  DIRECTIONS,
};
