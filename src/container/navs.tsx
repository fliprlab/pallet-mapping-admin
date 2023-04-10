import { ICONS } from "../icons";

export const naves = [
  {
    icon: ICONS.home,
    activeIcon: ICONS.home_active,
    label: "Dashboard",
    to: "/dashboard",
  },
  {
    icon: ICONS.user,
    activeIcon: ICONS.active_user,
    label: "Users",
    to: "/users",
  },
  {
    icon: ICONS.user,
    activeIcon: ICONS.active_user,
    label: "Locations",
    to: "/locations",
  },
  {
    icon: ICONS.scan,
    activeIcon: ICONS.scan_active,
    label: "Scan Shipment",
    to: "/scan",
    disabled: true,
  },
  {
    icon: ICONS.cancel,
    activeIcon: ICONS.cancel_active,
    label: "Cancel Shipment",
    to: "/cancel",
    disabled: true,
  },
];
