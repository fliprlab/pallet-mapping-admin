import moment from "moment";

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
    renderCell: (e) => <p>{e.pallet && e.pallet.name}</p>,
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
    label: "Created At",
    key: "createdAt",
    renderCell: (e) => (
      <p>{moment(e.createdAt).format("DD MMM YYYY, hh:mm a")}</p>
    ),
  },
  {
    key: "status",
    label: "Status",
  },
];
