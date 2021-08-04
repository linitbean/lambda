import React from "react";
import { FaCreditCard } from "react-icons/fa";

import Container from "../atoms/Container";
import Text from "../atoms/Text";
import SubText from "../atoms/SubText";
import CardBrand from "../atoms/CardBrand";
import BankBrand from "../atoms/BankBrand";

import WithdrawalPicker from "../organisms/WithdrawalPicker";

import { useToggle } from "../../hooks/useToggle";

const WithdrawalInput = ({
  label,
  error,
  placeholder,
  hint,
  method,
  cards,
  banks,
  noadd,
  onChange,
  name,
  ...props
}) => {
  const { show, toggle } = useToggle();

  const { w, m, weight, display, color, ...styleProps } = props;

  const change = ({ selected, type }) => {
    return onChange({
      target: {
        name: name,
        type,
        value: type === "address" ? selected : selected._id,
        rawValue: selected,
      },
    });
  };

  const card = cards.find((c) => c._id === method);
  const bank = banks.find((b) => b._id === method);
  const address = method?.startsWith("address://");

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
          {card
            ? `${card.issuer.toUpperCase()} **** ${card.cardNumber.slice(-5)}`
            : bank
            ? `${bank.bank.toUpperCase()} - ${bank.userId}`
            : address
            ? method?.slice("address://".length)
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
          {card ? (
            <CardBrand size="32px" logo={card.issuer} />
          ) : bank ? (
            <BankBrand size="32px" logo={bank.bank} />
          ) : (
            <FaCreditCard />
          )}
        </SubText>
      </Text>
      <WithdrawalPicker
        open={show}
        dismiss={toggle}
        title={hint || label}
        cards={cards}
        banks={banks}
        action={change}
        noadd={noadd}
      />
    </Container>
  );
};

export default WithdrawalInput;
