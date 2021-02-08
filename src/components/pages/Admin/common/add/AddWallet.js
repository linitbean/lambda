import React from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Container from "../../../../atoms/Container";
import Text from "../../../../atoms/Text";
import SubText from "../../../../atoms/SubText";
import Input from "../../../../atoms/Input";
import Button from "../../../../atoms/Button";
import Spinner from "../../../../atoms/Spinner";

import { AdminWalletItem } from "../../../../molecules/WalletItem";
import WalletInput from "../../../../molecules/WalletInput";

import { walletSchema } from "../../../../../validators/wallet";

import { useWallets } from "../../../../../hooks/useWallets";

import axiosInstance from "../../../../../utils/axios";

import supportedWallets from "../../../../../store/supportedWallets";

import { AdminOnly } from "../AdminChecker.js";

const AddWallet = () => {
  const history = useHistory();
  const { wallets, mutate } = useWallets();

  const {
    register,
    handleSubmit,
    watch,
    formState,
    setValue,
    setError,
    errors,
  } = useForm({
    defaultValues: {
      name: "",
      symbol: "",
      address: "",
    },
    resolver: yupResolver(walletSchema),
  });

  const { symbol } = watch();
  const { isSubmitting } = formState;

  const selectedWallet = supportedWallets.find(
    (w) => w.symbol.toLowerCase() === symbol?.toLowerCase()
  );

  const handleWallet = ({ target }) => {
    setValue("name", target.rawValue.name, {
      shouldValidate: true,
    });
    setValue("symbol", target.rawValue.symbol, {
      shouldValidate: true,
    });
  };

  const onSubmit = async (data) => {
    const exists = wallets.find((wallet) => wallet.symbol === data.symbol);
    if (exists) {
      return setError("symbol", {
        type: "server",
        message: "Wallet already exists",
      });
    }
    try {
      await axiosInstance.post("/wallets", data);
      mutate();
      history.push("../wallets");
    } catch (err) {
      setError(
        "server",
        {
          type: "server",
          message: err.response.data.message,
        },
        {
          shouldRevalidate: true,
        }
      );
    }
  };

  return (
    <AdminOnly>
      <Container p="12px" borderbottom="1px solid" wide>
        <Text font="16px" p="12px 0" bold>
          Add Wallet
        </Text>
        <Text p="12px 0" font="12px" opacity="0.6" bold multiline>
          Add wallet to be available to users
        </Text>
      </Container>

      <Container as="form" p="12px" wide onSubmit={handleSubmit(onSubmit)}>
        {selectedWallet && (
          <AdminWalletItem p="0 0 24px" nolink wallet={selectedWallet} />
        )}

        <input hidden ref={register} name="name" />
        <input hidden ref={register} name="symbol" />

        <WalletInput
          radius="8px"
          label="Select Wallet"
          placeholder="Select Wallet"
          error={errors.symbol?.message}
          wallet={symbol}
          wallets={supportedWallets}
          onChange={handleWallet}
        />

        <Input
          label="Address"
          placeholder="Wallet Address"
          error={errors.address?.message}
          radius="8px"
          ref={register}
          name="address"
        />

        <Text font="12px" multiline>
          Note:{" "}
          <SubText font="inherit" p="0" bold>
            Cryptocurrency
          </SubText>{" "}
          option require you add a wallet address. You can add a wallet without
          an address using the{" "}
          <SubText font="inherit" p="0" bold>
            Altcoin
          </SubText>{" "}
          option.
        </Text>

        {errors.server?.message && (
          <Text color="tomato" align="center" bold>
            {errors.server?.message}
          </Text>
        )}

        <Button
          type="submit"
          bg="primary"
          m="24px 0"
          radius="4px"
          bold
          full
          disabled={isSubmitting}
        >
          {isSubmitting ? <Spinner /> : "Submit"}
        </Button>
      </Container>
    </AdminOnly>
  );
};

export default AddWallet;
