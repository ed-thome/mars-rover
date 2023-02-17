const printOutput = require("./printOutput");
const {
  cardinalDirections: { NORTH, SOUTH, WEST },
} = require("./constants");

describe("printOutput", () => {
  let mockConsoleLog;

  beforeEach(() => {
    mockConsoleLog = jest.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    mockConsoleLog.mockRestore();
  });

  it("should log rover positions on console", () => {
    printOutput([
      {
        position: { x: 9, y: 14 },
        direction: SOUTH,
      },
      { position: { x: 3, y: 7 }, direction: WEST },
    ]);

    expect(mockConsoleLog).toHaveBeenCalledWith("9 14 S\n3 7 W");
  });

  it("should display if rover is fallen", () => {
    printOutput([
      {
        position: { x: 6, y: 3 },
        direction: NORTH,
        isFallen: true,
      },
    ]);

    expect(mockConsoleLog).toHaveBeenCalledWith("6 3 N (fell)");
  });
});
