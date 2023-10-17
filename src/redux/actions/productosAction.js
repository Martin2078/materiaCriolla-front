import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const products = createAsyncThunk('getProducts', async () => {
    try {
        const response = await axios.get('http://localhost:8080/productos')
        console.log(response.data)
        return response.data
    } catch (error) {
        console.log(error)
        return {error}
    }
})

export default products