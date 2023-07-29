import { useQuery } from "@tanstack/react-query";
import { request } from "../../../services/axios.service";
import { apiUrls } from "../../api-urls";
import { DateRangePickerValue } from "@mantine/dates";

interface TParams extends Partial<TPaging> {
  search?: string;
  status?: string;
  date?: DateRangePickerValue;
}

const get = async (params: TParams, prefix?: TRolesPrefix) => {
  const response: TServerResponse = await request({
    url: `/${prefix}/` + apiUrls.GET_LOCATION_ITEMS,
    method: "GET",
    params: params,
  });
  return response;
};

export const useGetLocationItemsQuery = (
  params: TParams,
  prefix: TRolesPrefix,
  options?: {
    enabled?: boolean;
    onSuccess?: TOnSuccessHandle;
  }
) => {
  return useQuery(
    [prefix, "location-items", params],
    () => get(params, prefix),
    {
      ...options,
      keepPreviousData: true,
    }
  );
};
