var express = require("express"); // call express
var app = express(); // define app using express

var port = process.env.PORT || 8080; // set port

// ROUTES FOR TIC TAC TOE API
// =============================================================================
var router = express.Router(); // get an instance of the express Router

// === Registering Routes ===
app.use("/", router);

// === Starting Server ===
app.listen(port);
console.log("TicTacToe server running on port " + port);

module.exports = app;