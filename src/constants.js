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


export const minimax = (board, depth, isMaximizing, player, opponent) => {
  if (checkWinner(board, player)) {
    return 10 - depth;
  } else if (checkWinner(board, opponent)) {
    return depth - 10;
  } else if (checkTie(board)) {
    return 0;
  }

  if (isMaximizing) {
    let maxEval = -Infinity;
    let bestMove = -1;

    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        board[i] = player;
        let evaluation = minimax(board, depth + 1, false, player, opponent);
        board[i] = null;

        if (evaluation > maxEval) {
          maxEval = evaluation;
          bestMove = i;
        }
      }
    }

    if (depth === 0) {
      // Si estamos en el nivel superior, devuelve la mejor jugada
      return bestMove;
    }

    return maxEval;
  } else {
    let minEval = Infinity;
    let bestMove = -1;

    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        board[i] = opponent;
        let evaluation = minimax(board, depth + 1, true, player, opponent);
        board[i] = null;

        if (evaluation < minEval) {
          minEval = evaluation;
          bestMove = i;
        }
      }
    }

    return minEval;
  }
};



export { TURNS, WINNER_COMBOS }