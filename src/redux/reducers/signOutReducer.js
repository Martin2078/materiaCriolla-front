// import signOut from '../actions/signOutAction';
// import { createReducer } from '@reduxjs/toolkit';


// const initialState = {
//     message:null,       // Representa al usuario que ha iniciado sesión 
//     loading: false,   // Indica si se está realizando una operación de inicio de sesión.
//     error: null,      // Almacena información sobre cualquier error que ocurra durante el inicio de sesión.
// };

// // Reducer para manejar las acciones de inicio de sesión

// const logOut = createReducer(initialState, (builder) => {
//     builder
//         .addCase(signOut.fulfilled, (state, action) => {
//             let nuevoEstado = {
//                 ...state,
//                 message:action.payload,
//                 loading: false
//             }

//             return nuevoEstado
//         })
//         .addCase(signOut.pending, (state, action) => {
//             let nuevoEstado = {
//                 ...state,
//                 loading: true
//             }
//             return nuevoEstado
//         })
//         .addCase(signOut.rejected, (state, action) => {
//             let nuevoEstado = {
//                 ...state,
//                 error: action.payload.error,
//                 loading: false,
//             }
//             return nuevoEstado
//         })

// })

// export default logOut; 
