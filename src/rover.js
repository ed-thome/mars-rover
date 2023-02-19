const Direction = require("./direction");

const {
  instructions: {
    MOVE,
    TURN_RIGHT,
    TURN_LEFT,
    HALF_TURN_RIGHT,
    HALF_TURN_LEFT,
  },
} = require("./constants");

class Rover {
  constructor(position, direction, plateau) {
    this.position = position;
    this.direction = direction;
    this.plateau = plateau;
  }

  static create(position, directionValue, plateau) {
    return new Rover(position, new Direction(directionValue), plateau);
  }

  move() {
    if (this.isFallen()) {
      return;
    }

    this.updatePosition();
  }

  updatePosition() {
    const [xChange, yChange] = this.direction.getVector();
    this.position.x += xChange;
    this.position.y += yChange;
  }

  isFallen() {
    return (
      this.position.x === -1 ||
      this.position.x === this.plateau.width ||
      this.position.y === -1 ||
      this.position.y === this.plateau.height
    );
  }

  execute(instruction) {
    switch (instruction) {
      case MOVE:
        this.move();
        break;
      case TURN_RIGHT:
        this.direction.turnRight();
        break;
      case TURN_LEFT:
        this.direction.turnLeft();
        break;
      case HALF_TURN_RIGHT:
        this.direction.halfTurnRight();
        break;
      case HALF_TURN_LEFT:
        this.direction.halfTurnLeft();
        break;
    }
  }
}

module.exports = { Rover };
