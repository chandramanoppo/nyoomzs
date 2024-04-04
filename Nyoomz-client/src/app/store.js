import { configureStore } from '@reduxjs/toolkit'
import room from '../features/rooms/roomSlice'
export const store = configureStore({
  reducer: {
    room
  },
})