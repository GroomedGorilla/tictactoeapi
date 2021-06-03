module.exports = (router) => {
  router.get("/", function (req, res) {
    //check for board query param
    if (req.query.board) {
      const board = req.query.board;
      // TODO test input validity
      // TODO get server move
      // TODO check if game ends
      // TODO send 200 on success. Send 400 on invalid board
    }
    res.status(200);
  });
};
