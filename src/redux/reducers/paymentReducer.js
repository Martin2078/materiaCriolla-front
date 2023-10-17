import { createReducer } from "@reduxjs/toolkit";
import payment from '../actions/paymentAction'

const initialState = {
    data: {},
    error: null
}

const paymentReducer = createReducer(initialState, (builder) => 
    builder
        .addCase(payment.fulfilled, (state, action) => {
            const newState = {
                ...state
            }
            if (action.payload.error) {
                newState.error = action.payload.error
                newState.data = initialState.data
            } else {
                newState.data = action.payload
                newState.error = null
                console.log(newState)
            }
            return newState
        })
)

export default paymentReducer