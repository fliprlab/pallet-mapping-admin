import { useMutation, useQueryClient } from "@tanstack/react-query";
import { request } from "../../../services/axios.service";
import { apiUrls } from "../../api-urls";

const create = async (data: { zone: string }) => {
  const response: TServerResponse = await request({
    url: apiUrls.ADD_ZONE,
    method: "POST",
    data,
  });
  return response;
};

export const useCreateZoneMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(create, {
    onSuccess: () => {
      queryClient.invalidateQueries(["admin", "get-zones"]);
    },
  });
};
