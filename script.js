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

  let markerWasPlaced = false;

  const placeMarker = (row, column, marker) => {
    selectedSpace = board[row][column];
    if (selectedSpace === 0) {
      board[row][column] = marker;
      markerWasPlaced = true;
    } else {
      markerWasPlaced = false;
    }
  };

  const getMarkerStatus = () => markerWasPlaced;

  const getBoard = () => board;

  return {
    getBoard,
    placeMarker,
    getMarkerStatus,
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

  const switchPlayerTurn = () => {
    currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
  };

  const playRound = (row, column) => {
    gameboard.placeMarker(row, column, currentPlayer.getMarker());
    if (gameboard.getMarkerStatus() === true) {
      checkForWinner();
      switchPlayerTurn();
    }
  };

  const checkForWinner = () => {
    const board = gameboard.getBoard();

    let winnerFound = false;

    const isAPlayerMark = (mark) => mark === "X" || mark === "O";

    // horizontal check

    for (let row of board) {
      if (row.every(isAPlayerMark)) {
        if (
          row.every((mark) => mark === "X") ||
          row.every((mark) => mark === "O")
        ) {
          console.log(
            row.every((mark) => mark === "X") ? "X wins!" : "O wins!"
          );
          winnerFound = true;
        }
      }
    }
  };

  return {
    getCurrentPlayer,
    playRound,
    checkForWinner,
  };
})();
