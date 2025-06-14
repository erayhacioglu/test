import axios from "axios";
import setupInterceptors from "./setupInterceptors";

const baseURL = import.meta.env.VITE_BASE_API_URL;

const axiosInstance = axios.create({
  baseURL,
  timeout: 60000,
  headers: {
    "Content-Type": "application/json",
  },
});

setupInterceptors(axiosInstance);

export default axiosInstance;
