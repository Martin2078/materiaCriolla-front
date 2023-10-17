import { Link } from 'react-router-dom';
import '../NotAllow.css';

const buttonStyle = {
  backgroundImage: 'url("../public/images/madera.png")',
  backgroundSize: 'cover',
};

const NotAllow = () => {
  return (
    <div className="register-container w-full h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl text-white font-bold mb-6">
        You are not registered, log in to continue browsing.
      </h1>
      <div className="mb-4">
        <Link
          to="/SignIn"
          className="text-white text-2xl font-bold py-2 px-20 rounded bg-primary mt-4"
          style={buttonStyle}
        >
          Sign In!
        </Link>
      </div>
      <h1 className="text-3xl text-white font-bold mb-6">
      You do not have an account?
      </h1>
      <div className="mb-4">
        <Link
          to="/Register"
          className="text-white text-2xl font-bold py-2 px-20 rounded bg-primary mt-4"
          style={buttonStyle}
        >
          Register
        </Link>
      </div>
      <video autoPlay loop muted className="video-background">
        <source src="/videos/matevideo2.mp4" type="video/mp4" />
      </video>
    </div>
  );
};

export default NotAllow;
