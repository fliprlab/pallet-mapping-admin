import { LoadingOverlay } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import TheLayout from "../container/TheLayout";
import { useCheckAuthenticated } from "../hooks/auth/useCheckAuthenthicated";
import { checkUserAuthenticate } from "../services/authenticate.service";
import { navs } from "../container/navs";

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const { isLoading: authLoading } = useCheckAuthenticated(
    (res) => checkUserAuthenticate(res, navigate),
    true
  );

  if (authLoading) {
    return <LoadingOverlay visible={true} overlayBlur={2} />;
  }

  return <TheLayout navs={navs} />;
};

export default ProtectedRoute;
