const parseFile = require("./parseFile");
const mockFs = require("mock-fs");
const {
  cardinalDirections: { SOUTH, EAST, WEST, SOUTH_EAST },
  instructions: {
    TURN_LEFT,
    TURN_RIGHT,
    HALF_TURN_LEFT,
    HALF_TURN_RIGHT,
    MOVE,
    BACK,
  },
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

  describe("parsing file", () => {
    it.each([
      {
        scenario: "plateau with specified upper right coordinates",
        input: "2 3",
        output: {
          plateau: { width: 3, height: 4 },
          rovers: [],
        },
      },
      {
        scenario: "rover with instructions",
        input: "4 5\n1 1 S\nLMR",
        output: {
          plateau: { width: 5, height: 6 },
          rovers: [
            {
              position: { x: 1, y: 1 },
              direction: SOUTH,
              instructions: [TURN_LEFT, MOVE, TURN_RIGHT],
            },
          ],
        },
      },
      {
        scenario: "two rovers",
        input: "10 12\n0 4 E\nLLLL\n10 12 W\nMR",
        output: {
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
        },
      },
      {
        scenario: "rover with 45-degree turns",
        input: "4 4\n1 1 S\nlrlr",
        output: {
          plateau: { width: 5, height: 5 },
          rovers: [
            {
              position: { x: 1, y: 1 },
              direction: SOUTH,
              instructions: [
                HALF_TURN_LEFT,
                HALF_TURN_RIGHT,
                HALF_TURN_LEFT,
                HALF_TURN_RIGHT,
              ],
            },
          ],
        },
      },
      {
        scenario: "rover with diagonal direction",
        input: "4 4\n1 1 SE\nl",
        output: {
          plateau: { width: 5, height: 5 },
          rovers: [
            {
              position: { x: 1, y: 1 },
              direction: SOUTH_EAST,
              instructions: [HALF_TURN_LEFT],
            },
          ],
        },
      },
      {
        scenario: "rover with backwards instruction",
        input: "4 4\n1 1 SE\nB",
        output: {
          plateau: { width: 5, height: 5 },
          rovers: [
            {
              position: { x: 1, y: 1 },
              direction: SOUTH_EAST,
              instructions: [BACK],
            },
          ],
        },
      },
    ])("should parse $scenario", async ({ input, output }) => {
      mockFile(input);
      expect(await parseFile(FILEPATH)).toEqual(output);
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
      {
        scenario: "rover initialized above plateau",
        input: "1 1\n1 3 W\nM",
        error: "Rover initialized outside plateau",
      },
      {
        scenario: "rover initialized right of plateau",
        input: "1 1\n2 1 W\nM",
        error: "Rover initialized outside plateau",
      },
    ])("should throw error if $scenario", ({ input, error }) => {
      mockFile(input);
      return expect(parseFile(FILEPATH)).rejects.toThrow(error);
    });
  });
});
