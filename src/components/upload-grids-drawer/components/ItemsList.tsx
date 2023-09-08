import {
  ActionIcon,
  Box,
  Collapse,
  Flex,
  Table,
  Title,
  Tooltip,
  createStyles,
} from "@mantine/core";
import { useToggle } from "@mantine/hooks";
import { IconChevronDown, IconChevronUp, IconDownload } from "@tabler/icons";
import React, { memo } from "react";
import { usePapaParse } from "react-papaparse";

interface IItemsList {
  title: string;
  color: string;
  items: TGrid[];
}

const ItemsList: React.FC<IItemsList> = ({ title, color, items }) => {
  const { classes } = useStyles();
  const [opened, toggle] = useToggle();
  const { jsonToCSV } = usePapaParse();
  const handleDownloadReport = () => {
    const results = jsonToCSV(
      items.map((grid) => ({
        gridId: grid.gridId,
        location: grid.hub.name,
        reason: grid.reason,
      }))
    );
    const csvData = new Blob([results], { type: "text/csv;charset=utf-8;" });

    const csvURL = window.URL.createObjectURL(csvData);
    const tempLink = document.createElement("a");
    tempLink.href = csvURL;
    tempLink.setAttribute("download", `${title}.csv`);
    tempLink.click();
  };

  return (
    <Box className={classes.root} my={15}>
      <Flex
        onClick={() => toggle()}
        sx={{ cursor: "pointer", padding: "5px 10px" }}
        justify={"space-between"}
        align={"center"}
      >
        <Title color={color} order={6}>
          {title} - {items.length}
        </Title>
        <Flex align={"center"}>
          <ActionIcon p={0}>
            {opened ? <IconChevronUp /> : <IconChevronDown />}
          </ActionIcon>
          <Tooltip label="Download">
            <ActionIcon
              onClick={(e) => {
                e.stopPropagation();
                handleDownloadReport();
              }}
              p={0}
            >
              <IconDownload size={20} />
            </ActionIcon>
          </Tooltip>
        </Flex>
      </Flex>

      <Collapse in={opened}>
        <Table>
          <thead>
            <tr>
              <th>Grid Id</th>
              <th>Location</th>
              <th>Reason</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item._id}>
                <td>{item.gridId}</td>
                <td>{item.hub.name}</td>
                <td>{item.reason}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Collapse>
    </Box>
  );
};

export default memo(ItemsList);

const useStyles = createStyles({
  root: {
    border: "1px solid #e7e7e7",
    borderRadius: 8,
  },
});
