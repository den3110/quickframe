import React, { useContext, useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import { PortfolioDetailContext } from "../page-view/detail";
import formatCurrency from "util/formatCurrency";
import round2number from "util/round2number";
import CustomAutowinTable from "./TableCustomAutowin";

const Statistics = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const {dataStat }= useContext(PortfolioDetailContext)

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Box>
      <Box
        mt={2}
        sx={{ background: "#eeeff2", borderRadius: "5px" }}
        padding={1}
      >
        <Tabs value={selectedTab} onChange={handleChange} aria-label="tabs">
          <Tab label="Thống kê" />
          {(dataStat?.autoType!== 1 && dataStat?.isCopy=== false) &&
            <Tab label="Quản lý vốn" />
          }
          <Tab label="Tín hiệu" />
        </Tabs>
      </Box>
      <Box
        sx={{
          width: "100%",
          typography: "body1",
          background: "#eeeff2",
          borderRadius: "20px",
        }}
        mt={2}
      >
        {selectedTab === 0 && (
          <TabPanel>
            <Card variant="outlined">
              <CardContent>
                <Box>
                  <Typography variant="h6">Thống kê</Typography>
                  <Grid container spacing={2}>
                    <StatisticCard
                      title="Thắng/Thua hôm nay"
                      value={`${dataStat?.win_day}/${dataStat?.lose_day}`}
                      percentage="100% Tỉ lệ thắng"
                    />
                    <StatisticCard
                      title="Lợi nhuận hôm nay"
                      value={round2number(dataStat?.day_profit)}
                      percentage="Lợi nhuận hôm nay"
                      hidden={true}
                    />
                    <StatisticCard title="KLGD 7N" value={`${formatCurrency(dataStat?.week_volume)}`} />
                    <StatisticCard title="Lợi nhuận 7N" value={formatCurrency(dataStat?.week_profit)} />
                    <StatisticCard title="Chuỗi thắng tối đa" value={dataStat?.lastData?.longestWinStreak || 0} />
                    <StatisticCard title="Chuỗi thua tối đa" value={dataStat?.lastData?.longestLoseStreak || 0} />
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
            <Typography>Tín hiệu content goes here...</Typography>
          </TabPanel>
        )}
      </Box>
    </Box>
  );
};

const TabPanel = ({ children }) => {
  return <Box sx={{ p: 1.5 }}>{children}</Box>;
};

const StatisticCard = ({ title, value, percentage, hidden }) => (
  <Grid item xs={6} variant="outlined">
    <CardContent sx={{ border: "1px solid rgb(238, 239, 242)", borderRadius: "10px"}}>
      <Typography fontSize={10}>{title}</Typography>
      <Typography fontSize={14} fontWeight={600}>
        {value}
      </Typography>
      {percentage && <Typography sx={{opacity: hidden=== true ? 0 : 1}} fontSize={10}>{percentage}</Typography>}
    </CardContent>
  </Grid>
);

export default Statistics;
