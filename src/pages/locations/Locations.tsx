import { Box, Text } from "@mantine/core";
import React, { useMemo, useRef, useState } from "react";
import { COLORS } from "../../colors";
import CustomTable from "../../components/table/CustomTable";
import { COLUMNS } from "../../columns";
import OutlineButton from "../../components/button/OutlineButton";
import AddLocationForm from "./components/AddLocationForm";
import CustomModal, {
  ICustomModalRef,
} from "../../components/modal/CustomModal";
import { useGetLocations } from "../../hooks/locations/query/useGetLocations.query";

const Locations = () => {
  const [search, setSearch] = useState("");
  const modalRef = useRef<ICustomModalRef>(null);
  const { isLoading, data } = useGetLocations({ search: search });

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
      <CustomTable
        onChangeSearch={setSearch}
        isLoading={isLoading}
        rightComponent={
          <OutlineButton
            title="Add Location"
            onClick={() => {
              modalRef.current?.toggleModal();
            }}
          />
        }
        search={true}
        data={locations}
        columns={COLUMNS.locationsColumns}
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
