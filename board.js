const isValidBoard = (board) => {
  // board length
  const validBoardLength = board.length == 9;
  // allowed characters
  const usesAllowedCharacters = /^[x\o\ ]+$/.test(board);
  // at least one empty space (catches case where game is already over)
  const emptySpot = board.includes(" ");

  const numberOfPlayerTurns = (board.match(/x/g) || []).length;
  const numberOfServerTurns = (board.match(/o/g) || []).length;

  // Server can play if:
  // - the board is empty.
  // - the player has player up to once more than the server
  console.log(`Player turns ${numberOfPlayerTurns}`);
  console.log(`Player turns ${numberOfServerTurns}`);
  const serversTurn =
    board.trim() != ""
      ? numberOfPlayerTurns - numberOfServerTurns in [0, 1]
      : true;

  const validityChecks = [
    validBoardLength,
    usesAllowedCharacters,
    emptySpot,
    serversTurn,
  ];

  //Returns true if board passes all checks
  return validityChecks.every(Boolean);
};

module.exports = {
  isValidBoard,
};
