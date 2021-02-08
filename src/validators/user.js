import * as yup from "yup";

export const userSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .label("Email")
    .email("Must be a valid email address")
    .lowercase(),
  firstName: yup
    .string()
    .trim()
    .required("First name is required")
    .label("First Name")
    .min(3),
  lastName: yup
    .string()
    .trim()
    .required("Last name is required")
    .label("Last Name")
    .min(3),
  password: yup
    .string()
    .trim()
    .required("Password is required")
    .label("Password")
    .min(8),
  pass: yup
    .string()
    .trim()
    .oneOf([yup.ref("password")], "Passwords must match"),
  role: yup
    .string()
    .oneOf(["basic", "moderator", "admin"], "Invalid user role"),
});
