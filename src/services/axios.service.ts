import { showNotification } from "@mantine/notifications";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const client = axios.create({ baseURL: `${process.env.REACT_APP_BASE_URL}` });

export const request = async (options: AxiosRequestConfig<any>) => {
  const token = sessionStorage.getItem(`${process.env.REACT_APP_SECRET_KEY}`);
  client.defaults.headers.common.authorization = `Bearer ${token}`;

  const onSuccess = (response: AxiosResponse) => response.data;
  const onError = (error: any) => {
    if (error.response.status === 401) {
      showNotification({
        message: "Your session is expired please login again",
        color: "red",
      });
      sessionStorage.clear();
      window.location.replace("/");
    }

    if (error.response.status >= 500) {
      showNotification({
        title: error.response?.data?.title,
        message: error.response?.data?.message,
        color: "red",
      });
    }

    return error.response;
  };

  try {
    const response = await client(options);
    return onSuccess(response);
  } catch (error) {
    return onError(error);
  }
};
