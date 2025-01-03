/**
 * bouton pour recommencer
 * (timer pour chaque joueur?)
 */

// Initialisation des variables
const ROWS = 6;
const COLS = 7;
let tourPlayer = 1;
let plaDeJeu = [];

for (let i = 0; i < ROWS; i++) {
  plaDeJeu[i] = [];
  for (let j = 0; j < COLS; j++) {
    plaDeJeu[i][j] = 0;
  }
}

const table = document.querySelector("table");
const playerDisplay = document.querySelector("h4");
const mainDisplaying = document.getElementById("main");
const resetButton = document.getElementById("resetButton");

// Fonction pour réinitialiser la partie
function resetGame() {
  plaDeJeu = [];
  for (let i = 0; i < ROWS; i++) {
    plaDeJeu[i] = [];
    for (let j = 0; j < COLS; j++) {
      plaDeJeu[i][j] = 0;
    }
  }

  // Réinitialiser l'affichage du tableau
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      table.rows[row].cells[col].style.backgroundColor = "";
    }
  }

  // Réinitialiser le joueur et l'affichage du joueur
  tourPlayer = 1;
  playerDisplay.textContent = `Joueur : ${tourPlayer}`;

  // Cacher le bouton de réinitialisation
  resetButton.style.display = "none";
}

// Afficher le bouton de réinitialisation et le gérer
function showResetButton() {
  resetButton.style.display = "block";
  resetButton.addEventListener("click", resetGame);
}

// Switch de joueur à chaque click
function switchPlayer() {
  playerDisplay.textContent = `Joueur : ${tourPlayer}`;
}

// Vérification de la victoire
function checkWin(row, col) {
  // Directions : horizontal, vertical, diagonale droite, diagonale gauche
  const directions = [
    [
      [0, 1],
      [0, -1],
    ],
    [
      [1, 0],
      [-1, 0],
    ],
    [
      [1, 1],
      [-1, -1],
    ],
    [
      [1, -1],
      [-1, 1],
    ],
  ];

  for (let dirPair of directions) {
    let count = 1;
    for (let dir of dirPair) {
      let r = row + dir[0];
      let c = col + dir[1];

      while (
        r >= 0 &&
        r < ROWS &&
        c >= 0 &&
        c < COLS &&
        plaDeJeu[r][c] === tourPlayer
      ) {
        count++;
        r += dir[0];
        c += dir[1];
      }
    }
    if (count >= 4) return true;
  }
  return false;
}

// Trouver la première cellule vide dans une colonne
function findEmptyCell(col) {
  for (let row = ROWS - 1; row >= 0; row--) {
    if (plaDeJeu[row][col] === 0) {
      return row;
    }
  }
  return -1;
}

// Placer un jeton
function placePiece(col) {
  const row = findEmptyCell(col);
  if (row === -1) return;

  plaDeJeu[row][col] = tourPlayer;
  const cell = table.rows[row].cells[col];

  // Mise à jour visuelle
  cell.style.backgroundColor = tourPlayer === 1 ? "red" : "yellow";

  // Vérification de la victoire
  if (checkWin(row, col)) {
    mainDisplaying.innerHTML = "";
    const resultText = document.createElement("h3");
    resultText.textContent = `Le joueur ${tourPlayer} a gagné !`;
    mainDisplaying.appendChild(resultText);
    showResetButton(); // Afficher le bouton de réinitialisation
    return;
  }

  // Vérification du match nul
  if (plaDeJeu.every((row) => row.every((cell) => cell !== 0))) {
    mainDisplaying.innerHTML = "";
    const resultText = document.createElement("h3");
    resultText.textContent = `Match Nul!`;
    mainDisplaying.appendChild(resultText);
    showResetButton(); // Afficher le bouton de réinitialisation
    return;
  }

  // Changement de joueur
  tourPlayer = tourPlayer === 1 ? 2 : 1;
  switchPlayer();
}

// Ajout des événements click sur les colonnes
for (let col = 0; col < COLS; col++) {
  for (let row = 0; row < ROWS; row++) {
    table.rows[row].cells[col].addEventListener("click", () => {
      placePiece(col);
    });
  }
}

// Initialisation de l'affichage du joueur
switchPlayer();
