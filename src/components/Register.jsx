const Register = () => {
  return (
    <div className="register-container h-screen flex flex-col md:flex-row">
      <div className="w-full md:w-2/3 flex flex-col items-center justify-center p-8">
        <h1 className="text-3xl font-bold mb-1">Join Us</h1>
        <form className="bg-white shadow-md rounded px-8 pb-8 mb-4">
          <div className="mb-4 flex flex-col md:flex-row">
            <div className="md:mr-4">
              <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-input px-3 py-2 border rounded"
              />
            </div>
            <div className="md:mr-4 mt-4 md:mt-0">
              <label htmlFor="surname" className="block text-gray-700 font-bold mb-2">
                Surname
              </label>
              <input
                type="text"
                id="surname"
                name="surname"
                className="form-input px-3 py-2 border rounded"
              />
            </div>
          </div>
          <div className="mb-4 flex flex-col md:flex-row">
            <div className="md:mr-4">
              <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-input px-3 py-2 border rounded"
              />
            </div>
            <div className="md:mr-4 mt-4 md:mt-0">
              <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-input px-3 py-2 border rounded"
              />
            </div>
          </div>
          <div className="mb-4 flex flex-col md:flex-row">
            <div className="md:mr-4">
              <label htmlFor="age" className="block text-gray-700 font-bold mb-2">
                Age (18 or older)
              </label>
              <input
                type="number"
                id="age"
                name="age"
                min="18"
                className="form-input px-3 py-2 border rounded"
              />
            </div>
            <div className="md:mr-4 mt-4 md:mt-0">
              <label htmlFor="province" className="block text-gray-700 font-bold mb-2">
                Province
              </label>
              <input
                type="text"
                id="province"
                name="province"
                className="form-input px-3 py-2 border rounded"
              />
            </div>
          </div>
          <div className="mb-4 flex flex-col md:flex-row">
            <div className="md:mr-4">
              <label htmlFor="city" className="block text-gray-700 font-bold mb-2">
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                className="form-input px-3 py-2 border rounded"
              />
            </div>
            <div className="md:mr-4 mt-4 md:mt-0">
              <label htmlFor="postalCode" className="block text-gray-700 font-bold mb-2">
                Postal Code
              </label>
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                className="form-input px-3 py-2 border rounded"
              />
            </div>
          </div>
          <div className="mb-4 flex flex-col md:flex-row">
            <div className="md:mr-4">
              <label htmlFor="streetNumber" className="block text-gray-700 font-bold mb-2">
                Street and Number
              </label>
              <input
                type="text"
                id="streetNumber"
                name="streetNumber"
                className="form-input px-3 py-2 border rounded"
              />
            </div>
            <div className="flex items-end md:w-1/3">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
                style={{ backgroundImage: 'url("public/img/1.png")', backgroundSize: 'cover' }}
              >
                Register
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="w-full md:w-1/3 bg-gray-200">
        <img
          src="public/img/1.png"
          alt="Registration Image"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Register;
