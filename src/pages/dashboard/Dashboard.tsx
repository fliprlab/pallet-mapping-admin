import { Box } from "@mantine/core";
import CustomTable from "./components/CustomTable";
import { styles } from "./useStyles";

const Dashboard = () => {
  const { classes } = styles();
  return (
    <Box>
      <Box className={classes.root}>
        <h1 className={classes.heading}>Welcome To</h1>
        <p className={classes.para}>UPN2 Store Dashboard</p>
      </Box>
      <CustomTable />
    </Box>
  );
};

export default Dashboard;
