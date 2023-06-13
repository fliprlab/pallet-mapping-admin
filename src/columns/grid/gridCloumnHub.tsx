import moment from "moment";

export const gridCloumnHub: TTableColumns[] = [
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
    label: "Virtual ID",
    key: "virtualId",
    renderCell: (e) => (
      <p>{e.status === "unoccupied" ? "" : e.virtualId || ""}</p>
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
    label: "Destination",
    key: "destination",
    renderCell: (e) => (
      <p>{e.status === "unoccupied" ? "" : e.destination || ""}</p>
    ),
  },
  {
    label: "Status",
    key: "status",
  },
];
