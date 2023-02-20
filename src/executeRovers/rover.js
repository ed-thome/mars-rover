const Direction = require("./direction");

const {
  instructions: {
    MOVE,
    BACK,
    TURN_RIGHT,
    TURN_LEFT,
    HALF_TURN_RIGHT,
    HALF_TURN_LEFT,
  },
} = require("../constants");

class Rover {
  constructor(position, direction, plateau) {
    this.position = position;
    this.direction = direction;
    this.plateau = plateau;
  }

  static create(position, directionValue, plateau) {
    return new Rover(
      Object.assign({}, position),
      new Direction(directionValue),
      plateau
    );
  }

  execute(instruction) {
    switch (instruction) {
      case MOVE:
        this.move();
        break;
      case BACK:
        this.back();
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

  back() {
    this.move(-1);
  }

  move(multiplier = 1) {
    if (this.isFallen()) {
      return;
    }

    this.updatePosition(multiplier);
  }

  isFallen() {
    const xBoundsExceeded =
      this.position.x <= -1 || this.position.x >= this.plateau.width;
    const yBoundsExceeded =
      this.position.y <= -1 || this.position.y >= this.plateau.height;

    return xBoundsExceeded || yBoundsExceeded;
  }

  updatePosition(multiplier) {
    const [xChange, yChange] = this.direction.getVector();

    this.position.x += multiplier * xChange;
    this.position.y += multiplier * yChange;
  }
}

module.exports = { Rover };
