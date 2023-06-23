import { ICONS } from "../icons";

export const hubNavs: TSidebar[] = [
  {
    icon: ICONS.home,
    activeIcon: ICONS.home_active,
    label: "Dashboard",
    to: "/hub/dashboard",
  },
  {
    icon: ICONS.user,
    activeIcon: ICONS.active_user,
    label: "Users",
    to: "/hub/users",
  },
  {
    icon: ICONS.listItems,
    activeIcon: ICONS.listItems_active,
    label: "Items",
    to: "/hub/items",
  },
];
