import React, { useMemo } from "react";
import { Box, Text, Container, Grid } from "@mantine/core";
import { COLORS } from "../../../colors";
import { useGetOccupiedGridDetailsQuery } from "../../../hooks/grid-occupied/query/useGetOccupiedGridDetails.query";
import DestinationGridBlock from "./components/DestinationGridBlock";
import GridCard from "./components/GridCard";

const HubDashboard = () => {
  const { isLoading, data } = useGetOccupiedGridDetailsQuery();

  const destinations: TGridOccupied[] = useMemo(() => {
    if (!isLoading && data) {
      return data.data;
    } else {
      return [];
    }
  }, [isLoading, data]);

  return (
    <Box>
      <Box sx={{ marginBottom: "2em" }}>
        <Text size={18} color={COLORS.black} ml={32}>
          Dashboard
        </Text>
      </Box>
      <Container fluid mx={20}>
        <Grid gutter={25}>
          <Grid.Col span={12} sm={6} md={3}>
            <GridCard
              title="TOTAL Grid"
              number={89}
              para="Total Number of Grids"
              bgColor="#00BE7A"
            />
          </Grid.Col>
          <Grid.Col span={12} sm={6} md={4}>
            <GridCard
              title="Unoccupied Grid"
              number={14}
              para="Total Number of Unoccupied  Grids"
              bgColor="#E78C04"
            />
          </Grid.Col>
        </Grid>

        <Grid gutter={25}>
          {destinations.map((location) => (
            <DestinationGridBlock {...location} key={location._id} />
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default HubDashboard;
