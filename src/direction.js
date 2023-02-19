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

const directionVectors = {
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
  static shift(currentDirection, shiftAmount) {
    const currentIndex = clockwiseDirections.indexOf(currentDirection);
    const nextIndex =
      (currentIndex + shiftAmount + clockwiseDirections.length) %
      clockwiseDirections.length;
    const nextDirection = clockwiseDirections[nextIndex];

    return nextDirection;
  }

  static getVector(direction) {
    return directionVectors[direction];
  }
};
