import React from "react";

import Container from "../../atoms/Container";
import Loader from ".";

export const PaymentsLoader = ({ count = 2 }) => {
  return (
    <Container wide>
      {Array(count)
        .fill()
        .map((_, i) => (
          <Loader key={i} m="0 0 12px 0" h="227px" radius="12px" />
        ))}
    </Container>
  );
};
