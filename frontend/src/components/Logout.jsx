import React from 'react';

const Logout = () => {
  const handleLogout = () => {
    // Elimina los datos de autenticación
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('score');
    localStorage.removeItem('totalGames');

    // Redirige al usuario a la página de inicio de sesión u otra página
    window.location.href = '/login'; // Cambia la URL según tu estructura de rutas
  };

  return (
    <button onClick={handleLogout}>EXIT</button>
  );
};

export default Logout;
