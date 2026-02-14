import { Navigate } from "react-router";
import LoginForm from "@/domain/auth/components/login";
import { useAuthStore } from "@/store/auth-store";

export default function Index() {
  const token = useAuthStore((state) => state.user);

  if (token) {
    return <Navigate to="/admin" replace />;
  }

  return (
    <main className="w-full h-[100vh] flex justify-center items-center">
      <div className="flex flex-col h-full justify-center items-center gap-1 max-w-[480px] w-full text-neutral-9">
        <div className="font-[700] text-[32px]">Login</div>
        <div className="font-[400] text-[16px]">Please login with registered account</div>
        <LoginForm />
      </div>
    </main>
  );
}
