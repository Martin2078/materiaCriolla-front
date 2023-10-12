import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from '../redux/actions/singInAction';
import imagenmate from '../../public/img/1.png';
import { useNavigate } from 'react-router-dom';

function SignIn() {
 const emailRef = useRef(null);
 const passwordRef = useRef(null);
 const dispatch = useDispatch();
 const navigate = useNavigate();

 async function navigateToHome() {
  await new Promise(resolve => setTimeout(resolve, 1000));
  navigate('/');
 }

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
    if (res.payload.error) {
     toast.error(res.payload.error);
    }
    else {
     toast.success('Inicio de sesión exitoso.');
    }
   })
   .catch((error) => {
    console.log(error);
   });
 };

 return (
  <div className="login-container w-full h-screen flex flex-col md:flex-row">
   <div className="w-full md:w-2/3 flex flex-col items-center justify-center p-8">
    <h1 className="text-3xl font-bold mb-1">Login</h1>
    <form className="bg-white shadow-2xl rounded p-4 md:p-24 mb-4 " onSubmit={handleSignIn}>
     <div className="md:mr-4">
      <label htmlFor="name" className="block text-gray-700 font-bold mt-2">Email</label>
      <input
       ref={emailRef}
       type="email"
       className="form-input px-4 py-2 border rounded mt-2 mb-10"
      />
     </div>
     <div className="md:mr-4">
      <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Password</label>
      <input
       ref={passwordRef}
       type="password"
       className="form-input px-4 py-2 border rounded"
      />
     </div>
     <div className='flex flex-col pt-10 md:flex-row'>
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

export default SignIn;
