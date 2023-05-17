import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../services/axios.service";
import { apiUrlHub } from "../../../api-urls-hub";

interface IParams {
  search?: string;
}

const getUsers = async (paging?: TPaging, params?: IParams) => {
  const response: TServerResponse = await request({
    url: apiUrlHub.GET_USERS,
    method: "GET",
    params: { ...paging, ...params },
  });
  return response;
};

export const useGetUsersHubQuery = (paging?: TPaging, params?: IParams) => {
  return useQuery(
    ["hub", "get-users", paging, params?.search],
    () => getUsers(paging, params),
    {
      keepPreviousData: true,
    }
  );
};
