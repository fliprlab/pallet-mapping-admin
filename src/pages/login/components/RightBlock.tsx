import { Box, createStyles, Text } from "@mantine/core";
import React, { memo } from "react";
import { COLORS } from "../../../colors";
import { IMAGES } from "../../../images";

const RightBlock = () => {
  const { classes } = useStyles();
  return (
    <Box sx={{ width: "100%", textAlign: "center" }}>
      <img
        className={classes.banner}
        src={IMAGES.login_banner}
        alt="login Banner"
      />
      <Box mt={"lg"}>
        <Text align="center" size={26} weight={600} color={COLORS.primary}>
          Pallet Mapping Dashboard
        </Text>
        <Text align="center" size={16} weight={400} color={COLORS.gray} mt={10}>
          flipkart pallet mapping dashboard to ease the life of daily shipments
        </Text>
      </Box>
    </Box>
  );
};

export default memo(RightBlock);

const useStyles = createStyles({
  banner: {
    width: "90%",
    margin: "auto",
  },
});
