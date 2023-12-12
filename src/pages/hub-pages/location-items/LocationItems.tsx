import { Box, Flex, Text } from "@mantine/core";
import React, { memo, useMemo, useState } from "react";
import { COLORS } from "../../../colors";

import { COLUMNS } from "../../../columns";
import { TABLE_PAGE_LIMIT } from "../../../constants";

import UploadItemsBtn from "./UploadItemsBtn";
import { useGetLocationItemsQuery } from "../../../hooks/location-items/query/useGetLocationItems.query";
import { DateRangePicker, DateRangePickerValue } from "@mantine/dates";
import StatusMenu from "../../../components/status-menu/StatusMenu";
import CustomTableWithHeader from "../../../components/table/CustomTableWithHeader";
import DownloadItemsBtn from "./DownloadItemsBtn";

const LocationItems = () => {
  const [activePage, setActivePage] = useState(1);
  const [pagedData, setPagedData] = useState({ total: 0 });
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [date, setDate] = useState<DateRangePickerValue>([null, null]);

  const { isLoading, data, refetch } = useGetLocationItemsQuery(
    {
      itemPerPage: TABLE_PAGE_LIMIT,
      page: activePage,
      search,
      status,
      date,
    },
    "hub"
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
  }, [data, isLoading, activePage, pagedData.total]);

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

        <Flex align={"center"}>
          <UploadItemsBtn refetchData={refetch} />
          <DownloadItemsBtn
            filter={{ date: date, search: search, status: status }}
          />
        </Flex>
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
                { label: "Sort", value: "sort" },
                { label: "Bagged", value: "bagged" },
                { label: "Picked up", value: "picked up" },
                { label: "Dispatched", value: "dispatched" },
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

export default memo(LocationItems);
