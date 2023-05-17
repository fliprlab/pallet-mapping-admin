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
    icon: ICONS.grid,
    activeIcon: ICONS.grid_active,
    label: "Grid List",
    to: "/hub/grid-list",
  },
];
