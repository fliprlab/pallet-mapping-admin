type TTableColumns = {
  label: string;
  key: string;
  renderCell?: (value: any) => React.ReactNode;
};
