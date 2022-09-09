import * as yup from "yup";

const minimumWithdrawal =
  parseInt(process.env.REACT_APP_MINIMUM_WITHDRAWAL) || 2000;

export const transactionSchema = yup.object().shape({
  type: yup
    .string()
    .required("Type is required")
    .lowercase()
    .oneOf(
      ["investment", "deposit", "withdrawal", "transfer", "income", "fee"],
      "Invalid transaction type"
    ),

  wallet: yup.string().required("Wallet is required").lowercase(),

  amount: yup
    .number()
    .required("Amount is required")
    .label("Amount")
    .positive(),

  description: yup.string().when("type", {
    is: (val) => ["income", "fee"].includes(val),
    then: yup.string().required("Please provide a description for income"),
  }),

  date: yup.date(),

  receiver_email: yup.string().when("type", {
    is: "transfer",
    then: yup
      .string()
      .email("Invalid Recipient Email")
      .required("Recipient Email is required"),
  }),

  method: yup.object().when("type", {
    is: "withdrawal",
    then: yup.object({
      type: yup.string().required("Method type is required"),
      address: yup.mixed().required("Method address is required")
    }).typeError("Withdrawal method is required").required("Withdrawal method is required"),
  }),

  profit: yup.number().label("Profit").min(0, "Invalid profit"),
  extra: yup.number().label("Extra").min(0, "Invalid amount"),
  duration: yup
    .number()
    .label("Duration")
    .positive()
    .when("type", {
      is: "investment",
      then: yup.number().required("Please provide duration for investment"),
    }),
  autoIncrement: yup.boolean(),
});

export const withdrawalSchema = (customMinimumWithdrawal) => yup.object().shape({
  wallet: yup.string().required("Wallet is required"),
  amount: yup
    .number()
    .typeError("Amount is required")
    .required("Amount is required")
    .min(customMinimumWithdrawal ?? minimumWithdrawal, "Amount too low"),
  method: yup.object({
    type: yup.string().required("Method type is required"),
    address: yup.mixed().required("Method address is required")
  }).typeError("Withdrawal method is required").required("Withdrawal method is required"),
  status: yup.string(),
});
