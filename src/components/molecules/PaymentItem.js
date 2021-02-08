import React from "react";

import Container from "../atoms/Container";
import Text from "../atoms/Text";
import Entry from "./Entry";
import Button from "../atoms/Button";

const PaymentItem = ({ payment, ...props }) => {
  return (
    <Container p="16px 12px" radius="12px" bg="bg" display="block" {...props}>
      <Text p="0" font="16px" bold>
        {payment.title}
      </Text>

      <Container p="12px 0" wide>
        <Entry
          p="4px"
          title="Amount"
          titleStyle={{
            bold: true,
            opacity: "0.6",
          }}
        >
          {payment.amount}
        </Entry>

        <Entry
          p="4px"
          title="Date"
          titleStyle={{
            bold: true,
            opacity: "0.6",
          }}
        >
          {new Date(payment.date).toDateString()}
        </Entry>

        <Entry
          p="4px"
          title="Status"
          titleStyle={{
            bold: true,
            opacity: "0.6",
          }}
        >
          {payment.completed ? "Completed" : "Pending"}
        </Entry>
      </Container>

      <Button
        p="8px 12px"
        m="12px 0 0"
        bg="secondary"
        color="black"
        radius="6px"
        bold
        full
        disabled
      >
        {payment.completed ? "Completed" : "Pending"}
      </Button>
    </Container>
  );
};

export default PaymentItem;
