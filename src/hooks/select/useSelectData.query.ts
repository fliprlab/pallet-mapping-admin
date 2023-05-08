import { useQuery } from "@tanstack/react-query";
import { request } from "../../services/axios.service";

interface IParams {
  url: string;
}

const getUsers = async (params: IParams) => {
  const response: TServerResponse = await request({
    url: params.url,
    method: "GET",
  });
  return response;
};

export const useSelectDataQuery = (data: IParams) => {
  return useQuery(["admin", data.url], () => getUsers(data));
};
