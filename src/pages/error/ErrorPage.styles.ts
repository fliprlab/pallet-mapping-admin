import { createStyles } from "@mantine/core";

export const styles = createStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "100vh",
    "& h1": {
      fontSize: "4em",
      color: "#444",
    },
    "& h2, h4": {
      color: "#444",
    },
  },
});
