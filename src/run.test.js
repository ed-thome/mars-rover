const marsRover = require("./marsRover");
const mockFs = require("mock-fs");

describe("run", () => {
  let mockConsoleLog;

  beforeEach(() => {
    mockFs({
      "input.txt": "5 5\n1 2 N\nLMLMLMLMM\n3 3 E\nMMRMMRMRRM",
    });
    mockConsoleLog = jest.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    mockFs.restore();
    mockConsoleLog.mockReset();
  });

  describe("e2e test", () => {
    it("should read input, move rovers, and print output", async () => {
      await marsRover.run("input.txt");
      expect(mockConsoleLog).toHaveBeenCalledWith("1 3 N\n5 1 E");
    });
  });
});
