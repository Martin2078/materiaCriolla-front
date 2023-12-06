import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const payment = createAsyncThunk('pay', async (info) => {
    try {
        const response = await axios.post('http://localhost:8080/payment/create-order', info)
        return response.data
    } catch (error) {
        return { error: error.response.data }
    }
})

export default payment