import { Box, Flex, Text } from "@mantine/core";
import React, { useMemo, useRef, useState } from "react";
import { COLORS } from "../../colors";
import CustomTable from "../../components/table/CustomTable";
import OutlineButton from "../../components/button/OutlineButton";
import CustomModal, {
  ICustomModalRef,
} from "../../components/modal/CustomModal";
import AddGridForm from "./components/AddGridForm";
import { useGetGridsQuery } from "../../hooks/grid/query/useGetGrids.query";
import { COLUMNS } from "../../columns";
import { TABLE_PAGE_LIMIT } from "../../constants";
import { showNotification } from "@mantine/notifications";

const GridList = () => {
  const modalRef = useRef<ICustomModalRef>(null);

  const [activePage, setActivePage] = useState(1);
  const [pagedData, setPagedData] = useState({ total: 0 });

  const { isLoading, data } = useGetGridsQuery(
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

  const grids = useMemo(() => {
    if (!isLoading && data) {
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
        <OutlineButton
          title="Add Grid"
          onClick={() => {
            modalRef.current?.toggleModal();
          }}
        />
      </Flex>
      <CustomTable
        columns={COLUMNS.gridColumns}
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

export default GridList;
