import React from "react";
import styled from "styled-components";
import { ReactSVG } from "react-svg";

import Loader from "../molecules/Loader";

const Icon = styled(ReactSVG)`
  height: ${({ size }) => size || "36px"};
  overflow: hidden;

  svg {
    height: ${({ size }) => size || "36px"};
    width: 60px;

    vertical-align: top;
  }
`;

const CardBrand = ({ logo, ...props }) => {
  const supportedCards = ["american-express", "discover", "mastercard", "visa"];
  if (!supportedCards.includes(logo)) return null;
  return (
    <Icon
      fallback={() => "error"}
      loading={() => <Loader w="60px" h={props.size} radius="4px" />}
      src={`/assets/icons/card/${logo.toLowerCase()}.svg`}
      {...props}
    />
  );
};
export default CardBrand;
