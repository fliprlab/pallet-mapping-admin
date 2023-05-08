import { Box, Text } from "@mantine/core";
import React, { useMemo, useRef, useState } from "react";
import { COLORS } from "../../colors";
import CustomTableWithHeader from "../../components/table/CustomTableWithHeader";
import { COLUMNS } from "../../columns";
import OutlineButton from "../../components/button/OutlineButton";
import AddLocationForm from "./components/AddLocationForm";
import CustomModal, {
  ICustomModalRef,
} from "../../components/modal/CustomModal";
import { useGetLocations } from "../../hooks/locations/query/useGetLocations.query";
import { TABLE_PAGE_LIMIT } from "../../constants";
import { showNotification } from "@mantine/notifications";

const Locations = () => {
  const modalRef = useRef<ICustomModalRef>(null);
  const [activePage, setActivePage] = useState(1);
  const [pagedData, setPagedData] = useState({ total: 0 });
  const { isLoading, data } = useGetLocations(
    {
      itemPerPage: TABLE_PAGE_LIMIT,
      page: activePage,
    },
    {
      onSuccess: (res) => {
        if (res.status === "success") {
          console.log("res.data.pageData", res.pageData);
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
          Locations
        </Text>
      </Box>
      <CustomTableWithHeader
        isLoading={isLoading}
        rightComponent={
          <OutlineButton
            title="Add Location"
            onClick={() => {
              modalRef.current?.toggleModal();
            }}
          />
        }
        search={false}
        data={locations}
        columns={COLUMNS.locationsColumns}
        paginationProps={{ activePage, pagedData, setActivePage }}
      />

      <CustomModal ref={modalRef} title={"Add Location"}>
        <AddLocationForm
          toggleModal={() => {
            modalRef.current?.toggleModal();
          }}
        />
      </CustomModal>
    </Box>
  );
};

export default Locations;
