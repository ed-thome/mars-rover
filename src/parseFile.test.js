const parseFile = require("./parseFile");
const mockFs = require("mock-fs");
const {
  cardinalDirections: { SOUTH, EAST, WEST },
  instructions: { TURN_LEFT, TURN_RIGHT, MOVE },
} = require("./constants");

const FILEPATH = "input.txt";

const mockFile = (fileContents) => {
  mockFs({
    [FILEPATH]: fileContents,
  });
};

describe("parseFile", () => {
  afterEach(() => {
    mockFs.restore();
  });

  it("should read input file and return plateau with specified upper right coordinates", async () => {
    mockFile("2 3");

    expect(await parseFile(FILEPATH)).toEqual({
      plateau: { width: 3, height: 4 },
      rovers: [],
    });
  });

  it("should parse rover with instructions", async () => {
    mockFile("4 5\n1 1 S\nLMR");

    expect(await parseFile(FILEPATH)).toEqual({
      plateau: { width: 5, height: 6 },
      rovers: [
        {
          position: { x: 1, y: 1 },
          direction: SOUTH,
          instructions: [TURN_LEFT, MOVE, TURN_RIGHT],
        },
      ],
    });
  });

  it("should parse two rovers", async () => {
    mockFile("10 12\n0 4 E\nLLLL\n10 12 W\nMR");

    expect(await parseFile(FILEPATH)).toEqual({
      plateau: { width: 11, height: 13 },
      rovers: [
        {
          position: { x: 0, y: 4 },
          direction: EAST,
          instructions: [TURN_LEFT, TURN_LEFT, TURN_LEFT, TURN_LEFT],
        },
        {
          position: { x: 10, y: 12 },
          direction: WEST,
          instructions: [MOVE, TURN_RIGHT],
        },
      ],
    });
  });

  describe("validations", () => {
    it("should throw error if no filepath given", () => {
      return expect(parseFile()).rejects.toThrow("No input file specified");
    });

    it.each([
      {
        scenario: "first line is not plateau format",
        input: "22",
        error: "Plateau format is invalid: 22",
      },
      {
        scenario: "rover format is invalid",
        input: "9 3\n0 4 Q\nL",
        error: "Rover format is invalid: 0 4 Q",
      },
      {
        scenario: "instructions format is invalid",
        input: "9 3\n0 4 E\nLRMZ",
        error: "Instructions format is invalid: LRMZ",
      },
      {
        scenario: "instructions line is missing",
        input: "3 3\n1 1",
        error: "Wrong number of lines in input file",
      },
    ])("should throw error if $scenario", ({ input, error }) => {
      mockFile(input);
      return expect(parseFile(FILEPATH)).rejects.toThrow(error);
    });
  });
});
