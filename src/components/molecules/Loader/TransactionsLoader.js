import React from "react";

import Container from "../../atoms/Container";
import Loader from ".";

export const TransactionsLoader = ({ count = 5 }) => {
  return (
    <Container radius="8px" o="hidden" wide>
      {Array(count)
        .fill()
        .map((_, i) => (
          <Loader key={i} m="1px 0" h="70px" radius="0px" />
        ))}
    </Container>
  );
};
