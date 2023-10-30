import React, { useEffect, useState } from 'react'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { useDispatch, useSelector } from 'react-redux'
import login from '../redux/actions/singInAction'
import productsAction from '../redux/actions/productosAction'
import categoriesAction from '../redux/actions/categoriesAction'

const MyCarousel = () => {
  const dispatch = useDispatch()
  const getProducts = async () => {
    try {
      dispatch(productsAction())
      dispatch(categoriesAction())
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProducts()
  }, [])

  const products = useSelector((store) => store.products.products)

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
            <div className="bg-[url('/images/mates2.jpg')] bg-contain bg-no-repeat bg-center h-[35vh]"></div>
            <div className="bg-[url('/images/side-cover2.jpg')] bg-contain bg-no-repeat bg-center h-[35vh]"></div>
            <div className="bg-[url('/images/yerba3.png')] bg-contain bg-no-repeat bg-center h-[35vh]"></div>
          </Carousel>
          <h2 className="text-xl font-bold">Celebrating Mate: A Visual Journey</h2>
          <p>
            Explore the rich and cultural world of mate through this captivating carousel. Discover the vibrant hues and unique shapes of traditional mate gourds, the lush greenery of yerba mate leaves, and the warmth of shared moments over steaming mate cups. Join us on a visual journey into the heart of South American tradition with these captivating images.
          </p>
        </div>
        <div className="h-[35%] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-white flex flex-col p-4 shadow-md rounded-md">
            <img className='h-[16vh] self-center' src={products[0]?.product_photo} alt="" />
            <h3 className="text-lg font-semibold h-14">{products[0]?.name}</h3>
            <p className='overflow-y-auto h-24 w-12/12'>{products[0]?.description}</p>
            <button className="mt-2  text-white px-4 py-2 rounded-md " style={{
              backgroundImage: `url('../public/images/madera.png')`, 
              backgroundSize: 'cover', 
            }}>
              Buy
            </button>
          </div>
          <div className="bg-white flex flex-col p-4 shadow-md rounded-md">
            <img className='h-[16vh] self-center' src={products[1]?.product_photo} alt="" />
            <h3 className="text-lg font-semibold h-14">{products[1]?.name}</h3>
            <p className='overflow-y-auto h-24 w-12/12'>{products[1]?.description}</p>
            <button className="mt-2  text-white px-4 py-2 rounded-md " style={{
              backgroundImage: `url('../public/images/madera.png')`, 
              backgroundSize: 'cover', 
            }}>
              Buy
            </button>
          </div>
          <div className="bg-white flex flex-col p-4 shadow-md rounded-md">
            <img className='h-[16vh] self-center' src={products[2]?.product_photo} alt="" />
            <h3 className="text-lg font-semibold h-14">{products[2]?.name}</h3>
            <p className='overflow-y-auto h-24 w-12/12'>{products[2]?.description}</p>
            <button className="mt-2  text-white px-4 py-2 rounded-md " style={{
              backgroundImage: `url('../public/images/madera.png')`, 
              backgroundSize: 'cover', 
            }}>
              Buy
            </button>
          </div>
        </div>
      </div>
      <div className="w-1/4 h-[100vh] flex items-center">
        <img className='h-[90vh] rounded-sm' src="/images/tradicion.jpg" alt="" />
      </div>
    </div>
  );
};

export default MyCarousel;
