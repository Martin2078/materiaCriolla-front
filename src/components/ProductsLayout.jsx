import axios from 'axios'
import React, { useEffect, useState } from 'react'

const ProductsLayout = (props) => {
const {productos, categoryChecked, setProductos, productosFiltrados, searchValue} =props

useEffect(()=>{
  },[])
  
  
  
       const mapear = () =>{
        console.log(searchValue)
        let data = []
        searchValue.length > 0 ? data = searchValue : data =productosFiltrados

        return productosFiltrados?.map((producto) => (
            <>
              
  <div className="w-1/4 mt-10 mx-3 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 relative">
      
          <img className="rounded-full absolute right-10 bottom-48 h-1/2 object-cover border-slate-700 border-2 w-1/2" src={producto.product_photo} alt={producto.name} />
      
      <div className="p-5 mt-28">
          
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"> {producto.name} </h5>
          
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{producto.description} </p>
          <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Agregar al carrito
               <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
              </svg>
          </a>
      </div>
  </div>
  
            </>
          ))
       }
    
    
    



  return (
    <div className='w-full'>
    <div className= 'w-full flex p-2 '>
         
        

{
mapear()

}
   
</div>
</div>

  )
}

export default ProductsLayout