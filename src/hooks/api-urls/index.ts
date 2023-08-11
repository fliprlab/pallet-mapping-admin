import { adminApis } from "./admin.api";
import { authApis } from "./auth.api";
import { gridApis } from "./grid.api";
import { hubAdminApis } from "./hubAdmin.api";
import { locationItemApis } from "./location-item.api";
import { locationApis } from "./locations.api";
import { palletsApi } from "./pallet.api";
import { zoneApis } from "./zone.api";

export const apiUrls = {
  ...authApis,
  ...adminApis,
  ...locationApis,
  ...gridApis,
  ...hubAdminApis,
  ...locationItemApis,
  ...palletsApi,
  ...zoneApis,
};
