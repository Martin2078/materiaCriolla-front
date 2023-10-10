import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./reducers/singInReducer"
import registerReducer from "./reducers/registerReducer"

const store = configureStore({
    reducer: {
        register: registerReducer,
        profile: authReducer,
    }
})

export default store
