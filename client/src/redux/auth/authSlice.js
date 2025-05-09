import {  loginAPI, signupAPI } from "../authAPI";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../services/axiosInstance";

export const loginUser = createAsyncThunk(
  "auth/login",
  async (
    credentials = { id: 1, name: "John Doe", email: "john@example.com", password :'password' }
  ) => {
    //   const res = await axiosInstance.post("/login", credentials);
    //   localStorage.setItem("token", res.data.token);
    const res = await loginAPI(credentials);
    return res.data;
  }
);

export const signupUser = createAsyncThunk("auth/signup", async (data={}) => {
  //   const res = await axiosInstance.post("/signup", data);
  const res = await signupAPI();
  return res.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, token: null, loading: false, error: null },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        // Optional: auto-login after signup
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
