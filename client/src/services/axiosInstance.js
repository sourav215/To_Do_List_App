// services/axiosInstance.js
import axios from "axios";
import { CustomToast } from "../components/CustomComponents/CustomToast";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api",
  // baseURL: "https://jsonplaceholder.typicode.com",
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const errData = error?.response?.data;
    CustomToast({
      type: "error",
      message: errData?.message || "An unexpected error occurred",
    });

    return Promise.reject(error);
  }
);

export default axiosInstance;
