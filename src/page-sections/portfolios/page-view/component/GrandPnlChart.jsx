import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import moment from "moment";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import formatCurrency from "util/formatCurrency";

// Sample data for the entire month
const data = [
  { date: "01/07", PnL: 0 },
  { date: "02/07", PnL: 0 },
  { date: "03/07", PnL: 0 },
  { date: "04/07", PnL: 0 },
  { date: "05/07", PnL: 0 },
  { date: "06/07", PnL: 0 },
  { date: "07/07", PnL: 0 },
  { date: "08/07", PnL: 50 },
  { date: "09/07", PnL: 100 },
  { date: "10/07", PnL: 50 },
  { date: "11/07", PnL: 100 },
  { date: "12/07", PnL: 150 },
  { date: "13/07", PnL: 50 },
  { date: "14/07", PnL: 100 },
  { date: "15/07", PnL: 50 },
  { date: "16/07", PnL: -250 },
  { date: "17/07", PnL: -500 },
  { date: "18/07", PnL: -250 },
  { date: "19/07", PnL: 0 },
  { date: "20/07", PnL: 0 },
  { date: "21/07", PnL: 0 },
  { date: "22/07", PnL: 0 },
  { date: "23/07", PnL: 0 },
  { date: "24/07", PnL: 0 },
  { date: "25/07", PnL: 0 },
  { date: "26/07", PnL: 0 },
  { date: "27/07", PnL: 0 },
  { date: "28/07", PnL: 0 },
  { date: "29/07", PnL: 0 },
  { date: "30/07", PnL: 0 },
  { date: "31/07", PnL: 0 },
];

const GrandPnLChart = () => {
    const downLg = useMediaQuery((theme) => theme.breakpoints.down("lg"));
    const theme = useTheme();
    const {t }= useTranslation()

  return (
    <ResponsiveContainer width="100%" height={250}>
      <AreaChart data={data}>
        <XAxis
          dataKey="date"
          axisLine={false}
          tickLine={false}
          interval={downLg? 5 : 2}
          stroke={theme.palette.text.primary}
          tick={{
            textAnchor: "end", // Điều chỉnh để nhãn không bị che
            dx: 15,
            dy: 10,
          }}
        />
        <YAxis
          stroke={theme.palette.text.primary}
          axisLine={false}
          tickLine={false}
          tick={{
            dx: -20,
          }}
        />
        <Tooltip
          content={({ payload }) => {
            if (payload && payload.length) {
              const dateStr = payload[0]?.payload?.date;
              const date = moment(dateStr, "DD/MM");
              const formattedDate = date.format("dddd, DD/MM/YYYY");

              // Đổi tên ngày trong tuần từ tiếng Anh sang tiếng Việt
              const vietnameseDate = formattedDate
                .replace("Monday", t("Monday"))
                .replace("Tuesday", t("Tuesday"))
                .replace("Wednesday", t("Wednesday"))
                .replace("Thursday", t("Thursday"))
                .replace("Friday", t("Friday"))
                .replace("Saturday", t("Saturday"))
                .replace("Sunday", t("Sunday"));

              return (
                <Box
                  sx={{
                    background: "rgb(17, 24, 39)",
                    padding: 2,
                    borderRadius: "5px",
                  }}
                >
                  <Box
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    flexDirection={"column"}
                  >
                    <Typography color={"success.main"} fontWeight={600}>
                      {formatCurrency(payload[0]?.payload?.PnL)}
                    </Typography>
                    <Typography color={"secondary"}>
                      {vietnameseDate}
                    </Typography>
                  </Box>
                </Box>
              );
            }
            return null;
          }}
        />
        <Area
          type="monotone"
          dataKey="PnL"
          stroke="#f0b429"
          fill="#f0b429"
          fillOpacity={0.2}
        />
        <Line
          type="monotone"
          dataKey="PnL"
          stroke="#f0b429"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 8 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default GrandPnLChart;
