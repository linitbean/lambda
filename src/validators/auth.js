import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Enter a valid Email Address")
    .lowercase()
    .required("Email is required"),
  password: yup.string().trim().required("Password is required"),
});

export const registrationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Enter a valid Email Address")
    .lowercase()
    .required("Email is required"),
  firstName: yup.string().trim().required("First Name is required"),
  lastName: yup.string().trim().required("Last Name is required"),
  password: yup.string().trim().min(8).required("Password is required"),
  pass: yup
    .string()
    .trim()
    .oneOf([yup.ref("password")], "Passwords do not match")
    .required("Please Confirm Password"),
});
