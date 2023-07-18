import { useQuery } from "@tanstack/react-query";
import { request } from "../../../services/axios.service";
import { apiUrls } from "../../api-urls";

const get = async (params: Partial<TPaging & { inactive: string }>) => {
  const response: TServerResponse = await request({
    url: apiUrls.GET_GRIDS,
    method: "GET",
    params,
  });
  return response;
};

export const useGetGridsQuery = (
  params: Partial<TPaging & { inactive: string }>,
  options?: TQueryOptions
) => {
  return useQuery(
    ["admin", "get-grids", params.itemPerPage, params.page, params.inactive],
    () => get(params),
    { ...options, keepPreviousData: true }
  );
};
