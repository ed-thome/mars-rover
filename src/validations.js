const PLATEAU_REGEX = /^[0-9]+ [0-9]+$/;
const ROVER_REGEX = /^[0-9]+ [0-9]+ [NSEW]|NE|NW|SE|SW$/;
const INSTRUCTIONS_REGEX = /^[LRlr4M]+$/;

const validatePlateau = (plateauLine) => {
  validate(
    PLATEAU_REGEX.test(plateauLine),
    `Plateau format is invalid: ${plateauLine}`
  );
};

const validateRover = (roverLine) => {
  validate(
    ROVER_REGEX.test(roverLine),
    `Rover format is invalid: ${roverLine}`
  );
};

const validateInstructions = (instructionsLine) => {
  validate(
    INSTRUCTIONS_REGEX.test(instructionsLine),
    `Instructions format is invalid: ${instructionsLine}`
  );
};

const validateNumberOfLines = (lines) => {
  const isOdd = lines.length % 2 === 1;
  validate(isOdd, "Wrong number of lines in input file");
};

const validateRoversInsidePlateau = (plateau, rovers) => {
  const roverOutOfBounds = rovers.some(
    (rover) =>
      rover.position.x > plateau.width - 1 ||
      rover.position.y > plateau.height - 1
  );

  validate(!roverOutOfBounds, "Rover initialized outside plateau");
};

const validate = (isValid, message) => {
  if (!isValid) {
    throw new Error(message);
  }
};

module.exports = {
  validatePlateau,
  validateRover,
  validateInstructions,
  validateNumberOfLines,
  validateRoversInsidePlateau,
};
