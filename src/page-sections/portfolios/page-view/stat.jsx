import React, { useEffect, useState } from "react";
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
const data = {
  labels: ["01", "02", "03", "04", "05", "06", "07"],
  datasets: [
    {
      label: "Profit/Loss",
      data: [50, 40, 60, 70, 85, 90, 100],
      fill: false,
      backgroundColor: "rgba(75,192,192,0.2)",
      borderColor: "rgba(75,192,192,1)",
    },
  ],
};

const StatPortfolio = () => {
  const {t }= useTranslation()
  const [data, setData]= useState([])
  // const 
  const theme = useTheme();
  const downLg = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  const [selectedTime, setSelectedTime]= useState(1)

  useEffect(()=> {
    (async ()=> {
      try {
        const payload= {
          // id:sele
        }
      } catch (error) {
        
      }
      finally {

      }
    })()
  }, [])

  return (
    <Layout>
      <Box pt={2} pb={4}>
        <Box sx={{ padding: "10px" }}>
          <Box sx={{ padding: downLg ? "" : "20px" }}>
            <Box>
              <Box mb={4}>
                <Box sx={{display: "flex", alignItems:"center", gap: 2 }}>
                    <Box onClick={()=> {setSelectedTime(1)}} color={selectedTime=== 1 && "success.main"} fontSize={18} fontWeight={600} sx={{cursor: "pointer"}}>Tuần trước</Box>
                    <Box onClick={()=> {setSelectedTime(2)}} color={selectedTime=== 2 && "success.main"} fontSize={18} fontWeight={600} sx={{cursor: "pointer"}}>Hôm nay</Box>
                    <Box onClick={()=> {setSelectedTime(3)}} color={selectedTime=== 3 && "success.main"} fontSize={18} fontWeight={600} sx={{cursor: "pointer"}}>Tuần này</Box>
                    <Box onClick={()=> {setSelectedTime(4)}} color={selectedTime=== 4 && "success.main"} fontSize={18} fontWeight={600} sx={{cursor: "pointer"}}>Tháng này</Box>
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
                        borderRadius: 2
                      }}
                    >
                      <Box>
                        <Typography variant="body1" fontSize={10}>
                          Tổng lợi nhuận
                        </Typography>
                        <Typography variant="body1" fontSize={16}>
                          $50.45
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
                        borderRadius: 2
                      }}
                    >
                      <Box>
                        <Typography variant="body1" fontSize={10}>
                          Trades
                        </Typography>
                        <Typography variant="body1" fontSize={16}>
                          426/376
                        </Typography>
                        <Typography variant="body1" fontSize={10}>
                          Win Rate: 53%
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
                            <TradeRateChart />
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
                        borderRadius: 2
                      }}
                    >
                      <Box>
                        <Typography variant="body1" fontSize={10}>
                          Total Trades
                        </Typography>
                        <Typography variant="body1" fontSize={16}>
                          $4,183.00
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
                <Typography variant="h6">
                    {t("Trade History & Profit")}
                </Typography>
                  <Card>
                    <Paper>
                      <Box p={2}>
                        <CalendarComponent />
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
  );
};

export default StatPortfolio;
