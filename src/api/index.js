import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const cartAPI = {
  getCart: () => api.get('/cart'),
  addItem: (item) => api.post('/cart/add', item),
  updateItem: (id, quantity) => api.put(`/cart/${id}`, { quantity }),
  removeItem: (id) => api.delete(`/cart/${id}`),
  clearCart: () => api.delete('/cart')
};

export const orderAPI = {
  createOrder: (orderData) => api.post('/cart/checkout', orderData),
  getOrder: (id) => api.get(`/orders/${id}`)
};
