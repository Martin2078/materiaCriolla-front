import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const api = 'http://localhost:4000';
// Acción asincrónica para iniciar sesión
const login = createAsyncThunk('login', async (data) => {

    try {
        let res = await axios.post(api + '/auth/signIn', data)
        localStorage.setItem('token', res.data.token);
        let user = res.data.user;
        console.log(user)
        const email = JSON.stringify(user.email)
        const photo = JSON.stringify(user.photo)
        const role = user.role
        localStorage.setItem("email", email)
        localStorage.setItem("photo", photo)
        localStorage.setItem("role", role)

        return res.data


    } catch (error) {
        console.log("error", error)
    }
})
export default login
