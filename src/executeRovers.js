const {
  instructions: { MOVE, TURN_LEFT, TURN_RIGHT },
} = require("./constants");
const { Rover } = require("./rover");

const executeRovers = (initialData) => {
  return initialData.rovers.map(executeSingleRover(initialData.plateau));
};

const executeSingleRover =
  (plateau) =>
  ({ position, direction, instructions }) => {
    const rover = new Rover(position, direction, plateau);

    instructions.forEach(executeInstruction(rover));

    return {
      position: rover.position,
      direction: rover.direction,
      isFallen: rover.isFallen(),
    };
  };

const executeInstruction = (rover) => (instruction) => {
  switch (instruction) {
    case MOVE:
      rover.move();
      break;
    case TURN_LEFT:
      rover.turnLeft();
      break;
    case TURN_RIGHT:
      rover.turnRight();
      break;
  }
};

module.exports = executeRovers;
