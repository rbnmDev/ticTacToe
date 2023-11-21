import React, { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { backend_url } from "./config.js";
import { minimax, checkWinner, checkTie } from "./constants.js";
import "/styles/index.css";

import Square from "./components/Square.jsx";
import Login from "./components/Login.jsx";
import Logout from "./components/Logout.jsx";
import Ranking from "./components/Rank.jsx";
import EmojiSelectPlayer from "./components/EmojiSelectPlayer.jsx";





function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState(); // Nuevo estado para el emoji seleccionado

  const pl1 = selectedEmoji; // Usa selectedEmoji en lugar de pl1
  const pl2 = "🐷";

  const TURNS = {
    X: pl1,
    O: pl2,
  };


  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(TURNS.X); // Cambiar o perdedor o random
  const [winner, setWinner] = useState(null);


  const [userName, setUserName] = useState(localStorage.getItem("userName"));
  const [score, setScore] = useState(localStorage.getItem("score"));

  const [gameEnded, setGameEnded] = useState(false);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
    setGameEnded(false);
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
      if (!gameEnded) {
        setTimeout(() => {
          handleGameEnd(newWinner);
          confetti();
          setWinner(newWinner);
        }, 1000);
      }
      setGameEnded(true);
      return;
    } else if (checkTie(newBoard)) {
      setTimeout(() => {
        setWinner(false);
        handleGameEnd(false);
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
    const updateUser = {
      userName,
      score: winner === TURNS.X ? 2 : winner === false ? 1 : 0,
    };

    try {
      const response = await fetch(`${backend_url}/addScore`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(updateUser),
      });

      if (!response.ok) {
        console.error("Me gusta montón el tuerking");
      } else {
        console.log("Datos del usuario actualizados con éxito en el servidor.");
        const data = await response.json();
        setScore(data.score);
      }
    } catch (error) {
      console.error("Error al enviar la solicitud al servidor:", error);
    }
  };

  const handleLoginSuccess = () => {
    setUserName(localStorage.getItem("userName"));
    setScore(localStorage.getItem("score"));
    setIsLoggedIn(true);
  };

  const handleEmojiSuccess = (emoji) => {
    setSelectedEmoji(emoji); // Almacena el emoji seleccionado en el estado
  };

  //COMPONENTE PRINCIPAL DE LA APP ------------------------------------- 🍆
  return (
    <>
      {isLoggedIn ? (
        selectedEmoji ? (
          <main className='board'>
            {/************* GAME'S HEADER *************/}
            <h1>PIG TAC TOE</h1>
            <h2 id='userName'>{userName}</h2>
            <h4 id='score'>Score: {score}</h4>
            <h4 id='rank'>Ranking: {"rank"}</h4>

            {/************* GAME'S BOARD *************/}
            <section className='game'>
              {board.map((square, index) => {
                return (
                  <Square
                    key={index}
                    index={index}
                    updateBoard={handleClick}
                  >
                    {square}
                  </Square>
                );
              })}
            </section>

            {/************* TURN DISPLAY *************/}
            <section className='turn'>
              <Square
                isSelected={turn === TURNS.X}
                className='turnX'
              >
                {selectedEmoji}
              </Square>

              <Square
                isSelected={turn === TURNS.O}
                className='turnO'
              >
                {TURNS.O}
              </Square>
            </section>

            {/************* ENDGAME DISPLAY *************/}
            <section className='winnerEnd'>
              {winner !== null && (
                <section className='winner'>
                  <div className='text'>
                    <h2>{winner === false ? "EMPATE" : "GANADOR"}</h2>

                    <header>{winner && <Square>{winner}</Square>}</header>
                    <div>
                      <button
                        className='button__reset'
                        onClick={resetGame}
                      >
                        Reiniciar
                      </button>
                    </div>
                  </div>
                </section>
              )}
            </section>

            <section className='buttons__area'>
              <button
                className='button__reset'
                onClick={resetGame}
              >
                Reiniciar
              </button>
              <Logout />
            </section>
            <Ranking key={winner} />
          </main>
        ) : (
          <EmojiSelectPlayer onEmojiSuccess={handleEmojiSuccess} />
        )
      ) : (
        <>
          <Login onLoginSuccess={handleLoginSuccess} />
          <Ranking key={winner} />
        </>
      )}
    </>
  );
}


export default App;


