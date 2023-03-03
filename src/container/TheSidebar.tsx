import { Box, createStyles } from "@mantine/core";
import { IconArrowUpCircle } from "@tabler/icons";
import React, { memo, useState } from "react";
import { COLORS } from "../colors";
import { MainLinks } from "./MainLinks";

const TheSidebar = () => {
  const { classes } = useStyles();
  const [hidden, setHidden] = useState(true);
  return (
    <Box
      bg={COLORS.primary}
      p={"2.9em"}
      className={`${classes.root} ${!hidden && classes.activeNav}`}
    >
      <Box mb={70}>
        <IconArrowUpCircle
          color={COLORS.white}
          style={{ transform: hidden ? "rotate(90deg)" : "rotate(-90deg)" }}
          size={30}
          onClick={() => {
            setHidden((value) => !value);
          }}
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
    width: 138,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,

    transition: "all 500ms",
  },
  activeNav: {
    width: "276px !important",
  },
});
