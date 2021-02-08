import styled from "styled-components";

const Image = styled.img`
  width: ${({ w }) => (w ? w : "100%")};
  height: ${({ h }) => (h ? h : "100%")};
  padding: ${({ p }) => p && p};
  margin: ${({ m }) => m && m};
  border-radius: ${({ radius }) => radius && radius};

  max-width: ${({ max }) => max || "100%"};

  object-fit: ${({ fit }) => fit || "cover"};
  object-position: ${({ pos }) => pos || "center"};
`;

export default Image;
