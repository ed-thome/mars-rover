const parseFile = require("./parseFile");
const executeRovers = require("./executeRovers");
const printOutput = require("./printOutput");


const run = async () => {
  try {
    const filepath = process.argv[2];
    await runMarsRover(filepath)
  } catch (e) {
    console.log(e.message)
    process.exit(1)
  }
};

const runMarsRover = async (filepath) => {
  const initialData = await parseFile(filepath);
  const results = executeRovers(initialData);
  printOutput(results)
}

module.exports = run