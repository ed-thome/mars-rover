const {
  cardinalDirections: { NORTH, EAST, SOUTH },
  instructions: { TURN_RIGHT, MOVE },
} = require("./constants");
const executeRovers = require("./executeRovers");

describe("execute", () => {
  it("should execute move instruction for a rover and return new position and direction", () => {
    const initialData = {
      plateau: { width: 5, height: 5 },
      rovers: [
        { position: { x: 0, y: 0 }, direction: NORTH, instructions: [MOVE] },
      ],
    };

    const results = executeRovers(initialData);

    expect(results).toEqual([{ position: { x: 0, y: 1 }, direction: NORTH }]);
  });

  it("should execute move and turn instructions", () => {
    const initialData = {
      plateau: { width: 5, height: 5 },
      rovers: [
        {
          position: { x: 0, y: 0 },
          direction: NORTH,
          instructions: [TURN_RIGHT, MOVE],
        },
      ],
    };

    const results = executeRovers(initialData);

    expect(results).toEqual([{ position: { x: 1, y: 0 }, direction: EAST }]);
  });

  it("should execute instructions for multiple rovers", () => {
    const initialData = {
      plateau: { width: 5, height: 5 },
      rovers: [
        {
          position: { x: 0, y: 0 },
          direction: NORTH,
          instructions: [MOVE],
        },
        {
          position: { x: 0, y: 4 },
          direction: SOUTH,
          instructions: [MOVE],
        },
      ],
    };

    const results = executeRovers(initialData);

    expect(results).toEqual([
      {
        position: { x: 0, y: 1 },
        direction: NORTH,
      },
      {
        position: { x: 0, y: 3 },
        direction: SOUTH,
      },
    ]);
  });
});
