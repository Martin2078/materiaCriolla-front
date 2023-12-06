import { createReducer } from "@reduxjs/toolkit";
import {agregarObjeto}   from "../actions/productsAction.js";

const initialState={
    productos:[]
}


const productosReducer = createReducer(initialState, (builder) =>
builder

.addCase(agregarObjeto,(state,action) => {
    const newState = {
        ...state,
      productos:[...state.productos, action.payload],
      
    };
    return newState;
  })
);
export default productosReducer



    
   