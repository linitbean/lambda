import React from "react";
import { FaCreditCard } from "react-icons/fa";

import Container from "../atoms/Container";
import Text from "../atoms/Text";
import SubText from "../atoms/SubText";

import CardPicker from "../organisms/CardPicker";

import { useToggle } from "../../hooks/useToggle";
import CardBrand from "../atoms/CardBrand";

const CardInput = ({
  label,
  error,
  placeholder,
  hint,
  card,
  cards,
  noadd,
  onChange,
  name,
  ...props
}) => {
  const { show, toggle } = useToggle();

  const { w, m, weight, display, color, ...styleProps } = props;

  const change = (selectedCard) => {
    return onChange({
      target: {
        name: name,
        type: "card",
        value: selectedCard._id,
        rawValue: selectedCard,
      },
    });
  };

  const cardName = cards.find((c) => c._id === card);

  return (
    <Container
      wide={!w}
      w={w}
      m={m || "8px 0"}
      weight={weight}
      display={display}
    >
      <Text
        color={error ? "danger" : color || undefined}
        font="12px"
        p="5px 12px"
        bold
      >
        {error || label}
      </Text>
      <Text
        as="div"
        bg="bg"
        p="0 8px 0 12px"
        radius="4px"
        onClick={toggle}
        flexalign
        {...styleProps}
      >
        <SubText p="12px 0" font="inherit">
          {cardName
            ? `${cardName.issuer.toUpperCase()} **** ${cardName.cardNumber.slice(
                -5
              )}`
            : placeholder}
        </SubText>

        <SubText
          as="div"
          font="16px"
          p="0"
          m="0 0 0 auto"
          opacity="0.7"
          flexalign
        >
          {cardName ? (
            <CardBrand size="32px" logo={cardName.issuer} />
          ) : (
            <FaCreditCard />
          )}
        </SubText>
      </Text>
      <CardPicker
        open={show}
        dismiss={toggle}
        title={hint || label}
        cards={cards}
        action={change}
        noadd={noadd}
      />
    </Container>
  );
};

export default CardInput;
