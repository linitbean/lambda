import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import Container from "../../../../atoms/Container";
import Text from "../../../../atoms/Text";
import Input from "../../../../atoms/Input";
import Checkbox from "../../../../atoms/Checkbox";
import Button from "../../../../atoms/Button";
import Spinner from "../../../../atoms/Spinner";

import UserItem from "../../../../molecules/UserItem";

import axiosInstance from "../../../../../utils/axios";

const FindUser = () => {
  const [user, setUser] = useState(null);

  const schema = yup.object().shape({
    searchByEmail: yup.boolean(),
    userId: yup.string().when("searchByEmail", {
      is: false,
      then: yup
        .string()
        .matches(/^[0-9a-fA-F]{24}$/, "Invalid User ID")
        .required("User ID is required"),
    }),
    email: yup.string().when("searchByEmail", {
      is: true,
      then: yup
        .string()
        .email("Invalid Email Address")
        .required("Email Address required"),
    }),
  });

  const {
    register,
    handleSubmit,
    watch,
    formState,
    setError,
    errors,
  } = useForm({
    defaultValues: { userId: "", searchByEmail: false, email: "" },
    resolver: yupResolver(schema),
  });

  const { searchByEmail } = watch();
  const { isSubmitting } = formState;

  const onSubmit = async (data) => {
    // console.log(data);
    if (searchByEmail) {
      try {
        const { data: res } = await axiosInstance.post("/profile/email", {
          email: data.email,
        });
        // console.log(res);
        setUser(res);
      } catch (err) {
        // console.log(err.response);
        setError("email", {
          type: "server",
          message: err.response.data.message,
        });
      }
    } else {
      try {
        const { data: res } = await axiosInstance.get(
          "/profile/" + data.userId
        );
        // console.log(res);
        setUser(res);
      } catch (err) {
        // console.log(err.response);
        setError("userId", {
          type: "server",
          message: err.response.data.message,
        });
      }
    }
  };

  return (
    <>
      <Container p="12px" borderbottom="1px solid" wide>
        <Text font="16px" p="12px 0" bold>
          Find User
        </Text>
        <Text p="12px 0" font="12px" opacity="0.6" bold multiline>
          Pull user with user ID or email address
        </Text>
      </Container>

      <Container as="form" p="12px" wide onSubmit={handleSubmit(onSubmit)}>
        {user && <UserItem m="0 0 24px" user={user} />}

        <Input
          label="User ID"
          placeholder="User ID"
          error={errors.userId?.message}
          radius="8px"
          ref={register}
          name="userId"
          display={searchByEmail ? "none" : "block"}
        />
        <Input
          type="email"
          label="Email Address"
          placeholder="Email Address"
          error={errors.email?.message}
          radius="8px"
          ref={register}
          name="email"
          display={searchByEmail ? "block" : "none"}
        />

        <Checkbox
          label="Search User by Email?"
          ref={register}
          name="searchByEmail"
        />

        <Text multiline>
          Enter User ID into the search field and click find to search for a
          single user.
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

export default FindUser;
