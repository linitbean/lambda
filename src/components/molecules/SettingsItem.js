import React from "react";
import { FaChevronRight } from "react-icons/fa";
import styled from "styled-components";
import Container from "../atoms/Container";
import SubText from "../atoms/SubText";
import Text from "../atoms/Text";

const Wrapper = styled(Container)`
  :last-child {
    border-bottom: none;
  }
`;
export const SettingsItem = ({
  title,
  body,
  to,
  onClick,
  detail,
  icon,
  color,
  opacity,
}) => (
  <Wrapper
    flex="space-between"
    borderbottom="1px solid"
    wide="true"
    to={to}
    onClick={onClick}
  >
    <Container p="16px" flexCol="flex-start" w="calc(100% - 40px)">
      <Text
        p="0"
        font="12px"
        m="0 0 8px 0"
        opacity={opacity || "0.6"}
        color={color}
      >
        {title}
      </Text>
      <Text p="0" font="11px" multiline>
        {body}
      </Text>
    </Container>
    {(to || detail || icon) && (
      <Container flexCol="flex-end" w="40px">
        <SubText opacity="0.4" color={color}>
          {icon || <FaChevronRight />}
        </SubText>
      </Container>
    )}
  </Wrapper>
);

const NewBadge = () => {
  return (
    <SubText
      m="0 0 0 4px"
      p="2px 8px"
      bg="primary"
      color="white"
      bold
      radius="12px"
    >
      New
    </SubText>
  );
};

export const SettingsHeading = ({ heading, isNew }) => (
  <Text bg="bg" p="8px 16px" m="0 0 12px 0" font="12px" radius="8px">
    {heading} {isNew && <NewBadge />}
  </Text>
);
