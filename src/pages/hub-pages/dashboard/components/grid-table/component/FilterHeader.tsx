import { Box, Button, Chip, Flex, Menu, createStyles } from "@mantine/core";
import React from "react";

import { useGetLocationsHubQuery } from "../../../../../../hooks/locations/query/hub/useGetLocationsHub.query";
import { IHubGridListFilter } from "../GridTable";

interface IFilterHeader {
  filter: IHubGridListFilter;
  updateFilter: React.Dispatch<React.SetStateAction<IHubGridListFilter>>;
}

const FilterHeader = (props: IFilterHeader) => {
  const { classes } = useStyles();
  const { filter, updateFilter } = props;

  const { data } = useGetLocationsHubQuery();
  return (
    <thead>
      <tr>
        <th
          style={{
            color: "#909090",
            fontWeight: 600,
            fontSize: 14,
            textAlign: "center",
          }}
          colSpan={4}
        >
          <Flex align={"center"} ml={50}>
            <Box>Sort By</Box>
            <Chip
              onChange={() =>
                updateFilter((old) => ({ ...old, sortBy: "ascending" }))
              }
              checked={filter.sortBy === "ascending" ? true : false}
              value={"ascending"}
              classNames={{
                label: classes.chipLabel,
              }}
              size="xs"
              mx={25}
              defaultChecked
              color="gray"
              radius="sm"
            >
              First to Latest
            </Chip>
            <Chip
              onChange={() =>
                updateFilter((old) => ({ ...old, sortBy: "descending" }))
              }
              checked={filter.sortBy === "descending" ? true : false}
              value={"descending"}
              classNames={{
                label: classes.chipLabel,
              }}
              size="xs"
              defaultChecked
              color="gray"
              radius="sm"
            >
              Latest to First
            </Chip>
          </Flex>
        </th>

        <th style={{ textAlign: "center" }}>
          <Menu shadow="md" width={200}>
            <Menu.Target>
              <Button size="xs" className={classes.menuBtn}>
                {filter.destination === "" ? "Destination" : filter.destination}
              </Button>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item
                onClick={() =>
                  updateFilter((old) => ({
                    ...old,
                    destination: "",
                  }))
                }
              >
                {"Destination"}
              </Menu.Item>
              {data?.data &&
                data.data.length > 0 &&
                data.data.map((location: any) => (
                  <Menu.Item
                    onClick={() =>
                      updateFilter((old) => ({
                        ...old,
                        destination: location.location,
                      }))
                    }
                    key={location._id}
                  >
                    {location.location}
                  </Menu.Item>
                ))}
            </Menu.Dropdown>
          </Menu>
        </th>
        <th style={{ textAlign: "center" }}>
          <Menu shadow="md" width={200}>
            <Menu.Target>
              <Button size="xs" className={classes.menuBtn}>
                {filter.status === "" ? "Status" : filter.status}
              </Button>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item
                onClick={() =>
                  updateFilter((old) => ({
                    ...old,
                    status: "",
                  }))
                }
              >
                Status
              </Menu.Item>
              <Menu.Item
                onClick={() =>
                  updateFilter((old) => ({
                    ...old,
                    status: "occupied",
                  }))
                }
              >
                occupied
              </Menu.Item>
              <Menu.Item
                onClick={() =>
                  updateFilter((old) => ({
                    ...old,
                    status: "unoccupied",
                  }))
                }
              >
                unoccupied
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </th>
      </tr>
    </thead>
  );
};

export default FilterHeader;

const useStyles = createStyles({
  chipLabel: {
    backgroundColor: "#FAFAFA !important",
    borderColor: "#D6D6D6",
    color: "#909090",
    fontWeight: 300,
    fontSize: 14,
  },

  menuBtn: {
    backgroundColor: "#FAFAFA !important",
    borderColor: "#D6D6D6",
    color: "#909090",
    fontWeight: 300,
    fontSize: 14,
    height: 25,
  },
});
