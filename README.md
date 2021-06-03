# TicTacToe API

## A game logic API, based on the Minimax algorithm for finding the best move for the AI Server Player!

## The boring bits
- Set Up is as simple as `npm i`
- API, Board Logic and Strategy tests can be run (via Jest) using:  `npm run test`
- `npm run start` to run

## Usage
- The API is hosted at https://pure-coast-27371.herokuapp.com/ and can be pinged by passing it a board, by making a GET request using the query parameter `/?board=`
- Valid boards must have a length of 9, and only include the characters `o` (representing the Server), `x` (representing the Player), and ` ` (whitespace)
- Either player can initiate a game
- Example queries:
  - (Player makes first move) [https://pure-coast-27371.herokuapp.com/?board=%20%20%20%20%20%20%20%20x]
  - (Server invited to make first move) [https://pure-coast-27371.herokuapp.com/?board=%20%20%20%20%20%20%20%20%20]
  - (Mid-game, Server's turn) [https://pure-coast-27371.herokuapp.com/?board=xo%20%20o%20%20x%20]

## Algorithm Breakdown
I wanted to write an algorithm that would do its utmost to win...and if all else fails, block the Player from winning, resulting in a tie!

TicTacToe relies on a small selection of move options (literally no more than 9 spots over the course of a game), meaning a player would never play more than 5 turns per game. In a similar approach to chess (though far simpler), TicTacToe can be broken down into a decision tree, where each board configuration has an optimal move available for each player, based on possible future moves by the opponent.

The Minimax algorithm is a perfect fit for this scenario. By placing weights, or scores, on each outcome of the tree of options, we are able to decide on a strategy based on who went first. Paths in the first player's favour can be scored as `+1`, while those resulting in the opponent winning can be scored as `-1`. A tie remains a neutral `0`.

The algorithm takes two roles into account:
- A "Maximising" player - i.e. they would like to maximise their decision score
- and a "Minimising" player - i.e. it's in their interest to minimise their decision score

We can draw a (rather large) diagram of the decision tree to figure out ideal moves based on the current game layout, however a recursive algorithm to iterative through the branches is far quicker.
