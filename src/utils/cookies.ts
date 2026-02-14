import Cookies from "js-cookie";
import type { IAuthUser } from "@/domain/auth/auth";

const COOKIE_OPTIONS = {
  expires: 7, // 7 days
  sameSite: "strict" as const,
  secure: import.meta.env.PROD, // Only secure in production
};

// ==================== Secure In-Memory Storage ====================
// Refresh token disimpan di memory untuk security
// Tidak persistent - user harus login ulang setelah refresh page

let refreshTokenMemory: string | null = null;

export const secureStorage = {
  getRefreshToken: (): string | null => {
    return refreshTokenMemory;
  },

  setRefreshToken: (token: string): void => {
    refreshTokenMemory = token;
  },

  clearRefreshToken: (): void => {
    refreshTokenMemory = null;
  },
};

// ==================== Cookie Storage ====================
// Access token & user data di cookie (lebih convenience)

export const cookieStorage = {
  // ==================== Access Token ====================
  
  getAccessToken: (): string | undefined => {
    return Cookies.get("accessToken");
  },

  setAccessToken: (token: string): void => {
    Cookies.set("accessToken", token, COOKIE_OPTIONS);
  },

  removeAccessToken: (): void => {
    Cookies.remove("accessToken");
  },

  // ==================== User Data ====================
  
  getUser: (): IAuthUser | null => {
    try {
      const user = Cookies.get("user");
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  },

  setUser: (user: IAuthUser): void => {
    Cookies.set("user", JSON.stringify(user), COOKIE_OPTIONS);
  },

  removeUser: (): void => {
    Cookies.remove("user");
  },

  // ==================== Clear All ====================
  
  clearAll: (): void => {
    Cookies.remove("accessToken");
    Cookies.remove("user");
    secureStorage.clearRefreshToken();
  },
};
