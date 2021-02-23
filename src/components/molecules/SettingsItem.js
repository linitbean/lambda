import React from "react";
import styled from "styled-components";
import { FaChevronRight } from "react-icons/fa";

import Container from "../atoms/Container";
import Text from "../atoms/Text";
import SubText from "../atoms/SubText";

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

export const SettingsHeading = ({ heading }) => (
  <Text bg="bg" p="8px 16px" m="0 0 12px 0" font="12px" radius="8px">
    {heading}
  </Text>
);
