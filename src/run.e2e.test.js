const run = require("./run");
const mockFs = require("mock-fs");

const FILEPATH = "input.txt";

const mockFile = (fileContents) => {
  mockFs({
    [FILEPATH]: fileContents,
  });
};

describe("run", () => {
  let originalArgv
  let mockConsoleLog;
  let mockProcessExit;

  beforeEach(() => {
    originalArgv = process.argv
    process.argv = [, , FILEPATH]

    mockConsoleLog = jest.spyOn(console, "log").mockImplementation(() => {
    });
    mockProcessExit = jest.spyOn(process, 'exit').mockImplementation(() => {
    })
  });

  afterEach(() => {
    mockFs.restore();

    process.argv = originalArgv

    mockConsoleLog.mockReset();
    mockProcessExit.mockReset();
  });

  describe("e2e test", () => {
    it("should read input, move rovers, and print output", async () => {
      mockFile("5 5\n1 2 N\nLMLMLMLMM\n3 3 E\nMMRMMRMRRM");

      await run();

      expect(mockConsoleLog).toHaveBeenCalledWith("1 3 N\n5 1 E");
    });

    it("should display when rover falls off plateau", async () => {
      mockFile("3 4\n0 0 E\nMMMMMMMM");

      await run();

      expect(mockConsoleLog).toHaveBeenCalledWith("4 0 E (fell)");
    });

    it("should turn and move diagonally", async () => {
      mockFile("5 5\n2 2 E\nlMLMlllrMR");

      await run();

      expect(mockConsoleLog).toHaveBeenCalledWith("1 3 NW");
    });

    it("should move backwards", async () => {
      mockFile("5 5\n2 2 NW\nB");

      await run();

      expect(mockConsoleLog).toHaveBeenCalledWith("3 1 NW");
    });

    it("should log and exit when error is thrown", async () => {
      await run()

      expect(mockConsoleLog).toHaveBeenCalledWith("ENOENT: no such file or directory, open 'input.txt'")
      expect(mockProcessExit).toHaveBeenCalledWith(1)
    })
  });
});
