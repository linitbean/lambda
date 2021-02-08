import styled from "styled-components";
import { FaArrowUp } from "react-icons/fa";

const ChangeIcon = styled(FaArrowUp)`
  margin-left: 4px;
  color: ${({ negative, theme }) =>
    negative ? theme.colors.danger : theme.colors.success};
  transform: ${({ negative }) => negative && "rotateZ(180deg)"};
  transition: transform 0.4s ease-in-out;
`;

export default ChangeIcon;
