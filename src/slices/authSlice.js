import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api";


export const registerUser = createAsyncThunk(
  "auth/register",
  async ({ email, password, role }, thunkAPI) => {
    try {
      const response = await api.post("/auth/register", { email, password, role });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Registration failed");
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password, role }, thunkAPI) => {
    try {
      const response = await api.post("/auth/login", { email, password, role });
      if (response.data.user.role !== role) {
        return thunkAPI.rejectWithValue(`You selected ${role}, but your account is ${response.data.user.role}`);
      }
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

export const refreshToken = createAsyncThunk("auth/refresh", async (_, thunkAPI) => {
  try {
    const refresh_token = localStorage.getItem("refresh_token");
    const response = await api.post("/auth/refresh", null, {
      headers: { Authorization: `Bearer ${refresh_token}` },
    });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Token refresh failed");
  }
});

export const logoutUser = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await api.post("/auth/logout", {});
    return true;
  } catch (error) {
    return thunkAPI.rejectWithValue("Logout failed");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    accessToken: localStorage.getItem("access_token") || null,
    refreshToken: localStorage.getItem("refresh_token") || null,
    selectedRole: localStorage.getItem("selectedRole") || null,
    loading: false,
    responseMsg: null,
  },
  reducers: {
    setSelectedRole: (state, action) => {
      state.selectedRole = action.payload;
      localStorage.setItem("selectedRole", action.payload);
    },
    clearResponseMsg: (state) => {
      state.responseMsg = null;
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
      localStorage.setItem("access_token", action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => { state.loading = true; state.responseMsg = null; })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.access_token;
        state.refreshToken = action.payload.refresh_token;
        state.selectedRole = action.payload.user.role;

        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("access_token", action.payload.access_token);
        localStorage.setItem("refresh_token", action.payload.refresh_token);
        localStorage.setItem("selectedRole", action.payload.user.role);

        state.responseMsg = { type: "success", text: "Registration successful!" };
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.responseMsg = { type: "error", text: action.payload };
      })
      .addCase(loginUser.pending, (state) => { state.loading = true; state.responseMsg = null; })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.access_token;
        state.refreshToken = action.payload.refresh_token;
        state.selectedRole = action.payload.user.role;

        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("access_token", action.payload.access_token);
        localStorage.setItem("refresh_token", action.payload.refresh_token);
        localStorage.setItem("selectedRole", action.payload.user.role);

        state.responseMsg = { type: "success", text: "Login successful!" };
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.responseMsg = { type: "error", text: action.payload };
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.accessToken = action.payload.access_token;
        localStorage.setItem("access_token", action.payload.access_token);
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.selectedRole = null;

        localStorage.removeItem("user");
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("selectedRole");

        state.responseMsg = { type: "success", text: "Logged out successfully" };
      });
  },
});

export const { setSelectedRole, clearResponseMsg, setAccessToken } = authSlice.actions;
export default authSlice.reducer;