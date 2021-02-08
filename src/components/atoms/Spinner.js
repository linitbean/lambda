import styled, { keyframes } from "styled-components";
import { CgSpinner } from "react-icons/cg";

const spin = keyframes`
  0% {
      transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Spinner = styled(CgSpinner)`
  --size: ${({ size }) => size || "21px"};
  width: var(--size);
  height: var(--size);

  display: block;

  color: ${({ color, theme }) => theme.colors[color] || (color && color)};

  animation: ${spin} 0.8s linear infinite;
`;

export default Spinner;
