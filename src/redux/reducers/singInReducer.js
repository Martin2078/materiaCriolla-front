import login from '../actions/singInAction.js';
import signOut from '../actions/signOutAction.js';
import userAddressAction from '../actions/userAddressAction.js';
import { createReducer } from '@reduxjs/toolkit';


const initialState = {
    token: "",
    user: null,       // Representa al usuario que ha iniciado sesión 
    loading: false,   // Indica si se está realizando una operación de inicio de sesión.
    error: null     // Almacena información sobre cualquier error que ocurra durante el inicio de sesión.
};

// Reducer para manejar las acciones de inicio de sesión

const authReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(userAddressAction.fulfilled, (state, action) => {
            let nuevoEstado = {
                ...state,
                user: action.payload.user,
                message: action.payload.message,
                loading: false
            }
            return nuevoEstado
        })
        .addCase(userAddressAction.rejected, (state, action) => {
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

})

export default authReducer; 
