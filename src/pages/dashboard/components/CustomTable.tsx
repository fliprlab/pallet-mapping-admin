import React, { useState } from "react";
import { Box, createStyles, Text, Table } from "@mantine/core";
import { useGetAllBagsQuery } from "../../../hooks/bag/useGetAllBagsQuery";
import { showNotification } from "@mantine/notifications";
import moment from "moment";

const styles = createStyles({
  root: {
    margin: "45px 70px",
    border: "1px solid #D6D6D6",
    borderRadius: 5,
  },
  header: {
    padding: 20,
    borderBottom: "1px solid #D6D6D6",
  },
  tableContainer: {
    padding: 18,
  },
  tHead: {
    fontWeight: 600,
    fontSize: "18px !important",
    color: "#000 !important",
    textAlign: "center",
  },
});

const CustomTable = () => {
  const { classes } = styles();
  const [data, setData] = useState<any[]>([
    {
      storeName: "UPN2",
      bagId: "SPOOUPN21234",
      createdAt: "Jan 27, 2023, 10:23 PM",
    },
    {
      storeName: "UPN2",
      bagId: "SPOOUPN21234",
      createdAt: "Jan 27, 2023, 10:23 PM",
    },
    {
      storeName: "UPN2",
      bagId: "SPOOUPN21234",
      createdAt: "Jan 27, 2023, 10:23 PM",
    },
    {
      storeName: "UPN2",
      bagId: "SPOOUPN21234",
      createdAt: "Jan 27, 2023, 10:23 PM",
    },
    {
      storeName: "UPN2",
      bagId: "SPOOUPN21234",
      createdAt: "Jan 27, 2023, 10:23 PM",
    },
  ]);
  const isLoading = false;
  // const { isLoading } = useGetAllBagsQuery({
  //   onSuccess: (res) => {
  //     if (res.status === "success") {
  //       if (res.data.length > 0) {
  //         setData(res.data);
  //       } else {
  //         showNotification({
  //           message: "No data to show",
  //           color: "red",
  //         });
  //       }
  //     }
  //   },
  // });

  return (
    <Box className={classes.root}>
      <Box className={classes.header}>
        <Text style={{ fontSize: 18, color: "#000" }}>Bag Details</Text>
      </Box>
      {!isLoading && (
        <Box className={classes.tableContainer}>
          <Table
            withBorder={false}
            verticalSpacing={"md"}
            striped
            style={{ textAlign: "center" }}
          >
            <thead>
              <tr>
                <th className={classes.tHead} style={{ textAlign: "center" }}>
                  Location Name
                </th>
                <th className={classes.tHead} style={{ textAlign: "center" }}>
                  Bag ID
                </th>
                <th className={classes.tHead} style={{ textAlign: "center" }}>
                  Inbound Bag Time
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => {
                return (
                  <tr
                    key={item.id}
                    style={{
                      backgroundColor: index % 2 ? "#FFFFFF" : "#D6D6D6",
                    }}
                  >
                    <td
                      style={{ fontSize: 16, fontWeight: 300, color: "#000" }}
                    >
                      {item.storeName}
                    </td>
                    <td
                      style={{ fontSize: 16, fontWeight: 300, color: "#000" }}
                    >
                      {item.bagId}
                    </td>
                    <td
                      style={{ fontSize: 16, fontWeight: 300, color: "#000" }}
                    >
                      {moment(item.createdAt).format("lll")}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Box>
      )}
    </Box>
  );
};

export default CustomTable;
