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
  let playerOne, playerTwo, currentPlayer;

  const setPlayerNames = (
    playerOneName = "Player One",
    playerTwoName = "Player Two"
  ) => {
    playerOne = Player(playerOneName, "X");
    playerTwo = Player(playerTwoName, "O");

    currentPlayer = playerOne;

    displayController.showCurrentTurn(
      currentPlayer.getName(),
      currentPlayer.getMarker()
    );
  };

  const getCurrentPlayer = () => currentPlayer;

  const switchPlayerTurn = () => {
    currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
    if (!winnerFound) {
      displayController.showCurrentTurn(
        currentPlayer.getName(),
        currentPlayer.getMarker()
      );
    }
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
      displayController.showGameWinner(currentPlayer.getName());
      displayController.showRestartButton();
      console.log(`${currentPlayer.getName()} wins!`);
    }
  };

  const restartGame = () => {
    currentPlayer = playerOne;
    winnerFound = false;
    tie = false;
    gameboard.createNewBoard();
    displayController.showBoard();
    displayController.showCurrentTurn(
      currentPlayer.getName(),
      currentPlayer.getMarker()
    );
    console.log("Game was restarted");
  };

  return {
    setPlayerNames,
    getCurrentPlayer,
    playRound,
    restartGame,
  };
})();

const displayController = (function () {
  const modal = document.querySelector(".modal");
  const startButton = document.querySelector(".modal button");
  const gameInfo = document.querySelector(".game-info");

  modal.showModal();

  startButton.addEventListener("click", () => {
    const playerOneName =
      document.getElementById("playerOneName").value || undefined;
    const playerTwoName =
      document.getElementById("playerTwoName").value || undefined;

    gameController.setPlayerNames(playerOneName, playerTwoName);

    modal.close();
  });

  const showCurrentTurn = (currentPlayerName, currentPlayerMarker) => {
    gameInfo.textContent = `${currentPlayerName}'s turn! (${currentPlayerMarker})`;
  };

  const showGameWinner = (currentPlayerName) => {
    gameInfo.textContent = `${currentPlayerName} wins!`;
  };

  const showBoard = () => {
    const board = gameboard.getBoard();
    const boardDisplay = document.querySelector(".board");

    boardDisplay.textContent = "";

    for (let [index, row] of board.entries()) {
      const boardRow = document.createElement("div");
      boardRow.classList.add("boardRow");

      const clickedRow = index;

      for (let [index, cell] of row.entries()) {
        const clickedColumn = index;

        const boardCell = document.createElement("div");
        boardCell.classList.add("boardCell");
        boardCell.textContent = cell;

        boardCell.addEventListener("click", () => {
          gameController.playRound(clickedRow, clickedColumn);
        });

        boardRow.append(boardCell);
      }

      boardDisplay.append(boardRow);
    }
  };

  const showRestartButton = () => {
    const restartButton = document.querySelector(".restart-button");
    restartButton.style.visibility = "visible";
    restartButton.addEventListener("click", () => {
      gameController.restartGame();
      restartButton.style.visibility = "hidden";
    });
  };

  showBoard();

  return {
    showCurrentTurn,
    showGameWinner,
    showBoard,
    showRestartButton,
  };
})();
