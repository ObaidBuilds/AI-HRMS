import axios from "axios";
import getToken from "../hooks";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_URL || "http://localhost:3000",
  headers: { "Content-Type": "application/json" },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const msg = error.response?.data?.message?.toLowerCase();
    if (
      error.response?.status === 500 &&
      (msg.includes("jwt") ||
        msg.includes("unauthorized") ||
        msg.includes("session expired"))
    ) {
      sessionStorage.clear();
      localStorage.clear();

      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
