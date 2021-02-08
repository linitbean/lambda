import React from "react";
import { FaSort } from "react-icons/fa";

import Container from "../atoms/Container";
import Text from "../atoms/Text";
import SubText from "../atoms/SubText";

const DummyInput = ({ label, placeholder, value, icon, action, ...props }) => {
  const { m, w, weight, display, ...styleProps } = props;
  return (
    <Container
      wide={!w}
      w={w}
      m={m || "8px 0"}
      weight={weight}
      display={display}
    >
      <Text font="12px" p="5px 12px" bold>
        {label}
      </Text>
      <Text
        bg="bg"
        p="12px 8px 12px 12px"
        radius="4px"
        onClick={action}
        flexalign
        {...styleProps}
      >
        {value || placeholder}
        <SubText p="0" m="0 0 0 auto" opacity="0.7" flexalign>
          {icon && <FaSort />}
        </SubText>
      </Text>
    </Container>
  );
};

export default DummyInput;
