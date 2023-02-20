const parseFile = require("./parseFile");
const executeRovers = require("./executeRovers");
const printOutput = require("./printOutput");


const run = async (filename) => {
  const initialData = await parseFile(filename);
  const results = executeRovers(initialData);
  printOutput(results)
};

module.exports = run