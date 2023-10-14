import axios from 'axios'
import React, { useEffect, useState,  } from 'react'
import { Link } from "react-router-dom";
import { Dispatch } from 'react';
import { useDispatch } from 'react-redux';
import {agregarObjeto}  from "../redux/actions/productsAction"
import { useSelector } from "react-redux/es/hooks/useSelector";
import Details from './Details';
import carrito from '../../public/images/añadir-a-carrito.png'


const ProductsLayout = (props) => {
const {productos, categoryChecked, setProductos, productosFiltrados, searchValue} =props
const  productoStore  = useSelector((store) => store.productos)
console.log("aca: " , productoStore)
 const [change,setChange]=useState(false)
 const [detail,setDetail]=useState()
useEffect(()=>{
  },[])
   
  const dispatch = useDispatch() 


  const agregarProducto=(id)=>{
    console.log("entra a funcion")
const producto = productos.filter((elemento)=> elemento._id === id)
console.log(producto)
dispatch(agregarObjeto(producto))


}
  

  
       const mapear = () =>{
        console.log(searchValue)
        let data = []
        productosFiltrados.length > 0 ? data = productosFiltrados : data =productos

        return data?.map((producto) => (
            <>
              
  <div onClick={()=>{setDetail(producto);setChange(true)}} className=" w-20 h-32 cursor-pointer    sm:w-28 sm:h-44 mt-10  flex flex-col justify-center items-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 relative">
      
          <img className="rounded-full translate-y-3 w-12 h-12 sm:h-16 sm:w-16 object-cover border-slate-700 border-2  sm:-translate-y-3" src={producto.product_photo[0]} alt={producto.name} />
      
      <div className="p-5  ">
          
              <h5 className="mb-2 text-sm sm:text-xl font-bold tracking-tight text-gray-900 dark:text-white"> {producto.name} </h5>
          
          <p className=" font-normal text-xs sm:text-sm text-gray-700 dark:text-gray-400">{producto.description} </p>
          <button href="#" onClick={(e)=>agregarProducto(producto._id)} id={producto._id} className="w-7 h-7 translate-x-14 -translate-y-32  sm:-translate-y-44  sm:translate-x-20 inline-flex items-center  text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              
               <img className='w-5'  src={carrito} alt="" />
          </button>
      </div>
  </div>
  
            </>
          ))
       }
    
    
    



  return (
  
    <div className= 'w-full flex justify-around sm:pt-3 '>
      {change&&<Details detail={detail} change={change} setChange={setChange}/>}
    <div className='w-full'>
    <div className= 'w-full flex p-2 '>
         
        

{mapear()}
   

</div>
</div>
</div>
  )
}

export default ProductsLayout