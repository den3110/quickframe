import React, { useState, useEffect } from "react";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import moment from "moment";
import 'moment/locale/vi'; // Import locale tiếng Việt
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

const GrandTotalProfitChart = ({ data: originalData, monthProps }) => {
  const downLg = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  const theme = useTheme();
  const { t } = useTranslation();
  const [updatedData, setUpdatedData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);

  const getCurrentMonthData = (year, month) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const data = [];
    for (let day = 1; day <= daysInMonth; day++) {
      const date = `${String(day).padStart(2, '0')}/${String(month + 1).padStart(2, '0')}`;
      data.push({ date, vol: 0 });
    }
    return data;
  };

  const formatDate = timestamp => {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `${day}/${month}`;
  };

  useEffect(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = monthProps -1;

    const data = getCurrentMonthData(year, month);
    const volumeData = originalData.filter(item => item.title === "Volume");
    const volumeDataFormatted = volumeData.map(item => ({
      date: formatDate(item.start),
      vol: item.desc
    }));

    const updatedData = data.map(item => {
      const volumeItem = volumeDataFormatted.find(v => v.date === item.date);
      return volumeItem ? { ...item, vol: volumeItem.vol } : item;
    });

    setUpdatedData(updatedData);

  }, [monthProps, originalData]); // Theo dõi cả monthProps và originalData

  const handleMouseEnter = (_, index) => {
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    setActiveIndex(null);
  };

  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={updatedData}>
        <XAxis
          axisLine={false}
          tickLine={false}
          interval={downLg ? 5 : 2}
          dataKey="date"
          stroke={theme.palette.text.primary}
          tick={{
            textAnchor: 'end',
            dx: 5,
            dy: 5,
          }}
          fontSize={downLg ? 14 : 16}
        />
        <YAxis
          stroke={theme.palette.text.primary}
          tickFormatter={(value) => value / 1000 >= 1 ? `${value / 1000}k` : `${value}`}
          axisLine={false}
          tickLine={false}
          tick={{
            dx: -10,
          }}
          fontSize={downLg ? 14 : 16}
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
