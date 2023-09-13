import { backend_url } from '../config.js';




const getTopScores = async () => {
  if (newWinner) {
    try {
      const response = await fetch(`${backend_url}/getTopScores`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,

        },
      });
      if (!response.ok) {
        console.error("No se puede obtener la puntuación");
      } else {
        const data = await response.json();
      }
    } catch (error) {
      console.error("Error al enviar la solicitud al servidor:", error);
    }
    topScores.push({ userName, score });
  }
  const data = await response.json();
  console.log(data);
  const token = data.token;
  localStorage.setItem("token", token);
  localStorage.setItem("userName", data.userName);
  localStorage.setItem("score", data.score);
  localStorage.setItem("totalGames", data.totalGames);
};


export default getTopScores;

