const { serverCharacter, gameOver } = require("./board");

const scoring = {
  o: 1,
  x: -1,
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
  console.log(serverMaximising ? "Server MAX" : "Server MIN");

  if (!serverMaximising) {
    roleMapping["o"] = "min";
    roleMapping["x"] = "max";
  }

  const serverMove = calcServerMove(board);
  return serverMove;
};

const calcServerMove = (board) => {
  // minimax initial loop - Server is Maximising
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
  // check if game is over (i.e. terminal state)
  let gameResult = gameOver(board);
  if (gameResult) {
    //TODO check this!
    console.log(`Game Result = ${gameResult}`);
    console.log(`Scoring = ${scoring[gameResult]}`);
    return scoring[gameResult];
  }

  if (isMaximising) {
    let bestScore = -Infinity;
    // get indices of white space (i.e. possible moves)
    let emptyIndices = [];
    for (var i = 0; i < board.length; i++) {
      if (board[i] === " ") emptyIndices.push(i);
    }

    emptyIndices.forEach((index) => {
      if (board[index] === " ") {
        let boardArray = board.split("");
        boardArray[index] = "o";
        // look at possible moves in next game turn (change of player + role)
        let score = minimax(boardArray.join(""), false);
        console.log(`MAXimising score ${score}`);
        console.log(`MAXimising best score ${bestScore}`);

        bestScore = Math.max(score, bestScore);
      }
    });
    return bestScore;
  } else {
    bestScore = Infinity;
    // get indices of white space (i.e. possible moves)
    let emptyIndices = [];
    for (var i = 0; i < board.length; i++) {
      if (board[i] === " ") emptyIndices.push(i);
    }

    emptyIndices.forEach((index) => {
      if (board[index] === " ") {
        let boardArray = board.split("");
        boardArray[index] = "x";
        // look at possible moves in next game turn (change of player + role)
        let score = minimax(boardArray.join(""), true);
        console.log(`MINimising score ${score}`);
        console.log(`MINimising best score ${bestScore}`);
        bestScore = Math.min(score, bestScore);
      }
    });
    return bestScore;
  }
};

module.exports = {
  serverTurn,
};
