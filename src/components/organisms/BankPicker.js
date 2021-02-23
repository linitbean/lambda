import React from "react";

import Container from "../atoms/Container";
import Text from "../atoms/Text";

import { AdminBankItem } from "../molecules/Bank";
import Modal from "../molecules/Modal";

const BankPicker = ({ title, banks = [], action: cb, open, dismiss }) => {
  const action = (selected) => {
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
          {title || "Select Bank"}
        </Text>
        <Container h="calc(100% - 48px)" scroll>
          {banks.map((bank) => (
            <AdminBankItem key={bank.name} action={action} bank={bank} nolink />
          ))}
        </Container>
      </Container>
    </Modal>
  );
};

export default BankPicker;
