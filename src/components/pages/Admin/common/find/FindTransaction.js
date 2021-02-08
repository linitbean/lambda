import React, { useState } from "react";
import { useForm } from "react-hook-form";

import Container from "../../../../atoms/Container";
import Text from "../../../../atoms/Text";
import Input from "../../../../atoms/Input";
import Button from "../../../../atoms/Button";
import Spinner from "../../../../atoms/Spinner";

import { AdminTransactionItem } from "../../../../molecules/TransactionItem";

import axiosInstance from "../../../../../utils/axios";

const FindTransaction = () => {
  const [transaction, setTransaction] = useState(null);

  const { register, handleSubmit, formState, setError, errors } = useForm({
    defaultValues: { transactionId: "" },
  });

  const { isSubmitting } = formState;

  const onSubmit = async (data) => {
    try {
      const { data: res } = await axiosInstance.get(
        "/transactions/admin/" + data.transactionId
      );
      setTransaction(res);
    } catch (err) {
      setError("transactionId", {
        type: "server",
        message: err.response.data.message,
      });
    }
  };

  return (
    <>
      <Container p="12px" borderbottom="1px solid" wide>
        <Text font="16px" p="12px 0" bold>
          Find Transactions
        </Text>
        <Text p="12px 0" font="12px" opacity="0.6" bold multiline>
          Pull transaction with transaction ID
        </Text>
      </Container>

      <Container as="form" p="12px" wide onSubmit={handleSubmit(onSubmit)}>
        {transaction && (
          <AdminTransactionItem m="0 0 24px" transaction={transaction} />
        )}

        <Input
          label="Transaction ID"
          placeholder="Transaction ID"
          error={errors.transactionId?.message}
          radius="8px"
          ref={register({
            pattern: {
              value: /^[0-9a-fA-F]{24}$/,
              message: "Invalid Transaction ID",
            },
            required: "User ID is required",
          })}
          name="transactionId"
        />

        <Text multiline>
          Enter Transaction ID into the search field and click find to search
          for a single Transaction.
        </Text>

        <Button
          type="submit"
          bg="primary"
          m="24px 0"
          radius="4px"
          bold
          full
          disabled={isSubmitting}
        >
          {isSubmitting ? <Spinner /> : "Find"}
        </Button>
      </Container>
    </>
  );
};

export default FindTransaction;
