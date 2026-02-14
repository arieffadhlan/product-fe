import { useEffect } from "react";
import { Navigate, useLocation } from "react-router";
import { useAuthStore } from "@/store/auth-store";
import { cookieStorage } from "@/utils/cookies";

export default function ProtectedLayout({ children }: { children?: React.ReactNode }) {
  const location = useLocation();
  const { isAuthenticated, clearAll } = useAuthStore();

  const hasToken = !!cookieStorage.getAccessToken();
  const isAdminRoute = location.pathname.startsWith("/admin");
  const isGuestRoute = location.pathname === "/";

  useEffect(() => {
    if (!isAuthenticated && !hasToken) {
      clearAll();
    }
  }, [isAuthenticated, hasToken, clearAll]);

  if (isGuestRoute && isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  if (isAdminRoute && !isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}
