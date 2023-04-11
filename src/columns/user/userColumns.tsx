export const userColumns: TTableColumns[] = [
  {
    label: "User Name",
    key: "userName",
  },
  { label: "Password", key: "password", renderCell: () => <div>********</div> },
  { label: "Origin", key: "origin" },
];
