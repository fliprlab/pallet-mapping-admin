import { adminApis } from "./admin.api";
import { authApis } from "./auth.api";
import { gridApis } from "./grid.api";
import { hubAdminApis } from "./hubAdmin.api";
import { locationApis } from "./locations.api";

export const apiUrls = {
  ...authApis,
  ...adminApis,
  ...locationApis,
  ...gridApis,
  ...hubAdminApis,
};
