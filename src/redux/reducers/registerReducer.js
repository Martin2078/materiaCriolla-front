import { createReducer } from "@reduxjs/toolkit";
import register from '../actions/registerAction'

const initialState = {
    data:{},
    error:null
}

const registerReducer = createReducer(initialState, (builder) =>
    builder
        .addCase(register.fulfilled, (state, action) => {
            const newState = {
                ...state
            }
            if (action.payload.error){
                newState.error = action.payload.error
                newState.data = initialState.data
            }else{
                newState.data = action.payload
                newState.error = null
                console.log (newState)
            }
                return newState
        }))

export default registerReducer