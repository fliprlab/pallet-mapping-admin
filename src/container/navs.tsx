import { ICONS } from "../icons";

export const navs: TSidebar[] = [
  {
    icon: ICONS.home,
    activeIcon: ICONS.home_active,
    label: "Dashboard",
    to: "/admin/dashboard",
  },
  {
    icon: ICONS.user,
    activeIcon: ICONS.active_user,
    label: "Hub Admin",
    to: "/admin/hub-admin",
  },

  {
    icon: ICONS.location,
    activeIcon: ICONS.location_active,
    label: "Locations",
    to: "/admin/locations",
  },
  {
    icon: ICONS.grid,
    activeIcon: ICONS.grid_active,
    label: "Grid List",
    to: "/admin/grid-list",
  },
  // {
  //   icon: ICONS.listItems,
  //   activeIcon: ICONS.listItems_active,
  //   label: "Items",
  //   to: "/admin/items",
  // },
  {
    icon: ICONS.pallet,
    activeIcon: ICONS.palletActive,
    label: "Pallets",
    to: "/admin/pallets",
  },
  // {
  //   icon: ICONS.scan,
  //   activeIcon: ICONS.scan_active,
  //   label: "Scan Shipment",
  //   to: "/scan",
  //   disabled: true,
  // },
  // {
  //   icon: ICONS.cancel,
  //   activeIcon: ICONS.cancel_active,
  //   label: "Cancel Shipment",
  //   to: "/cancel",
  //   disabled: true,
  // },
];
