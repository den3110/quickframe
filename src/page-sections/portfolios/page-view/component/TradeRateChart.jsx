import React from "react";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/material";
import { Gauge, gaugeClasses  } from "@mui/x-charts";

const TradeRateChart = ({ rate= 0 }) => {
  const theme = useTheme();

  return (
    <Box>
      <Gauge
        sx={{
          [`& .${gaugeClasses.valueText}`]: {
            fontSize: 14,
            transform: "translate(0px, -20px)",
          },
        }}
        width={120}
        height={120}
        value={isNaN(rate) ? 0 : rate}
        startAngle={-90}
        endAngle={90}
      />
    </Box>
  );
};

export default TradeRateChart;
