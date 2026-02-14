import { create } from "zustand";
import { clearRefreshToken } from "@/domain/auth/api/refresh-token";
import type { IAuthUser } from "@/domain/auth/auth";
import { cookieStorage } from "@/utils/cookies";

type AuthState = {
  user: IAuthUser | null;
  isAuthenticated: boolean;
  setCreds: (user: IAuthUser, accessToken: string) => void;
  clearAll: () => void;
};

const initialUser = cookieStorage.getUser();

export const useAuthStore = create<AuthState>()((set) => ({
  user: initialUser,
  isAuthenticated: !!initialUser,

  setCreds: (user, accessToken) => {
    cookieStorage.setAccessToken(accessToken);
    cookieStorage.setUser(user);
    set({ user, isAuthenticated: true });
  },

  clearAll: () => {
    cookieStorage.clearAll();
    clearRefreshToken();
    set({ user: null, isAuthenticated: false });
  },
}));
