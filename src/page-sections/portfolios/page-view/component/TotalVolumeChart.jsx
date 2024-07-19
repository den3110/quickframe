import { useTheme } from "@mui/material";
import React from "react";
import Chart from "react-apexcharts";

const TotalVolumeChart = () => {
  
  const theme = useTheme();
  const options = {
    chart: {
      id: "small-line-chart-2",
      sparkline: {
        enabled: true,
      },
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    colors: ["rgb(140, 98, 255)"],
    tooltip: {
      enabled: false,
    },
    markers: {
      size: 0, 
    },
  };

  const series = [
    {
      name: "Line",
      data: [10, 20, 15, 30, 25, 40, 35],
    },
  ];

  return (
    <div>
      <Chart
        options={options}
        series={series}
        type="area"
        width="100"
        height="50"
      />
    </div>
  );
};

export default TotalVolumeChart;
