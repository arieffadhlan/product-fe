import { Home, Layers, LogOut } from "lucide-react";
import { v4 as uuid } from "uuid";

export const MENU_LINKS = [
  {
    id: uuid(),
    icon: Home,
    name: "Home",
    link: "/admin",
    isActive: false,
    children: [],
  },
  {
    id: uuid(),
    icon: Layers,
    name: "Product",
    link: "/admin/products",
    isActive: false,
    children: [],
  },
  {
    id: uuid(),
    icon: LogOut,
    name: "Logout",
    link: "/logout",
    isActive: false,
    children: [],
    isLogout: true,
  },
];
