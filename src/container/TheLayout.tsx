import { AppShell } from "@mantine/core";

import { Outlet } from "react-router-dom";

const TheLayout = () => {
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
    >
      <Outlet />
    </AppShell>
  );
};

export default TheLayout;
