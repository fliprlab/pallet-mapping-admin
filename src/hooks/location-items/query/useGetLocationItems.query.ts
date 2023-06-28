import { useQuery } from "@tanstack/react-query";
import { request } from "../../../services/axios.service";
import { apiUrls } from "../../api-urls";

const get = async (paging: TPaging) => {
  const response: TServerResponse = await request({
    url: apiUrls.GET_LOCATION_ITEMS,
    method: "GET",
    data: paging,
  });
  return response;
};

export const useGetLocationItemsQuery = (paging: TPaging) => {
  return useQuery(["admin", "location-items", paging], () => get(paging), {
    keepPreviousData: true,
  });
};
