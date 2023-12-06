import { createAction } from "@reduxjs/toolkit";

const agregarObjeto = createAction("agregarObjeto",(objeto ) => {
    return {
      payload: objeto
    };
  })

  
  export  {agregarObjeto} 