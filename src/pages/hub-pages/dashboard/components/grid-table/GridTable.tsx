import React, { memo, useMemo, useState } from "react";
import { IHubGridListFilter } from "../../../grid-list/HubGridList";
import { useGetGridsHubQuery } from "../../../../../hooks/grid/query/hub/useGetGridsHub.query";
import { TABLE_PAGE_LIMIT } from "../../../../../constants";
import CustomTableWithHeader from "../../../../../components/table/CustomTableWithHeader";
import { COLUMNS } from "../../../../../columns";
import FilterHeader from "./component/FilterHeader";
import DownloadBtn from "./component/DownloadBtn";

const GridTable = () => {
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
    <CustomTableWithHeader
      rightComponent={<DownloadBtn filter={filter} />}
      onChangeSearch={(e) => setFilter((old) => ({ ...old, search: e }))}
      filterHeader={<FilterHeader filter={filter} updateFilter={setFilter} />}
      columns={COLUMNS.gridCloumnHub}
      data={grids}
      isLoading={isLoading}
      paginationProps={{ activePage, pagedData, setActivePage }}
    />
  );
};

export default memo(GridTable);
