/**
 * switch de joueur a chaque click
 * en fonction du joueur ajout couleur (rouge ou jaune) bg dans la derniere .cell vide
 * différencier les actions des 2 joueurs et leur couleur
 * parcourir le tableau a chaque tour pour verifier les couleurs
 * dans tout les drections (diagonales, horizontale et verticale) si result >= 4 joueur corresdant gagne
 * 
 * (bouton pour recommencer?)
 * (timer pour chaque joueur?)
 */
  // Initialisation des variables
  const ROWS = 6;
  const COLS = 7;
  let tourPlayer = 1;
  let plaDeJeu= [];

for (let i = 0; i < ROWS; i++) {
    plaDeJeu[i] = [];
  for (let j = 0; j < COLS; j++) {
    plaDeJeu[i][j] = 0;
  }
}
 
  const table = document.querySelector('table');
  const playerDisplay = document.querySelector('h4');
  // switch de joueur a chaque click
  function switchPlayer() {
      playerDisplay.textContent = `Joueur : ${tourPlayer}`;
  }
  // Vérification  la victoire
  function checkWin(row, col) {
      // Directions : horizontal, vertical, diagonale droite, diagonale gauche
      const directions = [
          [[0, 1], [0, -1]],
          [[1, 0], [-1, 0]],
          [[1, 1], [-1, -1]],
          [[1, -1], [-1, 1]]
      ];

      for (let dirPair of directions) {
          let count = 1;
          for (let dir of dirPair) {
              let r = row + dir[0];
              let c = col + dir[1];
              
              while (
                  r >= 0 && r < ROWS && 
                  c >= 0 && c < COLS && 
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
// cette partie je l'ai fait avec claude
  // Placer un jeton
  function placePiece(col) {
      
      const row = findEmptyCell(col);
      if (row === -1) 
        return;

      plaDeJeu[row][col] =  tourPlayer;
      const cell = table.rows[row].cells[col];
      
      // Mise à jour visuelle
      cell.style.backgroundColor =  tourPlayer === 1 ? 'red' : 'yellow';

      // Vérification de la victoire
      if (checkWin(row, col)) {
       
          alert(`Le joueur ${ tourPlayer} a gagné !`);
          return;
      }

      // Vérification du match nul
      if (plaDeJeu.every(row => row.every(cell => cell !== 0))) {
          alert("Match nul !");
          return;
      }

      // Changement de joueur
      tourPlayer =  tourPlayer === 1 ? 2 : 1;
      switchPlayer();
      
  }

  // Ajout des événements click sur les colonnes
  for (let col = 0; col < COLS; col++) {
     
      
      for (let row = 0; row < ROWS; row++) {
          table.rows[row].cells[col].addEventListener('click', () => {
              placePiece(col);
          });
      }
  }
  // Initialisation de l'affichage du joueur
  switchPlayer();