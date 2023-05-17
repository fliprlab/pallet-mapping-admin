import { LoadingOverlay } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import TheLayout from "../container/TheLayout";
import { checkHubUserAuthenticate } from "../services/authenticate.service";
import { hubNavs } from "../container/hubNavs";
import { useCheckHubAuthenthicated } from "../hooks/auth/useCheckHubAuthenthicated";

const HubProtectedRoute = () => {
  const navigate = useNavigate();
  const { isLoading: authLoading } = useCheckHubAuthenthicated(
    (res) => checkHubUserAuthenticate(res, navigate),
    true
  );

  if (authLoading) {
    return <LoadingOverlay visible={true} overlayBlur={2} />;
  }

  return <TheLayout navs={hubNavs} />;
};

export default HubProtectedRoute;
