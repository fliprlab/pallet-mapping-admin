import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ILoginFormValues } from "../../initial-values/login/login.values";
import { request } from "../../services/axios.service";
import { apiUrls } from "../api-urls";

const loginAdmin = async (data: ILoginFormValues) => {
  const response: TServerResponse = await request({
    url: apiUrls.LOGIN,
    method: "POST",
    data,
  });
  return response;
};

export const useLoginMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(loginAdmin, {
    onSuccess: () => {
      queryClient.invalidateQueries(["admin", "get-profile"]);
    },
  });
};
