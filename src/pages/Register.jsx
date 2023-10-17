import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import register from '../redux/actions/registerAction';
import '../Register.css'

const Register = () => {
  const dispatch = useDispatch();
  const registrationError = useSelector((state) => state.register.error);

  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    birthdate: '',
    address: {
      province: '',
      city: '',
      postalCode: '',
      street: '',
      streetNumber: '',
      country: '',
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      address: {
        ...formData.address,
        [name]: value,
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.surname && formData.email && formData.password && formData.birthdate) {
      dispatch(register(formData));
      if (!registrationError) {
        toast.success(
          <div>
            Successful registration
          </div>,
          {
            position: 'top-center',
            autoClose: 2000,
            className: 'custom-toast-success',
            icon: null,
          }
        );
      }
    } else {
      if (!formData.name) {
        toast.error('Please enter your name');
      }
      if (!formData.surname) {
        toast.error('Please enter your last name');
      }
      if (!formData.email) {
        toast.error('Please enter your email');
      }
      if (!formData.password) {
        toast.error('Please enter your password');
      }
      if (!formData.birthdate) {
        toast.error('Please enter your date of birth');
      }
    }
    if (registrationError) {
      toast.error(registrationError.message);
    }
  };


  return (
    <div className="register-container w-full h-screen flex flex-col md:flex-row">
      <div className="w-full md:w-2/3 flex flex-col items-center justify-center p-8">
        <h1 className="text-3xl font-bold mb-1 pt-5 md:pt-32">Join Us</h1>
        <form className="bg-white shadow-2xl rounded px-8 mb-4 ml-4" onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-col md:flex-row">
            <div className="md:mr-4">
              <label htmlFor="name" className="block text-gray-700 font-bold mb-0">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-input px-3 py-2 border rounded"
                onChange={handleInputChange}
                value={formData.name}
              />
            </div>
            <div className="md:mr-4">
              <label htmlFor="surname" className="block text-gray-700 font-bold mb-0">Surname</label>
              <input
                type="text"
                id="surname"
                name="surname"
                className="form-input px-3 py-2 border rounded"
                onChange={handleInputChange}
                value={formData.surname}
              />
            </div>
          </div>
          <div className="mb-4 flex flex-col md:flex-row">
            <div className="md:mr-4">
              <label htmlFor="email" className="block text-gray-700 font-bold mb-0">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-input px-3 py-2 border rounded"
                onChange={handleInputChange}
                value={formData.email}
              />
            </div>
            <div className="md:mr-4">
              <label htmlFor="password" className="block text-gray-700 font-bold mb-0">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-input px-3 py-2 border rounded"
                onChange={handleInputChange}
                value={formData.password}
              />
            </div>
          </div>
          <div className="mb-4 flex flex-col md:flex-row">
            <div className="md:mr-4">
              <label htmlFor="birthdate" className="block text-gray-700 font-bold mb-0">Birthdate</label>
              <input
                type="date"
                id="birthdate"
                name="birthdate"
                className="form-input px-9 py-2 border rounded"
                onChange={handleInputChange}
                value={formData.birthdate}
              />
            </div>
            <div className="md:mr-4">
              <label htmlFor="country" className="block text-gray-700 font-bold mb-0">Country</label>
              <input
                type="text"
                id="country"
                name="country"
                className="form-input px-3 py-2 border rounded"
                onChange={handleAddressChange}
                value={formData.address.country}
              />
            </div>
          </div>
          <div className="mb-4 flex flex-col md:flex-row">
            <div className="md:mr-4">
              <label htmlFor="province" className="block text-gray-700 font-bold mb-0">Province</label>
              <input
                type="text"
                id="province"
                name="province"
                className="form-input px-3 py-2 border rounded"
                onChange={handleAddressChange}
                value={formData.address.province}
              />
            </div>
            <div className="md:mr-4">
              <label htmlFor="city" className="block text-gray-700 font-bold mb-0">City</label>
              <input
                type="text"
                id="city"
                name="city"
                className="form-input px-3 py-2 border rounded"
                onChange={handleAddressChange}
                value={formData.address.city}
              />
            </div>
          </div>
          <div className="mb-4 flex flex-col md:flex-row">
            <div className="md:mr-4">
              <label htmlFor="street" className="block text-gray-700 font-bold mb-0">Street</label>
              <input
                type="text"
                id="street"
                name="street"
                className="form-input px-3 py-2 border rounded"
                onChange={handleAddressChange}
                value={formData.address.street}
              />
            </div>
            <div className="md:mr-4">
              <label htmlFor="streetNumber" className="block text-gray-700 font-bold mb-0">Street Number</label>
              <input
                type="text"
                id="streetNumber"
                name="streetNumber"
                className="form-input px-3 py-2 border rounded"
                onChange={handleAddressChange}
                value={formData.address.streetNumber}
              />
            </div>
          </div>
          <div className="mb-4 flex flex-col md:flex-row">
            <div className="md:mr-4">
              <label htmlFor="postalCode" className="block text-gray-700 font-bold mb-0">Postal Code</label>
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                className="form-input px-3 py-2 border rounded"
                onChange={handleAddressChange}
                value={formData.address.postalCode}
              />
            </div>
          </div>
          <div className='flex flex-col pb-2 md:flex-row'>
            <button
              type="submit"
              className="text-white text-2xl font-bold py-2 px-20 rounded mt-4 md:mt-0 w-full"
              style={{ backgroundImage: 'url("public/images/madera.png")', backgroundSize: 'cover' }}
            >
              Register
            </button>
          </div>
          {/* {registrationError && (
            <div className="text-red-500">{registrationError.message}</div>
          )} */}
        </form>
      </div>
      <div className="w-full rounded-2xl md:w-1/2 mt-16 shadow-md p-6 md:rounded-2xl bg-white px-2 pb-2 m-4">
        <img
          src="public/img/1.png"
          alt="Registration Image"
          className="w-full h-full object-cover hidden md:block"
        />
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

export default Register;
