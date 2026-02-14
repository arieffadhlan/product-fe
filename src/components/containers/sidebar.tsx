import { cn } from "@/utils/cn";
import SidebarMenu from "./sidebar-menu";

interface SidebarProps {
  isSidebarActive: boolean;
  setIsSidebarActive: (isOpen: boolean) => void;
  setOpenModalLogout?: (isOpen: boolean) => void;
}

export default function Sidebar({ isSidebarActive, setOpenModalLogout }: SidebarProps) {
  console.log(isSidebarActive);

  return (
    <nav
      className={cn(
        "fixed z-10 top-0 left-0 flex flex-col h-full transition-all border-r border-gray-300",
        "bg-[#FFF] shadow-[0] overflow-hidden md:[overflow:_inherit]",
        isSidebarActive ? "w-[240px]" : "-left-[240px]"
      )}
    >
      <div className="flex items-center justify-center w-full h-[72px]">Dashboard</div>
      <div className={cn("flex flex-1 flex-col py-6", isSidebarActive && "overflow-y-auto")}>
        <SidebarMenu isSidebarOpen={isSidebarActive} setOpenModalLogout={setOpenModalLogout} />
      </div>
    </nav>
  );
}
