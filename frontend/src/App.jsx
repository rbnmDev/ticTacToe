import { useEffect, useState } from 'react'
import confetti from "canvas-confetti"

import Square from './components/Square.jsx'
import Login from './components/Login.jsx'
import { TURNS, minimax, checkWinner, checkTie } from './constants.js'
import '/styles/index.css'

//aplicación del propio juego
function App() {

  const [route, setRoute] = useState('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);



  const [board, setBoard] = useState(Array(9).fill(null)) //El estado inicial puede ser un ternario con el localStorage
  //const boardFromStorage = window.localStorage.getItem('board')
  //return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
  const [turn, setTurn] = useState(TURNS.X)
  const [winner, setWinner] = useState(null)

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
    //Si se almacena el juego en local storage, lo reseteamos también
    //window.localStorage.removeItem('board')
    //window.localStorage.removeItem('turn')
  }

  const checkEndGame = (newBoard) => {
    return newBoard.every((square) => square !== null)
  }

  const changeTurn = () => {
    setTurn(turn === TURNS.X ? TURNS.O : TURNS.X)
  }

  const handleClick = (index) => {
    if (turn === TURNS.O) return
    updateBoard(index)
  }
  const updateBoard = (index) => {
    if (board[index] || winner) return

    const newBoard = [...board]
    newBoard[index] = turn // X ó O como valor para cada Index
    setBoard(newBoard)
    changeTurn()
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      setTimeout(() => {

        confetti()
        console.log("winner", newWinner)
        setWinner(newWinner)
      }, 500)
      return;
    } else if (checkTie(newBoard)) {
      setTimeout(() => {
        setWinner(false)
      }, 500)
      return;
    }
  }

  const updateAI = () => {
    if (winner) return

    setTimeout(() => {

      const index = minimax(board, 0, true, TURNS.O, TURNS.X)

      updateBoard(index);
    }, 700)
  }

  useEffect(() => {
    if (turn === TURNS.O) {
      updateAI()
    }
  }, [turn])

  return (
    <>
      {route === "home" ? (
        <main className='board'>
          <h1>{User.userName}</h1>


          <section className='game'>{
            board.map((square, index) => {
              return (
                <Square key={index} index={index} updateBoard={handleClick}>
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
          <button onClick={resetGame}>Reiniciar</button>
        </main>
      ) : (
        <Login
          redirect={() => setRoute("home")}
        />
      )}
    </>
  )
}

export default App


//const [route, setRoute] = useState('login');




//window.localStorage.setItem("board", JSON.stringify(board))
//window.localStorage.setItem("turn", newTurn)



