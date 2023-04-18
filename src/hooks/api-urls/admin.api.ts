import { adminApiPrefix } from "../../constants";

export const adminApis = {
  GET_PROFILE: adminApiPrefix + "get-profile",
  GET_USERS: adminApiPrefix + "get-users",
  ADD_USER: adminApiPrefix + "add-user",
  UPDATE_USER: adminApiPrefix + "update-user",
  UPDATE_USER_PASS: adminApiPrefix + "update-user-password",
  UPDATE_USER_STATUS: adminApiPrefix + "update-user-status",
};
