import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./reducers/singInReducer"
import registerReducer from "./reducers/registerReducer"
import productosReducer from "./reducers/productsReducer"

const store = configureStore({
    reducer: {
        register: registerReducer,
        profile: authReducer,
        productos: productosReducer,
    }
})

export default store
