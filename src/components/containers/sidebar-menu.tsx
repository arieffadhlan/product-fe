import { useRef } from "react";
import { NavLink, useLocation } from "react-router";
import { MENU_LINKS } from "@/common/constants";
import { cn } from "@/utils/cn";

interface SidebarMenuProps {
  isSidebarOpen: boolean;
}

export default function SidebarMenu({ isSidebarOpen }: SidebarMenuProps) {
  const location = useLocation();
  const menusRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={menusRef} className="flex flex-col w-full gap-2 px-2">
      {MENU_LINKS.map((menuLink) => {
        const isPathActive = menuLink.link === "/admin" 
          ? location.pathname === "/admin" 
          : location.pathname.startsWith(menuLink.link);

        return (
          <NavLink
            to={menuLink.link}
            key={menuLink.id}
            data-slot={`menu-root`}
            className={cn(
              "flex items-center justify-between gap-3 px-3 py-2 rounded-md hover:bg-[#EAF0FA]",
              isPathActive ? "bg-[#EAF0FA] text-[#20519F]" : "bg-[#FFFFFF] text-[#000000]"
            )}
          >
            <div className={cn("flex items-center gap-3", isPathActive ? "text-[#20519F]" : "text-[#000000]")}>
              {menuLink.icon && <menuLink.icon className="w-5 h-5" />}
              {isSidebarOpen && <span className="text-sm font-medium">{menuLink.name}</span>}
            </div>
          </NavLink>
        );
      })}
    </div>
  );
}
