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

  const getBoard = () => board;

  return {
    getBoard,
  };
})();

console.log(gameboard.board); // undefined!
console.log(gameboard.getBoard());
