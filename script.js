const gameboard = (function () {
  const rows = 3;
  const columns = 3;
  const board = [];

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(0);
    }
  }

  const placeMarker = (row, column, marker) => {
    board[row][column] = marker;
  };

  const getBoard = () => board;

  return {
    getBoard,
    placeMarker,
  };
})();

const Player = function (name, marker) {
  const getName = () => name;
  const getMarker = () => marker;

  return { getName, getMarker };
};

const gameController = (function () {
  const playerOne = Player("playerOne", "X");
  const playerTwo = Player("playerTwo", "O");

  let currentPlayer = playerOne;

  const getCurrentPlayer = () => currentPlayer;

  return {
    getCurrentPlayer,
  };
})();
