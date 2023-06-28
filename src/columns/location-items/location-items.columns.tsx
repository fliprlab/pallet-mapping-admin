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
    label: "Created At",
    key: "createdAt",
    renderCell: (e) => (
      <p>{moment(e.createdAt).format("DD MMM YYYY, hh:mm a")}</p>
    ),
  },
];
