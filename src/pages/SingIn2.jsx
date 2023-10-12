import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import login from '../redux/actions/singInAction'; // Asegúrate de que la ruta sea correcta
import imagenmate from '../../public/img/1.png';
import { useNavigate } from 'react-router-dom';

function SignIn() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!email || !password) {
      return;
    }

    const userData = { email, password };
    dispatch(login(userData))
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        toast.error('Error de inicio de sesión'); // Puedes mostrar un mensaje de error
      });
  };

  return (
    <div className="login-container w-full h-screen flex flex-col md:flex-row">
      <div className="w-full md:w-2/3 flex flex-col items-center justify-center p-8">
        <h1 className="text-3xl font-bold mb-1">Login</h1>
        <form className="bg-white shadow-2xl rounded px-24 py-24 mb-4 " onSubmit={handleSignIn}>
        <div className="md:mr-4">
              <label htmlFor="name" className="block text-gray-700 font-bold mt-2">Email</label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-input px-4 py-2 border rounded mt-2 mb-10"
              />
            </div>
            <div className="md:mr-4">
              <label htmlFor="name" className="block text-gray-700 font-bold mb-2 ">Password</label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-input px-4 py-2 border rounded"
              />
            </div>
            <div className='flex flex-col pt-10 md:flex-row'>
            <button
              type="submit"
              className="text-white text-2xl font-bold py-2 px-4 rounded mt-4 md:mt-0 w-full"
              style={{ backgroundImage: 'url("public/images/madera.png")', backgroundSize: 'cover' }}
            >
              Register
            </button>
          </div>
        </form>
      </div>
      <div className="w-full md:w-1/2 shadow-md p-6 rounded bg-white px-8 pb-4 m-4">
        <img src={imagenmate} alt="Login" className="w-full h-full object-cover" />
      </div>
      <ToastContainer
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
    </div>
  );
}

export default SignIn2;
