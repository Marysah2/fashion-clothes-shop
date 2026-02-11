import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

export const cartAPI = {
  getCart: () => axios.get(`${API_URL}/cart`),
  addItem: (item) => axios.post(`${API_URL}/cart`, item),
  updateItem: (id, quantity) => axios.put(`${API_URL}/cart/${id}`, { quantity }),
  removeItem: (id) => axios.delete(`${API_URL}/cart/${id}`),
  clearCart: () => axios.delete(`${API_URL}/cart`)
};

export const orderAPI = {
  createOrder: (orderData) => axios.post(`${API_URL}/orders/`, orderData),
  getOrder: (id) => axios.get(`${API_URL}/orders/${id}`)
};
