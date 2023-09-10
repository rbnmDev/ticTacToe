// App.jsx

import React, { useEffect, useState } from "react";
import confetti from "canvas-confetti";

import Square from "./components/Square.jsx";
import Login from "./components/Login.jsx";
import { backend_url } from "./config.js";
import { TURNS, minimax, checkWinner, checkTie } from "./constants.js";
import "/styles/index.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(TURNS.X);
  const [winner, setWinner] = useState(null);

  const [totalGames, setTotalGames] = useState(0);
  const [score, setScore] = useState(0);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
  };

  const checkEndGame = (newBoard) => {
    return newBoard.every((square) => square !== null);
  };

  const changeTurn = () => {
    setTurn(turn === TURNS.X ? TURNS.O : TURNS.X);
  };

  const handleClick = (index) => {
    if (turn === TURNS.O) return;
    updateBoard(index);
  };

  const updateBoard = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);
    changeTurn();
    const newWinner = checkWinner(newBoard);
    
    if (newWinner) {
      setTimeout(() => {
        handleGameEnd(winner)
        confetti();
        setWinner(newWinner);
        
      }, 1000);
      return;
    } else if (checkTie(newBoard)) {
      setTimeout(() => {
        setWinner(false);

      }, 1000);
      return;
    }
  };

  const updateAI = () => {
    if (winner) return;

    setTimeout(() => {
      const index = minimax(board, 0, true, TURNS.O, TURNS.X);
      updateBoard(index);
    }, 700);
  };

  useEffect(() => {
    if (turn === TURNS.O) {
      updateAI();
    }
  }, [turn]);


  const handleGameEnd = async (winner) => {
    const userUpdate = {
      totalGames: totalGames + 1,
      score: winner === TURNS.X ? score + 2 : winner === false ? score + 1 : score + 0
    };
    try {
      const response = await fetch(`${backend_url}/addScore`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userUpdate),
      });
      if (!response.ok) {
        console.error("Me gusta monton el tuerking");
      } else {
        console.log("Datos del usuario actualizados con éxito en el servidor.");
      }
    } catch (error) {
      console.error("Error al enviar la solicitud al servidor:", error);
    }
  };


  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <>
      {isLoggedIn ? (
        <main className="board">
          <h2 id="userName">{"userName"}</h2>
          <h4 id="score">Score: {"score"}</h4>
          <h4 id="rank">Ranking: {"rank"}</h4>

          <section className="game">
            {board.map((square, index) => {
              return (
                <Square key={index} index={index} updateBoard={handleClick}>
                  {square}
                </Square>
              );
            })}
          </section>

          <section className="turn">
            <Square isSelected={turn === TURNS.X} className="turnX">
              {TURNS.X}
            </Square>
            <Square isSelected={turn === TURNS.O} className="turnO">
              {TURNS.O}
            </Square>
          </section>

          <section className="winnerEnd">
            {winner !== null && (
              <section className="winner">
                <div className="text">
                  <h2>{winner === false ? "EMPATE" : "GANADOR"}</h2>

                  <header>{winner && <Square>{winner}</Square>}</header>
                  <footer>
                    <button onClick={resetGame}>Reiniciar</button>
                  </footer>
                </div>
              </section>
            )}
          </section>
          <button onClick={resetGame}>Reiniciar</button>
        </main>
      ) : (
        <Login onLoginSuccess={handleLoginSuccess} />
      )}
    </>
  );
}

export default App;
