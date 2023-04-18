import { adminApiPrefix } from "../../constants";

export const hubAdminApis = {
  CREATE_HUB_ADMIN: adminApiPrefix + "hub-admin/create",
  GET_HUBS_ADMINS: adminApiPrefix + "hub-admin/get",
  UPDATE_HUB_PASSWORD: adminApiPrefix + "hub-admin/update-password",
  UPDATE_HUB_STATUS: adminApiPrefix + "hub-admin/update-status",
};
