import moment from "moment";

const status = (item: TLocationItems & { pallet: Object; status: string }) => {
  if (item.status === "created" && item.pallet) {
    return "sort";
  } else if (item.status === "picked up") {
    return "bagged";
  } else {
    return item.status;
  }
};

export const locationsItemsColumns: TTableColumns[] = [
  {
    key: "itemId",
    label: "Item Id",
  },
  {
    key: "destination",
    label: "Destination",
  },
  {
    key: "pallet",
    label: "Pallet Id",
    renderCell: (e) => <p>{e?.pallet?.name}</p>,
  },
  {
    key: "zone",
    label: "Zone",
  },
  {
    key: "lpst",
    label: "LPST",
  },
  {
    label: "Updated At",
    key: "updatedAt",
    renderCell: (e) => (
      <p>{moment(e.updatedAt).format("DD MMM YYYY, hh:mm A")}</p>
    ),
  },
  {
    key: "status",
    label: "Status",
    renderCell: (e) => <p>{status(e)}</p>,
  },
];
