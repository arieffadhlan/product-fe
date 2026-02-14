import Cookies from "js-cookie";
import type { IAuthUser } from "@/domain/auth/auth";

const COOKIE_OPTIONS = {
  expires: 7, // 7 days
  sameSite: "strict" as const,
  secure: import.meta.env.PROD, // Only secure in production
};

export const cookieStorage = {
  getAccessToken: (): string | undefined => {
    return Cookies.get("accessToken");
  },

  setAccessToken: (token: string): void => {
    Cookies.set("accessToken", token, COOKIE_OPTIONS);
  },

  removeAccessToken: (): void => {
    Cookies.remove("accessToken");
  },

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

  clearAll: (): void => {
    Cookies.remove("accessToken");
    Cookies.remove("user");
  },
};
