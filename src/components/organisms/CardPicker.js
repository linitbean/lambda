import React from "react";

import Container from "../atoms/Container";
import Text from "../atoms/Text";

import { CreditCardItem, AddCreditCardItem } from "../molecules/CreditCard";
import Modal from "../molecules/Modal";

const CardPicker = ({
  title,
  cards = [],
  action: cb,
  open,
  dismiss,
  noadd,
}) => {
  const action = (selectedCard) => {
    const selected = cards.find((card) => card._id === selectedCard._id);
    cb(selected);
    dismiss();
  };

  return (
    <Modal open={open} dismiss={dismiss}>
      <Container
        flexCol="center"
        w="95%"
        h="400px"
        maxW="480px"
        maxH="80vh"
        bg="bgContrast"
        p="12px"
        radius="12px"
      >
        <Text font="14px" p="8px 0 20px" bold>
          {title || "Select Card"}
        </Text>
        <Container h="calc(100% - 48px)" scroll>
          {cards.map((card) => (
            <CreditCardItem key={card._id} nolink action={action} card={card} />
          ))}
          {!noadd && <AddCreditCardItem />}
          {!cards.length && (
            <Container minH="120px" flex="center" wide>
              <Text opacity="0.6" bold>
                No card
              </Text>
            </Container>
          )}
        </Container>
      </Container>
    </Modal>
  );
};

export default CardPicker;
