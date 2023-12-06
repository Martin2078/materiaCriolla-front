import React from "react";
import { useState } from "react";



const Tips =(props)=>{
    const {categoryChecked} = props
let tips=""

const [show, setShow] = useState(false)
const [data, setData] = useState("")

const mostrar = (data)=>{
    show? setShow(false) : setShow(true)
    setData(data)
}


    return(
      <div className={`relative w-full h-20 sm:w-1/3 flex     flex-col border-l-2`} >
        <div className="flex justify-center text-center">
        <div className='rounded-full border-2 border-neutral-950 w-8 h-8  text-center'>
            <p className='flex item-center'>tips</p>
        </div>
        </div>
        <div className="">
{categoryChecked?.map((categoria) => (
        <>
        <div>
            <h3 className="text-xl text-center my-5"> {categoria.name} </h3>
          
             {<p className='text-xs mx-3'>{categoria.tip} </p> }  
        </div>
         


        </>
      ))}
 </div>
 </div>
    ) 
}
export default Tips