import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Card,
  CardContent,
  Grid,
  // useTheme,
} from "@mui/material";
import { PortfolioDetailContext } from "../page-view/detail";
import formatCurrency from "util/formatCurrency";
import CustomAutowinTable from "./TableCustomAutowin";
import SignalBubble from "./SignalBubble";
import { isDark } from "util/constants";
import { useTranslation } from "react-i18next";
import DialogAskBeforeAction from "components/dialog/DialogAskBeforeAction";
import { ActionBotType } from "type/ActionBotType";

const Statistics = ({isPortfolio}) => {
  const { t } = useTranslation();
  const [selectedTab, setSelectedTab] = useState(0);
  const { dataStat, loading, setChange } = useContext(PortfolioDetailContext);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Box>
      <Box
        mt={2}
        sx={{
          background: (theme) => (isDark(theme) ? "" : "#eeeff2"),
          borderRadius: "5px",
        }}
        padding={1}
      >
        <Tabs value={selectedTab} onChange={handleChange} aria-label="tabs">
          <Tab value={0} label={t("statics")} />
          {dataStat?.autoType !== 1 && dataStat?.isCopy === false && (
            <Tab value={1} label={t("capital_management")} />
          )}
          <Tab value={2} label={t("Signal")} />
        </Tabs>
      </Box>
      <Box
        sx={{
          width: "100%",
          typography: "body1",
          background: (theme) => (isDark(theme) ? "" : "#eeeff2"),
          borderRadius: "20px",
        }}
        mt={2}
      >
        {loading === false && (
          <>
            {selectedTab === 0 && (
              <TabPanel>
                <Card variant="outlined">
                  <CardContent>
                    <Box>
                      <Typography variant="h6">{t("statics")}</Typography>
                      <Grid container spacing={2}>
                        <StatisticCard
                          action={isPortfolio && ActionBotType.RESET_WIN_LOSE_DAY}
                          title={t("Today win/lose")}
                          value={`${dataStat?.win_day}/${dataStat?.lose_day}`}
                          percentage={`${formatCurrency(
                            (dataStat?.win_day /
                              (dataStat?.lose_day + dataStat?.win_day)) *
                              100
                          )?.replaceAll("$", "")}% ${t("Win rate")}`}
                        />
                        <StatisticCard
                          action={isPortfolio && ActionBotType.RESET_WIN_LOSE}
                          title={t("Win/Lose")}
                          value={`${dataStat?.lastData?.winTotal}/${dataStat?.lastData?.loseTotal}`}
                          percentage={`${dataStat?.lastData?.winTotal}/${dataStat?.lastData?.loseTotal}`}
                          hidden={true}
                        />
                        <StatisticCard
                          action={isPortfolio && ActionBotType.RESET_PROFIT_DAY}
                          title={t("day_profit")}
                          value={formatCurrency(dataStat?.day_profit)}
                          percentage={t("day_profit")}
                          color={
                            dataStat?.day_profit > 0
                              ? "success.main"
                              : "error.main"
                          }
                          hidden={true}
                        />
                        <StatisticCard
                          action={isPortfolio && ActionBotType.RESET_VOL_7D}
                          title="KLGD 7N"
                          value={`${formatCurrency(dataStat?.week_volume)}`}
                          color={
                            dataStat?.week_volume > 0
                              ? "success.main"
                              : "error.main"
                          }
                        />
                        <StatisticCard
                          action={isPortfolio && ActionBotType.RESET_PROFIT_7D}
                          title={t("7-days profit")}
                          value={formatCurrency(dataStat?.week_profit)}
                          color={
                            dataStat?.week_profit > 0
                              ? "success.main"
                              : "error.main"
                          }
                        />
                        <StatisticCard
                          action={isPortfolio && ActionBotType.RESET_WIN_STREAK}
                          title="Chuỗi thắng / tối đa"
                          value={`${dataStat?.lastData?.winStreak}/${dataStat?.lastData?.longestWinStreak}`}
                          color="success.main"
                        />
                        <StatisticCard
                          action={isPortfolio && ActionBotType.RESET_LOSE_STREAK}
                          title="Chuỗi thua / tối đa"
                          value={`${dataStat?.lastData?.loseStreak}/${dataStat?.lastData?.longestLoseStreak}`}
                          color="error.main"
                        />
                        <StatisticCard
                          action={isPortfolio && ActionBotType.RESET_VICTOR_STREAK}
                          title="Chuỗi Victor / tối đa"
                          value={`${dataStat?.lastData?.victorStreak}/${dataStat?.lastData?.longestVictorStreak}`}
                          // color="error.main"
                        />
                      </Grid>
                    </Box>
                  </CardContent>
                </Card>
              </TabPanel>
            )}
            {selectedTab === 1 && (
              <TabPanel>
                <CustomAutowinTable />
              </TabPanel>
            )}
            {selectedTab === 2 && (
              <TabPanel>
                <SignalBubble />
              </TabPanel>
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

const TabPanel = ({ children }) => {
  return <Box sx={{ p: 1.5 }}>{children}</Box>;
};

const StatisticCard = ({ title, value, percentage, hidden, color, action }) => {
  const [openDialog, setOpenDialog]= useState(false)


  const handleOpenDialog= ()=> {
    setOpenDialog(true)
  }

  const handleCloseDialog= ()=> {
    setOpenDialog(false)
  }
  // const theme= useTheme()
  return (
    <Grid item xs={6} variant="outlined">
      <Box position={"relative"}>
        {action &&
          <Box position={"absolute"} sx={{top: 0, right: 0, padding: 2}}>
            <Typography onClick={handleOpenDialog} sx={{fontSize: 10, fontWeight: 600, cursor: "pointer"}} color={"success.main"}>Cài lại</Typography>
          </Box> 
        }
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
      </Box>
      {action &&
        <DialogAskBeforeAction open={openDialog} title={"Bạn có muốn đặt lại ?"} title2={"Sau khi reset dữ liệu không thể khôi phục, bạn muốn tiếp tục ?"} titleAction={"Xác nhận & Đặt lại"} onClose={handleCloseDialog} action={action} />
      }
    </Grid>
  );
};

export default Statistics;
