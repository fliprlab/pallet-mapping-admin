import { Button, createStyles, Flex } from "@mantine/core";
import React, { memo } from "react";
import { COLORS } from "../../../colors";
import { ICONS } from "../../../icons";

interface IProps {
  active: boolean;
  onActiveClick?: () => void;
  onEditClick?: () => void;
}

const ActionButton: React.FC<IProps> = ({
  active,
  onActiveClick,
  onEditClick,
}) => {
  const { classes } = useStyles();
  return (
    <Flex sx={{ alignSelf: "center" }}>
      <Button
        onClick={onActiveClick}
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
    fontSize: 10,
    padding: "4px 5px",
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
    fontSize: 10,
    padding: "4px 5px",
    margin: "0px 11px",
    height: "auto",
    "&:hover": {
      backgroundColor: COLORS.secondary,
    },
    "&:focus-visible": {
      outline: "none",
    },
  },
  icon: { width: 12 },
});
