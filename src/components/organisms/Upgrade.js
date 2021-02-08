import React from "react";

import Container from "../atoms/Container";
import Text from "../atoms/Text";

import { useProfile } from "../../hooks/useProfile";

const Upgrade = (props) => {
  const { profile } = useProfile();

  if (!profile.meta.requireUpgrade) return null;

  return (
    <Container p="12px" wide {...props}>
      <Container bg="orange" p="12px" radius="8px" wide>
        <Text>
          Please Upgrade Your Account,{" "}
          <Text p="0" underline="true" to="/dashboard/settings/verification">
            {" "}
            Click here
          </Text>
        </Text>
      </Container>
    </Container>
  );
};

export default Upgrade;
