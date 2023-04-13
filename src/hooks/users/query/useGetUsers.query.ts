import { useQuery } from "@tanstack/react-query";
import { request } from "../../../services/axios.service";
import { apiUrls } from "../../api-urls";

interface IParams {
  search?: string;
  page?: number;
  itemPerPage?: number;
}

const getUsers = async (params: IParams) => {
  const response: TServerResponse = await request({
    url: apiUrls.GET_USERS,
    method: "GET",
    params,
  });
  return response;
};

export const useGetUsersQuery = (data: IParams, options?: TQueryOptions) => {
  return useQuery(
    ["admin", "get-users", data?.search, data?.itemPerPage, data?.page],
    () => getUsers(data),
    {
      keepPreviousData: true,
      ...options,
    }
  );
};
