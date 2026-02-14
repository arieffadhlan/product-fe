import axios, { AxiosError } from "axios";
import { cookieStorage } from "@/utils/cookies";
import { env } from "@/config/env";

const getBaseURL = () => {
  return env.API_URL;
};

export const api = axios.create({
  baseURL: getBaseURL(),
  withCredentials: false,
});

api.interceptors.request.use(
  (config) => {
    const token = cookieStorage.getAccessToken();
    
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401 && !error.config?.url?.includes("/auth/login")) {
      cookieStorage.clearAll();
      localStorage.clear();
      window.location.href = "/";
    }

    return Promise.reject(error);
  }
);