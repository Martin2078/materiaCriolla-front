// Importamos los módulos y recursos necesarios
import React, { useRef } from 'react';
import { useDispatch } from 'react-redux'; // Para usar Redux
import Login from '../redux/actions/singInAction'; // Asegúrate de que la ruta sea correcta

import imagenmate from '../assets/imagen-mate.jpeg'; // Imagen de fondo
import { useNavigate } from 'react-router-dom'; // Para la navegación en React Router

// Definimos el componente SignIn
function SignIn() {
    const emailRef = useRef(null); // Referencia al campo de correo electrónico
    const passwordRef = useRef(null); // Referencia al campo de contraseña
    const dispatch = useDispatch(); // Dispatch de Redux para disparar acciones
    const navigate = useNavigate(); // Función de navegación de React Router

    // Función para manejar el inicio de sesión
    const handleSignIn = async (e) => {
        e.preventDefault(); // Evita la recarga de la página
        const email = emailRef.current.value; // Obtiene el valor del campo de correo
        const password = passwordRef.current.value; // Obtiene el valor del campo de contraseña

        if (!email || !password) {
            // Si el correo o la contraseña están vacíos, no hacemos nada
            return;
        }

        const userData = { email, password }; // Datos del usuario a enviar al servidor

        dispatch(Login(userData))
            .then(res =>
                console.log(res))
            .catch(error =>
                console.log(error))
    };

    return (
        <div className="container w-full mx-auto md:py-24 px-6 h-screen">
            <div className="max-w-screen-xl mx-auto flex items-center justify-center">

                <div className="w-1/2 pl-4">
                    <div className="text-center font-semibold text-black">
                        Welcome Back!
                    </div>
                    <div className="text-center font-base text-black">
                        Let's drink mate
                    </div>
                    <form className="mt-8" onSubmit={handleSignIn}>
                        <div className="mx-auto max-w-lg">
                            <div className="py-1">
                                <span className="px-1 text-sm text-gray-600">Email</span>
                                <input
                                    ref={emailRef}
                                    placeholder=""
                                    type="email"
                                    className="text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                                />
                            </div>
                            <div className="py-1">
                                <span className="px-1 text-sm text-gray-600">Password</span>
                                <input
                                    ref={passwordRef}
                                    placeholder=""
                                    type="password"
                                    className="text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                                />
                            </div>

                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-700  text-white font-bold py-2 px-4 rounded w-full"
                                style={{ backgroundImage: 'url("public/img/1.png")', backgroundSize: 'cover' }}
                            >
                                Sing In!
                            </button>
                        </div>
                    </form>
                </div>
                <div className="w-1/2 pr-4 p-8 shadow-md rounded bg-white px-8 pb-4 mb-4">
                    <img src={imagenmate} alt="Login" className="w-full h-auto" />
                </div>

            </div >
        </div >
    );
}

export default SignIn;
