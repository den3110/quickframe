import React, { useContext, useEffect, useState } from "react";
import {
  Typography,
  Box,
  Tabs,
  Tab,
  TextField,
  Grid,
  InputAdornment,
  Card,
  CircularProgress,
  Tooltip,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import { ManageFollowerContext } from "contexts/ManageFollowerContext";
import EmptyPage from "layouts/layout-parts/blank-list/BlankList";
import ListUserFollow from "./component/ListUserFollow";
import ListUserBlock from "./component/ListUserBlock";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import _ from "lodash";
import CopytradeHistory from "./component/CopytradeHistory";
import { useTranslation } from "react-i18next";

const Content = styled(Box)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  padding: theme.breakpoints.down("lg") ? theme.spacing(1) : theme.spacing(3),
  boxShadow: theme.shadows[4],
}));

const TabPanel = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const History = styled(Box)(({ theme }) => ({}));

const HistoryHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

const NoData = styled(Box)(({ theme }) => ({
  textAlign: "center",
  // padding: theme.spacing(4),
}));

const InfoCard = ({ title, value, tooltip }) => {
  return (
    <Card variant="outlined" style={{ borderRadius: 16 }}>
      <Box sx={{ padding: 1 }}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="body2" fontSize={12} color="textSecondary">
              {title}
            </Typography>
          </Grid>
          <Grid item>
            <Tooltip placement={"top"} title={tooltip}>
              <IconButton size="small">
                <InfoOutlinedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
        <Typography variant="body1" fontSize={14}>
          {value}
        </Typography>
      </Box>
    </Card>
  );
};

function ManageFollowerPage() {
  const {t }= useTranslation()
  const downLg = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  const { data, setData, loading, setChange } = useContext(
    ManageFollowerContext
  );
  const [dataState, setDataState]= useState([])
  const [tabValue, setTabValue] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [page, setPage] = useState(1);
  //   const [data, set]

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(1);
  };
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const handleSearch = (e) => {
    if(parseInt(tabValue)=== 0) {
      const filtered = data?.followList?.filter(item =>
        item.nickName.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setDataState({...dataState ?? [], followList: filtered});
    }
    else {
      const filtered = data?.blockList?.filter(item =>
        item.nickName.toLowerCase().includes(e.target.value.toLowerCase())
      );
      console.log(filtered)
      setDataState({...dataState ?? [], blockList: filtered});
    }
  };

  useEffect(()=> {
    setDataState(data)
  }, [data])

  return (
    <Box paddingBottom={"32px"}>
      <Box
        sx={{
          backgroundImage:
            'url("/static/banner/banner_1.png")',
          backgroundSize: "cover",
          position: "relative",
          marginBottom: "88px",
        }}
      >
        <Box sx={{ minHeight: "468px" }}>
          <Box
            sx={{
              "&::before": {
                bottom: "-42px",
                background:
                  "url(/static/banner/banner_2.png) 100% 100% no-repeat",
                content: '""',
                display: "block",
                height: "230px",
                left: "-9px",
                position: "absolute",
                width: "388px",
              },
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                padding: downLg ? "40px 15px" : "130px 70px",
                marginBottom: "118px",
                flexDirection: downLg ? "column" : "row",
              }}
            >
              <Box>
                <Typography
                  fontSize={downLg ? 28 : 40}
                  color="white"
                  fontWeight={600}
                >
                  {t("manage_followers")}
                  <br />
                  {t("Earn Money Together")}
                </Typography>
              </Box>
              <Box mb={2} sx={{ width: downLg ? "100%" : 442 }}>
                <Card
                  sx={{
                    position: "relative",
                    "&::before": {
                      position: "absolute",
                      content: '""',
                      display: "block",
                      height: 107,
                      top: -101,
                      width: 129,
                      right: 20,
                      background:
                        "url(/static/media/img_1.png) 100% 100% no-repeat",
                      zIndex: 2,
                      overflow: "visible",
                      display: downLg ? "none" : "",
                    },
                    overflow: "visible",
                  }}
                  className="alslqas"
                >
                  <Box className="aklsmkaws" sx={{ padding: 2 }}>
                    <Box>
                      <Typography
                        variant="body1"
                        fontSize={18}
                        fontWeight={600}
                      >
                        {t("Follower Statistic")}
                      </Typography>
                    </Box>
                    <Box className="aksmwaaw" sx={{ width: "100" }} mt={2}>
                      <Grid container spacing={1}>
                        <Grid item xs={6}>
                          <InfoCard
                            title={t("Total Follower")}
                            value={
                              _.uniqBy(data?.followList, "nickName")?.length ||
                              0
                            }
                            tooltip={
                              t("Total follower tooltip")
                            }
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <InfoCard
                            title={t("Total Active Plans")}
                            value={data?.total_plans_running || 0}
                            tooltip={
                              t("Total Active Plans tooltip")
                            }
                          />
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>
                </Card>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box>
        <Content>
          <Card>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              p={2}
              flexDirection={downLg ? "column" : "row"}
            >
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                indicatorColor="primary"
                textColor="primary"
                centered
              >
                <Tab label={t("Follower List")} />
                <Tab label={t("Blocked List")} />
              </Tabs>
              <Box
                mt={downLg ? 1 : 0}
                display={"flex"}
                justifyContent="space-between"
                alignItems="center"
                gap={1}
              >
                <TextField
                  variant="outlined"
                  placeholder={t("Search Nickname")}
                  sx={{ width: downLg ? "100%" : 450 }}
                  onChange={handleSearch}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                {/* <Button
                  variant="contained"
                  color="success"
                  sx={{ height: "100%" }}
                >
                  Tìm kiếm
                </Button> */}
              </Box>
            </Box>
            <TabPanel>
              {tabValue === 0 && (
                <Box>
                  <NoData>
                    {loading === true && <CircularProgress />}
                    {loading === false && dataState?.followList?.length <= 0 && (
                      <EmptyPage
                        title={t("no_data_to_display")}
                        disableButton={true}
                      />
                    )}
                  </NoData>
                  {loading === false && data?.followList?.length > 0 && (
                    <ListUserFollow
                      data={dataState?.followList}
                      setData={setData}
                      dataProps={data}
                      setChange={setChange}
                    />
                  )}
                </Box>
              )}
              {tabValue === 1 && (
                <Box>
                  <NoData>
                    {loading === true && <CircularProgress />}
                    {loading === false && data?.blockList?.length <= 0 && (
                      <EmptyPage
                        title={t("no_data_to_display")}
                        disableButton={true}
                      />
                    )}
                  </NoData>
                  {loading === false && data?.blockList?.length > 0 && (
                    <ListUserBlock
                      data={dataState?.blockList}
                      setData={setData}
                      dataProps={data}
                      setChange={setChange}
                    />
                  )}
                </Box>
              )}
            </TabPanel>
          </Card>
          <History mt={2}>
            <HistoryHeader mb={2}>
              <Typography variant="h6">{t("history")}</Typography>
              <Card>
                <Box sx={{ padding: 1.5, cursor: "pointer" }}>
                  <Typography>15/07/2024 12:00 SA - 04:21 CH</Typography>
                </Box>
              </Card>
            </HistoryHeader>
            <CopytradeHistory />
          </History>
        </Content>
      </Box>
    </Box>
  );
}

export default ManageFollowerPage;
