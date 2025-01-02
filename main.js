const rows = 6;
const cols = 7;
let currentPlayer = "red"; // Le premier joueur est rouge

// Récupère toutes les cellules du tableau
const cells = document.querySelectorAll(".cell");

// Fonction qui vérifie si un joueur a gagner
function checkWin() {
  // Vérification horizontale, verticale et diagonale
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (cells[row * cols + col].classList.contains(currentPlayer)) {
        // Horizontal
        if (
          col + 3 < cols &&
          cells[row * cols + col].classList.contains(currentPlayer) &&
          cells[row * cols + col + 1].classList.contains(currentPlayer) &&
          cells[row * cols + col + 2].classList.contains(currentPlayer) &&
          cells[row * cols + col + 3].classList.contains(currentPlayer)
        ) {
          return true;
        }
        // Vertical
        if (
          row + 3 < rows &&
          cells[(row + 1) * cols + col].classList.contains(currentPlayer) &&
          cells[(row + 2) * cols + col].classList.contains(currentPlayer) &&
          cells[(row + 3) * cols + col].classList.contains(currentPlayer)
        ) {
          return true;
        }
        // Diagonale descendante
        if (
          row + 3 < rows &&
          col + 3 < cols &&
          cells[(row + 1) * cols + col + 1].classList.contains(currentPlayer) &&
          cells[(row + 2) * cols + col + 2].classList.contains(currentPlayer) &&
          cells[(row + 3) * cols + col + 3].classList.contains(currentPlayer)
        ) {
          return true;
        }
        // Diagonale montante
        if (
          row - 3 >= 0 &&
          col + 3 < cols &&
          cells[(row - 1) * cols + col + 1].classList.contains(currentPlayer) &&
          cells[(row - 2) * cols + col + 2].classList.contains(currentPlayer) &&
          cells[(row - 3) * cols + col + 3].classList.contains(currentPlayer)
        ) {
          return true;
        }
      }
    }
  }
  return false;
}

// Fonction pour placer un pion
function token(col) {
  for (let row = rows - 1; row >= 0; row--) {
    const cell = cells[row * cols + col];
    if (cell.classList.contains("red") && cell.classList.contains("yellow")) {
      cell.classList.add(currentPlayer);
      if (checkWin()) {
        alert(currentPlayer + " a gagné !!");
        resetGame();
      } else {
        currentPlayer = currentPlayer === "red" ? "yellow" : "red"; // Changer de joueur
      }
      break;
    }
  }
}

// sa reset pour une nouvelle partie
function resetGame() {
  cells.forEach((cell) => cell.classList.remove("red", "yellow"));
  currentPlayer = "red";
}
