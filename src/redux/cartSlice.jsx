import { createSlice } from '@reduxjs/toolkit'

const initialState = JSON.parse(localStorage.getItem('cart')) ?? [];
console.log(initialState);

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      // keeps previous behavior: push payload
      state.push(action.payload)
    },
    deleteFromCart(state, action) {
      // return a new array without the item
      return state.filter(item => item.id != action.payload.id);
    },
    incrementQuantity(state, action) {
      // action.payload is expected to be item id
      const id = action.payload;
      const item = state.find(i => i.id === id);
      if (item) {
        item.quantity = (item.quantity ?? 0) + 1;
      }
      // do not return — we mutated via Immer
    },
    decrementQuantity(state, action) {
      const id = action.payload;
      const item = state.find(i => i.id === id);
      if (item && item.quantity && item.quantity > 1) {
        item.quantity--;
      }
      // if quantity === 1, do nothing (keeps your original logic)
    },
  },
})

// export actions
export const { addToCart, deleteFromCart, incrementQuantity, decrementQuantity } = cartSlice.actions

// default export the reducer so store can import it easily
export default cartSlice.reducer
