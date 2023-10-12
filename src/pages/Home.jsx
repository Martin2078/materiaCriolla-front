import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../Carousel.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import login from '../redux/actions/singInAction';

const MyCarousel = () => {
  const dispatch = useDispatch()
  const { user, token } = useSelector(store => store.profile)
  useEffect(() => {
    if (!token || !token.length) {
      if (localStorage.length > 0) {
        const tokenStorage = localStorage.getItem('token')
        const userStorage = JSON.parse(localStorage.getItem('user'))
        console.log(tokenStorage);
        console.log(userStorage);
        const data = { user: userStorage, token: tokenStorage }
        dispatch(login(data))
      }
    }
  }, [token])
  return (
    <div className="w-full max-w-screen-xl mx-auto flex lg:px-5">
      <div className="w-3/4">
        <div className="p-4 shadow-lg rounded-lg">
          <Carousel
            showArrows={true}
            showThumbs={false}
            infiniteLoop={true}
            autoPlay={true}
            interval={5000}
            transitionTime={500}
          >
            <div className="carousel-item">
              <img src="public/img/carousel1.png" alt="Slide 1" />
            </div>
            <div className="carousel-item">
              <img src="public/img/carousel2.png" alt="Slide 2" />
            </div>
            <div className="carousel-item">
              <img src="public/img/carousel3.png" alt="Slide 3" />
            </div>
            {/* Agrega más diapositivas según sea necesario */}
          </Carousel>
          <h2 className="text-xl font-bold mb-2 mt-4">Descripción del Carrusel</h2>
          <p>
            Aquí puedes agregar una descripción del carrusel o cualquier otro contenido que desees mostrar al lado del carrusel.
          </p>
        </div>
        {/* Cuadros de productos */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {/* Cuadro 1 */}
          <div className="bg-white p-4 shadow-md rounded-md h-64">
            <h3 className="text-lg font-semibold mb-2">Producto 1</h3>
            <p>Descripción más larga del producto 1.</p>
            <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
              Comprar
            </button>
          </div>
          {/* Cuadro 2 */}
          <div className="bg-white p-4 shadow-md rounded-md h-64">
            <h3 className="text-lg font-semibold mb-2">Producto 2</h3>
            <p>Descripción más larga del producto 2.</p>
            <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
              Comprar
            </button>
          </div>
          {/* Cuadro 3 */}
          <div className="bg-white p-4 shadow-md rounded-md h-64">
            <h3 className="text-lg font-semibold mb-2">Producto 3</h3>
            <p>Descripción más larga del producto 3.</p>
            <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
              Comprar
            </button>
          </div>
        </div>
      </div>
      {/* Nueva caja */}
      <div className="w-1/4 bg-gray-200">
        {/* Contenido de la nueva caja */}
      </div>
    </div>
  );
};

export default MyCarousel;
