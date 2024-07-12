// src/components/Dashboard.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { Grid, Box, Tabs, Tab, Typography, useMediaQuery } from "@mui/material";
import InvestmentOverview from "../component/InvestmentOverview";
import Timeline from "../component/Timeline";
import Statistics from "../component/Statistics";
import portfolioApi from "api/portfolios/portfolioApi";
import { useParams } from "react-router-dom";
import MenuComponent from "../component/MenuDetail";
import { SocketContext } from "contexts/SocketContext";

const TabPanel = (props) => {
  const downLg = useMediaQuery(theme => theme.breakpoints.down("lg"));

  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box p={downLg ? 0 : 3}>{children}</Box>}
    </Typography>
  );
};

const a11yProps = (index) => {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  };
};

export const PortfolioDetailContext = createContext();
const PortfolioDetail = () => {
  
  const downLg = useMediaQuery(theme => theme.breakpoints.down("lg"));
  const [value, setValue] = React.useState(0);
  const { id } = useParams();
  const [loading, setLoading] = useState();
  const [data, setData] = useState([]);
  const [dataStat, setDataStat]= useState()

  const mergeAndSortData = (data) => {
    const { open, close } = data;
    const combined = [...open, ...close];
    combined.sort((a, b) => b.sessionId - a.sessionId);
    return combined;
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await portfolioApi.userBotHistory(id);
        if (response?.data?.ok === true) {
          const dataResult= mergeAndSortData(response?.data)
          setData(dataResult);
        } else {
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await portfolioApi.userBotInfo(id);
        if (response?.data?.ok === true) {
          setDataStat(response?.data?.d);
        } else {

        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  

  return (
    <PortfolioDetailContext.Provider value={{ loading, data, setData, dataStat, setDataStat }}>
      <Box padding={downLg ? 1 : 2}>
        <MenuComponent />
        <Tabs value={value} onChange={handleChange} aria-label="tabs example">
          <Tab label="Quá trình đầu tư" {...a11yProps(0)} />
          <Tab label="Chiến Lược Lợi Nhuận" {...a11yProps(1)} />
          <Tab label="Thống kê" {...a11yProps(2)} />
        </Tabs>
        <TabPanel value={value} index={0}>
          <Box sx={{ pt: 4 }}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={4}>
                <InvestmentOverview />
                <Statistics />
              </Grid>
              <Grid item xs={12} md={8}>
                <Timeline />
              </Grid>
              <Grid item xs={12}></Grid>
            </Grid>
          </Box>
        </TabPanel>
      </Box>
    </PortfolioDetailContext.Provider>
  );
};

export default PortfolioDetail;
