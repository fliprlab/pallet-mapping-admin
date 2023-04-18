import { Box, Text } from "@mantine/core";

import React, { useMemo, useRef, useState } from "react";
import { COLORS } from "../../colors";
import OutlineButton from "../../components/button/OutlineButton";
import CustomTableWithHeader from "../../components/table/CustomTableWithHeader";
import { COLUMNS } from "../../columns";
import { TABLE_PAGE_LIMIT } from "../../constants";
import Actions from "./components/Actions";
import HubAdminModal, { IHubAdminModalRef } from "./components/HubAdminModal";
import { useGetHubAdminsQuery } from "../../hooks/hub-admin/query/useGetHubAdmins.query";
import UpdateHubPassModal, {
  IUpdateHubPassModalRef,
} from "./components/UpdateHubPassModal";

const HubAdmin = () => {
  let userColumns = [...COLUMNS.hubAdminsColumns];
  const [search, setSearch] = useState("");
  const [activePage, setActivePage] = useState(1);
  const [pagedData, setPagedData] = useState({ total: 0 });

  const hubAdminModalRef = useRef<IHubAdminModalRef>(null);
  const hubUpdatePassModalRef = useRef<IUpdateHubPassModalRef>(null);

  const { data, isLoading } = useGetHubAdminsQuery(
    { page: activePage, itemPerPage: TABLE_PAGE_LIMIT },
    { search: search }
  );

  const users = useMemo(() => {
    if (!isLoading && data) {
      data.pageData && setPagedData(data.pageData);
      return data.data;
    } else {
      return [];
    }
  }, [data, isLoading]);

  userColumns.push({
    label: "Activity",
    key: "action",
    renderCell: (data: TUser) => (
      <Actions
        search={search}
        paging={{ itemPerPage: TABLE_PAGE_LIMIT, page: activePage }}
        _id={data._id}
        active={!!data.active}
        onEditClick={() => {
          hubUpdatePassModalRef.current?.updateUserId(data._id);
          hubUpdatePassModalRef.current?.toggleModal();
        }}
      />
    ),
  });

  return (
    <Box>
      <Box sx={{ marginBottom: "2em" }}>
        <Text size={18} color={COLORS.black} ml={32}>
          Hub Admin Details
        </Text>
      </Box>
      <CustomTableWithHeader
        onChangeSearch={setSearch}
        isLoading={isLoading}
        rightComponent={
          <OutlineButton
            title="Add Hub Admin"
            onClick={() => hubAdminModalRef.current?.toggleModal()}
          />
        }
        search={true}
        data={users}
        columns={userColumns}
        paginationProps={{ activePage, pagedData, setActivePage }}
      />
      <HubAdminModal
        search={search}
        ref={hubAdminModalRef}
        paging={{ itemPerPage: TABLE_PAGE_LIMIT, page: activePage }}
      />
      <UpdateHubPassModal
        search={search}
        ref={hubUpdatePassModalRef}
        paging={{ itemPerPage: TABLE_PAGE_LIMIT, page: activePage }}
      />
    </Box>
  );
};

export default HubAdmin;
