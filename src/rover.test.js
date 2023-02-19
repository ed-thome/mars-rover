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
  instructions: {
    MOVE,
    BACK,
    TURN_RIGHT,
    TURN_LEFT,
    HALF_TURN_RIGHT,
    HALF_TURN_LEFT,
  },
} = require("./constants");

describe("Rover", () => {
  const plateau = { width: 4, height: 5 };

  describe("execute instructions", () => {
    describe("turn right", () => {
      it("should turn rover right 90 degrees", () => {
        const rover = Rover.create({ x: 0, y: 0 }, NORTH);

        rover.execute(TURN_RIGHT);
        expect(rover.direction.value).toEqual(EAST);

        rover.execute(TURN_RIGHT);
        expect(rover.direction.value).toEqual(SOUTH);

        rover.execute(TURN_RIGHT);
        expect(rover.direction.value).toEqual(WEST);

        rover.execute(TURN_RIGHT);
        expect(rover.direction.value).toEqual(NORTH);
      });
    });

    describe("turn left", () => {
      it("should turn rover left 90 degrees", () => {
        const rover = Rover.create({ x: 0, y: 0 }, NORTH);

        rover.execute(TURN_LEFT);

        expect(rover.direction.value).toEqual(WEST);
      });
    });

    describe("half turn right", () => {
      it("should turn rover right 45 degrees", () => {
        const rover = Rover.create({ x: 0, y: 0 }, NORTH);

        rover.execute(HALF_TURN_RIGHT);
        expect(rover.direction.value).toEqual(NORTH_EAST);

        rover.execute(HALF_TURN_RIGHT);
        expect(rover.direction.value).toEqual(EAST);

        rover.execute(HALF_TURN_RIGHT);
        expect(rover.direction.value).toEqual(SOUTH_EAST);

        rover.execute(HALF_TURN_RIGHT);
        expect(rover.direction.value).toEqual(SOUTH);

        rover.execute(HALF_TURN_RIGHT);
        expect(rover.direction.value).toEqual(SOUTH_WEST);

        rover.execute(HALF_TURN_RIGHT);
        expect(rover.direction.value).toEqual(WEST);

        rover.execute(HALF_TURN_RIGHT);
        expect(rover.direction.value).toEqual(NORTH_WEST);

        rover.execute(HALF_TURN_RIGHT);
        expect(rover.direction.value).toEqual(NORTH);
      });
    });

    describe("half turn left", () => {
      it("should turn rover left 45 degrees", () => {
        const rover = Rover.create({ x: 0, y: 0 }, NORTH);

        rover.execute(HALF_TURN_LEFT);
        expect(rover.direction.value).toEqual(NORTH_WEST);
      });
    });

    describe("move", () => {
      const initialPosition = { x: 1, y: 1 };

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
        const rover = Rover.create(initialPosition, direction, plateau);

        rover.execute(MOVE);

        expect(rover.position).toEqual(expectedPosition);
      });

      describe("falling off the plateau", () => {
        it("rover should not fall when rover moves within the plateau", () => {
          const rover = Rover.create({ x: 0, y: 0 }, NORTH, plateau);

          rover.execute(MOVE);

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
            const rover = Rover.create(position, direction, plateau);

            rover.execute(MOVE);

            expect(rover.isFallen()).toEqual(true);
          }
        );

        it("should not move again after falling", () => {
          const rover = Rover.create({ x: 1, y: 2 }, NORTH, plateau);

          rover.execute(MOVE);
          rover.execute(MOVE);

          expect(rover.position).toEqual({ x: 1, y: 4 });
        });
      });
    });

    describe("back", () => {
      it("should move in opposite direction", () => {
        const rover = Rover.create({ x: 1, y: 1 }, NORTH_EAST, plateau);

        rover.execute(BACK);

        expect(rover.position).toEqual({ x: 0, y: 0 });
      });
    });
  });
});
