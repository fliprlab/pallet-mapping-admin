import { useMutation, useQueryClient } from "@tanstack/react-query";
import { request } from "../../../services/axios.service";
import { apiUrls } from "../../api-urls";

const create = async (data: { location: string }) => {
  const response: TServerResponse = await request({
    url: apiUrls.ADD_LOCATION,
    method: "POST",
    data,
  });
  return response;
};

export const useCreateLocationMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(create, {
    onSuccess: () => {
      queryClient.invalidateQueries(["admin", "get-locations"]);
    },
  });
};
