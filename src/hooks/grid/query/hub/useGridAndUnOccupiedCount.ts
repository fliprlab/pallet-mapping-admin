import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../services/axios.service";
import { apiUrlHub } from "../../../api-urls-hub";

const get = async () => {
  const response: TServerResponse = await request({
    url: apiUrlHub.GRID_TOTAL_AND_UNOCCUPIED_COUNT,
    method: "GET",
  });
  return response;
};
export const useGridAndUnOccupiedCountQuery = () => {
  return useQuery(["hub", "get-grid-count"], get);
};
