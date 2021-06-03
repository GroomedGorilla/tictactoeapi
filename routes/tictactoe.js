const { isValidBoard } = require("../board");

module.exports = (router) => {
  router.get("/", function (req, res) {
    //check for board query param
    console.log(req.query.board);
    if (req.query.board) {
      const board = req.query.board;
      // TODO test input validity
      if (isValidBoard(board)) {
        res.status(200).send(`Valid Board ✅ - Received "${board}"`);
      } else {
        res.status(400).send(`Invalid board received "${req.query.board}"`);
      }
      // TODO get server move
      // TODO check if game ends
      // TODO send 200 on success. Send 400 on invalid board
    } else {
      res.status(400).send("No board input received");
    }
  });
};
