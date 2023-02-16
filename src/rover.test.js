const { Rover } = require("./rover");
const {
  cardinalDirections: { NORTH, SOUTH, EAST, WEST },
} = require("./constants");

describe("Rover", () => {
  const plateau = { width: 2, height: 2 };

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

  describe("move", () => {
    it("should increment y when rover is facing north", () => {
      const rover = new Rover({ x: 0, y: 0 }, NORTH, plateau);

      rover.move();

      expect(rover.position).toEqual({ x: 0, y: 1 });
    });

    it("should decrement y when rover is facing south", () => {
      const rover = new Rover({ x: 0, y: 1 }, SOUTH, plateau);

      rover.move();

      expect(rover.position).toEqual({ x: 0, y: 0 });
    });

    it("should increment x when rover is facing east", () => {
      const rover = new Rover({ x: 0, y: 0 }, EAST, plateau);

      rover.move();

      expect(rover.position).toEqual({ x: 1, y: 0 });
    });

    it("should decrement y when rover is facing west", () => {
      const rover = new Rover({ x: 1, y: 0 }, WEST, plateau);

      rover.move();

      expect(rover.position).toEqual({ x: 0, y: 0 });
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
          position: { x: 1, y: 1 },
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
          position: { x: 1, y: 0 },
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
        const rover = new Rover({ x: 1, y: 1 }, NORTH, plateau);

        rover.move();
        rover.move();

        expect(rover.position).toEqual({ x: 1, y: 2 });
      });
    });
  });
});
