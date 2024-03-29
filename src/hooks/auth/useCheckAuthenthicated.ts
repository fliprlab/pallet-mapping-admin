import { useQuery } from "@tanstack/react-query";
import { request } from "../../services/axios.service";
import { apiUrls } from "../api-urls";

const getProfile = async () => {
  const response: TServerResponse = await request({
    url: apiUrls.GET_PROFILE,
    method: "GET",
  });

  return response;
};

export const useCheckAuthenticated = (
  onSuccess: TOnSuccessHandle,
  enabled?: boolean
) => {
  return useQuery(["admin", "get-profile"], getProfile, {
    onSuccess,
    onError: () => {
      window.location.replace("/login");
    },
    enabled: enabled ?? false,
  });
};
