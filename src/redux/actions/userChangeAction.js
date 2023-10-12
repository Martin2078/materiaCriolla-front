import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const userChangeAction = createAsyncThunk('userAddress', async (data) => {
    const userStorage=JSON.parse(localStorage.getItem('user'))
    const tokenStorage=localStorage.getItem('token')
    let headers = { headers: { 'Authorization': `Bearer ${tokenStorage}` } }
    try {
        let updatedUser = await axios.put(`http://localhost:8080/auth/${userStorage._id}`,data,headers)
        localStorage.removeItem('user')
        localStorage.setItem('user',JSON.stringify(updatedUser.data.response.user))
        return {user:updatedUser.data.response.user,
        message:updatedUser.data.message}
    } catch (error) {
        return {error:error.response.data}
    }
})
export default userChangeAction