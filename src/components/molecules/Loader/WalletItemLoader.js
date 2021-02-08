import React from "react";

import Container from "../../atoms/Container";
import Loader from ".";

export const WalletItemLoader = ({ count = 5 }) => {
  return (
    <Container wide>
      {Array(count)
        .fill()
        .map((_, i) => (
          <Container key={i} p="12px 0" flex="flex-start">
            <Loader minW="36px" w="36px" h="36px" radius="50%" />
            <Loader m="0 0 0 12px" h="36px" radius="8px" />
          </Container>
        ))}
    </Container>
  );
};

export const WalletItemCardLoader = ({ count = 5 }) => {
  return (
    <Container wide>
      {Array(count)
        .fill()
        .map((_, i) => (
          <Loader key={i} m="0 0 12px 0" h="98px" />
        ))}
    </Container>
  );
};

export const AdminWalletItemCardLoader = ({ count = 5 }) => {
  return (
    <Container wide>
      {Array(count)
        .fill()
        .map((_, i) => (
          <Loader key={i} m="0 0 12px 0" h="64px" />
        ))}
    </Container>
  );
};

export const WalletItemFullCardLoader = ({ count = 5 }) => {
  return (
    <Container wide>
      {Array(count)
        .fill()
        .map((_, i) => (
          <Loader key={i} m="0 0 12px 0" h="178px" />
        ))}
    </Container>
  );
};
