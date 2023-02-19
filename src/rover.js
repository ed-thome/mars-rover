const Direction = require("./direction");

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
    const [xChange, yChange] = Direction.getVector(this.direction);
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

  turn(shiftAmount) {
    this.direction = Direction.shift(this.direction, shiftAmount);
  }
}

module.exports = { Rover };
