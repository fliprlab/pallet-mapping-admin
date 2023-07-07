import { useQuery } from "@tanstack/react-query";
import { request } from "../../../services/axios.service";
import { apiUrls } from "../../api-urls";

const get = async (paging: TPaging, prefix: TRolesPrefix) => {
  const response: TServerResponse = await request({
    url: `/${prefix}/` + apiUrls.GET_LOCATION_ITEMS,
    method: "GET",
    params: paging,
  });
  return response;
};

export const useGetLocationItemsQuery = (
  paging: TPaging,
  prefix: TRolesPrefix
) => {
  return useQuery(
    [prefix, "location-items", paging],
    () => get(paging, prefix),
    {
      keepPreviousData: true,
    }
  );
};
