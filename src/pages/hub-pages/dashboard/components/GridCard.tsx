import React, { memo } from "react";
import { Box, createStyles, Flex } from "@mantine/core";
import { COLORS } from "../../../../colors";
import { ICONS } from "../../../../icons";

interface IGridCard {
  title: string;
  number: number;
  para: string;
  bgColor: string;
}

const GridCard: React.FC<IGridCard> = ({ number, para, title, bgColor }) => {
  const { classes } = useStyles();
  return (
    <Box
      className={classes.card}
      sx={{
        backgroundColor: bgColor,
      }}
    >
      <h5 className={classes.title}>{title}</h5>
      <Flex align={"center"}>
        <Box>
          <img src={ICONS.grid} alt="" className={classes.iconImage} />
        </Box>
        <Box className={classes.number}>{number}</Box>
      </Flex>
      <Box>
        <p className={classes.para}>{para}</p>
      </Box>
    </Box>
  );
};

export default memo(GridCard);

const useStyles = createStyles({
  card: {
    padding: "19px 26px",
    borderRadius: "5px",
    boxShadow:
      "2px 0px 4px rgba(218, 218, 218, 0.7), 0px 2px 4px rgba(214, 214, 214, 0.6)",
    border: " 1px solid #CCCCCC",
    height: "100%",
  },
  title: {
    fontWeight: 700,
    fontSize: 10,
    color: COLORS.white,
    paddingBottom: 5,
  },
  iconImage: {
    width: 18,
    height: 18,
  },
  number: {
    fontWeight: 600,
    fontSize: 26,
    color: COLORS.white,
    marginLeft: 9,
  },
  para: {
    fontWeight: 400,
    fontSize: 14,
    color: COLORS.white,
    marginTop: 8,
  },
});
