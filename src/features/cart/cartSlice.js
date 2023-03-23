import { createSlice } from "@reduxjs/toolkit";
import cartItems from "../../cartItems";
import { createAsyncThunk } from "@reduxjs/toolkit";

const url = 'https://course-api.com/react-useReducer-cart-project'

const initialState = {
  cartItems: [],
  amount: 4,
  total:0,
  isLoading: true,
}

export const getCartItems = createAsyncThunk('cart/getCartItems', async (name, thunkAPI) => { //if you pass this function an argument in the app you can also access it here as the first parameter in the callback functon here on line 14. the second parameter is thunkAPI. thunkAPI lets you getState which is the state of the entire app. if you needed to access user that is on a different feature, you can access it. There is also a dispactch option, you can access all reducers even if they aren't imported into specific component.
  try {
    console.log(thunkAPI)
    const res = await fetch(url)
    return res.json()  
  } catch (error) {
    console.log(error)
  }
})

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [] // if you return an object it will completely replace the initial state
    },
    removeItem: (state, action) => {
      const itemId = action.payload
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId)
    },
    increase: (state, { payload }) => { //still being passed the action object but payload is being destructured for cleaner code
      const cartItem = state.cartItems.find((item) => item.id === payload.id)
      cartItem.amount = cartItem.amount + 1
    },
    decrease: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id)
      cartItem.amount = cartItem.amount - 1
    },
    calculateTotals: (state) => {
      let amount = 0
      let total = 0
      state.cartItems.forEach((item) => {
        amount += item.amount
        total += item.amount * item.price
      })
      state.amount = amount
      state.total = total
    }
  },
  //all of these reducers deal with the status of the promise being returned in the async thunk function. this syntax is being deprecated in 2.0 and will be replaced with builder callback 
  // extraReducers: { 
  //   [getCartItems.pending]: (state) => {
  //     state.isLoading = true
  //   },
  //   [getCartItems.fulfilled]: (state, action) => {
  //     state.isLoading = false
  //     state.cartItems = action.payload
  //   },
  //   [getCartItems.rejected]: (state) => {
  //     state.isLoading = false
  //   },
  // }
  extraReducers: (builder) => { //these are all chained togehter with .
    builder
    .addCase(getCartItems.pending, (state) => {
      state.isLoading = true
    })
    .addCase(getCartItems.fulfilled, (state, action) => {
      state.isLoading = false
      state.cartItems = action.payload
    })
    .addCase(getCartItems.rejected, (state) => {
      state.isLoading = false
    })
  },
})

// console.log(cartSlice)
export const{ clearCart, removeItem, increase, decrease, calculateTotals } = cartSlice.actions

export default cartSlice.reducer;
