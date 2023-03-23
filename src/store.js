import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './features/cart/cartSlice'
import modalReducer from './features/modal/modalSlice'

//store has nothing to do with ecommerce, it's where the state is being stored

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    modal: modalReducer,
  }
})
