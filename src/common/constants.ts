import { v4 as uuid } from "uuid";
import { LucideHome, LayersIcon } from "lucide-react";

export const MENU_LINKS = [
  { id: uuid(), icon: LucideHome, isActive: false, name: "Home", link: "/admin" },
  { id: uuid(), icon: LayersIcon, isActive: false, name: "Product", link: "/admin/products" },
];
