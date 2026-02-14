import { cn } from "@/utils/cn";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router";
import Sidebar from "@/components/containers/sidebar";
import ProtectedLayout from "@/libs/protected";
import Navbar from "@/components/containers/navbar";
import ModalSubmit from "@/components/modals/modal-submit";
import { useModalConfirm } from "@/hooks/use-modal-confirm";
import { useAuthStore } from "@/store/auth-store";

export default function Layout() {
  const navigate = useNavigate();
  const clearAllCredentials = useAuthStore((state) => state.clearAll);
  const [isSidebarActive, setIsSidebarActive] = useState(false);

  const modalLogout = useModalConfirm();

  const handleLogout = () => {
    modalLogout.handleConfirm({
      heading: "Sign Out",
      message: "Are you sure you want to sign out? You will be redirected to the login page.",
      btnText: "Yes, Sign Out",
      onCancel: () => modalLogout.hideModal(),
      onSubmit: () => {
        clearAllCredentials();
        navigate("/");
      },
    });
  };

  return (
    <ProtectedLayout>
      <Navbar
        isSidebarActive={isSidebarActive}
        setIsSidebarActive={setIsSidebarActive}
      />
      <Sidebar
        handleLogout={handleLogout}
        isSidebarActive={isSidebarActive}
        setIsSidebarActive={setIsSidebarActive}
      />
      <main
        className={cn(
          "pb-6 pr-6 min-h-screen transition-[padding] pt-[96px]",
          isSidebarActive ? "pl-[264px]" : "pl-[24px]"
        )}
      >
        <Outlet />
        <ModalSubmit
          onSubmit={modalLogout.onConfirm}
          onCancel={modalLogout.hideModal}
          visible={modalLogout.visible}
          loading={modalLogout.loading}
          heading={modalLogout.options.heading}
          message={modalLogout.options.message}
          btnText={modalLogout.options.btnText}
        />
      </main>
    </ProtectedLayout>
  );
}
