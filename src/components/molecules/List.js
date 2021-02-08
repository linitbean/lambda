import React from "react";
import styled from "styled-components";
import { FaChevronRight } from "react-icons/fa";

import Container from "../atoms/Container";
import SubText from "../atoms/SubText";
import Text from "../atoms/Text";

const ListWrapper = styled(Container)`
  ${Text} {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    :last-child {
      border: none;
    }
  }
`;

export const List = ({ children, ...props }) => {
  return (
    <ListWrapper as="ul" bg="bgContrast" radius="16px" noscroll wide {...props}>
      {children}
    </ListWrapper>
  );
};

export const ListItem = ({ children, icon, iconStyle, ...props }) => {
  return (
    <Text
      as="li"
      p="12px"
      pointer="pointer"
      flexalign="true"
      justify="space-between"
      {...props}
    >
      {children}
      <SubText p="0" opacity="0.6" flexalign {...iconStyle}>
        {icon || <FaChevronRight />}
      </SubText>
    </Text>
  );
};
