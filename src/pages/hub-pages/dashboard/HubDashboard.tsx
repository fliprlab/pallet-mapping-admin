import React, { useMemo } from "react";
import { Box, Container, Grid } from "@mantine/core";
import { useGetOccupiedGridDetailsQuery } from "../../../hooks/grid-occupied/query/useGetOccupiedGridDetails.query";
import DestinationGridBlock from "./components/DestinationGridBlock";
import GridCard from "./components/GridCard";
import GridTable from "./components/grid-table/GridTable";
import { useGridAndUnOccupiedCountQuery } from "../../../hooks/grid/query/hub/useGridAndUnOccupiedCount";

interface ICardData {
  total: number;
  unoccupied: number;
}

const HubDashboard = () => {
  const { isLoading, data } = useGetOccupiedGridDetailsQuery();
  const { data: gridCount, isLoading: gridCountLoading } =
    useGridAndUnOccupiedCountQuery();

  const destinations: TGridOccupied[] = useMemo(() => {
    if (!isLoading && data) {
      return data.data;
    } else {
      return [];
    }
  }, [isLoading, data]);

  const cardData: ICardData = useMemo(() => {
    if (!gridCountLoading && gridCount) {
      return gridCount.data;
    } else {
      return {
        total: 0,
        unoccupied: 0,
      };
    }
  }, [gridCountLoading, gridCount]);

  return (
    <Box>
      <Container fluid mx={20}>
        <Grid gutter={25}>
          <Grid.Col span={12} sm={6} md={3}>
            <GridCard
              title="TOTAL Grid"
              number={cardData.total}
              para="Total Number of Grids"
              bgColor="#00BE7A"
            />
          </Grid.Col>
          <Grid.Col span={12} sm={6} md={3.5}>
            <GridCard
              title="Unoccupied Grid"
              number={cardData.unoccupied}
              para="Total Number of Unoccupied  Grids"
              bgColor="#E78C04"
            />
          </Grid.Col>
        </Grid>

        <Grid gutter={25} mt={60}>
          {destinations.map((location) => (
            <DestinationGridBlock {...location} key={location._id} />
          ))}
        </Grid>
      </Container>
      <GridTable />
    </Box>
  );
};

export default HubDashboard;
