import React from "react";
import { Calendar } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

import Container from "../atoms/Container";
import Text from "../atoms/Text";

import Modal from "../molecules/Modal";

const DatePicker = ({ title, date, action: cb, open, dismiss }) => {
  const action = (selectDate) => {
    cb(selectDate);
    dismiss();
  };

  return (
    <Modal open={open} dismiss={dismiss}>
      <Container
        flexCol="center"
        bg="white"
        p="12px"
        radius="12px"
        maxW="480px"
        w="auto"
        h="auto"
      >
        <Text font="14px" color="black">
          {title}
        </Text>
        <Calendar date={date} onChange={action} />
      </Container>
    </Modal>
  );
};

export default DatePicker;
