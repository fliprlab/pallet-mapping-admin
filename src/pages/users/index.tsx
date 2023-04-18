import { Box, Text } from "@mantine/core";

import React, { useMemo, useRef, useState } from "react";
import { COLORS } from "../../colors";
import OutlineButton from "../../components/button/OutlineButton";
import CustomTableWithHeader from "../../components/table/CustomTableWithHeader";
import { COLUMNS } from "../../columns";
import { TABLE_PAGE_LIMIT } from "../../constants";
import Actions from "./components/Actions";

import { useGetUsersQuery } from "../../hooks/users/query/useGetUsers.query";
import UserModal, { IUserModalRef } from "./components/UserModal";
import UpdateUserPassModal, {
  IUpdateUserPassModalRef,
} from "./components/UpdateUserPassModal";

const Users = () => {
  let userColumns = [...COLUMNS.userColumns];
  const [search, setSearch] = useState("");
  const [activePage, setActivePage] = useState(1);
  const [pagedData, setPagedData] = useState({ total: 0 });

  const hubAdminModalRef = useRef<IUserModalRef>(null);
  const hubUpdatePassModalRef = useRef<IUpdateUserPassModalRef>(null);

  const { data, isLoading } = useGetUsersQuery(
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
          Users Details
        </Text>
      </Box>
      <CustomTableWithHeader
        onChangeSearch={setSearch}
        isLoading={isLoading}
        rightComponent={
          <OutlineButton
            title="Add User"
            onClick={() => hubAdminModalRef.current?.toggleModal()}
          />
        }
        search={true}
        data={users}
        columns={userColumns}
        paginationProps={{ activePage, pagedData, setActivePage }}
      />
      <UserModal
        search={search}
        ref={hubAdminModalRef}
        paging={{ itemPerPage: TABLE_PAGE_LIMIT, page: activePage }}
      />
      <UpdateUserPassModal
        search={search}
        ref={hubUpdatePassModalRef}
        paging={{ itemPerPage: TABLE_PAGE_LIMIT, page: activePage }}
      />
    </Box>
  );
};

export default Users;
