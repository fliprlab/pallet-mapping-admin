import { Box, Flex, Text } from "@mantine/core";
import React, { useState, useMemo } from "react";
import { TABLE_PAGE_LIMIT } from "../../../constants";
import { useGetGridsHubQuery } from "../../../hooks/grid/query/hub/useGetGridsHub.query";
import { COLORS } from "../../../colors";
import CustomTable from "../../../components/table/CustomTable";
import FilterHeader from "./component/FilterHeader";
import { COLUMNS } from "../../../columns";
import CustomTableWithHeader from "../../../components/table/CustomTableWithHeader";
import DownloadBtn from "./component/DownloadBtn";

export interface IHubGridListFilter {
  sortBy: "ascending" | "descending" | "";
  destination: string;
  status: string;
  search: string;
}

const HubGridList = () => {
  const [activePage, setActivePage] = useState(1);
  const [pagedData, setPagedData] = useState({ total: 0 });
  const [filter, setFilter] = useState<IHubGridListFilter>({
    sortBy: "",
    destination: "",
    status: "",
    search: "",
  });

  const { isLoading, data } = useGetGridsHubQuery(
    {
      itemPerPage: TABLE_PAGE_LIMIT,
      page: activePage,
    },
    filter,
    {}
  );

  const grids = useMemo(() => {
    if (!isLoading && data) {
      data.pageData && setPagedData(data.pageData);
      return data.data;
    } else {
      return [];
    }
  }, [data, isLoading]);

  return (
    <Box>
      <Flex
        sx={{ marginBottom: "2em" }}
        align={"center"}
        justify={"space-between"}
        px={32}
      >
        <Text size={18} color={COLORS.black}>
          Grid List Details
        </Text>
      </Flex>
      <CustomTableWithHeader
        rightComponent={<DownloadBtn filter={filter} />}
        onChangeSearch={(e) => setFilter((old) => ({ ...old, search: e }))}
        filterHeader={<FilterHeader filter={filter} updateFilter={setFilter} />}
        columns={COLUMNS.gridCloumnHub}
        data={grids}
        isLoading={isLoading}
        paginationProps={{ activePage, pagedData, setActivePage }}
      />
    </Box>
  );
};

export default HubGridList;
