import * as yup from "yup";

export const paymentSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  amount: yup
    .number()
    .required("Amount is required")
    .label("Amount")
    .positive(),
  date: yup.date(),
  completed: yup.boolean(),
});
