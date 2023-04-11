import { adminApis } from "./admin.api";
import { authApis } from "./auth.api";
import { locationApis } from "./locations.api";

export const apiUrls = {
  ...authApis,
  ...adminApis,
  ...locationApis,
};
