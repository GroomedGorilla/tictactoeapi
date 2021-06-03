const { isValidBoard } = require("../board");
const { serverTurn } = require("../strategy");

module.exports = (router) => {
  router.get("/", function (req, res) {
    //check for board query param
    if (req.query.board) {
      const board = req.query.board;
      // TODO test input validity
      if (isValidBoard(board)) {
        // TODO get server move
        const serverMove = serverTurn(board);
        // TODO check if game ends
        // TODO send 200 on success. Send 400 on invalid board
        res.status(200).send(`Valid Board ✅ - Received "${serverMove}"`);
      } else {
        res.status(400).send(`Invalid board received "${req.query.board}"`);
      }
    } else {
      res.status(400).send("No board input received");
    }
  });
};
