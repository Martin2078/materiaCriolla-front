/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const CategoryLayout = (props) => {
const {categorias, setCategoryChecked, category, categoryChecked,  setProductos, productos, productosFiltrados,
     setProductosFiltrados, setSearchValue, searchValue, filterProMax, handleFilter} =props

useEffect(()=>{
   
  },[])

  const handleSelectCategory= (e,data)=>{
        let categoriaFiltradas = category.filter((elemento) => elemento._id===data)  
        filterProducts(categoriaFiltradas,e.target.checked) 
}
const filterProducts =(data, bul)=>{
    let filtrados = []
    for (const element of data) {
        filtrados = filterProMax.filter((elemento) => elemento.category_id === element._id)
    }

    for (const element of filtrados) {
        if(bul){
            if(searchValue.some(product => product.category_id === element.category_id)){
                setSearchValue([element])
                setProductosFiltrados([element])
            }else{
                setSearchValue([...searchValue, element])
                setProductosFiltrados([...productosFiltrados, element])
            }

        } else{
            let productsf = productosFiltrados.filter((elemento) => elemento.category_id !== element.category_id)
            if(productsf.length > 0){
                setSearchValue(productsf)
                setProductosFiltrados(productsf)
            }else{
                setSearchValue(productos)
                setProductosFiltrados(productos)
            }
        }      
    }    
}

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