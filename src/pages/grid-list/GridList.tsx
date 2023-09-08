import { Box, Flex, SegmentedControl, Text } from "@mantine/core";
import React, { memo, useMemo, useRef, useState } from "react";
import { COLORS } from "../../colors";

import OutlineButton from "../../components/button/OutlineButton";
import CustomModal, {
  ICustomModalRef,
} from "../../components/modal/CustomModal";
import AddGridForm from "./components/AddGridForm";
import { useGetGridsQuery } from "../../hooks/grid/query/useGetGrids.query";
import { COLUMNS } from "../../columns";
import { TABLE_PAGE_LIMIT } from "../../constants";

import UploadGridBtn from "./components/UploadGridBtn";
import CustomTableWithHeader from "../../components/table/CustomTableWithHeader";
import ActionBtn from "./components/ActionBtn";

const GridList = () => {
  const tableColumns = [...COLUMNS.gridColumns];
  const modalRef = useRef<ICustomModalRef>(null);
  const [activePage, setActivePage] = useState(1);
  const [pagedData, setPagedData] = useState({ total: 0 });
  const [active, setActive] = useState("active");
  const [search, setSearch] = useState("");

  const { isLoading, data, refetch } = useGetGridsQuery({
    itemPerPage: TABLE_PAGE_LIMIT,
    page: activePage,
    inactive: active,
    search,
  });

  const grids = useMemo(() => {
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

  tableColumns.push({
    label: "Action",
    key: "action",
    renderCell: (row) => <ActionBtn refetch={refetch} data={row} />,
  });
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

        <Flex align={"center"}>
          <UploadGridBtn refetchData={refetch} />
          <OutlineButton
            title="Add Grid"
            onClick={() => {
              modalRef.current?.toggleModal();
            }}
          />
        </Flex>
      </Flex>

      <CustomTableWithHeader
        rightComponent={
          <SegmentedControl
            color="blue"
            value={active}
            onChange={(value) => setActive(value)}
            data={[
              { label: "Active", value: "active" },
              { label: "In-Active", value: "in-active" },
            ]}
          />
        }
        onChangeSearch={setSearch}
        search={true}
        columns={tableColumns}
        data={grids}
        isLoading={isLoading}
        paginationProps={{ activePage, pagedData, setActivePage }}
      />
      <CustomModal ref={modalRef} title={"Add Grid"}>
        <AddGridForm
          toggle={() => {
            modalRef.current?.toggleModal();
          }}
        />
      </CustomModal>
    </Box>
  );
};

export default memo(GridList);
