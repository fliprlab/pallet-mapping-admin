import { Button, createStyles, Flex } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import React, { memo } from "react";
import { COLORS } from "../../../colors";
import { useUpdateUserMutation } from "../../../hooks/users/mutation/useUpdateUser.mutation";
import { ICONS } from "../../../icons";

interface IProps {
  id: string;
  active: boolean;
  onEditClick?: () => void;
}

const ActionButton: React.FC<IProps> = ({ id, active, onEditClick }) => {
  const { classes } = useStyles();
  const { isLoading, mutateAsync } = useUpdateUserMutation();
  const updateStatus = async () => {
    const res = await mutateAsync({ id, data: { active: !active } });
    if (res.status === "success") {
      showNotification({ message: res.message, color: "green" });
    } else {
      showNotification({ message: res.data.message, color: "red" });
    }
  };
  return (
    <Flex sx={{ alignSelf: "center" }}>
      <Button
        loading={isLoading}
        disabled={isLoading}
        onClick={updateStatus}
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
        leftIcon={<img className={classes.icon} src={ICONS.edit} alt="edit" />}
      >
        Edit
      </Button>
    </Flex>
  );
};

export default memo(ActionButton);

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
