import { useMutation } from "@tanstack/react-query";
import { request } from "../../../services/axios.service";
import { apiUrls } from "../../api-urls";

const create = async (data: { formData: FormData }) => {
  const response: TServerResponse = await request({
    url: apiUrls.UPLOAD_GRIDS,
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: data.formData,
  });
  return response;
};

export const useUploadGridsMutation = () => {
  return useMutation(create);
};
