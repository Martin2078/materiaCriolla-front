import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const api = 'http://localhost:8080';
// Acción asincrónica para iniciar sesión
const login = createAsyncThunk('login', async (data) => {
    if (data.token) {
        return {token:data.token,
        user:data.user}
    }
    try {
        let res = await axios.post(api + '/auth/signIn', data)
        localStorage.setItem('token', res.data.response.token);
        localStorage.setItem('user',JSON.stringify(res.data.response.user))
        return {token:res.data.response.token,
        user:res.data.response.user}
    } catch (error) {
        return {error:error.response.data.message}
    }
})
export default login
