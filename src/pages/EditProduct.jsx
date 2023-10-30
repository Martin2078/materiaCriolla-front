import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Details from '../components/Details';
import products from "../redux/actions/productosAction";
import axios from "axios";
import edit from "../../public/images/edit.png"
import borrar from "../../public/images/borrar.png"
import añadir from '/images/añadir.png'
import close from '/images/close.png'

const EditProduct = (props) => {

    const {producto, change, setChange, setProductoModificado, modificarProducto} = props;
  const dispatch = useDispatch();
 
  const [actualPhoto, setActualPhoto] = useState(producto.product_photo[0])
  const [quantity, setQuantity] = useState(1)
  const [quantitySelect, setQuantitySelect] = useState(false)
  const [description, setDescription] = useState(producto.description)
  const [price, setPrice] = useState(producto.price)
  const [stock, setStock]= useState(producto.stock)
  const [photos, setPhotos] = useState(producto.product_photo)
  
  useEffect(() => {
   
  }, [])
  



  function getQuantity(e) {
    if (e.target.value == 4) {
      setQuantitySelect(true)
    } else {
      setQuantity(e.target.value)
    }
  }

  function quantityRender() {
    let template = []
    for (let i = 1; i <= producto.quantity; i++) {
      if (i == 1) {
        template.push(<option value="1">1 unidad</option>)
      } else {
        template.push(<option value={i}>{i} unidades</option>)
      }
    }
    return template
  }

  function addPhoto(e) {
    console.log(e)
    setPhotos([...photos, e.target.value])
    producto.product_photo.push(e.target.value)
  }

  const handleDescription =(e)=>{
    setDescription(e.target.value)

  }
  const handlePrice = (e)=>{
    setPrice(e.target.value)
  }
  const handleStock = (e)=>{
    setStock(e.target.value)
  }

  const setPhoto = (e)=>{
    setActualPhoto(photo)
    producto.product_photo[0]=photo
  }


  const handleGrabar = (e)=>{
    producto.description = description
    producto.price = price
    producto.quantity = stock
    producto.product_photo = photos
    console.log(producto)
    modificarProducto(producto)
    setChange(!change)
  }
  

  const cardStyle = {
    backgroundImage: 'url("/images/madera.png")',
    backgroundSize: 'cover',
    border: '1px solid #000',
    padding: '16px',
    margin: '8px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: '10px',
    maxWidth: '300px',
    flex: '1',
  };

  const cardContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
  };

  const filterInputStyle = {
    flex: 1,
    height: '40px',
    fontSize: '16px',
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  };

  const checkboxStyle = {
    width: '20px',
    height: '20px',
    marginRight: '8px',
  };

  const colorContainerStyle = {
    display: 'flex',
    gap: '8px',
  };

  const imageStyle = {
    width: '100%',
    height: '200px', 
    objectFit: 'contain',
  };

  return (
    
    <div className='fixed top-0 left-0 w-screen h-full py-4 md:py-0 px-4 lg:px-0 bg-[#999] bg-opacity-50 flex justify-center items-center z-10'>
    <div className='w-full h-full xl:w-8/12 lg:w-10/12 md:h-4/6 bg-white pt-10 md: md:py-10 px-5 flex flex-col md:flex-row relative rounded-lg'>
      <img onClick={() => setChange(!change)} className='w-10 h-10 cursor-pointer absolute top-1 right-1 md:top-2 md:right-2' src={close} alt="" />
      <div className='w-full relative md:w-1/2 md:h-full h-1/2 flex flex-col items-center border rounded-lg justify-between'>
        <div className='w-11/12 rounded-lg absolute bottom-2 bg-neutral-400 bg-opacity-50 border flex items-center justify-between border-black p-1 px-3'>
          <div className='flex gap-2 overflow-x-auto'>
            {producto.product_photo?.map((photo, index) => {
              return (
                <div key={index} onClick={() => setPhoto(photo)} className='border cursor-pointer border-black'>
                  <img key={index} className='w-10 h-10' src={photo} alt="" />
                </div>)
            })}
          </div>
          <div className='relative hover:scale-110'>
            <img onClick={() => addPhoto()} className='h-8 w-8 cursor-pointer' src={añadir} alt="" />
            <input onChange={(e) => addPhoto(e)} className='w-8 h-8 absolute top-0 opacity-0' type="file" />
          </div>
        </div>
        <img className='w-full max-h-64 object-contain rounded-lg' src={actualPhoto} alt="" />
      </div>
      <div className='w-full h-fit md:w-1/2 md:h-full flex flex-col items-center justify-between py-4 overflow-y-scroll md:overflow-hidden'>
        <div className='w-5/6 h-fit md:h-5/6 flex flex-col gap-1 md:gap-4 lg:gap-3'>
          <h3 className='text-3xl md:text-4xl w-full'>{producto.name}</h3>
          <div className='flex flex-col gap-2 h-2/5'>
            <p className='text-xl'>Description</p>
            <div className='w-full h-32 md:h-full border overflow-y-scroll p-1 px-2 rounded-lg'>
              <input type="text" placeholder={producto.description} onChange={(e)=>handleDescription(e)}/>
            </div>
          </div>
          <p className='text-lg font-semibold'>Price:</p>
          <input type="number" placeholder={producto.price} onChange={(e)=>handlePrice(e)}/>
          <p className='text-lg font-semibold'>Stock:</p>
          <input type="number" placeholder={producto.quantity} onChange={(e)=>handleStock(e)} />
          <div className=" h-10 w-9/12 rounded-lg text-white text-xl bg-[url('/images/madera.png')] text-center">
            <button  onClick={(e)=>handleGrabar()}>Editar</button>
        </div>
         
        </div>
        
      </div>
      
    </div>
  </div>
    
  );
}

export default EditProduct;