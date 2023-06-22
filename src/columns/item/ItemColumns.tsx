import moment from "moment";

 export const itemColumns: TTableColumns[] = [
    {
      label: "Item Id",
      key: "itemId",
    },
    {
      label: "Virtual Id",
      key: "virtualId",
    },
    {
      label: "Pallet Name",
      key: "pallet.name",
      renderCell:(e)=><p>{e.pallet.name}</p>
    },
    {
      label: "Grid Name",
      key: "grid.name",
      renderCell:(e)=><p>{e.grid?e.grid.name:"NA"}</p>
    },
    {
      label: "Status",
      key: "status",
    },
    {
      label: "Location ",
      key: "location",
      renderCell:(e)=>{
        return <p>{e.origin + " -> "+e.destination}</p>
      }
    },
    {
      label: "Last Updated Time ",
      key: "lastUpdatedAt",
      renderCell:(e)=><p>{moment(e.lastUpdatedAt).format("lll")}</p>
    },
  ];