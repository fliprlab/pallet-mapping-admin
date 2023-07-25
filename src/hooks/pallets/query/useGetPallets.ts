import { useQuery } from "@tanstack/react-query";
import { request } from "../../../services/axios.service";
import { apiUrls } from "../../api-urls";

const get = async (params?: TPaging) => {
  const response: TServerResponse = await request({
    url: apiUrls.GET_PALLETS,
    method: "GET",
    params,
  });
  return response;
};

export const useGetPallets = (params?: TPaging, options?: TQueryOptions) => {
  return useQuery(
    ["admin", "get-pallets", params?.itemPerPage, params?.page],
    () => get(params),
    { ...options, keepPreviousData: true }
  );
};
