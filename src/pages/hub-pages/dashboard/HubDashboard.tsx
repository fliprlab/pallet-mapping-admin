import React, { useMemo } from "react";
import { Box, Text, Container, Grid } from "@mantine/core";
import { COLORS } from "../../../colors";
import { useGetOccupiedGridDetailsQuery } from "../../../hooks/grid-occupied/query/useGetOccupiedGridDetails.query";
import DestinationGridBlock from "./components/DestinationGridBlock";

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
          {destinations.map((location) => (
            <DestinationGridBlock {...location} key={location._id} />
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default HubDashboard;
