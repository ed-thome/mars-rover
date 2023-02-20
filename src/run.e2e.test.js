const run = require("./run");
const mockFs = require("mock-fs");

const FILEPATH = "input.txt";

const mockFile = (fileContents) => {
  mockFs({
    [FILEPATH]: fileContents,
  });
};

describe("run", () => {
  let mockConsoleLog;

  beforeEach(() => {
    mockConsoleLog = jest.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    mockFs.restore();
    mockConsoleLog.mockReset();
  });

  describe("e2e test", () => {
    it("should read input, move rovers, and print output", async () => {
      mockFile("5 5\n1 2 N\nLMLMLMLMM\n3 3 E\nMMRMMRMRRM");

      await run(FILEPATH);

      expect(mockConsoleLog).toHaveBeenCalledWith("1 3 N\n5 1 E");
    });

    it("should display when rover falls off plateau", async () => {
      mockFile("3 4\n0 0 E\nMMMMMMMM");

      await run(FILEPATH);

      expect(mockConsoleLog).toHaveBeenCalledWith("4 0 E (fell)");
    });

    it("should turn and move diagonally", async () => {
      mockFile("5 5\n2 2 E\nlMLMlllrMR");

      await run(FILEPATH);

      expect(mockConsoleLog).toHaveBeenCalledWith("1 3 NW");
    });

    it("should move backwards", async () => {
      mockFile("5 5\n2 2 NW\nB");

      await run(FILEPATH);

      expect(mockConsoleLog).toHaveBeenCalledWith("3 1 NW");
    });
  });
});
