import { createReducer } from "@reduxjs/toolkit"
import getProductos from '../actions/productosAction'

const initialState = {
    products: [],
    error: null
}

const getProductsReducer = createReducer(initialState, (builder) =>
    builder
        .addCase(getProductos.fulfilled, (state, action) => {
            const newState = {
                ...state,
            }
            if (action.payload.error) {
                newState.error = action.payload.error
                newState.products = initialState.products
            } else {
                newState.products = action.payload.response
                newState.error = null
            }
            return newState
        })
)

export default getProductsReducer