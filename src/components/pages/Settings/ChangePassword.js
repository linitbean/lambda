import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Container from "../../atoms/Container";
import Text from "../../atoms/Text";
import Input from "../../atoms/Input";
import Checkbox from "../../atoms/Checkbox";
import Button from "../../atoms/Button";

import FormInfoText from "../../molecules/FormInfoText";

import ConfirmationModal from "../../organisms/ConfirmationModal";

import { useToggle } from "../../../hooks/useToggle";
import { useProfile } from "../../../hooks/useProfile";

import { changePasswordSchema } from "../../../validators/password";

import axiosInstance from "../../../utils/axios";

const ChangePassword = () => {
  const { logout } = useProfile();

  const {
    show: showConfirmationModal,
    toggle: toggleConfirmationModal,
  } = useToggle();

  const {
    register,
    handleSubmit,
    watch,
    formState,
    setError,
    getValues,
    errors,
  } = useForm({
    defaultValues: {
      oldPassword: "",
      password: "",
      pass: "",
      showPassword: false,
    },
    resolver: yupResolver(changePasswordSchema),
  });

  const { showPassword } = watch();
  const { isSubmitting } = formState;

  const changePassword = async () => {
    const { showPassword, ...formData } = getValues();
    try {
      await axiosInstance.post("/profile/change-password", formData);
      logout();
    } catch (err) {
      if (err.response.data.status === 403) {
        setError("oldPassword", {
          type: "server",
          message: "Password is incorrect",
        });
      }
    }
  };

  return (
    <Container wide>
      <Container flexCol="center" h="120px">
        <Text p="0" m="0 0 12px 0" font="14px" bold>
          Update Password
        </Text>
        <Text p="0" font="12px" opacity="0.6" align="center" bold multiline>
          Updating your password would log you out of all devices
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
          label="Old Password"
          placeholder="Old Password"
          ref={register}
          name="oldPassword"
          error={errors.oldPassword?.message}
        />
        <FormInfoText p="12px 8px" icon iconStyle={{ color: "red" }}>
          Ensure you use a password that you have not used before
        </FormInfoText>

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
          message="Are you sure you want to continue? You would be required to login with your new password"
          preventDismiss
        />
      </Container>
    </Container>
  );
};

export default ChangePassword;
