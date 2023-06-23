import { hubApiPrefix } from "../../constants";

export const gridApis = {
  GET_GRIDS: hubApiPrefix + "get-grids",
  CREATE_GRID: hubApiPrefix + "create-grid",
  GET_OCCUPIED_GRID_DETAILS: hubApiPrefix + "get-all-destinations",
  ADD_GRID: hubApiPrefix + "add-grids",
  GRID_TOTAL_AND_UNOCCUPIED_COUNT: hubApiPrefix + "get-grid-count",
};
