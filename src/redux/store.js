import { configureStore } from "@reduxjs/toolkit"
import registerReducer from "./reducers/registerReducer"

const store=configureStore({
    reducer:{
        register : registerReducer
    }
})

export default store