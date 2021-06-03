module.exports = (router) => {
  router.get("/", function (req, res) {
    res.status(200).send("input received");
  });
};
