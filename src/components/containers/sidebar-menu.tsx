import { useRef } from "react";
import { NavLink, useLocation } from "react-router";
import { MENU_LINKS } from "@/common/constants";
import { cn } from "@/utils/cn";

interface SidebarMenuProps {
  isSidebarOpen: boolean;
  setOpenModalLogout?: (isOpen: boolean) => void;
}

export default function SidebarMenu({ isSidebarOpen, setOpenModalLogout }: SidebarMenuProps) {
  const location = useLocation();
  const menusRef = useRef<HTMLDivElement>(null);

  const handleMenuClick = (menuLink: (typeof MENU_LINKS)[0]) => {
    if (menuLink.isLogout && setOpenModalLogout) {
      setOpenModalLogout(true);
    }
  };

  return (
    <div ref={menusRef} className="flex flex-col w-full gap-2 px-2">
      {MENU_LINKS.map((menuLink) => {
        const isPathActive =
          menuLink.link === "/admin" ? location.pathname === "/admin" : location.pathname.startsWith(menuLink.link);

        if (menuLink.isLogout) {
          return (
            <button
              key={menuLink.id}
              onClick={() => handleMenuClick(menuLink)}
              data-slot="menu-root"
              className={cn(
                "flex items-center justify-between gap-3 px-3 py-2 rounded-md hover:bg-[#EAF0FA] text-left",
                "bg-[#FFFFFF] text-[#000000]"
              )}
            >
              <div className="flex items-center gap-3 text-[#000000]">
                {menuLink.icon && <menuLink.icon className="w-5 h-5" />}
                {isSidebarOpen && <span className="text-sm font-medium">{menuLink.name}</span>}
              </div>
            </button>
          );
        }

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
