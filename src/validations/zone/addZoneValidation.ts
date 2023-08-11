import * as Yup from "yup";

export const addZoneValidation = Yup.object().shape({
  zone: Yup.string()
    // .matches(/^[.a-zA-Z0-9,!? ]*$/, "Allowed Characters: Alpha Numeric")
    .required("field is required"),
});
