import { LogOut } from "lucide-react";
import { cn } from "@/utils/cn";
import SidebarMenu from "./sidebar-menu";

interface SidebarProps {
  handleLogout: () => void;
  isSidebarActive: boolean;
  setIsSidebarActive: (isOpen: boolean) => void;
}

export default function Sidebar({ isSidebarActive, handleLogout }: SidebarProps) {
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
        <SidebarMenu isSidebarOpen={isSidebarActive} />
      </div>
      <div className="px-2 py-4 border-t border-gray-200">
        <button
          onClick={() => handleLogout?.()}
          className={cn(
            "flex items-center gap-3 w-full px-3 py-2 rounded-md hover:bg-[#EAF0FA] text-left",
            "bg-[#FFFFFF] text-[#000000] transition-colors"
          )}
        >
          <LogOut className="w-5 h-5" />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </nav>
  );
}
