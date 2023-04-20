import * as Yup from "yup";

export const grid = Yup.object().shape({
  gridId: Yup.string()
    .matches(/^G[0-9]{3}-[0-9]{2}$/g, "Enter a valid virtual id.")
    .required("field is required"),
  location: Yup.string().required("field is required"),
});
