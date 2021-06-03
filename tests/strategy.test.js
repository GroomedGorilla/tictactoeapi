const { serverTurn } = require("../strategy");

// testing serverTurn
describe("Check server makes winning move - maximising", () => {
  it("should return xooxoxoxo", () => {
    const board = "xooxox xo";
    expect(serverTurn(board)).toBe("xooxoxoxo");
  });
});

describe("Check server makes winning move - maximising", () => {
  it("should return xox oxoo ", () => {
    const board = "xox oxo  ";
    expect(serverTurn(board)).toBe("xox oxoo ");
  });
});

describe("Check server makes best move - minimising", () => {
  it("should return xooxo oxx", () => {
    const board = "xooxo  xx";
    expect(serverTurn(board)).toBe("xooxo oxx");
  });
});
