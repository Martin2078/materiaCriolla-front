import axios from 'axios'
import React, { useEffect, useState } from 'react'

const CategoryLayout = (props) => {
const {categorias, setCategoryChecked, category, categoryChecked,  setProductos, productos, productosFiltrados,
     setProductosFiltrados, setSearchValue, filterProMax} =props

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
 
    let filtrados = []
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
                    setSearchValue(products)
                    
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
}



  return (
    <>
    {categorias?.map((category) => (
        <label
        
          className='rounded p-1 m-2 flex flex-col text-sm'
          style={{ backgroundImage: category.cover_photo }}
        >{category.name}
        <input  type="checkbox" key={category._id} onClick={(e) =>handleSelectCategory(e,category._id)} /></label>
      ))}
      </>

  )
}

export default CategoryLayout