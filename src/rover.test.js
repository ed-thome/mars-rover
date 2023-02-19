const { Rover } = require("./rover");
const {
  cardinalDirections: {
    NORTH,
    NORTH_EAST,
    NORTH_WEST,
    SOUTH,
    SOUTH_EAST,
    SOUTH_WEST,
    EAST,
    WEST,
  },
} = require("./constants");

describe("Rover", () => {
  const plateau = { width: 4, height: 5 };

  describe("turnRight", () => {
    it("should turn rover right 90 degrees", () => {
      const rover = new Rover({ x: 0, y: 0 }, NORTH);

      rover.turnRight();
      expect(rover.direction).toEqual(EAST);

      rover.turnRight();
      expect(rover.direction).toEqual(SOUTH);

      rover.turnRight();
      expect(rover.direction).toEqual(WEST);

      rover.turnRight();
      expect(rover.direction).toEqual(NORTH);
    });
  });

  describe("turnLeft", () => {
    it("should turn rover left 90 degrees", () => {
      const rover = new Rover({ x: 0, y: 0 }, NORTH);
      rover.turnLeft();
      expect(rover.direction).toEqual(WEST);
    });
  });

  describe("halfTurnRight", () => {
    it("should turn rover right 45 degrees", () => {
      const rover = new Rover({ x: 0, y: 0 }, NORTH);

      rover.halfTurnRight();
      expect(rover.direction).toEqual(NORTH_EAST);

      rover.halfTurnRight();
      expect(rover.direction).toEqual(EAST);

      rover.halfTurnRight();
      expect(rover.direction).toEqual(SOUTH_EAST);

      rover.halfTurnRight();
      expect(rover.direction).toEqual(SOUTH);

      rover.halfTurnRight();
      expect(rover.direction).toEqual(SOUTH_WEST);

      rover.halfTurnRight();
      expect(rover.direction).toEqual(WEST);

      rover.halfTurnRight();
      expect(rover.direction).toEqual(NORTH_WEST);

      rover.halfTurnRight();
      expect(rover.direction).toEqual(NORTH);
    });
  });

  describe("halfTurnLeft", () => {
    it("should turn rover left 45 degrees", () => {
      const rover = new Rover({ x: 0, y: 0 }, NORTH);

      rover.halfTurnLeft();
      expect(rover.direction).toEqual(NORTH_WEST);
    });
  });

  describe("move", () => {
    it.each([
      {
        scenario: "increment y when facing north",
        direction: NORTH,
        expectedPosition: { x: 1, y: 2 },
      },
      {
        scenario: "decrement y when facing south",
        direction: SOUTH,
        expectedPosition: { x: 1, y: 0 },
      },
      {
        scenario: "increment x when facing east",
        direction: EAST,
        expectedPosition: { x: 2, y: 1 },
      },
      {
        scenario: "decrement x when facing west",
        direction: WEST,
        expectedPosition: { x: 0, y: 1 },
      },
      {
        scenario: "move diagonally northeast",
        direction: NORTH_EAST,
        expectedPosition: { x: 2, y: 2 },
      },
      {
        scenario: "move diagonally northwest",
        direction: NORTH_WEST,
        expectedPosition: { x: 0, y: 2 },
      },
      {
        scenario: "move diagonally southeast",
        direction: SOUTH_EAST,
        expectedPosition: { x: 2, y: 0 },
      },
      {
        scenario: "move diagonally southwest",
        direction: SOUTH_WEST,
        expectedPosition: { x: 0, y: 0 },
      },
    ])("should $scenario", ({ direction, expectedPosition }) => {
      const initialPosition = { x: 1, y: 1 };
      const rover = new Rover(initialPosition, direction, plateau);

      rover.move();

      expect(rover.position).toEqual(expectedPosition);
    });

    describe("falling off the plateau", () => {
      it("rover should not fall when rover moves within the plateau", () => {
        const rover = new Rover({ x: 0, y: 0 }, NORTH, plateau);

        rover.move();

        expect(rover.isFallen()).toEqual(false);
      });

      it.each([
        {
          scenario: "north",
          position: { x: 1, y: 4 },
          direction: NORTH,
        },
        {
          scenario: "south",
          position: { x: 0, y: 0 },
          direction: SOUTH,
        },
        {
          scenario: "west",
          position: { x: 0, y: 0 },
          direction: WEST,
        },
        {
          scenario: "east",
          position: { x: 3, y: 0 },
          direction: EAST,
        },
      ])(
        "should fall when rover moves past $scenario plateau edge",
        ({ position, direction }) => {
          const rover = new Rover(position, direction, plateau);

          rover.move();

          expect(rover.isFallen()).toEqual(true);
        }
      );

      it("should not move again after falling", () => {
        const rover = new Rover({ x: 1, y: 2 }, NORTH, plateau);

        rover.move();
        rover.move();

        expect(rover.position).toEqual({ x: 1, y: 4 });
      });
    });
  });
});
