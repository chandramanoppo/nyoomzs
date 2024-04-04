import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'


const initialState = {
    loading:false,
    rooms:[],
    error: null
}

export const roomSlice = createSlice({
    name:'rooms',
    initialState,
    reducers:{
        fetchPending:(state) =>{
            state.loading = true
            state.rooms = []
            state.error = null
        },
        fetchSuccess:(state,action) =>{
            state.loading = false
            state.rooms = action.payload
        },
        fetchRejected:(state,action) =>{
            state.loading = false
            state.rooms = []
            state.error = action.payload
        }
    }
})

export const {fetchPending,fetchRejected,fetchSuccess} = roomSlice.actions

export const fetchPublicRooms = () => async (dispatch) =>{
    try {
        dispatch(fetchPending())
        const url = 'http://localhost:3000'
        const token = localStorage.access_token
        const {data} = await axios.get(`${url}/browse-room`,{headers:{Authorization:`Bearer ${token}`}})
        dispatch(fetchSuccess(data))
    } catch (error) {
        console.log(error);
    }
}

export default roomSlice.reducer