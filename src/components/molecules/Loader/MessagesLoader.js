import React from "react";

import Container from "../../atoms/Container";
import Loader from ".";

export const MessagesLoader = ({ count = 5 }) => {
  return (
    <Container wide>
      {Array(count)
        .fill()
        .map((_, i) => (
          <Container key={i} p="12px 0" flex="flex-start">
            <Loader minW="36px" w="36px" h="36px" radius="50%" />
            <Loader m="0 0 0 12px" h="32px" radius="8px" />
          </Container>
        ))}
    </Container>
  );
};
