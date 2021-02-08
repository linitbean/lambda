import React, { useState } from "react";
import { useTheme as useStyledTheme } from "styled-components";

import Container from "../atoms/Container";
import Chart from "../atoms/Chart";

import IntervalSwitch from "../molecules/IntervalSwitch";

import { useKlines } from "../../hooks/useKlines";

const WalletChart = ({ wallet, intervalStyle, reverse, ...props }) => {
  const theme = useStyledTheme();

  const intervals = [
    { name: "1Y", value: 365 },
    { name: "6M", value: 182 },
    { name: "3M", value: 121 },
    { name: "1M", value: 30 },
    { name: "1W", value: 7 },
    { name: "1D", value: 1 },
  ];
  const [interval, setInterval] = useState("1D");
  const activeInterval = intervals.find((i) => i.name === interval);

  const { klines } = useKlines(wallet?.symbol, activeInterval?.value);

  return (
    <Container
      display="flex"
      justify="space-between"
      direction={reverse ? "column-reverse" : "column"}
      wide={!props.h}
      {...props}
    >
      <Chart
        smooth
        autoDraw
        autoDrawDuration={3000}
        autoDrawEasing="ease-out"
        data={klines}
        gradient={[theme.colors.chart]}
        radius={8}
        strokeWidth={1.5}
        strokeLinecap={"round"}
        min={`calc(100% - ${(intervalStyle && intervalStyle.h) || "24px"})`}
      />
      <IntervalSwitch
        {...intervalStyle}
        active={interval}
        action={(value) => setInterval(value)}
        intervals={intervals}
        bg={theme.colors.primary}
      />
    </Container>
  );
};

export default WalletChart;
