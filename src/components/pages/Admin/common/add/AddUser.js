import React from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Container from "../../../../atoms/Container";
import Text from "../../../../atoms/Text";
import Select from "../../../../atoms/Select";
import Input from "../../../../atoms/Input";
import Button from "../../../../atoms/Button";
import Spinner from "../../../../atoms/Spinner";

import { userSchema } from "../../../../../validators/user";

import { useAdminUsers } from "../../../../../hooks/useUsers";

import axiosInstance from "../../../../../utils/axios";

import { AdminOnly } from "../AdminChecker";

const AddUser = () => {
  const history = useHistory();
  const { mutate } = useAdminUsers();

  const defaultValues = {
    email: "",
    firstName: "",
    lastName: "",
    password: null,
    pass: null,
    role: "basic",
  };

  const { register, handleSubmit, formState, setError, errors } = useForm({
    defaultValues,
    resolver: yupResolver(userSchema),
  });

  const { isSubmitting } = formState;

  const onSubmit = async (data) => {
    try {
      await axiosInstance.post("/users", data);
      mutate();
      history.push("../users");
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
          Create User
        </Text>
        <Text p="12px 0" font="12px" opacity="0.6" bold multiline>
          Created users will have their email addresses automatically verified.
        </Text>
      </Container>

      <Container as="form" p="12px" wide onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="email"
          label="Email Address"
          placeholder="Email Address"
          radius="8px"
          ref={register}
          name="email"
          error={errors.email?.message}
        />

        <Input
          label="First Name"
          placeholder="First Name"
          radius="8px"
          ref={register}
          name="firstName"
          error={errors.firstName?.message}
        />

        <Input
          label="Last Name"
          placeholder="Last Name"
          radius="8px"
          ref={register}
          name="lastName"
          error={errors.lastName?.message}
        />

        <Input
          label="Password"
          placeholder="Password"
          type="password"
          radius="8px"
          ref={register}
          name="password"
          error={errors.password?.message}
        />

        <Input
          label="Confirm Password"
          placeholder="Confirm Password"
          type="password"
          radius="8px"
          ref={register}
          name="pass"
          error={errors.pass?.message}
        />

        <Select
          radius="8px"
          label="Role"
          ref={register}
          name="role"
          error={errors.role?.message}
        >
          <option value="basic">Basic</option>
          <option value="moderator">Moderator</option>
          <option value="admin">Admin</option>
        </Select>

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

export default AddUser;
