import { createAction } from "@reduxjs/toolkit";

const agregarObjeto = createAction("agregarObjeto",(objeto ) => {
    console.log(objeto)
    return {
      payload: objeto
    };
  })

  
  export  {agregarObjeto} 