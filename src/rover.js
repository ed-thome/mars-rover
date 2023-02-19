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

class Rover {
  constructor(position, direction, plateau) {
    this.position = position;
    this.direction = direction;
    this.plateau = plateau;
  }

  move() {
    if (this.isFallen()) {
      return;
    }

    this.updatePosition();
  }

  updatePosition() {
    switch (this.direction) {
      case NORTH:
        this.position.y++;
        return;
      case NORTH_EAST:
        this.position.x++;
        this.position.y++;
        return;
      case EAST:
        this.position.x++;
        return;
      case SOUTH_EAST:
        this.position.x++;
        this.position.y--;
        return;
      case SOUTH:
        this.position.y--;
        return;
      case SOUTH_WEST:
        this.position.x--;
        this.position.y--;
        return;
      case WEST:
        this.position.x--;
        return;
      case NORTH_WEST:
        this.position.x--;
        this.position.y++;
        return;
    }
  }

  isFallen() {
    return (
      this.position.x === -1 ||
      this.position.x === this.plateau.width ||
      this.position.y === -1 ||
      this.position.y === this.plateau.height
    );
  }

  turnLeft() {
    this.turn(-2);
  }

  turnRight() {
    this.turn(2);
  }

  halfTurnRight() {
    this.turn(1);
  }

  halfTurnLeft() {
    this.turn(-1);
  }

  turn(shift) {
    const currentIndex = clockwiseDirections.indexOf(this.direction);
    const nextIndex =
      (currentIndex + shift + clockwiseDirections.length) %
      clockwiseDirections.length;
    const nextDirection = clockwiseDirections[nextIndex];

    this.direction = nextDirection;
  }
}

module.exports = { Rover };
