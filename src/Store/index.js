import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../Features/cart/cartSlice';
import productsReducer from '../Products/productsSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer
  }
});
