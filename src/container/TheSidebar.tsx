import { Box, Burger, createStyles } from "@mantine/core";
import React, { memo, useState } from "react";
import { COLORS } from "../colors";
import { MainLinks } from "./MainLinks";

const TheSidebar = () => {
  const { classes } = useStyles();
  const [hidden, setHidden] = useState(true);
  return (
    <Box
      bg={COLORS.primary}
      p={"1.5em"}
      className={`${classes.root} ${!hidden && classes.activeNav}`}
    >
      <Box mb={30}>
        <Burger
          opened={!hidden}
          onClick={() => {
            setHidden((value) => !value);
          }}
          size={20}
          color={COLORS.white}
        />
      </Box>
      <Box>
        <MainLinks hidden={hidden} />
      </Box>
    </Box>
  );
};

export default memo(TheSidebar);

const useStyles = createStyles({
  root: {
    width: 78,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,

    transition: "all 500ms",
  },
  activeNav: {
    width: "206px !important",
  },
});
