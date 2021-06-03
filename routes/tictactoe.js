const { isValidBoard, gameOver } = require("../board");
const { serverTurn } = require("../strategy");

module.exports = (router) => {
  router.get("/", function (req, res) {
    //check for board query param
    if (req.query.board) {
      const board = req.query.board;
      if (isValidBoard(board)) {
        const serverMove = serverTurn(board);
        const winner = gameOver(serverMove)
        res.status(200).send(`Valid Board ✅ - "${serverMove}" ${winner ? `- ${winner.toUpperCase()} Wins!` : ''}`);
      } else {
        res.status(400).send(`Invalid board received "${req.query.board}"`);
      }
    } else {
      res.status(400).send("No board input received");
    }
  });
};
