import api from '../utils/api';

export const getUserOrders = async () => {
  try {
    const response = await api.get('/orders/my-orders');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch orders' };
  }
};

export const getOrderById = async (orderId) => {
  try {
    const response = await api.get(`/orders/${orderId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch order' };
  }
};

export const getAllOrders = async (filters = {}) => {
  try {
    const params = new URLSearchParams();
    if (filters.status) params.append('status', filters.status);
    if (filters.start_date) params.append('start_date', filters.start_date);
    if (filters.end_date) params.append('end_date', filters.end_date);
    
    const url = params.toString() 
      ? `/orders/admin/all?${params.toString()}` 
      : '/orders/admin/all';
    
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch orders' };
  }
};

export const updateOrderStatus = async (orderId, status) => {
  try {
    const response = await api.patch(
      `/orders/admin/${orderId}/status`,
      { status }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to update order status' };
  }
};

export const getAdminAnalytics = async () => {
  try {
    const response = await api.get('/orders/admin/analytics');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch analytics' };
  }
};

export const getTotalOrdersAnalytics = async () => {
  try {
    const response = await api.get('/orders/analytics/total');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch total orders analytics' };
  }
};

export const getRevenueAnalytics = async () => {
  try {
    const response = await api.get('/orders/analytics/revenue');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch revenue analytics' };
  }
};

export const getCategoryAnalytics = async () => {
  try {
    const response = await api.get('/orders/analytics/categories');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch category analytics' };
  }
};

const orderApi = {
  getUserOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
  getAdminAnalytics,
  getTotalOrdersAnalytics,
  getRevenueAnalytics,
  getCategoryAnalytics
};

export default orderApi;