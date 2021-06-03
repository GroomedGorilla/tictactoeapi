const { isValidBoard, playerWins } = require("../board")

// testing isValidBoard
describe("Check board validity with short input", () => {
    it("should return false", () => {
      const board = "x oxo ";
      expect(isValidBoard(board)).toBe(false);
    });
  });

  describe("Check board validity where player has played an extra turn", () => {
    it("should return false", () => {
      const board = "xxoxox  ";
      expect(isValidBoard(board)).toBe(false);
    });
  });

  describe("Check board validity with incorrect character", () => {
    it("should return false", () => {
      const board = "x oxp    ";
      expect(isValidBoard(board)).toBe(false);
    });
  });

  describe("Check board validity when board is full", () => {
    it("should return false", () => {
      const board = "ooxxoooxx";
      expect(isValidBoard(board)).toBe(false);
    });
  });

  describe("Check board validity when game is already over", () => {
    it("should return false", () => {
      const board = "xxx o o  ";
      expect(isValidBoard(board)).toBe(false);
    });
  });

// testing playerWins
describe("Check board with winning move by player", () => {
    it("should return true", () => {
      const board = "x oxo x  ";
      expect(playerWins(board, "x")).toBe(true);
    });
  });

  describe("Check board when player hasn't won", () => {
    it("should return true", () => {
      const board = "x o o x  ";
      expect(playerWins(board, "x")).toBe(false);
    });
  });