import { useMutation, useQueryClient } from "@tanstack/react-query";
import { request } from "../../../services/axios.service";
import { apiUrls } from "../../api-urls";

const addUser = async (data: Partial<TUser>) => {
  const response: TServerResponse = await request({
    url: apiUrls.ADD_USER,
    method: "POST",
    data,
  });
  return response;
};

export const useAddUserMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(addUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(["admin", "get-users"]);
    },
  });
};
