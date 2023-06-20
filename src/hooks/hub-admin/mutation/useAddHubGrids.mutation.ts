import { useMutation, useQueryClient } from "@tanstack/react-query";
import { request } from "../../../services/axios.service";
import { apiUrls } from "../../api-urls";
import { IHubAdmin } from "../../../initial-values/hub-admin/hub-admin.values";
import { apiUrlHub } from "../../api-urls-hub";

const create = async (data: { grids: string[] }) => {
  const response: TServerResponse = await request({
    url: apiUrlHub.ADD_GRID,
    method: "POST",
    data,
  });
  return response;
};

export const useAddHubGridsMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(create, {
    onSuccess: () => {
      queryClient.invalidateQueries(["hub", "get-grids"]);
    },
  });
};
