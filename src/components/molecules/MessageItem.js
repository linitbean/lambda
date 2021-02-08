import React from "react";

import Container from "../atoms/Container";
import Text from "../atoms/Text";
import Badge from "../atoms/Badge";
import MessageIcon from "../atoms/MessageIcon";

const MessageItem = ({ message, ...props }) => {
  return (
    <Container
      p="12px 0"
      flex="space-between"
      wide="true"
      to={`/dashboard/messages/${message._id}`}
      {...props}
    >
      <MessageIcon read={message.read} />
      <Container
        w="calc(100% - 36px)"
        p="2px 0px 2px 12px"
        h="36px"
        flex="space-between"
      >
        <Container w="60%" flexCol="flex-start" justify="space-between">
          <Text font="13px" p="0" flexalign bold>
            {message.title}
            {!message.read && <Badge size="8px" m="0 0 0 8px" bg="skyblue" />}
          </Text>
          <Text font="11px" w="100%" p="0" opacity="0.8">
            {message.body}
          </Text>
        </Container>
        <Container w="40%" flexCol="flex-end" justify="center">
          <Text font="12px" p="0" opacity="0.8">
            {new Date(message.date).toDateString()}
          </Text>
        </Container>
      </Container>
    </Container>
  );
};

export default MessageItem;
