// * Winning combos by index, based on the following board structure:
// * 0|1|2
// * =====
// * 3|4|5
// * =====
// * 6|7|8
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [0, 4, 8],
];
const winningSet = { player: 2, " ": 1 };
const playerCharacter = "x";
const serverCharacter = "o";

const isValidBoard = (board) => {
  // board length limited to 9
  const validBoardLength = board.length == 9;
  // allowed characters (x,o ' ')
  const usesAllowedCharacters = /^[x\o\ ]+$/.test(board);
  // at least one empty space (catches case where game is already over)
  const emptySpot = board.includes(" ");

  const numberOfPlayerTurns = (board.match(/x/g) || []).length;
  const numberOfServerTurns = (board.match(/o/g) || []).length;
  const gameAlreadyOver = gameOver(board);

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
    !gameAlreadyOver,
  ];

  //Returns true if board passes all checks
  return validityChecks.every(Boolean);
};

const playerWins = (board, player = playerCharacter) => {
  // find indices for player moves
  const playerMoveIndexes = board
    .split("")
    .flatMap((char, i) => (char == player ? i : []));
  // check if player moves satisfy any of the winning combos
  const playerWins = winningCombos.map((combo) =>
    combo.reduce(
      (acc, current) => acc & playerMoveIndexes.includes(current),
      true
    )
  );
  return playerWins.includes(1);
};

const gameOver = (board) => {
  // check if either player wins
  if (playerWins(board)) {
    return playerCharacter;
  }

  if (playerWins(board, serverCharacter)) {
    return serverCharacter;
  }

  // if board has no empty slows and neither player has won,
  // then it's a tie
  if (!board.includes(" ")) {
    return "tie";
  }

  return false;
};

module.exports = {
  isValidBoard,
  playerWins,
  gameOver,
  serverCharacter,
};
