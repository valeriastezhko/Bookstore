import { createSlice } from "@reduxjs/toolkit";
import { CartBook } from "../../models/cart.model";

interface CartState {
  cartItems: CartBook[];
}

const initialState: CartState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    removeFromCart: (state, action) => {
      const isbn13 = action.payload;
      state.cartItems = state.cartItems.filter(
        (item) => item.bookData.isbn13 !== isbn13
      );
    },
    updateCartItemQuantity: (state, action) => {
      const { isbn13, quantity } = action.payload;
      const cartItem = state.cartItems.find(
        (item) => item.bookData.isbn13 === isbn13
      );
      if (cartItem) {
        cartItem.quantity = quantity;
      }
    },
    removeAllFromCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const { removeFromCart, updateCartItemQuantity, removeAllFromCart } =
  cartSlice.actions;
export default cartSlice.reducer;
