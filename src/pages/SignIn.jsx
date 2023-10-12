import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Login from '../redux/actions/singInAction';
import imagenmate from '../assets/imagen-mate.jpeg';
import { useNavigate } from 'react-router-dom';
import { Toaster, useToaster, toast } from 'react-hot-toast';


const toastOptions = {
    position: 'top-center',
    reverseOrder: false,
};

function SignIn() {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { success, error } = useToaster();

    const { user, token } = useSelector(store => store.profile);
    async function navigateToHome() {
        await new Promise(resolve => setTimeout(resolve, 1000));
        navigate('/');
    }
    // Función para manejar el inicio de sesión
    const handleSignIn = async (e) => {
        e.preventDefault(); // Evita la recarga de la página
        const email = emailRef.current.value; // Obtiene el valor del campo de correo
        const password = passwordRef.current.value; // Obtiene el valor del campo de contraseña

        if (!email && !password) {
            // Si el correo o la contraseña están vacíos, mostrar un toast
            toast.error('Both fields are empty', { appearance: 'error' });
            return;
        }

        const userData = { email, password }; // Datos del usuario a enviar al servidor
        dispatch(Login(userData))
            .then(res => {
                if (res.payload.error) {
                    toast.error(res.payload.error);
                }
                else {
                    toast.success('Inicio de sesión exitoso.');
                }
            })
    };
    useEffect(() => {
        if (!token || !token.length) {
            if (localStorage.length > 0) {
                const tokenStorage = localStorage.getItem('token')
                const userStorage = JSON.parse(localStorage.getItem('user'))
                console.log(tokenStorage);
                console.log(userStorage);
                const data = { user: userStorage, token: tokenStorage }
                dispatch(Login(data))
            }
        } else {
            navigateToHome()
        }
    }, [token])

    return (
        <div className="login-container w-full h-screen flex flex-col md:flex-row">
            <div className="w-full md:w-2/3 flex flex-col items-center justify-center p-8">
                <h1 className="text-4xl font-bold mb-8">Login</h1> {/* Aumenta el tamaño del título y agrega margen inferior */}
                <div className="text-center font-base text-black mb-4"> {/* Agrega margen inferior al texto */}
                    Let's drink mate
                </div>
                <form className="bg-white shadow-2xl rounded p-4 md:p-12 mb-4 "> {/* Aumenta el padding del formulario */}
                    <div className="md:mr-4">
                        <label htmlFor="email" className="block text-gray-700 font-bold mt-2">Email</label>
                        <input
                            ref={emailRef}
                            type="email"
                            className="form-input px-4 py-2 border rounded mt-2 mb-4"  // Aumenta el margen inferior
                        />
                    </div>
                    <div className="md:mr-4">
                        <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password</label>
                        <input
                            ref={passwordRef}
                            type="password"
                            className="form-input px-4 py-2 border rounded"
                        />
                    </div>
                    <div className='flex flex-col pt-8 md:flex-row'> {/* Aumenta el padding superior del botón */}
                        <button
                            type="submit"
                            className="text-white text-2xl font-bold py-2 px-4 rounded mt-4 md:mt-0 w-full"
                            style={{ backgroundImage: 'url("public/images/madera.png")', backgroundSize: 'cover' }}
                        >
                            Sign In!
                        </button>
                    </div>
                </form>
            </div>
            <div className="w-full md:w-1/2 shadow-md p-6 rounded bg-white px-8 pb-4 m-4">
                <img src={imagenmate} alt="Login" className="w-full h-full object-cover hidden md:block" />
            </div>

            <Toaster
                position="top-center"
                autoClose={5000}
                hideProgressBar={true}
                newestOnTop={true}
                closeOnClick
                rtl={true}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                toastClassName="toast-without-icon"
                icon={false}
            />
        </div >
    );
}

export default SignIn;
