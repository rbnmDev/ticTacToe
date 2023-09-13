import { backend_url } from '../config.js';
import React, { useEffect, useState } from "react";

const Ranking = () => {

  const [topScores, setTopScores] = useState([]);

  useEffect(() => {
    getTopScores();
  }, [])

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
    <section id="Ranking">
      <h2>Ranking</h2>
      <ul>
        {topScores.map((user) => {
          return (
            <li key={user.userName}>
              {user.userName} - {user.score}
            </li>
          )
        })}
      </ul>
    </section>
  )
}


export default Ranking;