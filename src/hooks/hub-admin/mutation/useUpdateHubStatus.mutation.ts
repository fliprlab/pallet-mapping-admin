import { useMutation, useQueryClient } from "@tanstack/react-query";
import { request } from "../../../services/axios.service";
import { apiUrls } from "../../api-urls";

const update = async (data: { _id: string; active: boolean }) => {
  const response: TServerResponse = await request({
    url: apiUrls.UPDATE_HUB_STATUS,
    method: "POST",
    data,
  });
  return response;
};

export const useUpdateHubStatusMutation = (search: string, paging: TPaging) => {
  const queryClient = useQueryClient();
  return useMutation(update, {
    onSuccess: () => {
      queryClient.invalidateQueries(["admin", "hub-admins", paging, search]);
    },
  });
};
