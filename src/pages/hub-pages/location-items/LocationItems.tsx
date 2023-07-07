import { Box, Flex, Text } from "@mantine/core";
import React, { memo, useMemo, useState } from "react";
import { COLORS } from "../../../colors";
import CustomTable from "../../../components/table/CustomTable";

import { COLUMNS } from "../../../columns";
import { TABLE_PAGE_LIMIT } from "../../../constants";

import UploadItemsBtn from "./UploadItemsBtn";
import { useGetLocationItemsQuery } from "../../../hooks/location-items/query/useGetLocationItems.query";

const LocationItems = () => {
  const [activePage, setActivePage] = useState(1);
  const [pagedData, setPagedData] = useState({ total: 0 });

  const { isLoading, data, refetch } = useGetLocationItemsQuery(
    {
      itemPerPage: TABLE_PAGE_LIMIT,
      page: activePage,
    },
    "hub"
  );

  const items = useMemo(() => {
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
          Items
        </Text>

        <UploadItemsBtn refetchData={refetch} />
      </Flex>
      <CustomTable
        columns={COLUMNS.locationsItemsColumns}
        data={items}
        isLoading={isLoading}
        paginationProps={{ activePage, pagedData, setActivePage }}
      />
    </Box>
  );
};

export default memo(LocationItems);
