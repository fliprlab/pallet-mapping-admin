import { authApis } from "./auth.api";
import { bagApi } from "./bags.api";

export const apiUrls = {
  ...authApis,
  ...bagApi,
};
