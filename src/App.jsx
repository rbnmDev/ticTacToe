import { useState } from 'react'
import './index.css'
import confetti from "canvas-confetti"
import Square from './components/Square.jsx'
import { WINNER_COMBOS, TURNS } from './constants.js'


//aplicación del propio juego
function App() {

  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURNS.X)
  const [winner, setWinner] = useState(null)

  const checkWinner = (boardToCheck) => {
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo
      if (boardToCheck[a] && //0 -> X ó O
        boardToCheck[a] === boardToCheck[b] && // 0 y 3 -> X -> X ó O -> O
        boardToCheck[a] === boardToCheck[c] // 0
      ) {
        return boardToCheck[a]
      }
    }
    return null
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }


  const checkEndGame = (newBoard) => {
    return newBoard.every((square) => square !== null)
  }
  const updateBoard = (index) => {
    if (board[index] || winner) return

    const newBoard = [...board]
    newBoard[index] = turn // X ó O como valor para cada Index
    setBoard(newBoard)
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }
  }

  
  return (
    <main className='board'>
      <h1>Tic - Tac - Toe</h1>
      <button onClick={resetGame}>Reiniciar</button>

      <section className='game'>{
        board.map((square, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {square}
            </Square>
          )
        })
      }
      </section>

      <section className='turn'>
        <Square isSelected={turn === TURNS.X} className='turnX'>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O} className='turnO'>
          {TURNS.O}
        </Square>
      </section>

      <section className='winnerEnd'>{
        winner !== null && (
          <section className='winner'>
            <div className='text'>
              <h2>
                {winner === false ? 'EMPATE' : 'GANADOR'}
              </h2>
              <header>
                {winner && <Square>{winner}</Square>}
              </header>
              <footer>
                <button onClick={resetGame}>Reiniciar</button>
              </footer>
            </div>
          </section>
        )
      }
      </section>
    </main>
  )
}

export default App


