const PLATEAU_REGEX = /^[0-9]+ [0-9]+$/;
const ROVER_REGEX = /^[0-9]+ [0-9]+ [NSEW]$/;
const INSTRUCTIONS_REGEX = /^[LRM]+$/;

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
};
