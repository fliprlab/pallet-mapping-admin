import * as Yup from "yup";

export const grid = Yup.object().shape({
  gridId: Yup.string()
    .matches(/^[.a-zA-Z0-9,!? ]*$/, "Allowed Characters: Alpha Numeric")
    .required("field is required"),
  location: Yup.string().required("field is required"),
});
