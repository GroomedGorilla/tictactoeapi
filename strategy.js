const { serverCharacter, playerCharacter, gameOver } = require("./board");

const scoring = {
  max: 1,
  min: -1,
  tie: 0,
};

// arbitrarily chose server Maximising as default
let serverMaximising = true;
// add roles for "maximising" and "minimising" player
let roleMapping = {
  o: "max",
  x: "min",
  tie: "tie",
};

const serverTurn = (board) => {
  //   if server gets the first move, go for centre
  if (board.trim() == "") {
    return "    o    ";
  }

  // determine which player went first (minimising vs maximising)
  // server is/was first player if:
  // - empty board
  // - player has played the same number of turns
  const numPlayerTurns = (board.match(/x/g) || []).length;
  const numServerTurns = (board.match(/o/g) || []).length;
  serverMaximising = board.trim() == "" || numPlayerTurns == numServerTurns;

  if (!serverMaximising) {
    roleMapping["o"] = "min";
    roleMapping["x"] = "max";
  }

  const serverMove = calcServerMove(board);
  return serverMove;
};

const calcServerMove = (board) => {
  //   adapt bestScore based on whether server is Maximising or not
  let bestScore = serverMaximising ? -Infinity : Infinity;
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
      let score = minimax(testMove, !serverMaximising);
      if (serverMaximising) {
        if (score > bestScore) {
          bestScore = score;
          chosenMoveIndex = index;
        }
      } else {
        if (score < bestScore) {
          bestScore = score;
          chosenMoveIndex = index;
        }
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
  // check if game is over (i.e. terminal state)
  let gameResult = gameOver(board);
  if (gameResult) {
    // if game over, return correct score by role
    return scoring[roleMapping[gameResult]];
  }

  if (isMaximising) {
    // Maximising turn
    let bestScore = -Infinity;
    // get indices of white space (i.e. possible moves)
    let emptyIndices = [];
    for (var i = 0; i < board.length; i++) {
      if (board[i] === " ") emptyIndices.push(i);
    }

    emptyIndices.forEach((index) => {
      if (board[index] === " ") {
        let boardArray = board.split("");
        // place server character if maximising, else player character
        boardArray[index] = serverMaximising ? serverCharacter : playerCharacter;
        // look at possible moves in next game turn (change of player + role)
        let score = minimax(boardArray.join(""), false);
        bestScore = Math.max(score, bestScore);
      }
    });
    return bestScore;
  } else {
    // Minimising turn
    bestScore = Infinity;
    // get indices of white space (i.e. possible moves)
    let emptyIndices = [];
    for (var i = 0; i < board.length; i++) {
      if (board[i] === " ") emptyIndices.push(i);
    }

    emptyIndices.forEach((index) => {
      if (board[index] === " ") {
        let boardArray = board.split("");
        boardArray[index] = serverMaximising ? playerCharacter : serverCharacter;
        // look at possible moves in next game turn (change of player + role)
        let score = minimax(boardArray.join(""), true);
        bestScore = Math.min(score, bestScore);
      }
    });
    return bestScore;
  }
};

module.exports = {
  serverTurn,
};
