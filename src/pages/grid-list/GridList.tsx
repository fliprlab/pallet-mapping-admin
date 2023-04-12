import { Box, Flex, Text } from "@mantine/core";
import React, { useMemo, useRef } from "react";
import { COLORS } from "../../colors";
import CustomTable from "../../components/table/CustomTable";
import OutlineButton from "../../components/button/OutlineButton";
import CustomModal, {
  ICustomModalRef,
} from "../../components/modal/CustomModal";
import AddGridForm from "./components/AddGridForm";
import { useGetGridsQuery } from "../../hooks/grid/query/useGetGrids.query";
import { COLUMNS } from "../../columns";

const GridList = () => {
  const modalRef = useRef<ICustomModalRef>(null);
  const { isLoading, data } = useGetGridsQuery({});

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
