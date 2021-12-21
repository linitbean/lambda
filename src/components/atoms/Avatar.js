import styled from "styled-components";

const Wrapper = styled.div`
  --size: ${({ size }) => size || "32px"};
  width: var(--size);
  height: var(--size);

  min-width: var(--size);

  border-radius: 50%;
  background-color: ${({ bg, theme, demo }) =>
    demo ? "white" : theme.colors[bg] || bg || theme.colors.primary};

  display: flex;
  justify-content: center;
  align-items: center;

  color: ${({ bg, demo, theme }) =>
    demo ? theme.colors[bg] || bg || theme.colors.primary : "white"};

  font-size: ${({ font }) => font || "calc(0.4375 * var(--size))"};
  cursor: pointer;
`;

const Avatar = ({ name, demo, ...props }) => {
  const initials = name
    ?.split(" ")
    .slice(0, 2)
    .map((word) => word.substring(0, 1))
    .join("");

  return (
    <Wrapper demo={demo} {...props}>
      {initials}
    </Wrapper>
  );
};

export default Avatar;
