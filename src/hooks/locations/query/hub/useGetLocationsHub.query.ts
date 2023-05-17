import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../services/axios.service";
import { apiUrlHub } from "../../../api-urls-hub";

const get = async (params?: TPaging) => {
  const response: TServerResponse = await request({
    url: apiUrlHub.GET_LOCATIONS,
    method: "GET",
    params,
  });
  return response;
};

export const useGetLocationsHubQuery = (
  params?: TPaging,
  options?: TQueryOptions
) => {
  return useQuery(
    ["hub", "get-locations", params?.itemPerPage, params?.page],
    () => get(params),
    { ...options, keepPreviousData: true }
  );
};
