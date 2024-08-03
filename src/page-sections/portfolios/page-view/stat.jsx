import React, { useContext, useEffect, useState } from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  useMediaQuery,
  useTheme,
  Card,
} from "@mui/material";
import CalendarComponent from "./component/CalendarComponent";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Layout from "../Layout";
import TotalProfitChart from "./component/TotalProfitChart";
import TradeRateChart from "./component/TradeRateChart";
import TotalVolumeChart from "./component/TotalVolumeChart";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import portfolioApi from "api/portfolios/portfolioApi";
import formatCurrency from "util/formatCurrency";
// import _ from "lodash";
import round2number from "util/round2number";
import AuthContext from "contexts/AuthContext";
import exchangeApi from "api/exchange/exchangeApi";
import { SettingsContext } from "contexts/settingsContext";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const subtractOneDayFromDates = (data) => {
  return data.map(item => {
    const date = new Date(item.createdAt);
    date.setDate(date.getDate() - 1);
    return {
      ...item,
      createdAt: date.toISOString()
    };
  });
};

const StatPortfolio = (props) => {
  const { t } = useTranslation();
  const { dataStat, setDataStat } = props;
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState();
  const [stat, setStat] = useState({ profit: 0, win: 0, lose: 0, volume: 0 });
  const [statGlobal, setStatGlobal]= useState({ profit: 0, win: 0, lose: 0, volume: 0 })
  // const
  const theme = useTheme();
  const downLg = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  const [selectedTime, setSelectedTime] = useState(1);
  const {selectedLinkAccount }= useContext(AuthContext)
  const {walletMode }= useContext(SettingsContext)
  const [dataStatGlobal, setDataStatGlobal]= useState()
  useEffect(() => {
    (async () => {
      if (id) {
        try {
          const today = new Date();   
          const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
          const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
          const payload = {
            // id:sele
            botId: id,
            startTime: firstDayOfMonth,
            endTime: lastDayOfMonth,
          };
          const response = await portfolioApi.userBotStatics(id, {
            params: payload,
          });
          if (response?.data?.ok === true) {
            console.log(response?.data?.d);
            setData(response?.data?.d);
          } else if (response?.data?.d === false) {
          }
        } catch (error) {
        } finally {
          setLoading(false);
        }
      } else {
        try {
          const today = new Date();
          const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
          const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
          const payload = {
            // id:sele
            botId: id,
            startTime: firstDayOfMonth,
            endTime: lastDayOfMonth,
          };
          const response = await portfolioApi.userExchangeLinkAccounStatics(
            {},
            { params: payload },
            selectedLinkAccount
          );
          if (response?.data?.ok === true) {
            const updatedData = subtractOneDayFromDates(response?.data?.d);
            // console.log(response?.data?.d);
            setData(updatedData);
          } else if (response?.data?.d === false) {
          }
        } catch (error) {
        } finally {
          setLoading(false);
        }
      }
    })();
  }, [id, selectedLinkAccount]);

  useEffect(()=> {
    (async ()=> {
      try {
        if(props?.isSubPage!== true) {
          const response= await exchangeApi.usersExchangeLinkAccountInfo({}, selectedLinkAccount)
          if(response?.data?.ok=== true) {
            setDataStatGlobal(response?.data?.d)
          }
        }  
      } catch (error) {
        
      }
    })()
  }, [props?.isSubPage, selectedLinkAccount])

  useEffect(() => {
    setStat({
      profit: dataStat?.day_profit,
      win: dataStat?.win_day,
      lose: dataStat?.lose_day,
      volume: dataStat?.day_volume,
    });
  }, [dataStat]);

  useEffect(()=> {
    if(walletMode) {
      if(selectedTime=== 1) {
        setStatGlobal({
          profit: dataStatGlobal?.live_daily_profit,
          win: dataStatGlobal?.live_win_daily,
          lose: dataStatGlobal?.live_lose_daily,
          volume: dataStatGlobal?.live_daily_volume,
        });
      }
      if(selectedTime=== 2) {
        setStatGlobal({
          profit: dataStatGlobal?.live_week_profit,
          win: dataStatGlobal?.live_win_week,
          lose: dataStatGlobal?.live_lose_week,
          volume: dataStatGlobal?.live_week_volume,
        });
      }
      if(selectedTime=== 3) {
        setStatGlobal({
          profit: dataStatGlobal?.live_month_profit,
          win: dataStatGlobal?.live_win_month,
          lose: dataStatGlobal?.live_lose_month,
          volume: dataStatGlobal?.live_month_volume,
        });
      }
    }
    else {
      if(selectedTime=== 1) {
        setStatGlobal({
          profit: dataStatGlobal?.demo_daily_profit,
          win: dataStatGlobal?.demo_win_daily,
          lose: dataStatGlobal?.demo_lose_daily,
          volume: dataStatGlobal?.demo_daily_volume,
        });
      }
      if(selectedTime=== 2) {
        setStatGlobal({
          profit: dataStatGlobal?.demo_week_profit,
          win: dataStatGlobal?.demo_win_week,
          lose: dataStatGlobal?.demo_lose_week,
          volume: dataStatGlobal?.demo_week_volume,
        });
      }
      if(selectedTime=== 3) {
        setStatGlobal({
          profit: dataStatGlobal?.demo_month_profit,
          win: dataStatGlobal?.demo_win_month,
          lose: dataStatGlobal?.demo_lose_month,
          volume: dataStatGlobal?.demo_month_volume,
        });
      }
    }
  }, [dataStatGlobal, walletMode, selectedTime])
  console.log(dataStatGlobal)

  return (
    <Box pb={4}>
      {props?.isSubPage === true && (
        <Box pt={2} pb={4}>
          <Box sx={{ padding: downLg ? 0 : "10px" }}>
            <Box sx={{ padding: downLg ? "" : "20px" }}>
              <Box>
                <Box mb={4}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box
                      onClick={() => {
                        setSelectedTime(1);
                        setStat({
                          profit: dataStat?.day_profit,
                          win: dataStat?.win_day,
                          lose: dataStat?.lose_day,
                          volume: dataStat?.day_volume,
                        });
                      }}
                      color={selectedTime === 1 && "success.main"}
                      fontSize={18}
                      fontWeight={600}
                      sx={{ cursor: "pointer" }}
                    >
                      {t("TODAY_statistic")}
                    </Box>
                    <Box
                      onClick={() => {
                        setSelectedTime(2);
                        setStat({
                          profit: dataStat?.week_profit,
                          win: dataStat?.win_week,
                          lose: dataStat?.lose_week,
                          volume: dataStat?.week_volume,
                        });
                      }}
                      color={selectedTime === 2 && "success.main"}
                      fontSize={18}
                      fontWeight={600}
                      sx={{ cursor: "pointer" }}
                    >
                      {t("THIS_WEEK")}
                    </Box>
                    <Box
                      onClick={() => {
                        setSelectedTime(3);
                        setStat({
                          profit: dataStat?.month_profit,
                          win: dataStat?.win_month,
                          lose: dataStat?.lose_month,
                          volume: dataStat?.month_volume,
                        });
                      }}
                      color={selectedTime === 3 && "success.main"}
                      fontSize={18}
                      fontWeight={600}
                      sx={{ cursor: "pointer" }}
                    >
                      {t("THIS_MONTH")}
                    </Box>
                  </Box>
                </Box>
                <Grid container spacing={3}>
                  {/* Top Summary Section */}
                  <Grid item xs={12} sm={6} md={4}>
                    <Paper sx={{ height: "100%" }}>
                      <Box
                        p={downLg? 2 : 2}
                        display={"flex"}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                        sx={{
                          border: `1px solid ${theme.palette.border}`,
                          height: "100%",
                          borderRadius: 2,
                        }}
                      >
                        <Box>
                          <Typography
                            variant="body1"
                            fontSize={10}
                            fontWeight={600}
                          >
                            {t("total_profit")}
                          </Typography>
                          <Typography
                            variant="body1"
                            fontSize={16}
                            color={
                              stat.profit < 0 ? "error.main" : "success.main"
                            }
                          >
                            {formatCurrency(stat.profit)}
                          </Typography>
                        </Box>
                        <Box>
                          <TotalProfitChart />
                        </Box>
                      </Box>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Paper sx={{ height: "100%" }}>
                      <Box
                        display={"flex"}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                        p={2}
                        sx={{
                          border: `1px solid ${theme.palette.border}`,
                          height: "100%",
                          borderRadius: 2,
                        }}
                      >
                        <Box>
                          <Typography variant="body1" fontSize={10}>
                            Trades
                          </Typography>
                          <Typography
                            variant="body1"
                            fontSize={16}
                            fontWeight={600}
                          >
                            {stat.win}/{stat.lose}
                          </Typography>
                          <Typography variant="body1" fontSize={10}>
                            {t("rate_win")}:{" "}
                            {round2number(
                              (stat.win / (stat.win + stat.lose)) * 100
                            )}
                            %
                          </Typography>
                        </Box>
                        <Box>
                          <Box
                            display={"flex"}
                            justifyContent={"center"}
                            alignItems={"center"}
                          >
                            <Box
                              position={"relative"}
                              display={"flex"}
                              justifyContent={"center"}
                              alignItems={"center"}
                              top={10}
                            >
                              <TradeRateChart
                                rate={Math.ceil(
                                  (stat.win / (stat.win + stat.lose)) * 100
                                )}
                              />
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Paper sx={{ height: "100%" }}>
                      <Box
                        display={"flex"}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                        p={2}
                        sx={{
                          border: `1px solid ${theme.palette.border}`,
                          height: "100%",
                          borderRadius: 2,
                        }}
                      >
                        <Box>
                          <Typography variant="body1" fontSize={10}>
                            Total Volumes
                          </Typography>
                          <Typography
                            variant="body1"
                            fontSize={16}
                            fontWeight={600}
                          >
                            {round2number(stat.volume)}
                          </Typography>
                        </Box>
                        <Box>
                          <TotalVolumeChart />
                        </Box>
                      </Box>
                    </Paper>
                  </Grid>

                  {/* Calendar Section */}
                  <Grid item xs={12}>
                    <Typography variant="h6" mb={2}>
                      {t("Trade History & Profit")}
                    </Typography>
                    <Card>
                      <Paper className="akslkwagdad">
                        <Box className="aklklwakwf" p={downLg ? 0 : 2}>
                          <CalendarComponent data={data} />
                        </Box>
                      </Paper>
                    </Card>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
      {props?.isSubPage !== true && (
        <Layout> 
          <Box pt={2} pb={4}>
            <Box sx={{ padding: downLg ? "8px" : "10px" }}>
              <Box sx={{ padding: downLg ? "" : "20px" }}>
                <Box>
                  <Box mb={4}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Box
                        onClick={() => {
                          setSelectedTime(1);
                          if(walletMode=== true) {
                            setStatGlobal({
                              profit: dataStatGlobal?.live_daily_profit,
                              win: dataStatGlobal?.live_win_daily,
                              lose: dataStatGlobal?.live_lose_daily,
                              volume: dataStatGlobal?.live_daily_volume,
                            });
                          }
                          else {
                            setStatGlobal({
                              profit: dataStatGlobal?.demo_daily_profit,
                              win: dataStatGlobal?.demo_win_daily,
                              lose: dataStatGlobal?.demo_lose_daily,
                              volume: dataStatGlobal?.demo_daily_volume,
                            });
                          }
                        }}
                        color={selectedTime === 1 && "success.main"}
                        fontSize={18}
                        fontWeight={600}
                        sx={{ cursor: "pointer" }}
                      >
                        {t("TODAY_statistic")}
                      </Box>
                      <Box
                        onClick={() => {
                          setSelectedTime(2);
                          if(walletMode=== true) {
                            setStatGlobal({
                              profit: dataStatGlobal?.live_week_profit,
                              win: dataStatGlobal?.live_win_week,
                              lose: dataStatGlobal?.live_lose_week,
                              volume: dataStatGlobal?.live_week_volume,
                            });
                          }
                          else {
                            setStatGlobal({
                              profit: dataStatGlobal?.demo_week_profit,
                              win: dataStatGlobal?.demo_win_week,
                              lose: dataStatGlobal?.demo_lose_week,
                              volume: dataStatGlobal?.demo_week_volume,
                            });
                          }
                        }}
                        color={selectedTime === 2 && "success.main"}
                        fontSize={18}
                        fontWeight={600}
                        sx={{ cursor: "pointer" }}
                      >
                        {t("THIS_WEEK")}
                      </Box>
                      <Box
                        onClick={() => {
                          setSelectedTime(3);
                          if(walletMode=== true) {
                            setStatGlobal({
                              profit: dataStatGlobal?.live_month_profit,
                              win: dataStatGlobal?.live_win_month,
                              lose: dataStatGlobal?.live_lose_month,
                              volume: dataStatGlobal?.live_month_volume,
                            });
                          }
                          else {
                            setStatGlobal({
                              profit: dataStatGlobal?.demo_month_profit,
                              win: dataStatGlobal?.demo_win_month,
                              lose: dataStatGlobal?.demo_lose_month,
                              volume: dataStatGlobal?.demo_month_volume,
                            });
                          }
                        }}
                        color={selectedTime === 3 && "success.main"}
                        fontSize={18}
                        fontWeight={600}
                        sx={{ cursor: "pointer" }}
                      >
                        {t("THIS_MONTH")}
                      </Box>
                    </Box>
                  </Box>
                  <Grid container spacing={3}>
                    {/* Top Summary Section */}
                    <Grid item xs={12} sm={6} md={4}>
                      <Paper sx={{ height: "100%" }}>
                        <Box
                          p={2}
                          display={"flex"}
                          justifyContent={"space-between"}
                          alignItems={"center"}
                          sx={{
                            border: `1px solid ${theme.palette.border}`,
                            height: "100%",
                            borderRadius: 2,
                          }}
                        >
                          <Box>
                            <Typography
                              variant="body1"
                              fontSize={10}
                              fontWeight={600}
                            >
                              {t("total_profit")}
                            </Typography>
                            <Typography
                              variant="body1"
                              fontSize={16}
                              color={
                                statGlobal.profit < 0 ? "error.main" : "success.main"
                              }
                            >
                              {formatCurrency(statGlobal.profit)}
                            </Typography>
                          </Box>
                          <Box>
                            <TotalProfitChart />
                          </Box>
                        </Box>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <Paper sx={{ height: "100%" }}>
                        <Box
                          display={"flex"}
                          justifyContent={"space-between"}
                          alignItems={"center"}
                          p={2}
                          sx={{
                            border: `1px solid ${theme.palette.border}`,
                            height: "100%",
                            borderRadius: 2,
                          }}
                        >
                          <Box>
                            <Typography variant="body1" fontSize={10}>
                              Trades
                            </Typography>
                            <Typography
                              variant="body1"
                              fontSize={16}
                              fontWeight={600}
                            >
                              {statGlobal.win}/{statGlobal.lose}
                            </Typography>
                            <Typography variant="body1" fontSize={10}>
                              {t("rate_win")}:{" "}
                              {round2number(
                                (statGlobal.win / (statGlobal.win + statGlobal.lose)) * 100
                              )}
                              %
                            </Typography>
                          </Box>
                          <Box>
                            <Box
                              display={"flex"}
                              justifyContent={"center"}
                              alignItems={"center"}
                            >
                              <Box
                                position={"relative"}
                                display={"flex"}
                                justifyContent={"center"}
                                alignItems={"center"}
                                top={10}
                              >
                                <TradeRateChart
                                  rate={Math.ceil(
                                    (statGlobal.win / (statGlobal.win + statGlobal.lose)) * 100
                                  )}
                                />
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <Paper sx={{ height: "100%" }}>
                        <Box
                          display={"flex"}
                          justifyContent={"space-between"}
                          alignItems={"center"}
                          p={2}
                          sx={{
                            border: `1px solid ${theme.palette.border}`,
                            height: "100%",
                            borderRadius: 2,
                          }}
                        >
                          <Box>
                            <Typography variant="body1" fontSize={10}>
                              Total Volumes
                            </Typography>
                            <Typography
                              variant="body1"
                              fontSize={16}
                              fontWeight={600}
                            >
                              {round2number(statGlobal.volume)}
                            </Typography>
                          </Box>
                          <Box>
                            <TotalVolumeChart />
                          </Box>
                        </Box>
                      </Paper>
                    </Grid>

                    {/* Calendar Section */}
                    <Grid item xs={12}>
                      <Typography variant="h6" mb={2}>
                        {t("Trade History & Profit")}
                      </Typography>
                      <Card>
                        <Paper>
                          <Box p={downLg ? 0 : 2}>
                            <CalendarComponent isGlobal={true} data={data} />
                          </Box>
                        </Paper>
                      </Card>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Box>
          </Box>
        </Layout>
      )}
    </Box>
  );
};

export default StatPortfolio;
