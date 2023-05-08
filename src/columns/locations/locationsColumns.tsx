import moment from "moment";

export const locationsColumns: TTableColumns[] = [
  {
    key: "location",
    label: "Location",
  },
  {
    label: "Created At",
    key: "createdAt",
    renderCell: (e) => (
      <p>{moment(e.createdAt).format("DD MMM YYYY, hh:mm a")}</p>
    ),
  },
];
