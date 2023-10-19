import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Details from './Details';
import products from "../redux/actions/productosAction";
import axios from "axios";
import edit from "../../public/images/edit.png"
import borrar from "../../public/images/borrar.png"
import añadir from '/images/añadir.png'
import close from '/images/close.png'
import { useRef } from "react";
import {toast,Toaster} from 'react-hot-toast'

const CreateProducto = (props) => {

    const {show, setShow, categorias, user, handleCreate} = props

    const photo=useRef();
    const descrip=useRef();
    const precio=useRef();
    const cantidad=useRef();
    const nombre = useRef();
    const categoria = useRef();
    const color = useRef();
    const user_id = user._id;
    

  const dispatch = useDispatch();
 
  const [actualPhoto, setActualPhoto] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [quantitySelect, setQuantitySelect] = useState(false)
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [stock, setStock]= useState("")
  const [photos, setPhotos] = useState("")
  
  
  useEffect(() => {
   
  }, [])
  const  producto = {
    name:"",
    description:"",
    price:null,
    quantity:null,
    product_photo:"",
    colors: [],
    user_id: "",
    category_id:"",
}

const  colores =["blue", "yellow", "black"]

const handleSubmit=()=>{
    producto.name=nombre.current.value
    producto.description=descrip.current.value
    producto.quantity=cantidad.current.value
    producto.price=precio.current.value
    producto.product_photo=photo.current.value
    producto.user_id = user_id;
    producto.category_id = categoria.current.value;
    producto.colors = color.current.value;
    console.log(producto)
    if(validate(producto)){
        handleCreate(producto)
        setShow(false)
    } else{
        toast.error("You must complete all fields")
    }
    


}

const validate =(producto)=>{
    if(producto.name==""){
        return false
    }
    if(producto.description==""){
        return false
    }
    if(producto.quantity==null){
        return false
    }
    if(producto.price==null){
        return false
    }
    if(producto.product_photo ==""){
        return false
    }
    if(producto.user_id==null){
        return false
    }
    if(producto.category_id==""){
        return false
    }
    if(producto.colors==[]){
        return false
    }
    return true

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
    
    <div className='fixed top-0 left-0 w-screen h-auto py-4 md:py-0 px-4 lg:px-0 bg-[#999] bg-opacity-50 flex justify-center items-center z-10'>
        <Toaster position='top-center' toastOptions={{success:{duration:2000}, error:{duration:2000}}}/>
    <div className='w-full h-full xl:w-8/12 lg:w-10/12 md:h-4/6  bg-white pt-10 md: md:py-10 px-5 flex flex-col md:flex-row relative rounded-lg'>
      <img required name="photo" onClick={()=>setShow(!show)} className='w-10 h-10 cursor-pointer absolute top-1 right-1 md:top-2 md:right-2' src={close} alt="" />
      <div className='w-full relative md:w-1/2 md:h-full h-1/2 flex flex-col items-center border rounded-lg justify-between'>
        <div className='w-11/12 rounded-lg absolute top-80 bg-neutral-400 bg-opacity-50 border flex items-center justify-between border-black p-1 px-3'>
          <div className='flex gap-2 overflow-x-auto'>
            
                <div   className='border cursor-pointer border-black'>
                  <img  className='w-10 h-10' src="" alt="" />
                </div>
          </div>
          <div className='relative hover:scale-110'>
            <img  className='h-8 w-8 cursor-pointer' src={añadir} alt="" />
            <input  className='w-8 h-8 absolute top-0 opacity-0' type="file" ref={photo} />
          </div>
        </div>
        <img className='w-full max-h-64 object-contain rounded-lg' src="" alt="" />
      </div>
      <div className='w-full h-fit md:w-1/2 md:h-full flex flex-col items-center justify-between py-4 overflow-y-scroll md:overflow-hidden'>
        <div className='w-5/6 h-fit md:h-5/6 flex flex-col gap-1 md:gap-4 lg:gap-3'>
            <p>Nombre: </p>
          <input required name="nombre"  type="text"  placeholder="Nombre" ref={nombre}/>
          <div className='flex flex-col gap-2 h-2/5'>
            <p className='text-xl'>Description</p>
            <div className='w-full h-32 md:h-full border overflow-y-scroll p-1 px-2 rounded-lg'>
              <input type="text" placeholder="description" ref={descrip}/>
            </div>
          </div>
          <p className='text-lg font-semibold'>Price:</p>
          <input type="number" placeholder="price of product" ref={precio}/>
          <p className='text-lg font-semibold'>Stock:</p>
          <input type="number" placeholder="quantity" ref={cantidad}/>
          <p>Categoría: </p>
          <select ref={categoria}>
                {categorias.map(cat =>
            <option key={cat.key} value={cat._id}>{cat.name}</option>
                )};
          </select>
          <p>Color: </p>
          <select ref={color}>
          {colores.map(col =>
            <option key={col} value={col}>{col}</option>
                )};

          </select>

          <div className=" h-10 w-9/12 rounded-lg text-white text-xl bg-[url('/images/madera.png')] text-center">
            <button onClick={()=>handleSubmit()} >Create</button>
        </div>
         
        </div>
        
      </div>
      
    </div>
  </div>
    
  );
}

export default CreateProducto;