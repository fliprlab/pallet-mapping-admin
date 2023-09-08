import moment from "moment";

export const gridColumns: TTableColumns[] = [
  {
    label: "Grid ID",
    key: "gridId",
  },
  {
    label: "Pallet ID",
    key: "palletId",
    renderCell: (e) => (
      <p>{e.status === "unoccupied" ? "" : e.palletId?.name || ""}</p>
    ),
  },
  {
    label: "Time",
    key: "createdAt",
    renderCell: (e) => (
      <p>
        {e.status === "unoccupied"
          ? ""
          : moment(e.time).format("DD MMM YYYY, hh:mm a")}
      </p>
    ),
  },
  {
    label: "Hub",
    key: "createdAt",
    renderCell: (e) => <p>{e.hub.name}</p>,
  },
  {
    label: "Status",
    key: "status",
  },
];
