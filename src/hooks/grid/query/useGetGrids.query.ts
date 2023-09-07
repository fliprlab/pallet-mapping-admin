import { useQuery } from "@tanstack/react-query";
import { request } from "../../../services/axios.service";
import { apiUrls } from "../../api-urls";

interface IParams extends TPaging {
  search: string;
  inactive: string;
}

const get = async (params: IParams) => {
  const response: TServerResponse = await request({
    url: apiUrls.GET_GRIDS,
    method: "GET",
    params,
  });
  return response;
};

export const useGetGridsQuery = (params: IParams) => {
  return useQuery(["admin", "get-grids", params], () => get(params), {
    keepPreviousData: true,
  });
};
