import React from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Container from "../../../../atoms/Container";
import Text from "../../../../atoms/Text";
import Input from "../../../../atoms/Input";
import Textarea from "../../../../atoms/Textarea";
import Button from "../../../../atoms/Button";

import ProcessModal from "../../../../organisms/ProcessModal";
import ConfirmationModal from "../../../../organisms/ConfirmationModal";

import { userEmailSchema } from "../../../../../validators/email";

import { useAdminUser } from "../../../../../hooks/useUsers";
import { useProcess } from "../../../../../hooks/useProcess";
import { useToggle } from "../../../../../hooks/useToggle";

import axiosInstance from "../../../../../utils/axios";

import { AdminOnly } from "../AdminChecker";
import Select from "../../../../atoms/Select";

const SendUserEmail = () => {
  const { userId } = useParams();
  const { user } = useAdminUser(userId);

  const {
    show: showEmailModal,
    open: openEmailModal,
    close: closeEmailModal,
  } = useToggle();

  const {
    show,
    processing,
    response,
    success,
    start,
    complete,
    fail,
    close
  } = useProcess();

  const defaultValues = {
    from: "support",
    customFrom: "",
    title: "",
    body: ""
  };

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState,
    setError,
    errors,
  } = useForm({
    defaultValues,
    resolver: yupResolver(userEmailSchema),
  });

  const { isSubmitting } = formState;
  const { from } = watch();

  const DOMAIN = process.env.REACT_APP_DOMAIN;

  const sendMail = async () => {
    const { customFrom, ...data } = getValues();

    if (customFrom) data.from = customFrom

    try {
      start();
      await axiosInstance.post("/core/send-mail", {
        ...data,
        email: user.email,
      });
      complete("Email sent successfully");
    } catch (err) {
      console.log(err.response);
      fail("Email not sent");
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

  const advancedMailer =
    process.env.REACT_APP_ADVANCED_MAILER?.toLowerCase() === "true";

  return (
    <AdminOnly>
      <Container p="12px" borderbottom="1px solid" wide>
        <Text font="16px" p="12px 0" bold>
          Send Email
        </Text>
        <Text p="12px 0" font="12px" opacity="0.6" bold multiline>
          Send an email to {user.fullName}. Email would also be copied to app's
          email address
        </Text>
      </Container>

      <Container
        as="form"
        p="12px"
        wide
        onSubmit={handleSubmit(openEmailModal)}
      >
        {advancedMailer && (
          <>
            <Select
              radius="8px"
              p="14px 12px"
              label="Sender"
              ref={register}
              name="from"
              error={errors.from?.message}
            >
              <option value="support">support@{DOMAIN}</option>
              <option value="info">info@{DOMAIN}</option>
              <option value="custom">Custom sender</option>
            </Select>
            {from === "custom" && (
              <Input
                label={`Sender Address (without @${DOMAIN})`}
                placeholder="Sender Address"
                radius="8px"
                ref={register}
                name="customFrom"
                error={errors.customFrom?.message}
              />
            )}
          </>
        )}
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
          placeholder="Email body"
          radius="8px"
          ref={register}
          name="body"
          rows="12"
        />

        {errors.server?.message && (
          <Text font="12px" color="danger" align="center" bold>
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
          Send Email
        </Button>
      </Container>

      <ConfirmationModal
        open={showEmailModal}
        dismiss={closeEmailModal}
        action={sendMail}
        title="Send Email"
        message="Are you sure you want to send this email?"
      />

      <ProcessModal
        title="Sending Email"
        open={show}
        processing={processing}
        response={response}
        success={success}
        dismiss={close}
      />
    </AdminOnly>
  );
};

export default SendUserEmail;
