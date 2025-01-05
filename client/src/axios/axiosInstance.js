import axios from "axios";
import useGetToken from "../hooks";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_URL || "http://localhost:3000",
});

axiosInstance.defaults.headers.common["Content-Type"] = "application/json";

axiosInstance.interceptors.request.use(
  (config) => {
    const token = useGetToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
