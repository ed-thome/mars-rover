const printOutput = (roverResults) => {
  const output = roverResults.map(resultToString).join("\n");

  console.log(output);
};

const resultToString = (roverResult) => {
  const {
    position: { x, y },
    direction,
    isFallen,
  } = roverResult;

  let outputString = `${x} ${y} ${direction}`;

  if (isFallen) {
    outputString += " (fell)";
  }

  return outputString;
};

module.exports = printOutput;
