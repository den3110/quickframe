import React from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';

const TradeRateChart = () => {
  const theme = useTheme();

  const options = {
    chart: {
      type: 'radialBar',
    },
    plotOptions: {
      radialBar: {
        offsetY: -10,
        startAngle: -90,
        endAngle: 90,
        hollow: {
          margin: 0,
          size: '70%',
          background: 'transparent',
        },
        track: {
          background: '#e7e7e7',
        },
        dataLabels: {
          name: {
            fontSize: '16px',
            color: undefined,
            offsetY: -10,
            show: false,
          },
          value: {
            fontSize: '22px',
            color: '#000',
            offsetY: 7,
            show: false,

          },
        },
      },
    },
    fill: {
        colors: [theme.palette.success.main], 
      },
    stroke: {
      lineCap: 'round',
    },
    series: [70], // giá trị gauge
    labels: [],
  };

  return (
    <div>
      <Chart options={options} series={options.series} type="radialBar" width="150" />
    </div>
  );
};

export default TradeRateChart;
