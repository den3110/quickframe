import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  Grid,
  Box,
  Tabs,
  Tab,
  Typography,
  useMediaQuery,
  CircularProgress,
  Skeleton,
} from "@mui/material";
import InvestmentOverview from "../component/InvestmentOverview";
import Timeline from "../component/Timeline";
import Statistics from "../component/Statistics";
import portfolioApi from "api/portfolios/portfolioApi";
import { useParams } from "react-router-dom";
import MenuComponent from "../component/MenuDetail";
import { SocketContext } from "contexts/SocketContext";
import sessionApi from "api/session/sessionApi";
import RefreshProvider from "contexts/RefreshContext";
import { showToast } from "components/toast/toast";
import StatPortfolio from "./stat";
import signalStrategyApi from "api/singal-strategy/signalStrategyApi";
import { useTranslation } from "react-i18next";
import ErrorPageView from "page-sections/error/ErrorPageView";

const TabPanel = (props) => {
  const downLg = useMediaQuery((theme) => theme.breakpoints.down("lg"));

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
    "aria-controls": `tabpanel-${index}`,
  };
};

export const PortfolioDetailContext = createContext();

const PortfolioDetail = (props) => {
  const { t } = useTranslation();
  const downLg = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  const [change, setChange] = useState(false);
  const { isConnected, socket } = useContext(SocketContext);
  const [value, setValue] = useState(0);
  const { id } = useParams();
  const [loading, setLoading] = useState();
  const [data, setData] = useState([]);
  const [dataStat, setDataStat] = useState({
    lastData: { budgetStrategy: { bs: {} } },
  });
  const [dataSignal, setDataSignal] = useState();
  const [loadingCount, setLoadingCount] = useState(0);

  const increaseLoading = () => setLoadingCount((prev) => prev + 1);
  const decreaseLoading = () =>
    setLoadingCount((prev) => Math.max(prev - 1, 0));

  useEffect(() => {
    if (loadingCount > 0) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [loadingCount]);
  // console.log(loadingCount);

  const mergeAndSortData = (data) => {
    const { open, close } = data;
    const combined = [...open, ...close];
    combined.sort((a, b) => b.betTime - a.betTime);
    return combined;
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const fetchUserBotHistory = useCallback(async () => {
    try {
      increaseLoading();
      let response;
      if (props?.isSignalStrategy === true) {
        response = await signalStrategyApi.usersBudgetSignalHistory(id);
      } else {
        response = await portfolioApi.userBotHistory(id);
      }
      if (response?.data?.ok === true) {
        const dataResult = mergeAndSortData(response?.data);
        setData(dataResult);
      } else {
        // showToast("Failed to fetch user bot history", "error");
      }
    } catch (error) {
      // showToast(error?.response?.data?.m, "error");
    } finally {
      decreaseLoading();
    }
  }, [id, props?.isSignalStrategy]);

  const fetchUserBotInfo = useCallback(async () => {
    try {
      increaseLoading();
      let response;
      if (props?.isSignalStrategy === true) {
        response = await signalStrategyApi.userBudgetSignalTeleSignalInfo(id);
      } else {
        response = await portfolioApi.userBotInfo(id);
      }
      if (response?.data?.ok === true) {
        setDataStat(response?.data?.d);
      } else {
        showToast("Failed to fetch user bot info", "error");
      }
    } catch (error) {
      showToast(error?.response?.data?.m, "error");
    } finally {
      decreaseLoading();
    }
  }, [id, props?.isSignalStrategy]);

  const fetchGlobalLastResult = useCallback(async () => {
    try {
      increaseLoading();
      const response = await sessionApi.getGlobalLastResults();
      if (response?.data?.ok === true) {
        setDataSignal(response?.data?.d);
      } else {
        showToast("Failed to fetch global last result", "error");
      }
    } catch (error) {
      showToast(error?.response?.data?.m, "error");
    } finally {
      decreaseLoading();
    }
  }, []);

  useEffect(() => {
    fetchUserBotHistory();
  }, [fetchUserBotHistory]);

  useEffect(() => {
    fetchUserBotInfo();
  }, [fetchUserBotInfo, change]);

  useEffect(() => {
    fetchGlobalLastResult();
  }, [fetchGlobalLastResult]);

  useEffect(() => {
    if (isConnected) {
      socket.on("LAST_RESULTS", (data) => {
        setDataSignal(data);
      });
    }
  }, [isConnected, socket, dataSignal]);

  return (
    <RefreshProvider
      functionProps={async () => {
        await fetchUserBotInfo();
        await fetchUserBotHistory();
        await fetchGlobalLastResult();
      }}
    >
      <PortfolioDetailContext.Provider
        value={{
          loading,
          data,
          setData,
          dataStat,
          setDataStat,
          dataSignal,
          setDataSignal,
          setChange,
        }}
      >
        {loading === false && dataStat && (
          <Box padding={downLg ? 1 : 2}>
            <MenuComponent
              dataStat={dataStat}
              setDataStat={setDataStat}
              {...props}
            />
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="tabs example"
            >
              <Tab label={t("Plan Timeline")} {...a11yProps(0)} />
              {props?.isSignalStrategy !== true && (
                <Tab label={t("statics")} {...a11yProps(1)} />
              )}
            </Tabs>
            <TabPanel value={value} index={0}>
              <Box sx={{ pt: 4 }}>
                <Grid container spacing={4}>
                  <Grid item xs={12} md={4}>
                    <InvestmentOverview {...props} />
                    <Statistics {...props} />
                  </Grid>
                  <Grid className="aksalwqzz" item xs={12} md={8}>
                    <Timeline {...props} />
                  </Grid>
                  <Grid item xs={12}></Grid>
                </Grid>
              </Box>
            </TabPanel>
            {props?.isSignalStrategy !== true && (
              <TabPanel value={value} index={1}>
                <Box>
                  <StatPortfolio
                    {...props}
                    isSubPage={true}
                    dataStat={dataStat}
                    loading={loading}
                  />
                </Box>
              </TabPanel>
            )}
          </Box>
        )}
        {loading === false && !dataStat && (
          <ErrorPageView link={"/portfolios"} />
        )}
        {loading === true && (
          <Box p={downLg ? 1 : 2} mt={4} sx={{ width: "100%" }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                <Box height={100}>
                  <Skeleton variant="rectangular" width="100%" height="100%" />
                </Box>
              </Grid>
            </Grid>
            <Grid container spacing={2} mt={2}>
              <Grid item xs={12} md={4}>
                <Box height={400}>
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height="100%"
                    animation="wave"
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={8}>
                <Box height={400}>
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height="100%"
                    animation="wave"
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
        )}
      </PortfolioDetailContext.Provider>
    </RefreshProvider>
  );
};

export default PortfolioDetail;
