import { Box, Text } from "@mantine/core";
import React, { useMemo, useState } from "react";
import { COLORS } from "../../../colors";
import CustomTableWithHeader from "../../../components/table/CustomTableWithHeader";
import { useGetItemsQuery } from "../../../hooks/items/useGetItemsQuery";
import { TABLE_PAGE_LIMIT } from "../../../constants";
import { COLUMNS } from "../../../columns";
import StatusChip, { TItemStatus } from "./components/StatusChip";

const HubItemTable = () => {
  const [chip, setChip] = useState<TItemStatus>("all");
  const [search, setSearch] = useState("");
  const [activePage, setActivePage] = useState(1);
  const [pagedData, setPagedData] = useState({ total: 0 });

  const { data, isLoading } = useGetItemsQuery({
    itemPerPage: TABLE_PAGE_LIMIT,
    page: activePage,
    search,
    status: chip,
  });

  const items = useMemo(() => {
    if (!isLoading && data) {
      data.pageData && setPagedData(data.pageData);
      return data.data;
    } else {
      return [];
    }
  }, [data, isLoading]);

  console.log("items", items);

  return (
    <Box>
      <Box sx={{ marginBottom: "2em" }}>
        <Text size={18} color={COLORS.black} ml={32}>
          Items Table
        </Text>
      </Box>
      <CustomTableWithHeader
        onChangeSearch={setSearch}
        isLoading={false}
        rightComponent={<StatusChip setValue={setChip} value={chip} />}
        fontSize={14}
        data={items}
        columns={COLUMNS.itemColumns}
        paginationProps={{ activePage, pagedData, setActivePage }}
      />
    </Box>
  );
};

export default HubItemTable;
