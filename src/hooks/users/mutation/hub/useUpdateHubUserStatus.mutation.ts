import { useMutation, useQueryClient } from "@tanstack/react-query";
import { request } from "../../../../services/axios.service";

import { apiUrlHub } from "../../../api-urls-hub";

const update = async (data: { _id: string; active: boolean }) => {
  const response: TServerResponse = await request({
    url: apiUrlHub.UPDATE_USER_STATUS,
    method: "POST",
    data,
  });
  return response;
};

export const useUpdateHubUserStatusMutation = (
  search: string,
  paging: TPaging
) => {
  const queryClient = useQueryClient();
  return useMutation(update, {
    onSuccess: () => {
      queryClient.invalidateQueries(["hub", "get-users", paging, search]);
    },
  });
};
