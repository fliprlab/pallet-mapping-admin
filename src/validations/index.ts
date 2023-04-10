import { userEditValidation, userValidation } from "./user/user.validation";
import { loginValidation } from "./login/login.validation";
import { location } from "./locations/location";

export const VALIDATIONS = {
  loginValidation,
  userValidation,
  userEditValidation,
  location,
};
