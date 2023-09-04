const TURNS = {
  X: '×',
  O: 'o',
}

const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]
  
function score(game, depth, player, opponent) {
  if (game.win(player)) {
      return 10 - depth;
  } else if (game.win(opponent)) {
      return depth - 10;
  } else {
      return 0;
  }
}

function minimax(game, depth, player, opponent) {
  if (game.over()) {
      return score(game, depth, player, opponent);
  }

  depth += 1;
  const scores = [];
  const moves = [];

  const availableMoves = game.getAvailableMoves();
  availableMoves.forEach((move) => {
      const possibleGame = game.getNewState(move);
      scores.push(minimax(possibleGame, depth, player, opponent));
      moves.push(move);
  });

  if (game.activeTurn() === player) {
      let maxScore = -Infinity;
      let maxScoreIndex = -1;

      for (let i = 0; i < scores.length; i++) {
          if (scores[i] > maxScore) {
              maxScore = scores[i];
              maxScoreIndex = i;
          }
      }

      return scores[maxScoreIndex];
  } else {
      let minScore = Infinity;
      let minScoreIndex = -1;

      for (let i = 0; i < scores.length; i++) {
          if (scores[i] < minScore) {
              minScore = scores[i];
              minScoreIndex = i;
          }
      }

      return scores[minScoreIndex];
  }
}



export { TURNS, WINNER_COMBOS }