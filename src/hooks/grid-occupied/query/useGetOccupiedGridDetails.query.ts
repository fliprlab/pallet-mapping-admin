import { useQuery } from "@tanstack/react-query";
import { request } from "../../../services/axios.service";

import { apiUrlHub } from "../../api-urls-hub";

const get = async (params?: TPaging) => {
  const response: TServerResponse = await request({
    url: apiUrlHub.GET_OCCUPIED_GRID_DETAILS,
    method: "GET",
    params,
  });
  return response;
};

export const useGetOccupiedGridDetailsQuery = (paging?: TPaging) => {
  return useQuery(["hub", "get-all-destinations", paging], () => get(paging));
};
