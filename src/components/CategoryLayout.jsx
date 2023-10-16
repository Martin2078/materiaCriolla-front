import axios from 'axios'
import React, { useEffect, useState } from 'react'

const CategoryLayout = (props) => {
const {categorias, setCategoryChecked, category, categoryChecked, setShow, setCheck} =props

useEffect(()=>{
   
  },[])

  let categoriasCheckeadas = []

  const handleSelectCategory= (e,data)=>{
    let dataCat=[]
        if (e.target.checked){
            setCheck(true)
             categoriasCheckeadas = category.filter((elemento) => elemento._id===data)
             console.log(categoriasCheckeadas)
              categoriasCheckeadas.forEach(element => {
                setCategoryChecked([...categoryChecked, element])
             });
            
        } else{
            setCheck(false)
            categoriasCheckeadas = categoryChecked.filter((elemento) => elemento._id ==data)
            console.log(categoriasCheckeadas)
           
            if(categoriasCheckeadas.length > 0){
                categoriasCheckeadas.forEach(element =>{
                    for (const elemento of categoryChecked) {
                        if(element._id !== elemento._id){
                            dataCat.push(elemento)
                        }
                    }
                    
                })
                setCategoryChecked(dataCat)
            } else{
                setCategoryChecked([])
            }
            
            
        }
        
      
      
       
   

    
}



  return (
    <>
    {categorias?.map((category) => (
        <label
      
          className='rounded p-1 m-2 flex flex-col text-xs sm:text-sm sm:justify-around sm:gap-3 '
          style={{ backgroundImage: category.cover_photo }}
        >{category.name}
        <input  type="checkbox" key={category._id} onClick={(e) =>handleSelectCategory(e,category._id)} /></label>
      ))}
      </>

  )
}

export default CategoryLayout