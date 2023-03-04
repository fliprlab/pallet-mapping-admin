import * as yup from "yup";

export const userValidation = yup.object().shape({
  userName: yup.string().required("This Field is Required"),
  password: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("This Field is Required"),
  origin: yup.string().required("This Field is Required"),
});

export const userEditValidation = yup.object().shape({
  userName: yup.string().required("This Field is Required"),
  password: yup.string().nullable(),

  origin: yup.string().required("This Field is Required"),
});
