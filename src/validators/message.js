import * as yup from "yup";

export const messageSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  body: yup.string().required("Message body is required"),
  date: yup.date(),
  read: yup.boolean(),
});
