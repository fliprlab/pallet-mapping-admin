import { Box, Text } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import React, { useMemo, useRef, useState } from "react";
import { COLORS } from "../../colors";
import OutlineButton from "../../components/button/OutlineButton";
import CustomModal, {
  ICustomModalRef,
} from "../../components/modal/CustomModal";
import CustomTableWithHeader from "../../components/table/CustomTableWithHeader";
import { useAddUserMutation } from "../../hooks/users/mutation/useAddUser.mutation";
import { useUpdateUserMutation } from "../../hooks/users/mutation/useUpdateUser.mutation";
import { useGetUsersQuery } from "../../hooks/users/query/useGetUsers.query";
import ActionButton from "./components/ActionButton";
import UserForm from "./components/UserForm";
import { COLUMNS } from "../../columns";

const Users = () => {
  let userColumns = [...COLUMNS.userColumns];
  const modalRef = useRef<ICustomModalRef>(null);
  const [search, setSearch] = useState("");

  const [selectedUser, setSelectedUser] = useState<Partial<TUser>>({
    userName: "",
    origin: "",
  });

  const { isLoading: addLoading, mutateAsync: addMutateAsync } =
    useAddUserMutation();
  const { isLoading: editLoading, mutateAsync: editMutateAsync } =
    useUpdateUserMutation();

  const { data, isLoading } = useGetUsersQuery({ search: search });

  const users = useMemo(() => {
    if (!isLoading && data) {
      return data.data;
    } else {
      return [];
    }
  }, [data, isLoading]);

  const handleAddUser = async (data: Partial<TUser>) => {
    const res = await addMutateAsync(data);
    if (res.status === "success") {
      showNotification({ message: res.message, color: "green" });
      modalRef.current?.toggleModal();
    } else {
      showNotification({ message: res.data.message, color: "red" });
    }
  };
  const handleEditUser = async (id: string, data: Partial<TUser>) => {
    const res = await editMutateAsync({ _id: id, ...data });
    if (res.status === "success") {
      showNotification({ message: res.message, color: "green" });
      setSelectedUser({ userName: "", origin: "" });
      modalRef.current?.toggleModal();
    } else {
      showNotification({ message: res.data.message, color: "red" });
    }
  };

  userColumns.push({
    label: "Activity",
    key: "action",
    renderCell: (data: TUser) => (
      <ActionButton
        id={data._id}
        active={!!data.active}
        onEditClick={() => {
          setSelectedUser(data);
          modalRef.current?.toggleModal();
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
            onClick={() => {
              modalRef.current?.toggleModal();
            }}
          />
        }
        search={true}
        data={users}
        columns={userColumns}
      />
      <CustomModal
        ref={modalRef}
        title={selectedUser._id ? "Edit Users" : "Add Users"}
        subTitle={
          selectedUser._id
            ? "edit up users information and details from here"
            : "add up users information and details from here"
        }
        onClose={() => {
          setSelectedUser({ userName: "", origin: "" });
        }}
      >
        <UserForm
          type={selectedUser._id ? "edit" : "add"}
          isLoading={addLoading || editLoading}
          handleSubmit={(values) => {
            if (selectedUser._id) {
              handleEditUser(selectedUser._id, values);
            } else {
              handleAddUser(values);
            }
          }}
          initialValues={{
            userName: selectedUser.userName || "",
            origin: selectedUser.origin || "",
            password: "",
          }}
        />
      </CustomModal>
    </Box>
  );
};

export default Users;
