import { useEffect } from "react";
import { useAuthStore } from "@/store/auth-store";
import { Navigate, useLocation } from "react-router";

export default function ProtectedLayout({ children }: { children?: React.ReactNode }) {
  const location = useLocation();
  
  const { isAuthenticated, clearAll } = useAuthStore();
  const isProtectedRoute = location.pathname.startsWith("/admin");
  
  useEffect(() => {
    if (!isAuthenticated) {
      clearAll();
    }
  }, [isAuthenticated, clearAll]);
  
  if (location.pathname === "/" && isAuthenticated) {
    return <Navigate to="/home" replace />;
  }
  
  if (isProtectedRoute && !isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}