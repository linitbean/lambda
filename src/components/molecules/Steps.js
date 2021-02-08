import styled from "styled-components";

import Container from "../atoms/Container";

const Absolute = styled(Container)`
  position: absolute;
  transform: ${({ tab, step }) =>
    tab === step
      ? "translateX(0)"
      : tab < step
      ? "translateX(-100%)"
      : "translateX(100%)"};
  transition: transform 0.3s ease-out;

  display: block;
`;

const Steps = ({ children, step, ...props }) => {
  return (
    <Container position="relative" o="hidden" {...props}>
      {children.map((child, i) => (
        <Absolute key={i} tab={i + 1} step={step}>
          {child}
        </Absolute>
      ))}
    </Container>
  );
};

export default Steps;
