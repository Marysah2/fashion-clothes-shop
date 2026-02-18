import api from '../utils/api';

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
