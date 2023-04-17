import { useQuery } from "@tanstack/react-query";
import { request } from "../../../services/axios.service";
import { apiUrls } from "../../api-urls";

interface IParams {
  search?: string;
}

const getUsers = async (paging?: TPaging, params?: IParams) => {
  const response: TServerResponse = await request({
    url: apiUrls.GET_HUBS_ADMINS,
    method: "GET",
    params: { ...paging, ...params },
  });
  return response;
};

export const useGetHubAdminsQuery = (paging?: TPaging, data?: IParams) => {
  return useQuery(
    ["admin", "hub-admins", paging, data?.search],
    () => getUsers(paging, data),
    {
      keepPreviousData: true,
    }
  );
};
