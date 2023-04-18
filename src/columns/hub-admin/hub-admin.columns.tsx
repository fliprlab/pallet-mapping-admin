export const hubAdminsColumns: TTableColumns[] = [
  {
    label: "User Name",
    key: "username",
  },
  { label: "Password", key: "password", renderCell: () => <div>********</div> },
  {
    label: "Origin",
    key: "origin",
    renderCell: (value) => <div>{value.origin.origin}</div>,
  },
];
