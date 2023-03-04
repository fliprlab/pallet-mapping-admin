import { useQuery } from "@tanstack/react-query";
import { request } from "../../../services/axios.service";
import { apiUrls } from "../../api-urls";

const getUsers = async () => {
  const response: TServerResponse = await request({
    url: apiUrls.GET_USERS,
    method: "GET",
  });
  return response;
};

export const useGetUsersQuery = () => {
  return useQuery(["admin", "get-users"], getUsers);
};
