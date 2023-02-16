const {
  cardinalDirections: { NORTH, SOUTH, EAST, WEST },
} = require("./constants");

const clockwiseDirections = [NORTH, EAST, SOUTH, WEST];

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
      case SOUTH:
        this.position.y--;
        return;
      case EAST:
        this.position.x++;
        return;
      case WEST:
        this.position.x--;
        return;
    }
  }

  isFallen() {
    return (
      this.position.x === -1 ||
      this.position.x === this.plateau.height ||
      this.position.y === -1 ||
      this.position.y === this.plateau.height
    );
  }

  turnLeft() {
    this.turn(-1);
  }

  turnRight() {
    this.turn(1);
  }

  turn(directionShift) {
    const currentDirectionIndex = clockwiseDirections.indexOf(this.direction);
    const nextDirectionIndex = (currentDirectionIndex + directionShift + 4) % 4;
    this.direction = clockwiseDirections[nextDirectionIndex];
  }
}

module.exports = { Rover };
