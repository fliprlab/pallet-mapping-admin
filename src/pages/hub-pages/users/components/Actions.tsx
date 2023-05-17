import { Button, createStyles, Flex } from "@mantine/core";
import React, { memo, useRef } from "react";

import { showNotification } from "@mantine/notifications";
import { useUpdateHubUserStatusMutation } from "../../../../hooks/users/mutation/hub/useUpdateHubUserStatus.mutation";
import { ICONS } from "../../../../icons";
import ConfirmModal, {
  IConfirmModalRef,
} from "../../../../components/confirm/ConfirmModal";
import { COLORS } from "../../../../colors";

interface IProps {
  _id: string;
  active: boolean;
  onEditClick?: () => void;
  paging: TPaging;
  search: string;
}

const Actions: React.FC<IProps> = ({
  active,
  onEditClick,
  search,
  paging,
  _id,
}) => {
  const { classes } = useStyles();
  const confirmModalRef = useRef<IConfirmModalRef>(null);

  const { mutateAsync, isLoading } = useUpdateHubUserStatusMutation(
    search,
    paging
  );
  const updateStatus = async () => {
    if (isLoading) {
      return null;
    }
    const res = await mutateAsync({ _id: _id, active: active });
    if (res.status === "success") {
      confirmModalRef.current?.toggleModal();
      showNotification({ message: res.message, color: "green" });
    } else {
      showNotification({ message: res.data.message, color: "red" });
    }
  };

  return (
    <>
      <Flex sx={{ alignSelf: "center" }}>
        <Button
          onClick={() => {
            confirmModalRef.current?.toggleModal();
          }}
          className={active ? classes.root : classes.activeBtn}
          styles={{ leftIcon: { marginRight: 4 } }}
          leftIcon={
            <img
              className={classes.icon}
              src={active ? ICONS.eye : ICONS.eye_off}
              alt="action icon"
            />
          }
        >
          Active
        </Button>
        <Button
          onClick={onEditClick}
          className={classes.root}
          styles={{ leftIcon: { marginRight: 4 } }}
          leftIcon={
            <img className={classes.icon} src={ICONS.edit} alt="edit" />
          }
        >
          Update Password
        </Button>
      </Flex>
      <ConfirmModal
        handleYesClick={updateStatus}
        ref={confirmModalRef}
        title={active ? "Inactivate User" : "Activate User"}
        subtitle={
          active
            ? "Are you sure you want to deactivate this user?"
            : "Are you sure you want to activate this user?"
        }
      />
    </>
  );
};

export default memo(Actions);

const useStyles = createStyles({
  root: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary,
    color: COLORS.white,
    fontWeight: 500,
    fontSize: 12,
    padding: "6px 6px",
    margin: "0px 11px",
    height: "auto",
    "&:hover": {
      backgroundColor: COLORS.primary,
    },
    "&:focus-visible": {
      outline: "none",
    },
  },
  activeBtn: {
    borderColor: COLORS.secondary,
    backgroundColor: COLORS.secondary,
    color: COLORS.white,
    fontWeight: 500,
    fontSize: 12,
    padding: "6px",
    margin: "0px 11px",
    height: "auto",
    "&:hover": {
      backgroundColor: COLORS.secondary,
    },
    "&:focus-visible": {
      outline: "none",
    },
  },
  icon: { width: 15 },
});
