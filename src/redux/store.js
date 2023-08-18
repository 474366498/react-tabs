



import { configureStore } from '@reduxjs/toolkit'

import useReducer from './user'

import tabsReducer from './tabs'

export default configureStore({
  reducer: {
    user: useReducer,
    tabs: tabsReducer
  }
})