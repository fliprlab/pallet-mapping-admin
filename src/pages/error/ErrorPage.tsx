import { Box } from "@mantine/core";
import React from "react";
import { useRouteError } from "react-router-dom";
import { styles } from "./ErrorPage.styles";

const ErrorPage = () => {
  const { classes } = styles();
  const error: any = useRouteError();

  return (
    <Box className={classes.root}>
      <h1>{error.status}</h1>
      <h2>Page {error.statusText || error.message}</h2>
      <p>
        <i>The resource requested could not be found on this server!</i>
      </p>
    </Box>
  );
};

export default ErrorPage;
