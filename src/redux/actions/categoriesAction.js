import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const categ = createAsyncThunk('getCateg', async () => {
    try {
        const response = await axios.get('http://localhost:8080/categories')
        return response.data
    } catch (error) {
        return { error }
    }
})

export default categ