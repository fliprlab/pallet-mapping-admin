import { AppShell, Box } from "@mantine/core";
import { Outlet } from "react-router-dom";
import TheHeader from "./TheHeader";
import TheSidebar from "./TheSidebar";
import InvalidItemDrawer from "../components/invalid-items-drawer/InvalidItemDrawer";

interface IProps {
  navs: TSidebar[];
}

const TheLayout = ({ navs }: IProps) => {
  return (
    <AppShell
      styles={{
        main: {
          background: "#F5F5F5",
          padding: 0,
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={<TheSidebar navs={navs} />}
    >
      <Box sx={{ height: "100%" }}>
        <TheHeader />
        <Outlet />
      </Box>
      <InvalidItemDrawer />
    </AppShell>
  );
};

export default TheLayout;
