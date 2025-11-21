import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './cartSlice' // default export is reducer

export const store = configureStore({
  reducer: {
    cart: cartReducer
  },
  devTools: true
})
