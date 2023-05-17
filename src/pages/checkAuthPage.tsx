import React, { useCallback, useEffect } from "react";
import { LoadingOverlay } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useCheckAuthenticated } from "../hooks/auth/useCheckAuthenthicated";
import {
  checkHubUserAuthenticate,
  checkUserAuthenticate,
} from "../services/authenticate.service";
import { useCheckHubAuthenthicated } from "../hooks/auth/useCheckHubAuthenthicated";

const CheckAuthPage = () => {
  const navigate = useNavigate();
  const { refetch } = useCheckAuthenticated((res) =>
    checkUserAuthenticate(res, navigate)
  );

  const { refetch: hubRefetch } = useCheckHubAuthenthicated((res) =>
    checkHubUserAuthenticate(res, navigate)
  );

  const checkAuth = useCallback(async () => {
    const role = sessionStorage.getItem("role");

    if (!role || role === "undefined") {
      sessionStorage.clear();
      navigate("/login");
    } else if (role === "admin") {
      refetch();
    } else if (role === "hub-admin") {
      hubRefetch();
    } else {
      sessionStorage.clear();
      navigate("/login");
    }
  }, [hubRefetch, refetch, navigate]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return <LoadingOverlay visible={true} />;
};

export default CheckAuthPage;
