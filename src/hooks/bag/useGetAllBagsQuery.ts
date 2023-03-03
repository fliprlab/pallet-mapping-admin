import { useQuery } from "@tanstack/react-query";
import { request } from "../../services/axios.service";
import { apiUrls } from "../api-urls";

const getAllBags = async () => {
  const res = await request({ url: apiUrls.GET_ALL_BAGS, method: "GET" });
  return res;
};

interface IData {
  onSuccess: TOnSuccessHandle;
  onError?: TOnErrorHandle;
  enabled?: boolean;
}

export const useGetAllBagsQuery = (data: IData) => {
  return useQuery(["admin", "get-all-bags"], getAllBags, data);
};
