import React from "react";

import Container from "../atoms/Container";
import Text from "../atoms/Text";

const Entry = ({ children, title, titleStyle, textStyle, ...props }) => {
  return (
    <Container
      p="12px"
      m="8px 0"
      radius="16px"
      flex="space-between"
      wide
      {...props}
    >
      <Text p="0" font="12px" {...titleStyle}>
        {title}
      </Text>
      <Text p="0" font="12px" bold {...textStyle}>
        {children}
      </Text>
    </Container>
  );
};

export default Entry;
