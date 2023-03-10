import { Box, Text } from "@mantine/core";
import { COLORS } from "../../colors";

const Dashboard = () => {
  return (
    <Box>
      <Box sx={{ marginBottom: "2em" }}>
        <Text size={18} color={COLORS.black} ml={32}>
          Dashboard
        </Text>
      </Box>
    </Box>
  );
};

export default Dashboard;
