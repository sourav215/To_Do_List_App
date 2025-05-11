import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../services/axiosInstance";

export const loginUser = createAsyncThunk(
  "/auth/login",
  async ({ credential }) => {
    const res = await axiosInstance.post("/auth/login", credential);
    return res.data;
  }
);

export const signupUser = createAsyncThunk(
  "auth/register",
  async ({ credential }) => {
    const res = await axiosInstance.post("/auth/register", credential);
    return res.data;
  }
);

const initialState = {
  user: {
    token: null,
    success: false,
    loading: false,
    error: false,
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user.token = null;
      state.user.success = false;
      state.user.loading = false;
      localStorage.removeItem("token");
      localStorage.removeItem("expiryTime");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.user.token = null;
        state.user.success = false;
        state.user.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user.token = action.payload.data?.token;
        state.user.success = action.payload.success;
        state.user.loading = false;
      })
      .addCase(loginUser.rejected, (state) => {
        state.user.token = null;
        state.user.success = false;
        state.user.loading = false;
      })
      .addCase(signupUser.pending, (state) => {
        state.user.token = null;
        state.user.success = false;
        state.user.loading = true;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.user.token = action.payload.data?.token;
        state.user.success = action.payload.success;
        state.user.loading = false;
      })
      .addCase(signupUser.rejected, (state) => {
        state.user.token = null;
        state.user.success = false;
        state.user.loading = false;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
