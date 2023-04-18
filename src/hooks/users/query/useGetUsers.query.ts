import { useQuery } from "@tanstack/react-query";
import { request } from "../../../services/axios.service";
import { apiUrls } from "../../api-urls";

interface IParams {
  search?: string;
}

const getUsers = async (paging?: TPaging, params?: IParams) => {
  const response: TServerResponse = await request({
    url: apiUrls.GET_USERS,
    method: "GET",
    params: { ...paging, ...params },
  });
  return response;
};

export const useGetUsersQuery = (paging?: TPaging, params?: IParams) => {
  return useQuery(
    ["admin", "get-users", paging, params?.search],
    () => getUsers(paging, params),
    {
      keepPreviousData: true,
    }
  );
};
