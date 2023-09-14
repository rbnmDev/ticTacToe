import { backend_url } from '../config.js';
import React, { useEffect, useState } from "react";

const Ranking = () => {
  const [topScores, setTopScores] = useState([]);


  useEffect(() => {
    getTopScores(); // El efecto se ejecutará cada vez que topScores cambie
  }, []); // Dependerá de topScores


  const getTopScores = async () => {

    try {
      const response = await fetch(`${backend_url}/topScores`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        console.error("No se puede obtener la puntuación");
      } else {
        const data = await response.json();
        console.log("CERVEZA GRATIS", data);
        setTopScores(data);
      }
    } catch (error) {
      console.error("Error al enviar la solicitud al servidor:", error);
    }

  };

  return (
    <section id="ranking__Container">
      <h2>Ranking</h2>
      <div id="ranking">

        <ul id="position">
          <h4>#</h4>
          <div>
            <div><li>1</li></div>
            <div><li>2</li></div>
            <div><li>3</li></div>
            <div><li>4</li></div>
            <div><li>5</li></div>
          </div>
        </ul>

        <div>
          <h4>Players</h4>
          <ul id="users">
            {topScores.map((user) => {
              return (

                <div key={user.userName}>
                  <li>
                    {user.userName}
                  </li>
                </div>

              )
            })}
          </ul>
        </div>

        <div>
          <h4>Score</h4>
          <ul id="scores">
            {topScores.map((user) => {
              return (
                <div key={user.userName}>
                  <li>
                    {user.score}
                  </li>
                </div>
              )
            })}
          </ul>
        </div>

        <div>
          <h4>Games</h4>
          <ul id="totalGames">
            {topScores.map((user) => {
              return (

                <div key={user.userName}>
                  <li>
                    {user.totalGames}
                  </li>
                </div>
              )
            })}
          </ul>
        </div >
      </div>
    </section >
  )
}


export default Ranking;