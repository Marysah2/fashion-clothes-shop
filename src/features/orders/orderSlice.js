import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import orderApi from '../../api/orderApi';

// ==================== THUNKS ====================

// Customer: Fetch user's order history
export const fetchUserOrders = createAsyncThunk(
  'orders/fetchUserOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await orderApi.getUserOrders();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch orders');
    }
  }
);

// Customer: Fetch single order details
export const fetchOrderById = createAsyncThunk(
  'orders/fetchOrderById',
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await orderApi.getOrderById(orderId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch order');
    }
  }
);

// Admin: Fetch all orders
export const fetchAllOrders = createAsyncThunk(
  'orders/fetchAllOrders',
  async (filters = {}, { rejectWithValue }) => {
    try {
      const response = await orderApi.getAllOrders(filters);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch orders');
    }
  }
);

// Admin: Update order status
export const updateOrderStatus = createAsyncThunk(
  'orders/updateOrderStatus',
  async ({ orderId, status }, { rejectWithValue }) => {
    try {
      const response = await orderApi.updateOrderStatus(orderId, status);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to update order status');
    }
  }
);

// Admin: Fetch complete analytics
export const fetchAdminAnalytics = createAsyncThunk(
  'orders/fetchAdminAnalytics',
  async (_, { rejectWithValue }) => {
    try {
      const response = await orderApi.getAdminAnalytics();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch analytics');
    }
  }
);

// Admin: Fetch total orders analytics
export const fetchTotalOrdersAnalytics = createAsyncThunk(
  'orders/fetchTotalOrdersAnalytics',
  async (_, { rejectWithValue }) => {
    try {
      const response = await orderApi.getTotalOrdersAnalytics();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch total orders analytics');
    }
  }
);

// Admin: Fetch revenue analytics
export const fetchRevenueAnalytics = createAsyncThunk(
  'orders/fetchRevenueAnalytics',
  async (_, { rejectWithValue }) => {
    try {
      const response = await orderApi.getRevenueAnalytics();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch revenue analytics');
    }
  }
);

// Admin: Fetch category analytics
export const fetchCategoryAnalytics = createAsyncThunk(
  'orders/fetchCategoryAnalytics',
  async (_, { rejectWithValue }) => {
    try {
      const response = await orderApi.getCategoryAnalytics();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch category analytics');
    }
  }
);

// ==================== SLICE ====================

const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    // Customer orders
    userOrders: [],
    userOrdersStatus: 'idle',
    userOrdersError: null,
    
    // Single order
    selectedOrder: null,
    selectedOrderStatus: 'idle',
    selectedOrderError: null,
    
    // Admin: All orders
    allOrders: [],
    allOrdersStatus: 'idle',
    allOrdersError: null,
    
    // Admin: Analytics
    analytics: null,
    analyticsStatus: 'idle',
    analyticsError: null,
    
    // Admin: Total orders analytics
    totalOrdersAnalytics: null,
    totalOrdersStatus: 'idle',
    totalOrdersError: null,
    
    // Admin: Revenue analytics
    revenueAnalytics: null,
    revenueStatus: 'idle',
    revenueError: null,
    
    // Admin: Category analytics
    categoryAnalytics: null,
    categoryStatus: 'idle',
    categoryError: null,
  },
  reducers: {
    clearUserOrders: (state) => {
      state.userOrders = [];
      state.userOrdersStatus = 'idle';
      state.userOrdersError = null;
    },
    clearSelectedOrder: (state) => {
      state.selectedOrder = null;
      state.selectedOrderStatus = 'idle';
      state.selectedOrderError = null;
    },
    clearAllOrders: (state) => {
      state.allOrders = [];
      state.allOrdersStatus = 'idle';
      state.allOrdersError = null;
    },
    clearAnalytics: (state) => {
      state.analytics = null;
      state.analyticsStatus = 'idle';
      state.analyticsError = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch user orders
    builder
      .addCase(fetchUserOrders.pending, (state) => {
        state.userOrdersStatus = 'loading';
        state.userOrdersError = null;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.userOrdersStatus = 'succeeded';
        state.userOrders = action.payload;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.userOrdersStatus = 'failed';
        state.userOrdersError = action.payload;
      });

    // Fetch single order
    builder
      .addCase(fetchOrderById.pending, (state) => {
        state.selectedOrderStatus = 'loading';
        state.selectedOrderError = null;
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.selectedOrderStatus = 'succeeded';
        state.selectedOrder = action.payload;
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.selectedOrderStatus = 'failed';
        state.selectedOrderError = action.payload;
      });

    // Fetch all orders
    builder
      .addCase(fetchAllOrders.pending, (state) => {
        state.allOrdersStatus = 'loading';
        state.allOrdersError = null;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.allOrdersStatus = 'succeeded';
        state.allOrders = action.payload;
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.allOrdersStatus = 'failed';
        state.allOrdersError = action.payload;
      });

    // Update order status
    builder
      .addCase(updateOrderStatus.pending, (state) => {
        state.allOrdersStatus = 'loading';
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.allOrdersStatus = 'succeeded';
        // Update the order in the array
        const index = state.allOrders.findIndex(
          order => order._id === action.payload._id
        );
        if (index !== -1) {
          state.allOrders[index] = action.payload;
        }
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.allOrdersStatus = 'failed';
        state.allOrdersError = action.payload;
      });

    // Fetch admin analytics
    builder
      .addCase(fetchAdminAnalytics.pending, (state) => {
        state.analyticsStatus = 'loading';
        state.analyticsError = null;
      })
      .addCase(fetchAdminAnalytics.fulfilled, (state, action) => {
        state.analyticsStatus = 'succeeded';
        state.analytics = action.payload;
      })
      .addCase(fetchAdminAnalytics.rejected, (state, action) => {
        state.analyticsStatus = 'failed';
        state.analyticsError = action.payload;
      });

    // Fetch total orders analytics
    builder
      .addCase(fetchTotalOrdersAnalytics.pending, (state) => {
        state.totalOrdersStatus = 'loading';
        state.totalOrdersError = null;
      })
      .addCase(fetchTotalOrdersAnalytics.fulfilled, (state, action) => {
        state.totalOrdersStatus = 'succeeded';
        state.totalOrdersAnalytics = action.payload;
      })
      .addCase(fetchTotalOrdersAnalytics.rejected, (state, action) => {
        state.totalOrdersStatus = 'failed';
        state.totalOrdersError = action.payload;
      });

    // Fetch revenue analytics
    builder
      .addCase(fetchRevenueAnalytics.pending, (state) => {
        state.revenueStatus = 'loading';
        state.revenueError = null;
      })
      .addCase(fetchRevenueAnalytics.fulfilled, (state, action) => {
        state.revenueStatus = 'succeeded';
        state.revenueAnalytics = action.payload;
      })
      .addCase(fetchRevenueAnalytics.rejected, (state, action) => {
        state.revenueStatus = 'failed';
        state.revenueError = action.payload;
      });

    // Fetch category analytics
    builder
      .addCase(fetchCategoryAnalytics.pending, (state) => {
        state.categoryStatus = 'loading';
        state.categoryError = null;
      })
      .addCase(fetchCategoryAnalytics.fulfilled, (state, action) => {
        state.categoryStatus = 'succeeded';
        state.categoryAnalytics = action.payload;
      })
      .addCase(fetchCategoryAnalytics.rejected, (state, action) => {
        state.categoryStatus = 'failed';
        state.categoryError = action.payload;
      });
  },
});

export const {
  clearUserOrders,
  clearSelectedOrder,
  clearAllOrders,
  clearAnalytics
} = orderSlice.actions;

export default orderSlice.reducer;

// ==================== SELECTORS ====================

export const selectUserOrders = (state) => state.orders.userOrders;
export const selectUserOrdersStatus = (state) => state.orders.userOrdersStatus;
export const selectUserOrdersError = (state) => state.orders.userOrdersError;

export const selectSelectedOrder = (state) => state.orders.selectedOrder;
export const selectSelectedOrderStatus = (state) => state.orders.selectedOrderStatus;
export const selectSelectedOrderError = (state) => state.orders.selectedOrderError;

export const selectAllOrders = (state) => state.orders.allOrders;
export const selectAllOrdersStatus = (state) => state.orders.allOrdersStatus;
export const selectAllOrdersError = (state) => state.orders.allOrdersError;

export const selectAnalytics = (state) => state.orders.analytics;
export const selectAnalyticsStatus = (state) => state.orders.analyticsStatus;
export const selectAnalyticsError = (state) => state.orders.analyticsError;

export const selectTotalOrdersAnalytics = (state) => state.orders.totalOrdersAnalytics;
export const selectTotalOrdersStatus = (state) => state.orders.totalOrdersStatus;
export const selectTotalOrdersError = (state) => state.orders.totalOrdersError;

export const selectRevenueAnalytics = (state) => state.orders.revenueAnalytics;
export const selectRevenueStatus = (state) => state.orders.revenueStatus;
export const selectRevenueError = (state) => state.orders.revenueError;

export const selectCategoryAnalytics = (state) => state.orders.categoryAnalytics;
export const selectCategoryStatus = (state) => state.orders.categoryStatus;
export const selectCategoryError = (state) => state.orders.categoryError;