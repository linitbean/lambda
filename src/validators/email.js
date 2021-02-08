import * as yup from "yup";

export const emailSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .label("Email")
    .email("Must be a valid email address")
    .lowercase(),
  title: yup.string().required("Title is required"),
  body: yup.string().required("Message body is required"),
  body2: yup.string(),
  body3: yup.string(),
});

export const userEmailSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  body: yup.string().required("Message body is required"),
  body2: yup.string(),
  body3: yup.string(),
});
