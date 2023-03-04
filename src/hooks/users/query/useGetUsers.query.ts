import { useQuery } from "@tanstack/react-query";
import { request } from "../../../services/axios.service";
import { apiUrls } from "../../api-urls";

interface IParams {
  search: string;
}

const getUsers = async (params: IParams) => {
  const response: TServerResponse = await request({
    url: apiUrls.GET_USERS + `?search=${params.search}`,
    method: "GET",
  });
  return response;
};

export const useGetUsersQuery = (data: IParams) => {
  return useQuery(["admin", "get-users", data.search], () => getUsers(data));
};
