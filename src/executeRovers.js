const {
  instructions: {
    MOVE,
    TURN_LEFT,
    TURN_RIGHT,
    HALF_TURN_LEFT,
    HALF_TURN_RIGHT,
  },
} = require("./constants");
const { Rover } = require("./rover");

const executeRovers = (initialData) => {
  return initialData.rovers.map(executeSingleRover(initialData.plateau));
};

const executeSingleRover =
  (plateau) =>
  ({ position, direction, instructions }) => {
    const rover = Rover.create(position, direction, plateau);

    for (const instruction of instructions) {
      rover.execute(instruction);
    }

    return {
      position: rover.position,
      direction: rover.direction.value,
      isFallen: rover.isFallen(),
    };
  };

module.exports = executeRovers;
