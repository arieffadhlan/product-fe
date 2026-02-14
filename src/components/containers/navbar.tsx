import { MenuIcon } from "lucide-react";
import { cn } from "@/utils/cn";

interface NavbarProps {
  isSidebarActive: boolean;
  setIsSidebarActive: (isOpen: boolean) => void;
}

export default function Navbar({ isSidebarActive, setIsSidebarActive }: NavbarProps) {
  return (
    <header
      className={cn("flex left-0 fixed w-full top-[0] z-10 h-[72px] transition-all duration-150",
        isSidebarActive ? "pl-[240px]" : "pl-[0px]"
      )}
    >
      <div className="w-full flex items-center gap-4 justify-between flex-1 px-6 bg-[#FFF] border-b border-gray-300">
        <div className="px-0 flex items-center gap-6">
          <MenuIcon onClick={() => setIsSidebarActive(!isSidebarActive)} className="stroke-[2.5] cursor-pointer" />
        </div>
      </div>
    </header>
  );
}
