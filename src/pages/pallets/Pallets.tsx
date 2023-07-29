import { Box, Text } from "@mantine/core";
import React, { memo, useMemo, useState } from "react";
import CustomTableWithHeader from "../../components/table/CustomTableWithHeader";
import { COLORS } from "../../colors";
import { useGetPallets } from "../../hooks/pallets/query/useGetPallets";
import { TABLE_PAGE_LIMIT } from "../../constants";
import { showNotification } from "@mantine/notifications";
import { COLUMNS } from "../../columns";

function Pallets() {
  const [pagedData, setPagedData] = useState({ total: 0 });
  const [activePage, setActivePage] = useState(1);

  const { isLoading, data } = useGetPallets(
    {
      itemPerPage: TABLE_PAGE_LIMIT,
      page: activePage,
    },
    {
      onSuccess: (res) => {
        if (res.status === "success") {
          setPagedData(res.pageData ? res.pageData : { total: 0 });
        } else {
          showNotification({
            message: res.data.message,
            color: "red",
          });
        }
      },
      enabled: true,
    }
  );

  const locations = useMemo(() => {
    if (!isLoading && data) {
      return data.data;
    } else {
      return [];
    }
  }, [data, isLoading]);

  return (
    <Box>
      <Box sx={{ marginBottom: "2em" }}>
        <Text size={18} color={COLORS.black} ml={32}>
          Pallets
        </Text>
      </Box>
      <CustomTableWithHeader
        isLoading={isLoading}
        search={false}
        data={locations}
        columns={COLUMNS.palletsColumns}
        paginationProps={{ activePage, pagedData, setActivePage }}
      />
    </Box>
  );
}

export default memo(Pallets);
