const gameboard = (function () {
  const rows = 3;
  const columns = 3;
  const board = [];

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push("");
    }
  }

  let markerWasPlaced = false;

  const placeMarker = (row, column, marker) => {
    selectedSpace = board[row][column];
    if (selectedSpace === "") {
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

    const checkForSamePlayerMarks = (array) =>
      array.every((mark) => mark === "X") ||
      array.every((mark) => mark === "O");

    // horizontal check

    for (let row of board) {
      if (checkForSamePlayerMarks(row)) {
        console.log(row.every((mark) => mark === "X") ? "X wins!" : "O wins!");
        winnerFound = true;
      }
    }
  };

  return {
    getCurrentPlayer,
    playRound,
  };
})();
