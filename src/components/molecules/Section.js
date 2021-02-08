import React from "react";

import Container from "../atoms/Container";
import Text from "../atoms/Text";

const Section = ({ children, heading, action, text, hStyles, ...props }) => {
  const { name: textName, ...textProps } = text || {};

  return (
    <Container p="12px" noscroll {...props}>
      <Container p="8px 0" flex="space-between" wide>
        <Text p="0" font="16px" bold {...hStyles}>
          {heading}
        </Text>
        {text && <Text {...textProps}>{textName}</Text>}
      </Container>
      <Container h="calc(100% - 32px)" scroll>
        {children}
      </Container>
    </Container>
  );
};

export default Section;
