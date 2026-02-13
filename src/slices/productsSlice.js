import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async (category) => {
  const url = category ? `${API_URL}/products?category=${category}` : `${API_URL}/products`;
  const response = await axios.get(url);
  return response.data;
});

export const fetchProductById = createAsyncThunk('products/fetchProductById', async (id) => {
  const response = await axios.get(`${API_URL}/products/${id}`);
  return response.data;
});

export const createProduct = createAsyncThunk('products/createProduct', async (productData, { getState }) => {
  const token = getState().auth.token;
  const response = await axios.post(`${API_URL}/products`, productData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
});

export const updateProduct = createAsyncThunk('products/updateProduct', async ({ id, data }, { getState }) => {
  const token = getState().auth.token;
  const response = await axios.put(`${API_URL}/products/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
});

export const deleteProduct = createAsyncThunk('products/deleteProduct', async (id, { getState }) => {
  const token = getState().auth.token;
  await axios.delete(`${API_URL}/products/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return id;
});

  const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    currentProduct: null,
    filteredItems: [],
    filters: { category: '', minPrice: 0, maxPrice: 10000 },
    sortBy: 'name',
    loading: false,
    error: null,
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.filteredItems = applyFilters(state.items, state.filters, state.sortBy);
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
      state.filteredItems = applyFilters(state.items, state.filters, state.sortBy);
    },
    clearFilters: (state) => {
      state.filters = { category: '', minPrice: 0, maxPrice: 10000 };
      state.filteredItems = state.items;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => { 
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.filteredItems = applyFilters(action.payload, state.filters, state.sortBy);
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.filteredItems = applyFilters(state.items, state.filters, state.sortBy);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const idx = state.items.findIndex(p => p.id === action.payload.id);
        if (idx !== -1) {
          state.items[idx] = action.payload;
          state.filteredItems = applyFilters(state.items, state.filters, state.sortBy);
        }
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter(p => p.id !== action.payload);
        state.filteredItems = state.filteredItems.filter(p => p.id !== action.payload);
      });
  },
});

const applyFilters = (items, filters, sortBy) => {
  let filtered = [...items];
  
  if (filters.category) {
    filtered = filtered.filter(p => p.category_name === filters.category);
  }
  filtered = filtered.filter(p => 
    p.price >= filters.minPrice && p.price <= filters.maxPrice
  );
  
  filtered.sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    return a.name.localeCompare(b.name);
  });
  
  return filtered;
};

export const { setFilters, setSortBy, clearFilters } = productsSlice.actions;
export default productsSlice.reducer;
