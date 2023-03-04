import { useMutation, useQueryClient } from "@tanstack/react-query";
import { request } from "../../../services/axios.service";
import { apiUrls } from "../../api-urls";

const updateUser = async (data: { id: string; data: Partial<TUser> }) => {
  const response: TServerResponse = await request({
    url: apiUrls.UPDATE_USER,
    method: "POST",
    data,
  });
  return response;
};

export const useUpdateUserMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(updateUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(["admin", "get-users"]);
    },
  });
};
