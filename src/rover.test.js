const { Rover } = require("./rover");
const {
  cardinalDirections: { NORTH, SOUTH, EAST, WEST },
} = require("./constants");

describe("Rover", () => {
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
      const rover = new Rover({ x: 0, y: 0 }, NORTH);

      rover.move();

      expect(rover.position).toEqual({ x: 0, y: 1 });
    });

    it("should decrement y when rover is facing south", () => {
      const rover = new Rover({ x: 0, y: 1 }, SOUTH);

      rover.move();

      expect(rover.position).toEqual({ x: 0, y: 0 });
    });

    it("should increment x when rover is facing east", () => {
      const rover = new Rover({ x: 0, y: 0 }, EAST);

      rover.move();

      expect(rover.position).toEqual({ x: 1, y: 0 });
    });

    it("should decrement y when rover is facing west", () => {
      const rover = new Rover({ x: 1, y: 0 }, WEST);

      rover.move();

      expect(rover.position).toEqual({ x: 0, y: 0 });
    });
  });
});
