



import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from "react-redux";

import useReducer from './user'

import tabsReducer from './tabs'

export const useAppDispatch = () => useDispatch()

export default configureStore({
  reducer: {
    user: useReducer,
    tabs: tabsReducer
  }
})