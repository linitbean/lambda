import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Container from "../../../../atoms/Container";
import Text from "../../../../atoms/Text";
import Input from "../../../../atoms/Input";
import Textarea from "../../../../atoms/Textarea";
import Checkbox from "../../../../atoms/Checkbox";
import Button from "../../../../atoms/Button";
import Spinner from "../../../../atoms/Spinner";

import ControlledDateInput from "../../../../molecules/ControlledDateInput";

import { messageSchema } from "../../../../../validators/message";

import { useAdminUser } from "../../../../../hooks/useUsers";
import { useAdminUserMessages } from "../../../../../hooks/useMessages";

import axiosInstance from "../../../../../utils/axios";

import { AdminOnly } from "../AdminChecker";

const AddMessage = () => {
  const history = useHistory();
  const { userId } = useParams();

  const { user } = useAdminUser(userId);
  const { mutate } = useAdminUserMessages(userId);

  const defaultValues = {
    title: "",
    body: "",
    date: new Date(),
    read: false,
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
    resolver: yupResolver(messageSchema),
  });

  const { isSubmitting } = formState;

  const onSubmit = async (data) => {
    try {
      await axiosInstance.post("/messages", { ...data, user: userId });
      mutate();
      history.push("../messages");
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
          Send Message
        </Text>
        <Text p="12px 0" font="12px" opacity="0.6" bold multiline>
          Send a message to {user.fullName}'s inbox. Message will be marked read
          immediately opened
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

        <Textarea
          label="Body"
          placeholder="Message Body"
          rows="12"
          radius="8px"
          ref={register}
          name="body"
          error={errors.body?.message}
        />

        <ControlledDateInput
          label="Date"
          placeholder="Pick Date (leave blank for today's date)"
          radius="8px"
          control={control}
          name="date"
          error={errors.date?.message}
        />
        <Checkbox label="Message Read?" ref={register} name="read" />

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

export default AddMessage;
