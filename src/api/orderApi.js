import axios from 'axios';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  };
};

export const getUserOrders = async () => {
  try {
    const response = await axios.get('/api/orders/my-orders', getAuthHeader());
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch orders' };
  }
};

export const getOrderById = async (orderId) => {
  try {
    const response = await axios.get(`/api/orders/${orderId}`, getAuthHeader());
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
      ? `/api/orders/admin/all?${params.toString()}` 
      : '/api/orders/admin/all';
    
    const response = await axios.get(url, getAuthHeader());
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch orders' };
  }
};

export const updateOrderStatus = async (orderId, status) => {
  try {
    const response = await axios.patch(
      `/api/orders/admin/${orderId}/status`,
      { status },
      getAuthHeader()
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to update order status' };
  }
};

export const getAdminAnalytics = async () => {
  try {
    const response = await axios.get('/api/orders/admin/analytics', getAuthHeader());
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch analytics' };
  }
};

export const getTotalOrdersAnalytics = async () => {
  try {
    const response = await axios.get('/api/orders/analytics/total', getAuthHeader());
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch total orders analytics' };
  }
};

export const getRevenueAnalytics = async () => {
  try {
    const response = await axios.get('/api/orders/analytics/revenue', getAuthHeader());
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch revenue analytics' };
  }
};

export const getCategoryAnalytics = async () => {
  try {
    const response = await axios.get('/api/orders/analytics/categories', getAuthHeader());
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