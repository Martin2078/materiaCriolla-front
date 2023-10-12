import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const userAddress = createAsyncThunk('userAddress', async (data) => {
    try {
        let updatedUser = await axios.post(api + '/auth/signIn', data)
        localStorage.removeItem('user')
        localStorage.setItem('user',JSON.stringify(updatedUser.data.response.user))
        return {user:updatedUser.data.response.user,
        message:updatedUser.data.message}
    } catch (error) {
        return {error:error.response.data.message}
    }
})
export default userAddress