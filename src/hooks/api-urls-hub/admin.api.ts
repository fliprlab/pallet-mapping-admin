import { hubApiPrefix } from "../../constants";

export const adminApis = {
  GET_PROFILE: hubApiPrefix + "get-profile",
  GET_USERS: hubApiPrefix + "get-users",
  ADD_USER: hubApiPrefix + "add-user",
  UPDATE_USER: hubApiPrefix + "update-user",
  UPDATE_USER_PASS: hubApiPrefix + "update-user-password",
  UPDATE_USER_STATUS: hubApiPrefix + "update-user-status",
};
