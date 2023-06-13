import { Box, createStyles, Flex, Text } from "@mantine/core";
import React, { memo } from "react";
import { COLORS } from "../colors";
import { ICONS } from "../icons";
import { logoutUser } from "../services/authenticate.service";
import { useLocation } from "react-router-dom";

const TheHeader = () => {
  const { classes } = useStyle();
  const pathname = useLocation().pathname;
  const role = sessionStorage.getItem("role");
  const location = sessionStorage.getItem("location");

  return (
    <Box className={classes.header}>
      {pathname === "/hub/dashboard" ? (
        <Text size={18}>Dashboard</Text>
      ) : (
        <Box />
      )}
      <Flex
        onClick={() => logoutUser()}
        align={"center"}
        sx={{ cursor: "pointer" }}
      >
        {role === "hub-admin" && (
          <>
            <img src={ICONS.locationOn} className={classes.icon} alt="logout" />
            <Text size={16} weight="500" color={COLORS.primary} mr={25}>
              {location}
            </Text>
          </>
        )}

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
    justifyContent: "space-between",
    padding: "2em 2em",
  },
  icon: {
    width: 20,
    marginRight: 2,
  },
});
