import { useQuery } from "@tanstack/react-query";
import { request } from "../../../services/axios.service";
import { apiUrls } from "../../api-urls";

interface IParams {
  search: string;
}

const get = async (params: Partial<IParams>) => {
  const response: TServerResponse = await request({
    url: apiUrls.GET_LOCATIONS,
    method: "GET",
    params,
  });
  return response;
};

export const useGetLocations = (params: Partial<IParams>) => {
  return useQuery(["admin", "get-locations", params?.search], () =>
    get(params)
  );
};
