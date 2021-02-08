import React from "react";
import { Redirect } from "react-router-dom";

import Container from "../atoms/Container";
import Text from "../atoms/Text";
import Button from "../atoms/Button";

import { useProfile } from "../../hooks/useProfile";

import { getUserLevel } from "../../utils/userUtils";

const VerificationRequest = ({ level, desc }) => {
  const { profile } = useProfile();
  const userLevel = getUserLevel(profile);

  const canUpgrade = userLevel === level - 1;

  if (!canUpgrade) return <Redirect to="/dashboard/settings/verification" />;

  return (
    <Container p="24px 0" flexCol="center" wide>
      <Container flexCol="center" wide>
        <Text p="0" opacity="0.6" bold>
          Level {level}
        </Text>
        <Text p="4px" font="12px" opacity="0.8">
          {desc}
        </Text>
      </Container>

      <Container p="24px 12px" flexCol="center" maxW="480px" h="360px">
        <Text font="16px" align="center" multiline bold>
          Submit documents
        </Text>
        <Text font="12px" align="center" multiline>
          Please check your email for instructions on verifying your account.
          You may be required to upload additional documents.
        </Text>
      </Container>
      <Container p="12px" flexCol="center" wide>
        <Button
          radius="4px"
          max="480px"
          bg="primary"
          bold="true"
          full="true"
          to=".."
        >
          Ok
        </Button>
      </Container>
    </Container>
  );
};

export default VerificationRequest;
