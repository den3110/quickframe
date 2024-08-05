// Statistics.js
import React, { memo, useContext, useEffect, useRef, useState } from "react";
import {
  Box,
  Typography,
  // Switch,
  Grid,
  // Paper,
  Card,
  CardContent,
  Skeleton,
} from "@mui/material";
import { isDark } from "util/constants";
import { SettingsContext } from "contexts/settingsContext";
import { ManualTradeContext } from "contexts/ManualTradeContext";
import round2number from "util/round2number";
import formatCurrency from "util/formatCurrency";
import CountUp from "react-countup";
import { useTranslation } from "react-i18next";
import DialogAskBeforeAction from "components/dialog/DialogAskBeforeAction";

const Statistics = () => {
  const { t } = useTranslation();
  const { walletMode } = useContext(SettingsContext);
  const { dataStat, loading } = useContext(ManualTradeContext);
  const dayWinLiveRef = useRef(0);
  const dayLoseLiveRef = useRef(0);
  const dayWinDemoRef = useRef(0);
  const dayLoseDemoRef = useRef(0);
  // const [percent, setPercent] = useState();
  // const [rate, setRate] = useState();

  useEffect(() => {
    dayWinLiveRef.current = dataStat?.day_win_live;
    dayLoseLiveRef.current = dataStat?.day_lose_live;
    dayWinDemoRef.current = dataStat?.day_win_demo;
    dayLoseDemoRef.current = dataStat?.day_lose_demo;
  }, [dataStat, walletMode]);

  const renderWinLoseRate = (rate) => {
    if (rate) {
      switch (walletMode) {
        case true:
          return (
            <Box display={"flex"} alignItems={"center"}>
              <Typography
                fontWeight={600}
                fontSize={14}
                color={dataStat?.day_win_live !== 0 && "success.main"}
              >
                <CountUp
                  start={dayWinLiveRef.current}
                  end={dataStat?.day_win_live}
                  duration={2}
                  decimals={0}
                  delay={0}
                >
                  {({ countUpRef }) => <span ref={countUpRef} />}
                </CountUp>
              </Typography>
              /
              <Typography
                fontWeight={600}
                fontSize={14}
                color={dataStat?.day_lose_live !== 0 && "warning.main"}
              >
                <CountUp
                  start={dayLoseLiveRef.current}
                  end={dataStat?.day_lose_live}
                  duration={2}
                  decimals={0}
                  delay={0}
                >
                  {({ countUpRef }) => <span ref={countUpRef} />}
                </CountUp>
              </Typography>
            </Box>
          );
        case false:
          return (
            <Box display={"flex"} alignItems={"center"}>
              <Typography
                fontWeight={600}
                fontSize={14}
                color={dataStat?.day_win_demo !== 0 && "success.main"}
              >
                <CountUp
                  start={dayWinDemoRef.current}
                  end={dataStat?.day_win_demo}
                  duration={2}
                  decimals={0}
                  delay={0}
                >
                  {({ countUpRef }) => <span ref={countUpRef} />}
                </CountUp>
              </Typography>
              /
              <Typography
                fontWeight={600}
                fontSize={14}
                color={dataStat?.day_lose_demo !== 0 && "warning.main"}
              >
                <CountUp
                  start={dayLoseDemoRef.current}
                  end={dataStat?.day_lose_demo}
                  duration={2}
                  decimals={0}
                  delay={0}
                >
                  {({ countUpRef }) => <span ref={countUpRef} />}
                </CountUp>
              </Typography>
            </Box>
          );
        default:
          return;
      }
    } else {
      // console.log(dataStat)
      // console.log(walletMode)
      if (
        walletMode &&
        parseInt(dataStat?.day_lose_live) + parseInt(dataStat?.day_win_live) ===
          0
      ) {
        return 0;
      } else if (
        !walletMode &&
        parseInt(dataStat?.day_lose_demo) + parseInt(dataStat?.day_win_demo) ===
          0
      ) {
        return 0;
      } else if (walletMode) {
        return round2number(
          (dataStat?.day_win_live /
            (dataStat?.day_lose_live + dataStat?.day_win_live)) *
            100
        );
      } else if (!walletMode) {
        return round2number(
          (dataStat?.day_win_demo /
            (dataStat?.day_lose_demo + dataStat?.day_win_demo)) *
            100
        );
      }
      // switch (walletMode) {
      //   case true:
      //     return round2number(
      //       (dataStat?.day_win_live /
      //         (dataStat?.day_lose_live + dataStat?.day_win_live)) *
      //         100
      //     );
      //   case false:
      //     console.log("abc")
      //     console.log("dataStat", dataStat)
      //     return round2number(
      //       (dataStat?.day_win_demo /
      //         (dataStat?.day_lose_demo + dataStat?.day_win_demo)) *
      //         100
      //     );
      //   default:
      //     return 0;
      // }
    }
  };

  const renderDayProfit = () => {
    switch (walletMode) {
      case true:
        return formatCurrency(dataStat?.day_profit_live);
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
        return formatCurrency(dataStat?.week_profit_live);
      case false:
        return formatCurrency(dataStat?.week_profit_demo);
      default:
        return;
    }
  };

  const renderColorDayProfit = () => {
    switch (walletMode) {
      case true:
        return dataStat?.day_profit_live >= 0 ? "success.main" : "error.main";
      case false:
        return dataStat?.day_profit_demo >= 0 ? "success.main" : "error.main";
      default:
        return;
    }
  };

  const renderColorWeekProfitVolume = () => {
    switch (walletMode) {
      case true:
        return dataStat?.week_volume_live >= 0 ? "success.main" : "error.main";
      case false:
        return dataStat?.week_volume_demo >= 0 ? "success.main" : "error.main";
      default:
        return;
    }
  };

  const renderColorWeekProfit = () => {
    switch (walletMode) {
      case true:
        return dataStat?.week_profit_live >= 0 ? "success.main" : "error.main";
      case false:
        return dataStat?.week_profit_demo >= 0 ? "success.main" : "error.main";
      default:
        return;
    }
  };

  return (
    <Box mt={2}>
      {loading === false && (
        <Card variant="outlined">
          <CardContent>
            <Box>
              <Typography variant="h6">{t("statics")}</Typography>
              <Grid container spacing={2}>
                <StatisticCard
                  action={()=> {}}
                  title={t("Today win/lose")}
                  value={renderWinLoseRate(true)}
                  percentage={`${renderWinLoseRate()}% ${t("Win rate")}`}
                />
                <StatisticCard
                  action={()=> {}}
                  title={t("Today Profit")}
                  value={renderDayProfit()}
                  percentage={t("Today Profit")}
                  hidden={true}
                  color={renderColorDayProfit()}
                />
                <StatisticCard
                  action={()=> {}}
                  title={t("7-days volume")}
                  value={renderWeekVolume()}
                  color={renderColorWeekProfitVolume()}
                />
                <StatisticCard
                  action={()=> {}}
                  title={t("7-days profit")}
                  value={renderWeekProfit()}
                  color={renderColorWeekProfit()}
                />
                {/* <StatisticCard
                  title="Chuỗi Victor / tối đa"
                  value={`${dataStat?.victorStreak }/${dataStat?.longestVictorStreak}`}
                  color="error.main"
                /> */}
              </Grid>
            </Box>
          </CardContent>
        </Card>
      )}
      {loading === true && (
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
          <Skeleton variant="rectangular" width={"100%"} height={400} />
        </Box>
      )}
    </Box>
  );
};

const StatisticCard = ({ title, value, percentage, hidden, color, action }) => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  // const theme= useTheme()
  return (
    <Grid item xs={6} variant="outlined">
      <Box position={"relative"}>
        {action && (
          <Box position={"absolute"} sx={{ top: 0, right: 0, padding: 2 }}>
            <Typography
              onClick={handleOpenDialog}
              sx={{ fontSize: 10, fontWeight: 600, cursor: "pointer" }}
              color={"success.main"}
            >
              Cài lại
            </Typography>
          </Box>
        )}
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
          <Typography color={color} fontSize={14} fontWeight={600}>
            {value}
          </Typography>
          {percentage && (
            <Typography sx={{ opacity: hidden === true ? 0 : 1 }} fontSize={10}>
              {percentage}
            </Typography>
          )}
        </CardContent>
        {action && (
          <DialogAskBeforeAction
            open={openDialog}
            title={"Bạn có muốn đặt lại ?"}
            title2={
              "Sau khi reset dữ liệu không thể khôi phục, bạn muốn tiếp tục ?"
            }
            titleAction={"Xác nhận & Đặt lại"}
            onClose={handleCloseDialog}
            action={() => {}}
          />
        )}
      </Box>
    </Grid>
  );
};

export default memo(Statistics);
