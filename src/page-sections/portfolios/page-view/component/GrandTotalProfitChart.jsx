import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import moment from "moment";
import 'moment/locale/vi'; // Import locale tiếng Việt
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import formatCurrency from "util/formatCurrency";

const data = [
  { date: "01/07", vol: 0 },
  { date: "02/07", vol: 0 },
  { date: "03/07", vol: 0 },
  { date: "04/07", vol: 0 },
  { date: "05/07", vol: 0 },
  { date: "06/07", vol: 0 },
  { date: "07/07", vol: 0 },
  { date: "08/07", vol: 0 },
  { date: "09/07", vol: 0 },
  { date: "10/07", vol: 900 },
  { date: "11/07", vol: 0 },
  { date: "12/07", vol: 0 },
  { date: "13/07", vol: 3600 },
  { date: "14/07", vol: 0 },
  { date: "15/07", vol: 0 },
  { date: "16/07", vol: 2700 },
  { date: "17/07", vol: 0 },
  { date: "18/07", vol: 0 },
  { date: "19/07", vol: 0 },
  { date: "20/07", vol: 0 },
  { date: "21/07", vol: 0 },
  { date: "22/07", vol: 0 },
  { date: "23/07", vol: 0 },
  { date: "24/07", vol: 0 },
  { date: "25/07", vol: 0 },
  { date: "26/07", vol: 0 },
  { date: "27/07", vol: 0 },
  { date: "28/07", vol: 0 },
  { date: "29/07", vol: 0 },
  { date: "30/07", vol: 0 },
  { date: "31/07", vol: 0 },
];

const GrandTotalProfitChart = () => {
    const downLg = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  const theme = useTheme();
  const {t }= useTranslation()
  const [activeIndex, setActiveIndex] = useState(null);

  const handleMouseEnter = (_, index) => {
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    setActiveIndex(null);
  };

  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data}>
        <XAxis
          axisLine={false}
          tickLine={false}
          interval={downLg? 5 : 2}
          dataKey="date"
          stroke="#fff"
          tick={{
                textAnchor: 'end', // Điều chỉnh để nhãn không bị che
                dx: 15,
                dy: 10,
            }}
        />
        <YAxis
          stroke="#fff"
          tickFormatter={(value) => value / 1000 >= 1 ? `${value / 1000}k` : `${value}`}
          axisLine={false}
          tickLine={false}
          tick={{
                dx: -10,
            }}
        />
        <Tooltip
          cursor={{ opacity: .2 }}
          content={({ payload }) => {
            if (payload && payload.length) {
              const dateStr = payload[0]?.payload?.date;
              const date = moment(dateStr, "DD/MM");
              const formattedDate = date.format('dddd, DD/MM/YYYY');
              
              // Đổi tên ngày trong tuần từ tiếng Anh sang tiếng Việt
              const vietnameseDate = formattedDate
                .replace('Monday', t('Monday'))
                .replace('Tuesday', t('Tuesday'))
                .replace('Wednesday', t('Wednesday'))
                .replace('Thursday', t('Thursday'))
                .replace('Friday', t('Friday'))
                .replace('Saturday', t('Saturday'))
                .replace('Sunday', t('Sunday'));
              
              return (
                <Box sx={{ background: "rgb(17, 24, 39)", padding: 2, borderRadius: "5px" }}>
                  <Box display={"flex"} justifyContent={"center"} alignItems={"center"} flexDirection={"column"}>
                    <Typography color={"success.main"} fontWeight={600}>{formatCurrency(payload[0]?.payload?.vol)}</Typography>
                    <Typography color={"secondary"}>{vietnameseDate}</Typography>
                  </Box>
                </Box>
              );
            }
            return null;
          }}
        />
        <Bar
          dataKey="vol"
          fill={theme.palette.success.main}
          radius={[10, 10, 0, 0]}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default GrandTotalProfitChart;
