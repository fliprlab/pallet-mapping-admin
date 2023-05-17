import { useMutation, useQueryClient } from "@tanstack/react-query";
import { request } from "../../../../services/axios.service";

import { apiUrlHub } from "../../../api-urls-hub";

const addUser = async (data: Partial<TUser>) => {
  const response: TServerResponse = await request({
    url: apiUrlHub.ADD_USER,
    method: "POST",
    data,
  });
  return response;
};

export const useAddUserHubMutation = (search: string, paging: TPaging) => {
  const queryClient = useQueryClient();
  return useMutation(addUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(["hub", "get-users", paging, search]);
    },
  });
};
