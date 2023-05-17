import React, { useCallback, useEffect } from "react";
import { Box, Grid, LoadingOverlay, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { COLORS } from "../../colors";
import { useCheckAuthenticated } from "../../hooks/auth/useCheckAuthenthicated";
import {
  checkHubUserAuthenticate,
  checkUserAuthenticate,
} from "../../services/authenticate.service";
import LoginForm from "./components/LoginForm";
import RightBlock from "./components/RightBlock";
import { styles } from "./Login.styles";
import { useCheckHubAuthenthicated } from "../../hooks/auth/useCheckHubAuthenthicated";

const Login = () => {
  const { classes } = styles();

  const navigate = useNavigate();
  const { isFetching, refetch } = useCheckAuthenticated((res) =>
    checkUserAuthenticate(res, navigate)
  );

  const { isFetching: hubLoading, refetch: hubRefetch } =
    useCheckHubAuthenthicated((res) => checkHubUserAuthenticate(res, navigate));

  const checkAuth = useCallback(() => {
    const role = sessionStorage.getItem("role");
    if (role === "admin") {
      refetch();
    } else if (role === "hub-admin") {
      hubRefetch();
    }
  }, [refetch, hubRefetch]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isFetching || hubLoading) {
    return <LoadingOverlay visible={true} overlayBlur={2} />;
  }

  return (
    <Grid sx={{ minHeight: "100vh" }} gutter={0}>
      <Grid.Col span={5} className={classes.leftContainer}>
        <Box sx={{ width: "100%" }}>
          <Box mb={60}>
            <Text weight={700} size={26} color={COLORS.secondary}>
              Login To Dashboard
            </Text>
            <Text weight={500} size={18} color={COLORS.grey}>
              Welcome Back,
            </Text>
          </Box>
          <LoginForm refetch={refetch} hubRefetch={hubRefetch} />
        </Box>
      </Grid.Col>
      <Grid.Col span={7} className={classes.rightContainer}>
        <RightBlock />
      </Grid.Col>
    </Grid>
  );
};

export default Login;
