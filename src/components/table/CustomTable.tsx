import { memo, ReactNode } from "react";
import { Box, createStyles, Flex, Table } from "@mantine/core";
import { COLORS } from "../../colors";
import TableLoading from "./components/TableLoading";
import Pagination from "../Pagination/Pagination";

interface IProps {
  search?: boolean;
  onChangeSearch?: (value: string) => void;
  rightComponent?: ReactNode;
  data: any[];
  columns: TTableColumns[];
  isLoading: boolean;
  paginationProps?: {
    activePage: number;
    setActivePage: React.Dispatch<React.SetStateAction<number>>;
    pagedData: { total: number };
  };
  filterHeader?: ReactNode;
  fontSize?: number;
}

const CustomTable: React.FC<IProps> = ({
  data,
  columns,
  isLoading,
  paginationProps,
  filterHeader,
  fontSize = 16,
}) => {
  const { classes } = styles();

  return (
    <Box>
      {!isLoading ? (
        <Box className={classes.tableContainer}>
          <Table
            withBorder={false}
            verticalSpacing={"md"}
            // striped
            style={{ textAlign: "center" }}
          >
            {filterHeader && filterHeader}
            <thead>
              <tr>
                {columns.map((item, index) => {
                  return (
                    <th
                      key={`${"_" + index}`}
                      className={classes.tHead}
                      style={{ textAlign: "center", fontSize: fontSize }}
                    >
                      {item.label}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {data.length === 0 && (
                <tr>
                  <td colSpan={columns.length}>No Data</td>
                </tr>
              )}
              {data.length > 0 &&
                data.map((item: any, index) => {
                  return (
                    <tr
                      key={`${"_" + index}`}
                      style={{
                        backgroundColor: index % 2 ? COLORS.white : COLORS.grey,
                      }}
                    >
                      {columns.map((column, i) => {
                        return (
                          <td
                            key={`${"_" + i}`}
                            className={classes.tBody}
                            style={{ fontSize: fontSize }}
                          >
                            {column.renderCell ? (
                              <Flex justify={"center"}>
                                {column.renderCell(item)}
                              </Flex>
                            ) : (
                              item[column.key]
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </Box>
      ) : (
        <TableLoading />
      )}
      {paginationProps && (
        <Box pb={16} px={32}>
          <Pagination
            activePage={paginationProps.activePage}
            setPage={paginationProps.setActivePage}
            totalPages={paginationProps.pagedData.total}
          />
        </Box>
      )}
    </Box>
  );
};

export default memo(CustomTable);

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

    color: "#000 !important",
    textAlign: "center",
  },
  tBody: {
    fontWeight: 300,
    color: "#000",
  },
});
