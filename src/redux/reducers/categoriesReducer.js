import { createReducer } from "@reduxjs/toolkit"
import getCategories from '../actions/categoriesAction'

const initialState = {
    categories: [],
    error: null
}

const getCategoriesReducer = createReducer(initialState, (builder) =>
    builder
        .addCase(getCategories.fulfilled, (state, action) => {
            const newState = {
                ...state
            }
            if (action.payload.error) {
                newState.error = action.payload.error
                newState.categories = initialState.categories
            } else {
                newState.categories = action.payload.response
                newState.error = null
            }
            return newState
        })
)

export default getCategoriesReducer