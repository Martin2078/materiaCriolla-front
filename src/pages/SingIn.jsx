import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import Login from '../redux/actions/singInAction';
import imagenmate from '../assets/imagen-mate.jpeg';
import { useNavigate } from 'react-router-dom';
import { Toaster, useToaster, toast } from 'react-hot-toast'; // Importa useToaster

const toastOptions = {
    position: 'top-center', // Centrado en la parte superior
    reverseOrder: false,
};

function SignIn() {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { success, error } = useToaster(); // Utiliza useToaster para mostrar notificaciones

    const handleSignIn = async (e) => {
        e.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        if (!email || !password) {
            return;
        }

        const userData = { email, password };
        dispatch(Login(userData))
            .then(res => {
                console.log(res);
                toast.success('Inicio de sesión exitoso.'); // Mensaje de éxito
                //navigate('/');
            })
            .catch(error => {
                console.log(error);
                toast.error('Error en el inicio de sesión. Verifica tus credenciales.'); // Mensaje de error
            });
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
                                className="bg-blue-500 hover.bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
                            >
                                Sign In!
                            </button>
                        </div>
                    </form>
                </div>
                <div className="hidden md:block w-1/2 pr-4 p-8 shadow-md rounded bg-white px-8 pb-4 mb-4">
                    <img src={imagenmate} alt="Login" className="w-full h-auto" />
                </div>
            </div>
            <Toaster position={toastOptions.position} reverseOrder={toastOptions.reverseOrder} />
        </div>
    );
}

export default SignIn;
