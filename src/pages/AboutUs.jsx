import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../AboutUs.css'
import { useDispatch, useSelector } from 'react-redux'
import login from '../redux/actions/singInAction';

const ContactForm = () => {
  const dispatch = useDispatch()
  const { user, token } = useSelector((store) => store.profile)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    messageType: 'General Inquiry',
    message: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.messageType && formData.message) {
      toast.success('Message sent succesfully!', {
        position: 'top-center',
        autoClose: 5000,
        className: 'custom-toast-success',
        icon: null,
      });
    } else {
      if (!formData.name) {
        toast.error('Please enter your name');
      }
      if (!formData.email) {
        toast.error('Please enter your email');
      }
      if (!formData.messageType) {
        toast.error('Please select the type of message');
      }
      if (!formData.message) {
        toast.error('Please enter your message');
      }
    }
  };

  useEffect(() => {
    if (!token || !token.length) {
      if (localStorage.length > 0) {
        const tokenStorage = localStorage.getItem('token')
        const userStorage = JSON.parse(localStorage.getItem('user'))
        const data2 = { user: userStorage, token: tokenStorage }
        dispatch(login(data2))
      }
    }
  }, [token])

  return (
    <div className="register-container w-full h-screen flex flex-col md:flex-row">
      <div className="w-full md:w-2/3 flex flex-col items-center justify-center p-8 md:pt-44">
        <h1 className="text-3xl font-bold mb-1 pt-5">Contact Us</h1>
        <form className="bg-white shadow-2xl rounded px-8 mb-4 pb-4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-bold mb-0">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-input  px-14 py-2 border rounded-bl-full"
              onChange={handleInputChange}
              value={formData.name}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-0">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-input  px-14 py-2 border rounded-ee-full"
              onChange={handleInputChange}
              value={formData.email}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="messageType" className="block text-gray-700 font-bold mb-0">
              Message Type
            </label>
            <select
              id="messageType"
              name="messageType"
              className="form-input px-3 py-2 border rounded"
              onChange={handleInputChange}
              value={formData.messageType}
            >
              <option value="General Inquiry">General Inquiry</option>
              <option value="Product Support">Product Support</option>
              <option value="Billing Question">Billing Question</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-gray-700 font-bold mb-0">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              className="form-input px-3 py-2 border rounded"
              style={{ minHeight: '150px', width: '100%', resize: 'none' }}
              onChange={handleInputChange}
              value={formData.message}
            ></textarea>
          </div>
          <div className='flex flex-col'>
            <button
              type="submit"
              className="text-white text-2xl font-bold py-2 px-20 rounded mt-4 w-full"
              style={{ backgroundImage: 'url("public/images/madera.png")', backgroundSize: 'cover' }}
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
      <div className="contact-info w-full md:w-1/2 shadow-md p-6 rounded bg-white px-8 pb-4 m-4 sm:p-44" style={{ position: 'relative', zIndex: 1 }}>
        <div className="video-background" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
          <video autoPlay loop muted style={{ width: '100%', height: '100%', objectFit: 'cover' }}>
            <source src="../public/videos/matevideo1.mp4" />
          </video>
        </div>
        <div className='contact-info'>     
        <h1
          className=" text-white font-bold mb-4 " style={{ position: 'relative', zIndex: 2 }}> Our Mission</h1>
        <p className="text-white" style={{ position: 'relative', zIndex: 2 }}>
          At Materia Criolla, we're dedicated to sharing the tradition of mate with the world through high-quality products, fostering community, and promoting well-being.
        </p>
        
        <h1 className=" text-white font-bold mt-6 mb-4" style={{ position: 'relative', zIndex: 2 }}>Our Vision</h1>
        <p className="text-white" style={{ position: 'relative', zIndex: 2 }}>
          Our vision at Materia Criolla is to be the global symbol of quality mate experiences, uniting people in camaraderie and wellness worldwide.
        </p>
        <h1 className=" text-white font-bold mt-6 mb-4" style={{ position: 'relative', zIndex: 2 }}>Our Values</h1>
        <ul className="list-disc list-inside text-white" style={{ position: 'relative', zIndex: 2 }}>
          <li >Integrity</li>
          <li >Innovation</li>
          <li >Teamwork</li>
          <li >Passion</li>
        </ul>
        
        </div>
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
        icon={true}
      />
    </div>
  );
};

export default ContactForm;