import { Box, createStyles, Text } from "@mantine/core";
import React, { memo } from "react";
import { COLORS } from "../colors";
import { ICONS } from "../icons";

const TheHeader = () => {
  const { classes } = useStyle();
  return (
    <Box className={classes.header}>
      <img src={ICONS.logout} className={classes.icon} alt="logout" />
      <Text size={20} weight="500" color={COLORS.primary}>
        Logout
      </Text>
    </Box>
  );
};

export default memo(TheHeader);

const useStyle = createStyles({
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "3.8em 5em",
  },
  icon: {
    width: 30,
  },
});
