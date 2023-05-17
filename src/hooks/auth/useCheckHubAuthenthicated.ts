import { useQuery } from "@tanstack/react-query";
import { request } from "../../services/axios.service";

import { apiUrlHub } from "../api-urls-hub";

const getProfile = async () => {
  const response: TServerResponse = await request({
    url: apiUrlHub.GET_PROFILE,
    method: "GET",
  });

  return response;
};

export const useCheckHubAuthenthicated = (
  onSuccess: TOnSuccessHandle,
  enabled?: boolean
) => {
  return useQuery(["hub", "get-profile"], getProfile, {
    onSuccess,
    onError: () => {
      window.location.replace("/login");
    },
    enabled: enabled ?? false,
  });
};
