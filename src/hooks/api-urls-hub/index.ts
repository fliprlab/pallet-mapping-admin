import { hubApiPrefix } from "../../constants";
import { adminApis } from "./admin.api";
import { gridApis } from "./grid.api";
import { locationApis } from "./locations.api";

export const apiUrlHub = {
  ...adminApis,
  ...locationApis,
  ...gridApis,
  GET_ITEMS:hubApiPrefix+"get-items"
};
