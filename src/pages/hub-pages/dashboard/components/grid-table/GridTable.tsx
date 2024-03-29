import React, { memo, useMemo, useState } from "react";
import { useGetGridsHubQuery } from "../../../../../hooks/grid/query/hub/useGetGridsHub.query";
import { TABLE_PAGE_LIMIT } from "../../../../../constants";
import CustomTableWithHeader from "../../../../../components/table/CustomTableWithHeader";
import { COLUMNS } from "../../../../../columns";
import FilterHeader from "./component/FilterHeader";
import DownloadBtn from "./component/DownloadBtn";
import { Box, Flex } from "@mantine/core";
import UploadBtn from "./component/UploadBtn";

export interface IHubGridListFilter {
  sortBy: "ascending" | "descending" | "";
  destination: string;
  status: string;
  search: string;
}

const GridTable = () => {
  const [activePage, setActivePage] = useState(1);
  const [pagedData, setPagedData] = useState({ total: 0 });
  const [filter, setFilter] = useState<IHubGridListFilter>({
    sortBy: "",
    destination: "",
    status: "",
    search: "",
  });

  const { isLoading, data, refetch } = useGetGridsHubQuery(
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
    <Box mt={60}>
      <CustomTableWithHeader
        rightComponent={
          <Flex>
            <UploadBtn
              refetchData={() => {
                refetch();
              }}
            />
            <DownloadBtn filter={filter} />
          </Flex>
        }
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

export default memo(GridTable);
