import { useEffect, useState } from 'react';
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const MyCarousel = () => {
  const [products, setProducts] = useState([])
  const getProducts = async () => {
    try {
      const products = await axios.get('http://localhost:8080/products')
      console.log(products.data.response);
      setProducts(products.data.response)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProducts()
  }, [])
  console.log(products);
  return (
    <div className="w-full max-w-screen-xl mx-auto flex lg:px-5 gap-4">
      <div className="w-3/4">
        <div className="p-4 shadow-lg rounded-lg mb-4">
          <Carousel
            showArrows={true}
            showThumbs={false}
            infiniteLoop={true}
            autoPlay={true}
            interval={5000}
            transitionTime={500}
          >
            <div className="bg-[url('../../public/images/mates2.jpg')] bg-contain bg-no-repeat bg-center h-[35vh]"></div>
            <div className="bg-[url('../../public/images/side-cover2.jpg')] bg-contain bg-no-repeat bg-center h-[35vh]"></div>
            <div className="bg-[url('../../public/images/yerba3.png')] bg-contain bg-no-repeat bg-center h-[35vh]"></div>
          </Carousel>
          <h2 className="text-xl font-bold">Descripción del Carrusel</h2>
          <p>
            Aquí puedes agregar una descripción del carrusel o cualquier otro contenido que desees mostrar al lado del carrusel.
          </p>
        </div>
        <div className="h-[35%] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-white flex flex-col p-4 shadow-md rounded-md">
            <img className='h-[20vh] self-center' src={products[0]?.product_photo} alt="" />
            <h3 className="text-lg font-semibold mb-2">{products[0]?.name}</h3>
            <p>{products[0]?.description}</p>
            <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
              Comprar
            </button>
          </div>
          <div className="bg-white flex flex-col p-4 shadow-md rounded-md">
            <img className='h-[20vh] self-center' src={products[1]?.product_photo} alt="" />
            <h3 className="text-lg font-semibold mb-2">{products[1]?.name}</h3>
            <p>{products[1]?.description}</p>
            <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
              Comprar
            </button>
          </div>
          <div className="bg-white flex flex-col p-4 shadow-md rounded-md">
            <img className='h-[20vh] self-center' src={products[2]?.product_photo} alt="" />
            <h3 className="text-lg font-semibold mb-2">{products[2]?.name}</h3>
            <p>{products[2]?.description}</p>
            <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
              Comprar
            </button>
          </div>
        </div>
      </div>
      <div className="w-1/4 bg-gray-200">
        <img className='h-[100vh]' src="../../public/images/tradicion.jpg" alt="" />
      </div>
    </div>
  );
};

export default MyCarousel;
