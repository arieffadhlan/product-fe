import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";
import { refreshAuthToken } from "@/domain/auth/api/refresh-token";
import { cookieStorage } from "@/utils/cookies";

// Use proxy in development, direct API in production
const getBaseURL = () => {
  if (import.meta.env.DEV) {
    return "/api"; // Proxied to https://dummyjson.com
  }
  return "https://dummyjson.com";
};

export const api = axios.create({
  baseURL: getBaseURL(),
  withCredentials: true,
});

// Request interceptor - Add access token to requests
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

// Response interceptor - Handle token refresh on 401
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: Error | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });

  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    // Skip refresh for login endpoint
    if (error.response?.status === 401 && originalRequest?.url?.includes("/auth/login")) {
      return Promise.reject(error);
    }

    // Handle 401 errors with token refresh
    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      if (isRefreshing) {
        // Queue the request while token is being refreshed
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => {
            return api(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Attempt to refresh the token
        await refreshAuthToken();
        processQueue();

        // Retry the original request with new token
        const token = cookieStorage.getAccessToken();
        if (token) {
          originalRequest.headers["Authorization"] = `Bearer ${token}`;
        }

        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError as Error);

        // Clear auth and redirect to login
        cookieStorage.clearAll();
        localStorage.clear();
        window.location.href = "/";

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);
