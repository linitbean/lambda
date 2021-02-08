import styled from "styled-components";
import Trend from "react-trend";

const Chart = styled(Trend)`
  height: 100%;
  min-height: ${({ min }) => min || "200px"};
  max-height: ${({ max }) => max && max};
`;

export default Chart;
