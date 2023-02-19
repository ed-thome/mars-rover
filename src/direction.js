const {
  cardinalDirections: {
    NORTH,
    NORTH_EAST,
    NORTH_WEST,
    SOUTH,
    SOUTH_EAST,
    SOUTH_WEST,
    EAST,
    WEST,
  },
} = require("./constants");

const clockwiseDirections = [
  NORTH,
  NORTH_EAST,
  EAST,
  SOUTH_EAST,
  SOUTH,
  SOUTH_WEST,
  WEST,
  NORTH_WEST,
];

const movementVectors = {
  [NORTH]: [0, 1],
  [NORTH_EAST]: [1, 1],
  [EAST]: [1, 0],
  [SOUTH_EAST]: [1, -1],
  [SOUTH]: [0, -1],
  [SOUTH_WEST]: [-1, -1],
  [WEST]: [-1, 0],
  [NORTH_WEST]: [-1, 1],
};

module.exports = class Direction {
  constructor(directionValue) {
    this.value = directionValue;
  }

  turnLeft() {
    this.turn(-2);
  }

  turnRight() {
    this.turn(2);
  }

  halfTurnLeft() {
    this.turn(-1);
  }

  halfTurnRight() {
    this.turn(1);
  }

  turn(shiftAmount) {
    const currentIndex = clockwiseDirections.indexOf(this.value);
    const nextIndex =
      (currentIndex + shiftAmount + clockwiseDirections.length) %
      clockwiseDirections.length;
    const nextDirection = clockwiseDirections[nextIndex];

    this.value = nextDirection;
  }

  getVector() {
    return movementVectors[this.value];
  }
};
