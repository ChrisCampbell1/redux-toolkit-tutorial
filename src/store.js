import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './features/cart/cartSlice'

//store has nothing to do with ecommerce, it's where the state is being stored

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  }
})
