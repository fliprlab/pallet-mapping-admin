import { Box, Flex, Text } from "@mantine/core";
import React, { memo, useMemo, useState } from "react";
import { COLORS } from "../../colors";
import { COLUMNS } from "../../columns";
import { TABLE_PAGE_LIMIT } from "../../constants";
import UploadItemsBtn from "./UploadItemsBtn";
import { useGetLocationItemsQuery } from "../../hooks/location-items/query/useGetLocationItems.query";
import CustomTableWithHeader from "../../components/table/CustomTableWithHeader";
import StatusMenu from "../../components/status-menu/StatusMenu";
import { DateRangePicker, DateRangePickerValue } from "@mantine/dates";

const Items = () => {
  const [activePage, setActivePage] = useState(1);
  const [pagedData, setPagedData] = useState({ total: 0 });
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [date, setDate] = useState<DateRangePickerValue>([null, null]);

  const { isLoading, data, refetch } = useGetLocationItemsQuery(
    {
      search: search,
      status,
      itemPerPage: TABLE_PAGE_LIMIT,
      page: activePage,
      date,
    },
    "admin"
  );

  const items = useMemo(() => {
    if (Math.ceil(pagedData.total / TABLE_PAGE_LIMIT) < activePage) {
      setActivePage(1);
    }
    if (!isLoading && data) {
      data.pageData && setPagedData(data.pageData);

      return data.data;
    } else {
      return [];
    }
  }, [data, isLoading, pagedData, activePage]);

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
      <CustomTableWithHeader
        rightComponent={
          <Flex>
            <DateRangePicker
              placeholder="Select From & To Date"
              value={date}
              onChange={setDate}
              mr={60}
            />
            <StatusMenu
              status={status}
              options={[
                { label: "Created", value: "created" },
                { label: "Bagged", value: "bagged" },
                { label: "Sort", value: "sort" },
              ]}
              setStatus={setStatus}
            />
          </Flex>
        }
        onChangeSearch={setSearch}
        search={true}
        columns={COLUMNS.locationsItemsColumns}
        data={items}
        isLoading={isLoading}
        paginationProps={{ activePage, pagedData, setActivePage }}
      />
    </Box>
  );
};

export default memo(Items);
