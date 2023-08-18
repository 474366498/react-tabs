

import { createSlice } from '@reduxjs/toolkit'

export const userReducer = createSlice({
  name: 'app-user-store',
  initialState: {
    userInfo: null,
    sidebar: true
  },
  reducers: {
    login: (state, action) => {

    },
    logout(state, action) {

    }
  }

})

export const { login, logout } = userReducer.actions

export default userReducer.reducer 
