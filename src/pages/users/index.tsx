import { Box, Text } from "@mantine/core";
import React, { useRef } from "react";
import { COLORS } from "../../colors";
import OutlineButton from "../../components/button/OutlineButton";
import CustomModal, {
  ICustomModalRef,
} from "../../components/modal/CustomModal";
import CustomTable from "../../components/table/CustomTable";
import ActionButton from "./components/ActionButton";
import UserForm from "./components/UserForm";

const data = [
  {
    bagId: "********",
    storeName: "User 1",
    createdAt: "Banglore",
  },
  {
    bagId: "********",
    storeName: "User 2",
    createdAt: "Banglore",
  },
  {
    bagId: "********",
    storeName: "User 3",
    createdAt: "Banglore",
  },
  {
    bagId: "********",
    storeName: "User 4",
    createdAt: "Banglore",
  },
  {
    bagId: "********",
    storeName: "User 5",
    createdAt: "Banglore",
  },
  {
    bagId: "********",
    storeName: "User 6",
    createdAt: "Banglore",
  },
];

const columns: TTableColumns[] = [
  {
    label: "User Name",
    key: "storeName",
    renderCell: (data: any) => <div>{data.storeName}</div>,
  },
  { label: "Password", key: "bagId" },
  { label: "Origin", key: "createdAt" },
  {
    label: "Activity",
    key: "action",
    renderCell: () => <ActionButton active={true} />,
  },
];

const Users = () => {
  const modalRef = useRef<ICustomModalRef>(null);
  return (
    <Box>
      <Box mb={58}>
        <Text size={18} color={COLORS.black} ml={32}>
          Users Details
        </Text>
      </Box>
      <CustomTable
        rightComponent={
          <OutlineButton
            onClick={() => {
              modalRef.current?.toggleModal();
            }}
          />
        }
        search={true}
        data={data}
        columns={columns}
      />
      <CustomModal
        ref={modalRef}
        title="Add Users"
        subTitle="add up users information and  details from here"
      >
        <UserForm
          handleSubmit={() => {}}
          initialValues={{ name: "", origin: "", password: "password" }}
        />
      </CustomModal>
    </Box>
  );
};

export default Users;
