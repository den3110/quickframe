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

const Statistics = () => {
  const {t }= useTranslation()
  const [selectedTab, setSelectedTab] = useState(0);
  const { dataStat, loading } = useContext(
    PortfolioDetailContext
  );
 
  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Box>
      <Box
        mt={2}
        sx={{ background: theme=> isDark(theme) ? "" : "#eeeff2", borderRadius: "5px" }}
        padding={1}
      >
        <Tabs value={selectedTab} onChange={handleChange} aria-label="tabs">
          <Tab value={0} label={t("statics")} />
          {dataStat?.autoType !== 1 && dataStat?.isCopy === false && (
            <Tab value={1} label={t("capital_management")} />
          )}
          <Tab value={2} label="Tín hiệu" />
        </Tabs>
      </Box>
      <Box
        sx={{
          width: "100%",
          typography: "body1",
          background: theme=> isDark(theme) ? "" : "#eeeff2",
          borderRadius: "20px",
        }}
        mt={2}
      >
        {
          loading=== false &&
          <>
            {selectedTab === 0 && (
              <TabPanel>
                <Card variant="outlined">
                  <CardContent>
                    <Box>
                      <Typography variant="h6">{t("statics")}</Typography>
                      <Grid container spacing={2}>
                        <StatisticCard
                          title={t("Today win/lose")}
                          value={`${dataStat?.win_day}/${dataStat?.lose_day}`}
                          percentage={`${formatCurrency(dataStat?.win_day / (dataStat?.lose_day  + dataStat?.win_day) * 100)?.replaceAll("$", "")}% ${t("Win rate")}`}
                        />
                        <StatisticCard
                          title={t("day_profit")}
                          value={formatCurrency(dataStat?.day_profit)}
                          percentage={t("day_profit")}
                          color={dataStat?.day_profit > 0 ? "success.main" : "error.main"}
                          hidden={true}
                        />
                        <StatisticCard
                          title="KLGD 7N"
                          value={`${formatCurrency(dataStat?.week_volume)}`}
                          color={dataStat?.week_volume > 0 ? "success.main" : "error.main"}
                        />
                        <StatisticCard
                          title={t("7-days profit")}
                          value={formatCurrency(dataStat?.week_profit)}
                          color={dataStat?.week_profit > 0 ? "success.main" : "error.main"}
                        />
                        <StatisticCard
                          title="Chuỗi thắng tối đa"
                          value={dataStat?.lastData?.longestWinStreak || 0}
                          color="success.main"
                        />
                        <StatisticCard
                          title="Chuỗi thua tối đa"
                          value={dataStat?.lastData?.longestLoseStreak || 0}
                          color="error.main"
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
        }
      </Box>
    </Box>
  );
};

const TabPanel = ({ children }) => {
  return <Box sx={{ p: 1.5 }}>{children}</Box>;
};

const StatisticCard = ({ title, value, percentage, hidden, color }) => {
  // const theme= useTheme()
  return (
    <Grid item xs={6} variant="outlined">
      <CardContent
        sx={{ border: theme=> isDark(theme) ? `1px solid ${theme.palette.border}` : `1px solid ${theme.palette.border}`, borderRadius: "10px" }}
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
    </Grid>
  )
};

export default Statistics;
