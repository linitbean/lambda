import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import Container from "../../atoms/Container";
import Text from "../../atoms/Text";

import { useMessage, useMessages } from "../../../hooks/useMessages";

import axiosInstance from "../../../utils/axios";

const MessageBody = () => {
  const { id } = useParams();
  const history = useHistory();

  const { message, loading, error } = useMessage(id);
  const { mutate } = useMessages();

  useEffect(() => {
    if (message && !message.read) {
      const readMessage = async () => {
        await axiosInstance.post(`/messages/${id}/read`);
        mutate();
      };
      readMessage();
    }
  }, [message, id, mutate]);

  if (error) history.goBack();

  return loading ? (
    <Container wide>
      <Container p="12px" borderbottom="1px solid" h="125px" />
    </Container>
  ) : (
    <Container wide>
      <Container p="12px" borderbottom="1px solid" wide>
        <Text font="16px" p="12px 0" bold>
          {message.title}
        </Text>
        <Container p="12px 0" wide>
          <Text p="0" font="12px" opacity="0.6" bold multiline>
            Delivered: {new Date(message.date).toDateString()}
          </Text>
          <Text p="2px 0" font="12px" opacity="0.6" bold multiline>
            reply to:- chainlinked@gmail.com
          </Text>
        </Container>
      </Container>

      <Container p="12px" wide>
        <Text as="pre" multiline>
          {message.body}
        </Text>
      </Container>
    </Container>
  );
};

export default MessageBody;
