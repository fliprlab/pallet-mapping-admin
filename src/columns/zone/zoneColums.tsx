import moment from "moment";

export const zoneColums: TTableColumns[] = [
  {
    key: "zone",
    label: "Zone",
  },
  {
    label: "Created At",
    key: "createdAt",
    renderCell: (e) => (
      <p>{moment(e.createdAt).format("DD MMM YYYY, hh:mm a")}</p>
    ),
  },
];
