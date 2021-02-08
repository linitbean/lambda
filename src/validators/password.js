import * as yup from "yup";

export const changePasswordSchema = yup.object().shape({
  oldPassword: yup
    .string()
    .trim()
    .label("Old Password")
    .required("Old Password is required"),
  password: yup
    .string()
    .trim()
    .label("New Password")
    .required("New Password is required")
    .min(8, "Password must be at least 8 characters")
    .notOneOf(
      [yup.ref("oldPassword")],
      "New password cannot be same as old password"
    ),
  pass: yup
    .string()
    .trim()
    .label("Password Confirmation")
    .required("Password confirmation is required")
    .oneOf([yup.ref("password")], "Password do not match"),
});

export const forgotPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid Email Address")
    .lowercase()
    .required("Email is required"),
});

export const resetPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .trim()
    .label("New Password")
    .required("New Password is required")
    .min(8, "Password must be at least 8 characters"),
  pass: yup
    .string()
    .trim()
    .label("Password Confirmation")
    .required("Password confirmation is required")
    .oneOf([yup.ref("password")], "Password do not match"),
});
