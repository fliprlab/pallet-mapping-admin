import { useMutation, useQueryClient } from "@tanstack/react-query";
import { request } from "../../../services/axios.service";
import { apiUrls } from "../../api-urls";
import { IHubAdmin } from "../../../initial-values/hub-admin/hub-admin.values";

const create = async (data: IHubAdmin) => {
  const response: TServerResponse = await request({
    url: apiUrls.CREATE_HUB_ADMIN,
    method: "POST",
    data,
  });
  return response;
};

export const useCreateHubAdminMutation = (search: string, paging: TPaging) => {
  const queryClient = useQueryClient();
  return useMutation(create, {
    onSuccess: () => {
      queryClient.invalidateQueries(["admin", "hub-admins", paging, search]);
    },
  });
};
