import { backend_url } from "../config.js";
import React, { useState } from "react";


const Login = ({ onLoginSuccess }) => {
  
  const [errorMessage, setErrorMessage] = useState("");
	const [errorType, setErrorType] = useState("");

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
		}); //Aquí se ha enviado la petición a userController asociado a la ruta ./login

		if (!response.ok) {
			if (response.status === 400) {
				setErrorMessage(`Que pasa ${userName}, maquinarias!! Y la contraseña?`);
				setErrorType("wrongPassword");
			} else {
				setErrorMessage(
					"El usuario no existe. ¿Quieres crearlo? Haz click de nuevo en el botón"
				);
				setErrorType("noUser");
			}
			return;
		}

		const data = await response.json();
		console.log(
			"Soy tu console.log(). Vengo del futuro para decirte que tu puto fetch POST ha llamado a la función del controller asociado a la ruta ./login (userController.login), y este ha comprobado la movida, no se que...",
			data
		);

		const token = data.token;
		localStorage.setItem("token", token);
		localStorage.setItem("userName", data.userName);
		localStorage.setItem("score", data.score);
		localStorage.setItem("totalGames", data.totalGames); //No se recoje. Es ninjaTrucoDanel para setear totalGames??? Que estaría guardando? No tiene ninguna entrada de valor.

		onLoginSuccess(); // Llama a la función onLoginSuccess para indicar que la autenticación fue exitosa
	};

	return (
		<section className='login'>
			<h1>PIG TAC TOE</h1>
			<form
				className='login__form'
				onSubmit={handleSubmit}
			>
				{errorMessage && <h3>{errorMessage}</h3>}
				<label
					className='login__form__label'
					htmlFor='userName'
				>
					Usuario
				</label>
				<input
					className='login__form__input'
					type='text'
					name='userName'
					id='userName'
				/>

				<label
					className='login__form__label'
					htmlFor='password'
				>
					Contraseña
				</label>
				<input
					className='login__form__input'
					type='password'
					name='password'
					id='password'
				/>

				<button
					className='login__form__button'
					type='submit'
				>
					{errorType === "wrongPassword"
						? "Try again!"
						: errorType === "noUser"
						? "Register"
						: "Login"}
				</button>
			</form>
		</section>
	);
};

export default Login;
