import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add interceptor for artificial delay
api.interceptors.request.use(async (config) => {
  await new Promise((resolve) => setTimeout(resolve, 0)); // 2s delay
  return config;
});
