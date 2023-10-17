import login from '../actions/singInAction.js';
import signOut from '../actions/signOutAction.js';
import userChangeAction from '../actions/userChangeAction.js';
import { createReducer } from '@reduxjs/toolkit';
import checkoutActions from '../actions/checkoutAction.js';
const { addCheckout,deleteCheckout,updateCheckout}=checkoutActions


const initialState = {
    token: "",
    user: null,       // Representa al usuario que ha iniciado sesión 
    loading: false,   // Indica si se está realizando una operación de inicio de sesión.
    error: null     // Almacena información sobre cualquier error que ocurra durante el inicio de sesión.
};

// Reducer para manejar las acciones de inicio de sesión

const authReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(userChangeAction.fulfilled, (state, action) => {
            if (action.payload.error) {
                return state
            }
            let nuevoEstado = {
                ...state,
                user: action.payload.user,
                message: action.payload.message,
                loading: false
            }
            return nuevoEstado
        })
        .addCase(userChangeAction.rejected, (state, action) => {
            let nuevoEstado = {
                ...state,
                error:action.payload.error,
                loading: false
            }
            return nuevoEstado
        })
        .addCase(login.fulfilled, (state, action) => {
            let nuevoEstado = {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                loading: false
            }

            return nuevoEstado
        })
        .addCase(login.pending, (state, action) => {
            let nuevoEstado = {
                ...state,
                loading: true
            }
            return nuevoEstado
        })
        .addCase(login.rejected, (state, action) => {
            let nuevoEstado = {
                ...state,
                error: action.payload.error,
                loading: false,
            }
            return nuevoEstado
        })
        .addCase(signOut.fulfilled, (state, action) => {
            return initialState
        })
        .addCase(addCheckout.fulfilled,(state,action)=>
        {
            let nuevoEstado={
                ...state,
                user:action.payload.user,
                loading:false,
            }
            return nuevoEstado
        })
        .addCase(deleteCheckout.fulfilled,(state,action)=>
        {
            let nuevoEstado={
                ...state,
                user:action.payload.user,
                loading:false,
            }
            return nuevoEstado
        })
        .addCase(updateCheckout.fulfilled,(state,action)=>
        {
            let nuevoEstado={
                ...state,
                user:action.payload.user,
                loading:false,
            }
            return nuevoEstado
        })

})

export default authReducer; 
