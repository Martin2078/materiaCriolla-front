import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const register = createAsyncThunk('register', async (info) => {
    try {
        const response = await axios.post('http://localhost:8080/auth/register', info)
        return response.data
    } catch (error) {
        return {
            error:error.response.data
        }
    }
})

export default register