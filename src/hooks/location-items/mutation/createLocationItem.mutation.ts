import { useMutation, useQueryClient } from "@tanstack/react-query";
import { request } from "../../../services/axios.service";
import { apiUrls } from "../../api-urls";

const create = async (data: {
  items: TLocationItems[];
  prefix: TRolesPrefix;
}) => {
  const response: TServerResponse = await request({
    url: `/${data.prefix}/` + apiUrls.UPLOAD_LOCATION_ITEMS,
    method: "POST",
    data,
  });
  return response;
};

export const useCreateLocationItemMutation = (prefix: TRolesPrefix) => {
  const queryClient = useQueryClient();
  return useMutation(create, {
    onSuccess: () => {
      queryClient.invalidateQueries([prefix, "location-items"]);
    },
  });
};
