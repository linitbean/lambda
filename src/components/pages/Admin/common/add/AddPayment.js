import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Container from "../../../../atoms/Container";
import Text from "../../../../atoms/Text";
import Input from "../../../../atoms/Input";
import Checkbox from "../../../../atoms/Checkbox";
import Button from "../../../../atoms/Button";
import Spinner from "../../../../atoms/Spinner";

import ControlledDateInput from "../../../../molecules/ControlledDateInput";

import { paymentSchema } from "../../../../../validators/payment";

import { useAdminUser } from "../../../../../hooks/useUsers";
import { useAdminUserPayments } from "../../../../../hooks/usePayments";

import axiosInstance from "../../../../../utils/axios";

import { AdminOnly } from "../AdminChecker";

const AddPayment = () => {
  const history = useHistory();
  const { userId } = useParams();

  const { user } = useAdminUser(userId);
  const { mutate } = useAdminUserPayments(userId);

  const defaultValues = {
    title: "",
    amount: null,
    date: new Date(),
    completed: false,
  };

  const {
    register,
    control,
    handleSubmit,
    formState,
    setError,
    errors,
  } = useForm({
    defaultValues,
    resolver: yupResolver(paymentSchema),
  });

  const { isSubmitting } = formState;

  const onSubmit = async (data) => {
    try {
      await axiosInstance.post("/payments", { ...data, user: userId });
      mutate();
      history.push("../payments");
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
          Request Payment
        </Text>
        <Text p="12px 0" font="12px" opacity="0.6" bold multiline>
          Send a payment request to {user.fullName}
        </Text>
      </Container>

      <Container as="form" p="12px" wide onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Title"
          placeholder="Title"
          radius="8px"
          ref={register}
          name="title"
          error={errors.title?.message}
        />

        <Input
          label="Amount"
          placeholder="Enter Amount"
          type="number"
          radius="8px"
          ref={register({
            valueAsNumber: true,
          })}
          name="amount"
          error={errors.amount?.message}
        />

        <ControlledDateInput
          label="Date"
          placeholder="Pick Date (leave blank for today's date)"
          radius="8px"
          control={control}
          name="date"
          error={errors.date?.message}
        />
        <Checkbox label="Payment Completed?" ref={register} name="completed" />

        {errors.server?.message && (
          <Text color="red" align="center" bold>
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

export default AddPayment;
