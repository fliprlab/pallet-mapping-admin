import { adminApis } from "./admin.api";
import { authApis } from "./auth.api";

export const apiUrls = {
  ...authApis,
  ...adminApis,
};
