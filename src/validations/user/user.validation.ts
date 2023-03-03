import * as yup from "yup";

export const userValidation = yup.object().shape({
  name: yup
    .string()
    .matches(/^[a-zA-Z ]+$/, "Only characters are allowed")
    .required("This Field is Required"),
  mobile: yup
    .string()
    .matches(/^(\+91[\s]?)?[0]?(91)?\d{10}$/, "Enter a valid phone number")
    .required("This Field is Required"),
  password: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("field is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("field is required"),
});
