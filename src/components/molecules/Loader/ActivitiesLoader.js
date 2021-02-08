import React from "react";

import Container from "../../atoms/Container";
import Loader from ".";

export const ActivitiesLoader = ({ count = 5 }) => {
  return (
    <Container wide>
      {Array(count)
        .fill()
        .map((_, i) => (
          <Loader key={i} m="12px 0" h="40px" />
        ))}
    </Container>
  );
};
