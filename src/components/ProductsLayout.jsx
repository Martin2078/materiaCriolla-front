import axios from 'axios'
import React, { useEffect, useState,  } from 'react'
import { Link } from "react-router-dom";
import { Dispatch } from 'react';
import { useDispatch } from 'react-redux';
import {agregarObjeto}  from "../redux/actions/productsAction"
import { useSelector } from "react-redux/es/hooks/useSelector";


const ProductsLayout = (props) => {
const {productos, categoryChecked, setProductos, productosFiltrados, searchValue, filterProMax,
   setProductosFiltrados, setSearchValue} =props
const  productoStore  = useSelector((store) => store.productos)

useEffect(()=>{
  filterProducts()
  },[categoryChecked])
   
  const dispatch = useDispatch() 


  const agregarProducto=(id)=>{
  
const producto = productos.filter((elemento)=> elemento._id === id)

dispatch(agregarObjeto(producto))


}

const filterProducts =()=>{
 
  let filtrados = []
  
  let productsf = []
 console.log(categoryChecked)
  console.log("filterpromax: ", filterProMax)
      //if(bul){
      //    
          
          for (const elemento of categoryChecked) {
            console.log("element: ", elemento)
            for (const element of filterProMax) {
              if(element.category_id == elemento._id){
                productsf.push(element)
              }
              
            }
        
          }
          if(categoryChecked.length>0){
            setSearchValue(productsf)
          setProductosFiltrados(productsf)
          } else{
            setSearchValue(productos)
          setProductosFiltrados(filterProMax)
          }
          
   
      }
  

  
       const mapear = () =>{
        
        let data = []
      //  productosFiltrados.length > 0 ? data = productosFiltrados : data =productos
      data = productosFiltrados

        return data?.map((producto) => (
            <>
              
  <div className=" w-20 h-32    sm:w-28 sm:h-44 mt-10  flex flex-col justify-center items-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 relative">
      
          <img className="rounded-full translate-y-3 w-12 h-12 sm:h-16 sm:w-16 object-cover border-slate-700 border-2  sm:-translate-y-3" src={producto.product_photo} alt={producto.name} />
      
      <div className="p-5  ">
          
              <h5 className="mb-2 text-sm sm:text-xl font-bold tracking-tight text-gray-900 dark:text-white"> {producto.name} </h5>
          
          <p className=" font-normal text-xs sm:text-sm text-gray-700 dark:text-gray-400">{producto.description} </p>
          <button href="#" onClick={(e)=>agregarProducto(producto._id)} id={producto._id} className="w-7 h-7 translate-x-14 -translate-y-32  sm:-translate-y-44  sm:translate-x-20 inline-flex items-center  text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              
               <img className='w-5'  src="public/img/icons8-agregar-a-carrito-de-compras-26.png" alt="" />
          </button>
      </div>
  </div>
  
            </>
          ))
       }
    
    
    



  return (
  
    <div className= 'w-full h-96 flex justify-around flex-wrap sm:pt-3 '>
         
        

{
mapear()

}
   

</div>

  )
}

export default ProductsLayout