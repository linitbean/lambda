import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import Container from "../../atoms/Container";
import Text from "../../atoms/Text";
import SubText from "../../atoms/SubText";
import Button from "../../atoms/Button";
import Spinner from "../../atoms/Spinner";

import AuthLayout from "../../templates/Auth";

import { useProfile } from "../../../hooks/useProfile";

import axiosInstance from "../../../utils/axios";

const RequestEmailVerification = () => {
  const { profile } = useProfile();

  const [requested, setRequested] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showRequestButton, setShowRequestButton] = useState(false);

  const requestVerification = async () => {
    try {
      setLoading(true);
      await axiosInstance.post("/profile/request-email-verification");
      setRequested(true);
      setLoading(false);
    } catch (err) {
      // console.log(err);
      setLoading(false);
    }
  };

  if (profile.meta.isEmailVerified) return <Redirect to="/dashboard" />;

  return (
    <AuthLayout>
      <Container p="12px 0" wide>
        <Text p="0" m="0 0 012px 0" align="center" bold>
          Verify Your Email
        </Text>
        <Text font="12px" p="0" align="center" opacity="0.6" bold multiline>
          {requested
            ? "We just sent you a verification link. Check your email and click on the link to verify your account"
            : "Please check your email to verify your account"}
        </Text>
      </Container>
      <Container m="24px 0 0" wide>
        {!requested && (
          <Text font="12px" p="0" align="center" opacity="0.6" bold>
            Didn't get a verification email?
            <SubText
              font="inherit"
              color="primary"
              p="0"
              m="0 0 0 4px"
              bold
              underline
              onClick={() => setShowRequestButton(true)}
            >
              Click Here
            </SubText>
          </Text>
        )}
        {showRequestButton && (
          <Button
            type="submit"
            bg="primary"
            radius="2px"
            m="12px 0 12px"
            full
            bold
            disabled={requested}
            onClick={requestVerification}
          >
            {loading ? (
              <Spinner />
            ) : requested ? (
              "Please check your email"
            ) : (
              "Request Verification"
            )}
          </Button>
        )}
      </Container>
    </AuthLayout>
  );
};

export default RequestEmailVerification;
