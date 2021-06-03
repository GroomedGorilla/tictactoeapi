const { serverTurn } = require("../strategy");

// testing serverTurn
describe("Check server makes winning move - maximising", () => {
  it("should return xooxoxoxo", () => {
    const board = "xooxox xo";
    expect(serverTurn(board)).toBe("xooxoxoxo");
  });
});