// Statistics.js
import React, { useContext, useState } from "react";
import {
  Box,
  Typography,
  Switch,
  Grid,
  Paper,
  Card,
  CardContent,
} from "@mui/material";
import { isDark } from "utils/constants";
import { SettingsContext } from "contexts/settingsContext";
import { ManualTradeContext } from "contexts/ManualTradeContext";
import round2number from "util/round2number";
import formatCurrency from "util/formatCurrency";

const Statistics = () => {
  const { walletMode } = useContext(SettingsContext);
  const { dataStat } = useContext(ManualTradeContext);
  const [percent, setPercent] = useState();
  const [rate, setRate] = useState();

  const renderWinLoseRate = (rate) => {
    /// do có số = 0 nên setPercent nó lỗi oke a
    if (rate) {
      switch (walletMode) {
        case true:
          return dataStat?.day_win_live + "/" + dataStat?.day_lose_live;
        case false:
          return dataStat?.day_win_demo + "/" + dataStat?.day_lose_demo;
        default:
          return;
      }
    } else {
      switch (walletMode) {
        case true:
          return round2number(
            (dataStat?.day_win_live / (dataStat?.day_lose_live + dataStat?.day_win_live)) * 100
          );
        case false:
          return round2number(
            (dataStat?.day_win_demo / (dataStat?.day_lose_demo + dataStat?.day_win_demo)) * 100
          );
        default:
          return;
      }
    }
  };

  const renderProfitDay = () => {
    switch (walletMode) {
      case true:
        return  formatCurrency(dataStat?.day_profit_live);
      case false:
        return formatCurrency(dataStat?.day_profit_demo);
      default:
        return;
    }
  };

  const renderWeekVolume = () => {
    switch (walletMode) {
      case true:
        return formatCurrency(dataStat?.week_volume_live);
      case false:
        return formatCurrency(dataStat?.week_volume_demo);
      default:
        return;
    }
  };

  const renderWeekProfit = () => {
    switch (walletMode) {
      case true:
        return formatCurrency(dataStat?.week_lose_live);
      case false:
        return formatCurrency(dataStat?.week_profit_demo);
      default:
        return;
    }
  };

  return (
    <Box mt={2}>
      <Card variant="outlined">
        <CardContent>
          <Box>
            <Typography variant="h6">Thống kê</Typography>
            <Grid container spacing={2}>
              <StatisticCard
                title="Thắng/Thua hôm nay"
                value={renderWinLoseRate(true)}
                percentage={`${renderWinLoseRate()}% Tỉ lệ thắng`}
              />
              <StatisticCard
                title="Lợi nhuận hôm nay"
                value={renderProfitDay()}
                percentage="Lợi nhuận hôm nay"
                hidden={true}
              />
              <StatisticCard title="KLGD 7N" value={renderWeekVolume()} />
              <StatisticCard title="Lợi nhuận 7N" value={renderWeekProfit()} />
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

const StatisticCard = ({ title, value, percentage, hidden }) => {
  // const theme= useTheme()
  return (
    <Grid item xs={6} variant="outlined">
      <CardContent
        sx={{
          border: (theme) =>
            isDark(theme)
              ? `1px solid ${theme.palette.border}`
              : `1px solid ${theme.palette.border}`,
          borderRadius: "10px",
        }}
      >
        <Typography fontSize={10}>{title}</Typography>
        <Typography fontSize={14} fontWeight={600}>
          {value}
        </Typography>
        {percentage && (
          <Typography sx={{ opacity: hidden === true ? 0 : 1 }} fontSize={10}>
            {percentage}
          </Typography>
        )}
      </CardContent>
    </Grid>
  );
};

export default Statistics;
