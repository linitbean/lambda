import React from "react";

import Container from "../../atoms/Container";
import Loader from ".";

export const WalletPreviewLoader = () => {
  return (
    <Container p="12px" wide>
      <Loader m="12px 0" h="64px" />
      <Loader m="12px 0" h="24px" />
      <Loader m="12px 0" h="240px" />
    </Container>
  );
};
