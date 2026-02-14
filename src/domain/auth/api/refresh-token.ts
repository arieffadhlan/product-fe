import axios from "axios";
import { cookieStorage } from "@/utils/cookies";

interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

const getBaseURL = () => {
  if (import.meta.env.DEV) {
    return "/api"; // Proxied to https://dummyjson.com
  }
  return "https://dummyjson.com";
};

let inMemoryRefreshToken: string | null = null;

export const setRefreshToken = (token: string) => {
  inMemoryRefreshToken = token;
};

export const clearRefreshToken = () => {
  inMemoryRefreshToken = null;
};

export const refreshAuthToken = async (): Promise<RefreshTokenResponse> => {
  if (!inMemoryRefreshToken) {
    throw new Error("No refresh token available");
  }

  try {
    const response = await axios.post<RefreshTokenResponse>(
      `${getBaseURL()}/auth/refresh`,
      {
        refreshToken: inMemoryRefreshToken,
        expiresInMins: 30, // optional, defaults to 60
      },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );

    const { accessToken, refreshToken: newRefreshToken } = response.data;

    // Update tokens
    cookieStorage.setAccessToken(accessToken);
    inMemoryRefreshToken = newRefreshToken;

    return response.data;
  } catch (error) {
    // Clear tokens if refresh fails
    cookieStorage.clearAll();
    clearRefreshToken();
    throw error;
  }
};
