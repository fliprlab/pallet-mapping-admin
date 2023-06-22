import { useQuery } from "@tanstack/react-query";
import { request } from "../../services/axios.service";
import { apiUrlHub } from "../api-urls-hub";
import { TItemStatus } from "../../pages/hub-pages/itemTable/components/StatusChip";

interface IParams extends TPaging {
  search?: string;
  status: TItemStatus;
}

const get = async (filter: IParams) => {
  const response: TServerResponse = await request({
    url: apiUrlHub.GET_ITEMS,
    method: "GET",
    params: filter,
  });
  return response;
};

export const useGetItemsQuery = (filter: IParams) => {
  return useQuery(["hub", "get-items", filter], () => get(filter), {
    keepPreviousData: true,
  });
};
