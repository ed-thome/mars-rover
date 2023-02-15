const fs = require("fs");
const {
  validateRover,
  validateInstructions,
  validatePlateau,
  validateNumberOfLines,
  validateRoversInsidePlateau,
} = require("./validations");

const parseFile = async (filePath) => {
  const [plateauLine, ...roverLines] = await readFileLines(filePath);

  const plateau = parsePlateau(plateauLine);
  const rovers = parseRovers(roverLines);

  validateRoversInsidePlateau(plateau, rovers);

  return {
    plateau,
    rovers,
  };
};

const readFileLines = async (filePath) => {
  if (!filePath) {
    throw new Error("No input file specified");
  }

  const fileContents = await fs.promises.readFile(filePath, "utf8");
  const lines = fileContents.split("\n");

  validateNumberOfLines(lines);
  return lines;
};

const parsePlateau = (plateauLine) => {
  validatePlateau(plateauLine);

  const [rightEdge, topEdge] = plateauLine.split(" ");

  const width = parseInt(rightEdge) + 1;
  const height = parseInt(topEdge) + 1;

  return { width, height };
};

const parseRovers = (roverLines) => {
  const rovers = [];

  for (let i = 0; i < roverLines.length; i += 2) {
    const roverLine = roverLines[i];
    const instructionsLine = roverLines[i + 1];

    rovers.push(parseRover(roverLine, instructionsLine));
  }
  return rovers;
};

const parseRover = (roverLine, instructionsLine) => {
  validateRover(roverLine);
  validateInstructions(instructionsLine);

  const [xString, yString, direction] = roverLine.split(" ");
  const x = parseInt(xString);
  const y = parseInt(yString);

  return {
    position: { x, y },
    direction,
    instructions: instructionsLine.split(""),
  };
};

module.exports = parseFile;
