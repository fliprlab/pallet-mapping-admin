import { Box, Flex, Text } from "@mantine/core";
import React, { memo, useMemo, useState } from "react";
import CustomTableWithHeader from "../../components/table/CustomTableWithHeader";
import { COLORS } from "../../colors";
import { useGetPallets } from "../../hooks/pallets/query/useGetPallets";
import { TABLE_PAGE_LIMIT } from "../../constants";

import { COLUMNS } from "../../columns";
import StatusMenu from "../../components/status-menu/StatusMenu";

function Pallets() {
  const [pagedData, setPagedData] = useState({ total: 0 });
  const [activePage, setActivePage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const { isLoading, data } = useGetPallets({
    itemPerPage: TABLE_PAGE_LIMIT,
    page: activePage,
    search,
    status,
  });

  const pallets = useMemo(() => {
    if (!isLoading && data) {
      setPagedData(data.pageData ? data.pageData : { total: 0 });
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
        rightComponent={
          <Flex>
            <StatusMenu
              status={status}
              options={[
                { label: "Assign Grid", value: "pallet-asign-grid" },
                { label: "Created", value: "pallet-created" },
                { label: "Out", value: "pallet-out" },
              ]}
              setStatus={setStatus}
            />
          </Flex>
        }
        onChangeSearch={setSearch}
        isLoading={isLoading}
        search={true}
        data={pallets}
        columns={COLUMNS.palletsColumns}
        paginationProps={{ activePage, pagedData, setActivePage }}
      />
    </Box>
  );
}

export default memo(Pallets);
