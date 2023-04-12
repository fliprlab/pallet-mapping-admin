import { useMutation, useQueryClient } from "@tanstack/react-query";
import { request } from "../../../services/axios.service";
import { apiUrls } from "../../api-urls";

interface IData {
  gridId: string;
  location: string;
}

const create = async (data: IData) => {
  const response: TServerResponse = await request({
    url: apiUrls.CREATE_GRID,
    method: "POST",
    data,
  });
  return response;
};

export const useCreateGridMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(create, {
    onSuccess: () => {
      queryClient.invalidateQueries(["admin", "get-grids"]);
    },
  });
};
