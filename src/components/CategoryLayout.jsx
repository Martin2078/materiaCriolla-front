/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const CategoryLayout = (props) => {
const {categorias, setCategoryChecked, category, categoryChecked,  setProductos, productos, productosFiltrados,
     setProductosFiltrados, setSearchValue, searchValue, filterProMax, handleFilter} =props

useEffect(()=>{
   
  },[])

  let categoriasCheckeadas = []

  const handleSelectCategory= (e,data)=>{
    let dataCat=[]
    
        let categoriaFiltradas = category.filter((elemento) => elemento._id===data)
        //for (const element of categoriaFiltradas) {
        //       setCategoryChecked ([...categoryChecked,element])
        //        dataCat=categoryChecked
        //}
               
        filterProducts(categoriaFiltradas,e.target.checked) 
}
const filterProducts =(data, bul)=>{
    console.log("filterpromax: ", filterProMax)
    let filtrados = []
    for (const element of data) {
        filtrados = filterProMax.filter((elemento) => elemento.category_id === element._id)
    }
    
    console.log(filtrados)
    for (const element of filtrados) {
        if(bul){
            if(searchValue.some(product => product.category_id === element.category_id)){
                console.log("reemplaza: ", element)
                setSearchValue([element])
                setProductosFiltrados([element])
            }else{
                setSearchValue([...searchValue, element])
                setProductosFiltrados([...productosFiltrados, element])
                console.log("no reemplaza: ", element)
            }

        } else{
            let productsf = productosFiltrados.filter((elemento) => elemento.category_id !== element.category_id)
            if(productsf.length > 0){
                setSearchValue(productsf)
                setProductosFiltrados(productsf)
            }else{
                setSearchValue(productos)
                setProductosFiltrados(productos)
                console.log("setea a all: ")
            }
        }      
    }    
   /* let filtrados = []
    let prods = []    
    if(filterProMax.length > 0){
        for (const element of data) {
            filtrados = filterProMax.filter((elemento) => elemento.category_id === element._id)            
        }
    }else{
        for (const element of data) {
            filtrados = productosFiltrados.filter((elemento) => elemento.category_id === element._id)           
        }
    }
     for  (const element of filtrados) { 
        if(productosFiltrados.some(product => product.category_id === element.category_id)){
            if(bul){setProductosFiltrados([element] );
            }else{
                let products = productosFiltrados.filter((elemento) => elemento.category_id !== element.category_id)
                if(products.length < 1){
                    if(filterProMax.length > 0){
                        setProductosFiltrados(filterProMax)
                        setSearchValue([])
                    } else{
                        setProductosFiltrados(productos)
                    }   
                }else{
                    console.log("products")
                    setProductosFiltrados(products)
                    setSearchValue(products  
                }
            }     
        } else{
            if(filterProMax.length> 0){
                setProductosFiltrados([...filterProMax, element] )
                setSearchValue(filtrados)
            }else{
                setProductosFiltrados([...productosFiltrados, element] )
            }
        }
    }
*/}

return (
    <>
      {categorias?.map((category) => (
        <label
          key={category._id}
          className='rounded p-1 m-2 flex flex-col text-xs sm:text-sm sm:justify-around sm:gap-3'
          style={{ backgroundImage: `url(${category.cover_photo})` }}
        >
          {category.name}
          <input
            type="checkbox"
            onChange={(e) => handleSelectCategory(e, category._id)}
          />
        </label>
      ))}
    </>
  );
}

export default CategoryLayout