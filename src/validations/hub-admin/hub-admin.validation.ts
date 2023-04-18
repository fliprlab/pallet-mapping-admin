import * as yup from "yup";

export const hubAdminValidation = yup.object().shape({
  username: yup.string().required("Username is Required"),
  password: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is Required"),
  origin: yup.string().required("Origin is Required"),
});

export const hubAdminResetPassValidation = yup.object().shape({
  password: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is Required"),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is Required"),
});
