import { backend_url } from "../config.js";

const Login = ({ onLoginSuccess }) => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const userName = event.target.userName.value;
    const password = event.target.password.value;
    const user = { userName, password };
    const response = await fetch(`${backend_url}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      const message = `An error has occurred: ${response.status}`;
      console.log(message);
      return;
    }
    const data = await response.json();
    console.log(data);
    const token = data.token;
    localStorage.setItem("token", token);

    // Llama a la función onLoginSuccess para indicar que la autenticación fue exitosa
    onLoginSuccess();
  };

  return (
    <section className="login">
      <form className="login__form" onSubmit={handleSubmit}>
        <label className="login__form__label" htmlFor="userName">
          Usuario
        </label>
        <input className="login__form__input" type="text" name="userName" id="userName" />
        <label className="login__form__label" htmlFor="password">
          Contraseña
        </label>
        <input className="login__form__input" type="password" name="password" id="password" />
        <button className="login__form__button" type="submit">
          Iniciar sesión
        </button>
      </form>
    </section>
  );
};

export default Login;
