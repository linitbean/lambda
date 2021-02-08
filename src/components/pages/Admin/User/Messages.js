import React from "react";
import { useParams } from "react-router-dom";

import Container from "../../../atoms/Container";
import Text from "../../../atoms/Text";

import AddButton from "../../../molecules/AddButton";
import MessageItem from "../../../molecules/MessageItem";
import { MessagesLoader } from "../../../molecules/Loader";

import { useAdminUser } from "../../../../hooks/useUsers";
import { useAdminUserMessages } from "../../../../hooks/useMessages";

import { AdminDisplay } from "../common/AdminChecker";

const Messages = () => {
  const { userId } = useParams();

  const { user } = useAdminUser(userId);
  const { messages, loading } = useAdminUserMessages(userId);

  return (
    <>
      <Container p="12px" borderbottom="1px solid" wide>
        <Text font="16px" p="12px 0" bold>
          {user.firstName}'s Messages
        </Text>
        <Text p="12px 0" font="12px" opacity="0.6" bold multiline>
          Manage all messages for {user.fullName}
        </Text>
      </Container>

      <AdminDisplay>
        <AddButton title="Send Message" to="./messages/add" />
      </AdminDisplay>

      <Container p="12px" wide>
        {loading ? (
          <MessagesLoader />
        ) : messages.length ? (
          messages.map((message) => (
            <MessageItem
              key={message._id}
              message={message}
              to={`/dashboard/admin/users/${message.user}/messages/${message._id}`}
            />
          ))
        ) : (
          <Container minH="240px" flex="center">
            <Text opacity="0.6" bold>
              No Messages
            </Text>
          </Container>
        )}
      </Container>
    </>
  );
};

export default Messages;
