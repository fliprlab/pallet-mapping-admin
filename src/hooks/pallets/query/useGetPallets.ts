import { useQuery } from "@tanstack/react-query";
import { request } from "../../../services/axios.service";
import { apiUrls } from "../../api-urls";

interface TParams extends TPaging {
  search: string;
  status: string;
}

const get = async (params?: TParams) => {
  const response: TServerResponse = await request({
    url: apiUrls.GET_PALLETS,
    method: "GET",
    params,
  });
  return response;
};

export const useGetPallets = (params?: TParams, options?: TQueryOptions) => {
  return useQuery(["admin", "get-pallets", params], () => get(params), {
    ...options,
    keepPreviousData: true,
  });
};
