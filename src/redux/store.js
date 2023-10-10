import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./reducers/singInReducer"

const store = configureStore({
    reducer: {
        profile: authReducer,
    }
})

export default store