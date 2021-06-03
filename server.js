var express = require("express"); // call express
var app = express(); // define app using express

var port = process.env.PORT || 8080; // set port

// === Routes for TicTacToe API ===
var router = express.Router(); // get an instance of the express Router
require("./routes/tictactoe")(router);
// === Registering Routes ===
app.use("/", router);

// === Starting Server ===
app.listen(port);
console.log("TicTacToe server running on port " + port);

module.exports = app;