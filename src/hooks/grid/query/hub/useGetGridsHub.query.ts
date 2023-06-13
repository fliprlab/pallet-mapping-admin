import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../services/axios.service";
import { apiUrlHub } from "../../../api-urls-hub";
import { IHubGridListFilter } from "../../../../pages/hub-pages/grid-list/HubGridList";

const get = async (params: Partial<TPaging>, filter: IHubGridListFilter) => {
  const response: TServerResponse = await request({
    url: apiUrlHub.GET_GRIDS,
    method: "GET",
    params: { ...params, ...filter },
  });
  return response;
};

export const useGetGridsHubQuery = (
  params: Partial<TPaging>,
  filter: IHubGridListFilter,
  option: {
    enabled?: boolean;
    onSuccess?: TOnSuccessHandle;
  }
) => {
  const { enabled = true, onSuccess } = option;
  return useQuery(
    ["admin", "get-grids", params.itemPerPage, params.page, filter],
    () => get(params, filter),
    { enabled: enabled, onSuccess }
  );
};
