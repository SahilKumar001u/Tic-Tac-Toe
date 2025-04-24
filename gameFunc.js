document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".cell");
    const statusText = document.getElementById("status");
    const resetButton = document.getElementById("reset");
  
    let currentPlayer = "X";
    let gameBoard = ["", "", "", "", "", "", "", "", ""];
    let gameOver = false;
  
    const handleCellClick = (event) => {
      const cell = event.target;
      const index = Array.from(cells).indexOf(cell);
  
      if (gameOver || gameBoard[index] !== "") {
        return;
      }
  
      cell.textContent = currentPlayer;
      gameBoard[index] = currentPlayer;
  
      checkWinner();
  
      if (!gameOver) {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusText.textContent = `Player ${currentPlayer}'s turn`;
      }
    };
  
    const checkWinner = () => {
      const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
      ];
  
      for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (
          gameBoard[a] &&
          gameBoard[a] === gameBoard[b] &&
          gameBoard[a] === gameBoard[c]
        ) {
          statusText.textContent = `Player ${gameBoard[a]} wins!`;
          gameOver = true;
          return;
        }
      }
  
      if (!gameBoard.includes("")) {
        statusText.textContent = "It's a draw!";
        gameOver = true;
      }
    };
  
    const resetGame = () => {
      gameBoard = ["", "", "", "", "", "", "", "", ""];
      currentPlayer = "X";
      gameOver = false;
      statusText.textContent = "Player X's turn";
      cells.forEach((cell) => (cell.textContent = ""));
    };
  
    cells.forEach((cell) => {
      cell.addEventListener("click", handleCellClick);
    });
  
    resetButton.addEventListener("click", resetGame);
  });
  