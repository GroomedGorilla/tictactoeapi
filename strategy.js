const { serverCharacter } = require("./board");

const serverTurn = (board) => {
  //   if server gets the first move, go for centre
  if (board.trim() == "") {
    return "    o    ";
  }

  // TODO calculate server move
  const serverMove = calcServerMove(board);
  return serverMove;
};

const calcServerMove = (board) => {
  // minimax first loop - assuming Maximising
  let bestScore = -Infinity;
  let chosenMoveIndex;
  // get indices of white space (i.e. possible moves)
  let emptyIndices = [];
  for (var i = 0; i < board.length; i++) {
    if (board[i] === " ") emptyIndices.push(i);
  }
  emptyIndices.forEach((index) => {
    console.log(`Trying index ${index}`);
    if (board[index] === " ") {
      let boardArray = board.split("");
      boardArray[index] = serverCharacter;
      // look at possible moves in next game turn (change of player + role)
      let testMove = boardArray.join("");
      // TODO minimax logic
      let score = minimax(testMove, false);
      if (score > bestScore) {
        bestScore = score;
        chosenMoveIndex = index;
        console.log(`Chosen move = ${chosenMoveIndex}`);
      }
    }
  });
  console.log(`Board before move: '${board}'`);
  // update board with server's move
  let updatedBoard = board.split("");
  updatedBoard[chosenMoveIndex] = serverCharacter;
  console.log(`Board after move : '${updatedBoard.join("")}'`);
  return updatedBoard.join("");
};

const minimax = (board, isMaximising) => {
  // TODO implement minimax
  return 1;
};

module.exports = {
  serverTurn,
};
