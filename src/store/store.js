import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import productsReducer from "../slices/productsSlice";


const persistedAuth = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  accessToken: localStorage.getItem("access_token") || null,
  refreshToken: localStorage.getItem("refresh_token") || null,
  selectedRole: localStorage.getItem("selectedRole") || null,
  loading: false,
  responseMsg: null,
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    
    
  },
  preloadedState: {
    auth: persistedAuth,
  },
});

export default store;