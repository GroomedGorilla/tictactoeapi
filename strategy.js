const serverTurn = (board) => {
  //   if server gets the first move, go for centre
  if (board.trim() == "") {
    return "    o    ";
  }

  // TODO calculate server move
  const serverMove = board;
  return serverMove;
};

module.exports = {
  serverTurn,
};
