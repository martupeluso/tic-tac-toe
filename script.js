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

  let winnerFound = false;

  const playRound = (row, column) => {
    gameboard.placeMarker(row, column, currentPlayer.getMarker());
    if (gameboard.getMarkerStatus() === true) {
      checkForWinner();
      switchPlayerTurn();
      console.log(gameboard.getBoard());
    }
  };

  const checkForWinner = () => {
    const board = gameboard.getBoard();

    const checkForSamePlayerMarks = (array) =>
      array.every((mark) => mark === "X") ||
      array.every((mark) => mark === "O");

    let column1 = [];
    let column2 = [];
    let column3 = [];

    for (let row of board) {
      column1.push(row[0]);
      column2.push(row[1]);
      column3.push(row[2]);

      if (checkForSamePlayerMarks(row)) {
        console.log(`${currentPlayer.getName()} wins!`);
        winnerFound = true;
      }
    }

    if (
      checkForSamePlayerMarks(column1) ||
      checkForSamePlayerMarks(column2) ||
      checkForSamePlayerMarks(column3)
    ) {
      console.log(`${currentPlayer.getName()} wins!`);
      winnerFound = true;
    }

    let topLeftCorner = board[0][0];
    let topRightCorner = board[0][2];
    let center = board[1][1];
    let bottomLeftCorner = board[2][0];
    let bottomRightCorner = board[2][2];

    let diagonal1 = [topLeftCorner, center, bottomRightCorner];
    let diagonal2 = [topRightCorner, center, bottomLeftCorner];

    if (
      checkForSamePlayerMarks(diagonal1) ||
      checkForSamePlayerMarks(diagonal2)
    ) {
      console.log(`${currentPlayer.getName()} wins!`);
      winnerFound = true;
    }
  };

  return {
    getCurrentPlayer,
    playRound,
  };
})();
