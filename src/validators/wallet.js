import * as yup from "yup";

export const walletSchema = yup.object().shape({
  name: yup.string().required(),
  symbol: yup.string().required("Wallet is required"),
  address: yup
    .string()
    .required("Wallet Address is required")
    .min(15, "Make sure you enter a correct wallet address"),
});

export const walletUpdateSchema = yup.object().shape({
  address: yup
    .string()
    .required("Wallet Address is required for cryptocurrencies")
    .min(15, "Make sure you enter a correct wallet address"),
});
