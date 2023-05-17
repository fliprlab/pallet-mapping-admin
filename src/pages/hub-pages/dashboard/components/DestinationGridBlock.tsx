import { Box, Flex, Grid, Title, createStyles } from "@mantine/core";
import React, { memo } from "react";
import { ICONS } from "../../../../icons";

const DestinationGridBlock: React.FC<TGridOccupied> = ({
  _id,
  occupiedGrids,
}) => {
  const { classes } = useStyles();
  return (
    <Grid.Col lg={4}>
      <Box className={classes.root}>
        <Flex align={"center"}>
          <img alt="location-on" width={35} src={ICONS.locationOn} />
          <Box mx={5}>
            <p className={classes.cardMutedText}>Destination</p>
            <p className={classes.cardTitle}>{_id}</p>
          </Box>
        </Flex>
        <Title m={12} className={classes.cardTitle}>
          Grids Occupied: {occupiedGrids}
        </Title>
      </Box>
    </Grid.Col>
  );
};

export default memo(DestinationGridBlock);

const useStyles = createStyles({
  root: {
    boxShadow:
      "2px 0px 4px rgba(218, 218, 218, 0.7), 0px 2px 4px rgba(214, 214, 214, 0.6)",
    padding: 25,
    backgroundColor: "#FAFAFA",
    borderRadius: 5,
    border: "1px solid #CCCCCC",
  },

  cardMutedText: {
    color: "#8D8D8D",
    fontSize: 12,
    fontWeight: 300,
  },
  cardTitle: {
    color: "#373737",
    fontSize: 14,
    fontWeight: 500,
  },
});
