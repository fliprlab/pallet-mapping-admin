import { useMutation, useQueryClient } from "@tanstack/react-query";
import { request } from "../../../services/axios.service";
import { apiUrls } from "../../api-urls";

interface IData {
  _id: string;
  active: boolean;
}

const update = async (data: IData) => {
  const response: TServerResponse = await request({
    url: apiUrls.INACTIVE_GRID,
    method: "POST",
    data,
  });
  return response;
};

export const useInactiveGridMutation = (
  params: TPaging & { inactive: string }
) => {
  const queryClient = useQueryClient();
  return useMutation(update, {
    onSuccess: () => {
      queryClient.invalidateQueries([
        "admin",
        "get-grids",
        params.itemPerPage,
        params.page,
        params.inactive,
      ]);
    },
  });
};
