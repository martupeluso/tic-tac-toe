const gameboard = (function () {
  const rows = 3;
  const columns = 3;
  let board = [];

  const createNewBoard = () => {
    for (let i = 0; i < rows; i++) {
      board[i] = [];
      for (let j = 0; j < columns; j++) {
        board[i].push("");
      }
    }
  };

  createNewBoard();

  let markerWasPlaced = false;

  const placeMarker = (row, column, marker) => {
    const selectedSpace = board[row][column];
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
    createNewBoard,
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
  let tie = false;

  const playRound = (row, column) => {
    if (winnerFound) {
      console.log(
        "There's a winner already! Game's over until you choose to restart it"
      );
    } else if (tie) {
      console.log("There's a tie! Game's over until you choose to restart it");
    } else {
      gameboard.placeMarker(row, column, currentPlayer.getMarker());
      if (gameboard.getMarkerStatus() === true) {
        checkForWinner();
        switchPlayerTurn();
        displayController.showBoard();
        console.log(gameboard.getBoard());
      }
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

    let fullRows = 0;

    for (let row of board) {
      column1.push(row[0]);
      column2.push(row[1]);
      column3.push(row[2]);

      if (checkForSamePlayerMarks(row)) {
        winnerFound = true;
      }

      if (row.every((mark) => mark !== "")) {
        fullRows++;
      }
    }

    if (
      checkForSamePlayerMarks(column1) ||
      checkForSamePlayerMarks(column2) ||
      checkForSamePlayerMarks(column3)
    ) {
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
      winnerFound = true;
    }

    if (fullRows === 3 && !winnerFound) {
      console.log("It's a tie!");
      tie = true;
    }

    if (winnerFound) {
      console.log(`${currentPlayer.getName()} wins!`);
    }
  };

  const restartGame = () => {
    currentPlayer = playerOne;
    winnerFound = false;
    tie = false;
    gameboard.createNewBoard();
    displayController.showBoard();
    console.log("Game was restarted");
  };

  return {
    getCurrentPlayer,
    playRound,
    restartGame,
  };
})();

const displayController = (function () {
  const showBoard = () => {
    const board = gameboard.getBoard();
    const boardDisplay = document.querySelector(".board");

    boardDisplay.textContent = "";

    for (let row of board) {
      const boardRow = document.createElement("div");
      boardRow.classList.add("boardRow");

      for (let cell of row) {
        const boardCell = document.createElement("div");
        boardCell.classList.add("boardCell");
        boardCell.textContent = cell;

        boardRow.append(boardCell);
      }

      boardDisplay.append(boardRow);
    }
  };

  showBoard();

  return {
    showBoard,
  };
})();
