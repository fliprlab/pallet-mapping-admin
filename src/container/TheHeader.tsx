import { Box, createStyles, Flex, Text } from "@mantine/core";
import React, { memo } from "react";
import { COLORS } from "../colors";
import { ICONS } from "../icons";
import { logoutUser } from "../services/authenticate.service";

const TheHeader = () => {
  const { classes } = useStyle();

  return (
    <Box className={classes.header}>
      <Flex
        onClick={() => logoutUser()}
        align={"center"}
        sx={{ cursor: "pointer" }}
      >
        <img src={ICONS.logout} className={classes.icon} alt="logout" />
        <Text size={16} weight="500" color={COLORS.primary}>
          Logout
        </Text>
      </Flex>
    </Box>
  );
};

export default memo(TheHeader);

const useStyle = createStyles({
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "2em 2em",
  },
  icon: {
    width: 20,
    marginRight: 2,
  },
});
