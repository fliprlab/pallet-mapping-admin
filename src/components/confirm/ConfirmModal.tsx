import { Box, Button, Flex, Modal, Text, createStyles } from "@mantine/core";
import { useToggle } from "@mantine/hooks";
import React, {
  ForwardedRef,
  forwardRef,
  memo,
  useImperativeHandle,
} from "react";
import { COLORS } from "../../colors";

interface IConfirmModalProps {
  title: string;
  subtitle: string;
  handleYesClick: () => void;
}

export interface IConfirmModalRef {
  toggleModal: () => void;
}

const ConfirmModal = (
  props: IConfirmModalProps,
  ref: ForwardedRef<IConfirmModalRef>
) => {
  const { subtitle, title } = props;
  const [opened, toggle] = useToggle();
  const { classes } = useStyles();

  useImperativeHandle(
    ref,
    () => {
      return { toggleModal: toggle };
    },
    [toggle]
  );

  return (
    <Modal radius={"md"} opened={opened} onClose={toggle} centered size={612}>
      <Box p={20}>
        <Box mb={30}>
          <Text weight={500} align="center" color={COLORS.black} size={18}>
            {title}
          </Text>
          <Text weight={400} align="center" color={COLORS.lightGrey} size={12}>
            {subtitle}
          </Text>
        </Box>
        <Flex align={"center"} justify={"center"}>
          <Button
            onClick={props.handleYesClick}
            className={classes.root}
            styles={{ leftIcon: { marginRight: 4 } }}
          >
            Yes
          </Button>
          <Button
            onClick={() => toggle()}
            className={classes.cancelBtn}
            styles={{ leftIcon: { marginRight: 4 } }}
          >
            No
          </Button>
        </Flex>
      </Box>
    </Modal>
  );
};

export default memo(forwardRef(ConfirmModal));

const useStyles = createStyles({
  root: {
    borderColor: "#007DC2",
    backgroundColor: "#007DC2",
    color: COLORS.white,
    fontWeight: 600,
    fontSize: 14,
    padding: "6px 6px",
    margin: "0px 10px",
    height: "auto",
    minWidth: 75,
    "&:hover": {
      backgroundColor: "#007DC2",
    },
    "&:focus-visible": {
      outline: "none",
    },
  },

  cancelBtn: {
    borderColor: "#E71F19",
    backgroundColor: "#E71F19",
    color: COLORS.white,
    fontWeight: 600,
    fontSize: 14,
    padding: "6px 6px",
    margin: "0px 10px",
    height: "auto",
    minWidth: 75,
    "&:hover": {
      backgroundColor: "#E71F19",
    },
    "&:focus-visible": {
      outline: "none",
    },
  },
});
