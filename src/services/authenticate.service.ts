import { showNotification } from "@mantine/notifications";
import { NavigateFunction } from "react-router-dom";

export const checkUserAuthenticate = (
  data: any,
  navigation: NavigateFunction
) => {
  if (data.status === 401) {
    sessionStorage.clear();
    navigation("/login");
  } else if (data.status === "success") {
    navigation("/dashboard");
  } else if (data.status === "error") {
    navigation("/login");
    showNotification({
      title: data.title,
      message: data.message,
      color: "red",
    });
  }
};

export const logoutUser = () => {
  sessionStorage.clear();
  window.location.replace("/");
};
