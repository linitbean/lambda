import React from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Container from "../../../../atoms/Container";
import Text from "../../../../atoms/Text";
import Input from "../../../../atoms/Input";
import Checkbox from "../../../../atoms/Checkbox";
import Button from "../../../../atoms/Button";

import ConfirmationModal from "../../../../organisms/ConfirmationModal";

import { useToggle } from "../../../../../hooks/useToggle";
import { useAdminUser } from "../../../../../hooks/useUsers";

import { changeUserPasswordSchema } from "../../../../../validators/password";

import axiosInstance from "../../../../../utils/axios";

import { AdminOnly } from "../AdminChecker";

const EditPassword = () => {
  const { userId } = useParams();

  const { user, mutate } = useAdminUser(userId);

  const { show: showConfirmationModal, toggle: toggleConfirmationModal } =
    useToggle();

  const { register, handleSubmit, watch, formState, getValues, errors } =
    useForm({
      defaultValues: {
        password: "",
        pass: "",
        showPassword: false,
      },
      resolver: yupResolver(changeUserPasswordSchema),
    });

  const { showPassword } = watch();
  const { isSubmitting } = formState;

  const changePassword = async () => {
    const { showPassword, ...formData } = getValues();
    try {
      await axiosInstance.post(
        "/users/" + user.id + "/change-password",
        formData
      );
      mutate();
    } catch (err) {
      console.log(err);
      console.log(err.message);
    }
  };

  return (
    <AdminOnly>
      <Container p="12px" borderbottom="1px solid" wide>
        <Text font="16px" p="12px 0" bold>
          Change Password
        </Text>
        <Text p="12px 0" font="12px" opacity="0.6" bold multiline>
          Change {user.fullName}'s password. Current password: {user.pass}
        </Text>
      </Container>

      <Container
        as="form"
        p="12px"
        wide
        onSubmit={handleSubmit(toggleConfirmationModal)}
      >
        <Input
          radius="8px"
          type={showPassword ? "text" : "password"}
          label="New Password"
          placeholder="New Password"
          ref={register}
          name="password"
          error={errors.password?.message}
        />
        <Input
          radius="8px"
          type={showPassword ? "text" : "password"}
          label="Confirm Password"
          placeholder="Confirm Password"
          ref={register}
          name="pass"
          error={errors.pass?.message}
        />
        <Checkbox
          m="0"
          label="Show passwords?"
          ref={register}
          name="showPassword"
        />
        <Button
          type="submit"
          bg="primary"
          m="24px 0"
          full
          radius="4px"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Processing" : "Change Password"}
        </Button>
        <ConfirmationModal
          open={showConfirmationModal}
          dismiss={toggleConfirmationModal}
          action={changePassword}
          title="Change Password"
          message={`Are you sure you want to continue? ${user.fullName} would be logged out of their account`}
          preventDismiss
        />
      </Container>
    </AdminOnly>
  );
};

export default EditPassword;
