import { useState } from "react";
import { Outlet, useNavigate } from "react-router";
import Navbar from "@/components/containers/navbar";
import Sidebar from "@/components/containers/sidebar";
import ModalLogout from "@/components/modals/modal-logout";
import ProtectedLayout from "@/libs/protected";
import { useAuthStore } from "@/store/auth-store";
import { cn } from "@/utils/cn";

export default function Layout() {
  const navigate = useNavigate();
  const [isSidebarActive, setIsSidebarActive] = useState<boolean>(false);
  const [openModalLogout, setOpenModalLogout] = useState<boolean>(false);
  const clearAll = useAuthStore((state) => state.clearAll);
  console.log(isSidebarActive);

  const handleLogout = () => {
    clearAll();
    navigate("/");
  };

  return (
    <ProtectedLayout>
      <Navbar
        isSidebarActive={isSidebarActive}
        setIsSidebarActive={setIsSidebarActive}
        setOpenModalLogout={setOpenModalLogout}
      />
      <Sidebar
        isSidebarActive={isSidebarActive}
        setIsSidebarActive={setIsSidebarActive}
        setOpenModalLogout={setOpenModalLogout}
      />
      <main
        className={cn(
          "pb-6 pr-6 min-h-screen transition-[padding] pt-[96px]",
          isSidebarActive ? "pl-[264px]" : "pl-[24px]"
        )}
      >
        <Outlet />
        <ModalLogout visible={openModalLogout} onClick={handleLogout} setOpen={setOpenModalLogout} />
      </main>
    </ProtectedLayout>
  );
}
