import moment from "moment";

const status = (item: TLocationItems & { pallet: Object; status: string }) => {
  if (item.status === "created" && item.pallet) {
    return "sort";
  } else if (item.status === "put away") {
    return "bagged";
  } else if (item.status === "picked up") {
    return "picked up";
  } else {
    return item.status;
  }
};

const redBackground = (item: any) => {
  console.log("item.status", item.status);
  if (item.status === "cancelled") {
    return {
      background: "#FF6B6B",
    };
  }
  return {};
};

export const locationsItemsColumns: TTableColumns[] = [
  {
    key: "itemId",
    label: "Item Id",
    columnStyle: redBackground,
  },
  {
    key: "destination",
    label: "Destination",
    columnStyle: redBackground,
  },
  {
    key: "virtualId",
    label: "Virtual Id",
    columnStyle: redBackground,
  },
  {
    key: "pallet",
    label: "Pallet Id",
    renderCell: (e) => <p>{e?.pallet?.name}</p>,
    columnStyle: redBackground,
  },
  {
    key: "zone",
    label: "Zone",
    columnStyle: redBackground,
  },
  {
    key: "lpst",
    label: "LPST",
    columnStyle: redBackground,
  },
  {
    label: "Updated At",
    key: "updatedAt",
    renderCell: (e) => (
      <p>{moment(e.updatedAt).format("DD MMM YYYY, hh:mm A")}</p>
    ),
    columnStyle: redBackground,
  },
  {
    key: "status",
    label: "Status",
    renderCell: (e) => <p>{status(e)}</p>,
    columnStyle: redBackground,
  },
];
