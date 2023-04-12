import { memo, ReactNode } from "react";
import { Box, createStyles } from "@mantine/core";
import { COLORS } from "../../colors";
import SearchField from "./components/SearchField";
import CustomTable from "./CustomTable";

interface IProps {
  search?: boolean;
  onChangeSearch?: (value: string) => void;
  rightComponent?: ReactNode;
  data: any[];
  columns: TTableColumns[];
  isLoading: boolean;
}

const CustomTableWithHeader: React.FC<IProps> = ({
  search = true,
  onChangeSearch,
  rightComponent,
  data,
  columns,
  isLoading,
}) => {
  const { classes } = styles();

  return (
    <Box className={classes.root}>
      {(search || rightComponent) && (
        <Box className={classes.header}>
          {search ? <SearchField onChangeText={onChangeSearch} /> : <div />}

          {rightComponent && <div>{rightComponent}</div>}
        </Box>
      )}
      <CustomTable columns={columns} data={data} isLoading={isLoading} />
    </Box>
  );
};

export default memo(CustomTableWithHeader);

const styles = createStyles({
  root: {
    border: "1px solid ",
    borderRadius: 5,
    borderColor: COLORS.borderPrimary,
  },
  header: {
    padding: "20px 32px",
    borderBottom: "1px solid",
    borderColor: COLORS.borderPrimary,
    justifyContent: "space-between",
    alignItems: "center",
    display: "flex",
  },
  tableContainer: {
    // padding: 18,
  },
  tHead: {
    fontWeight: 600,
    fontSize: "16px !important",
    color: "#000 !important",
    textAlign: "center",
  },
  tBody: {
    fontSize: "16px !important",
    fontWeight: 300,
    color: "#000",
  },
});
