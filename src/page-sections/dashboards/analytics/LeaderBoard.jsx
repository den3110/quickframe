import React, {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  Typography,
  Box,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Button,
  Tooltip,
  useMediaQuery,
  useTheme,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/system";
import exchangeApi from "api/exchange/exchangeApi";
import { isDark } from "util/constants";
import { Swiper, SwiperSlide } from "swiper/react";
import BunnyStar from "icons/BunnyStar";
import FlickAnimate from "icons/FlickAnimate";
import MoreInfo from "icons/MoreInfo";
import RankingLeaderBoard from "page-sections/leaderboard/RankingLeaderBoard";
import RefreshProvider from "contexts/RefreshContext";
import formatCurrency from "util/formatCurrency";
import sortData from "util/sortData";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import AuthContext from "contexts/AuthContext";
import NewPlanDrawer from "page-sections/portfolios/drawer/NewPlanDrawer";
import round2number from "util/round2number";
import numberWithCommas from "util/numberSeparatorThousand";
import CopyPlanDrawer from "../component/drawer/CopyPlanDrawer";

const StyledListItem = styled(ListItem)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: theme.spacing(1),
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:nth-of-type(even)": {
    backgroundColor: theme.palette.background.paper,
  },
}));

const LeaderBoard = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const downLg = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  const [dataUser, setDataUser] = useState([]);
  const [dataBot, setDataBot] = useState([]);
  const [loading, setLoading] = useState();
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState();
  const [openCopyPlan, setOpenCopyPlan]= useState(false)
  const { logoutFromSystem, logoutToConnect } = useContext(AuthContext);
  const fetchDataUser = useCallback(async () => {
    try {
      setLoading(true);

      const response = await exchangeApi.userExchangeLinkAccountLeaderboard();
      setDataUser(response?.data?.d);
    } catch (error) {
      if (error?.response?.status === 401) {
        // logoutFromSystem();
        // navigate("/login");
      } else if (error?.response?.status === 402) {
        // logoutToConnect();
        // navigate("/connect");
      }
    } finally {
      setLoading(false);
    }
  }, []);
  const fetchDataBot = useCallback(async () => {
    try {
      setLoading(true);
      const response = await exchangeApi.userBotLeaderboard();
      setDataBot(response?.data?.d);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    fetchDataUser();
  }, [fetchDataUser]);
  useEffect(() => {
    fetchDataBot();
  }, [fetchDataBot]);

  const renderBackgroundLeaderBoardBot = (rank) => {
    switch (rank) {
      case 1:
        return "linear-gradient(rgba(255, 190, 63, 0.8) -38%, rgba(255, 202, 98, 0) 69.51%)";
      case 2:
        return "linear-gradient(rgba(91, 96, 132, 0.8) 0%, rgba(238, 239, 242, 0) 83.25%)";
      case 3:
        return "linear-gradient(rgba(13, 151, 110, 0.8) 0%, rgba(238, 239, 242, 0) 83.25%)";
      default:
        return "linear-gradient(rgba(160, 174, 192, 0.79) 0%, rgba(238, 239, 242, 0) 83.25%)";
    }
  };

  return (
    <RefreshProvider
      functionProps={async () => {
        await fetchDataBot();
        await fetchDataUser();
      }}
    >
      <Box sx={{ width: "100%", padding: "2px 10px 50px 10px" }}>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography
            variant="h4"
            fontWeight={600}
            gutterBottom
            style={{
              background: `linear-gradient(rgb(221 255 0) 0%, ${theme.palette.primary.secondary} 3.04%, ${theme.palette.primary.main} 100%) text`,
              WebkitTextFillColor: "transparent",
            }}
            mt={1}
            mb={1}
          >
            {t("top_efficient_plan")} <BunnyStar />
          </Typography>
          <Fragment>
            <Tooltip title="Vuốt sang trái để xem thêm gói">
              <FlickAnimate />
            </Tooltip>
          </Fragment>
        </Box>
        <Box>
          <Swiper
            spaceBetween={20}
            pagination={{ clickable: true }}
            style={{ paddingBottom: "20px", overflowY: "unset" }}
            className="waa"
            breakpoints={{
              // when window width is >= 640px
              300: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              // when window width is >= 768px
              768: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
              1200: {
                slidesPerView: 5,
                spaceBetween: 20,
              },

              2000: {
                slidesPerView: 10,
                spaceBetween: 20,
              },
            }}
          >
            {sortData(
              dataBot,
              function (e) {
                return parseFloat(e.profitRate);
              },
              "desc"
            ).map((item, index) => (
              <SwiperSlide key={index}>
                <Box
                  style={{
                    padding: "20px 0",
                    height: "100%",
                    maxWidth: 300,
                  }}
                >
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    sx={{
                      width: "100%",
                      background: (theme) =>
                        isDark(theme) ? "rgb(31, 41, 55)" : "white",
                    }}
                    style={{
                      borderRadius: "8px",
                      padding: "20px 0",
                      textAlign: "center",
                      height: "100%",
                      boxShadow: " rgba(0, 0, 0, 0.16) 0px 1px 4px",
                    }}
                    position={"relative"}
                  >
                    <Box
                      position={"absolute"}
                      style={{
                        width: "100%",
                        height: "50%",
                        background: renderBackgroundLeaderBoardBot(parseInt(index) + 1),
                        top: 0,
                        left: 0,
                        borderRadius: 8,
                      }}
                    ></Box>
                    <Box
                      display={"flex"}
                      justifyContent={"center"}
                      alignItems={"center"}
                    >
                      {parseInt(index) + 1 === 1 && (
                        <img
                          style={{
                            position: "relative",
                            top: -40,
                            zIndex: 10,
                            width: 45,
                          }}
                          src="/static/icons/rank-1.png"
                          alt="Can't open"
                        />
                      )}
                      {parseInt(index) + 1 === 2 && (
                        <img
                          style={{
                            position: "relative",
                            top: -40,
                            zIndex: 10,
                            width: 45,
                          }}
                          src="/static/icons/rank-2.png"
                          alt="Can't open"
                        />
                      )}
                      {parseInt(index) + 1 === 3 && (
                        <img
                          style={{
                            position: "relative",
                            top: -40,
                            zIndex: 10,
                            width: 45,
                          }}
                          src="/static/icons/rank-3.png"
                          alt="Can't open"
                        />
                      )}
                      {parseInt(index) + 1 !== 1 &&
                        parseInt(index) + 1 !== 2 &&
                        parseInt(index) + 1 !== 3 && (
                          <>
                            <Box
                              style={{
                                position: "relative",
                                top: -40,
                                zIndex: 10,
                              }}
                            >
                              <Box
                                display={"flex"}
                                justifyContent={"center"}
                                alignItems={"center"}
                                sx={{ width: 40, height: 50 }}
                              >
                                <Box
                                  display="flex"
                                  justifyContent={"center"}
                                  alignItems={"center"}
                                  sx={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: "50%",
                                    background: "rgb(160, 174, 192)",
                                  }}
                                >
                                  {parseInt(index) + 1}
                                </Box>
                              </Box>
                            </Box>
                          </>
                        )}
                    </Box>
                    <Typography
                      // variant={downLg ? "body1" : "h6"}
                      mb={1}
                      fontSize={14}
                      fontWeight={600}
                      // color="textPrimary"
                      color="text.main"
                    >
                      {item.name}
                    </Typography>
                    <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
                      <Typography fontSize={12} color="textSecondary">
                        PnL 24h {item.pnl}&nbsp;
                      </Typography>
                      <Typography fontWeight={600} fontSize={12} color={parseFloat(item?.profitRate) > 0 ? "success.main" : "error.main"}>
                        ({formatCurrency(item?.profitRate)?.replace("$", "")}%)
                      </Typography>
                    </Box>
                    <Typography
                      fontWeight={600}
                      color="textPrimary"
                      style={{ margin: "10px 0" }}
                    >
                      ${numberWithCommas(round2number(item.profit))}
                    </Typography>
                    {
                      item?.isPrivate=== true && 
                      <Button sx={{cursor: "context-menu"}} disableRipple variant="outlined">{t("Private plan")}</Button>
                    }
                    {
                      item?.isPrivate=== false && 
                      <Button variant={"contained"} onClick={()=> {
                        setSelectedPlan(item)
                        setOpenCopyPlan(true)
                      }}>{t("Copy plan")}</Button>
                    }
                  </Box>
                </Box>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
        <Typography
          variant="h4"
          gutterBottom
          fontWeight={600}
          mt={9}
          mb={9}
          style={{
            background: `linear-gradient(rgb(221 255 0) 0%, ${theme.palette.primary.secondary} 3.04%, ${theme.palette.primary.main} 100%) text`,
            WebkitTextFillColor: "transparent",
          }}
        >
          {t("daily_roi_leaderboard")} <MoreInfo />
        </Typography>
        {loading === false && (
          <Box className="asjkasjaqw">
            <Box
              sx={{ padding: downLg ? "0" : "0 48px" }}
              flexDirection={downLg ? "column" : "row"}
              display={"flex"}
              alignItems={"flex-end"}
              justifyContent={"space-between"}
              gap={downLg ? 5 : 11}
            >
              {downLg && (
                <RankingLeaderBoard
                  handleClick={() => {
                    setSelectedPlan({
                      autoType: 1,
                      margin_dense: 100,
                      method_data: {
                        method_list: [
                          sortData(
                            dataUser,
                            function (e) {
                              return parseFloat(e.pnl);
                            },
                            "desc"
                          )[0]?.name,
                        ],
                      },
                    });
                    setOpenDrawer(true);
                    setIsEdit(true);
                  }}
                  profit={
                    sortData(
                      dataUser,
                      function (e) {
                        return parseFloat(e.pnl);
                      },
                      "desc"
                    )[0]?.pnl
                  }
                  heightRanking={268}
                  isTop1={true}
                  name={
                    sortData(
                      dataUser,
                      function (e) {
                        return parseFloat(e.pnl);
                      },
                      "desc"
                    )[0]?.name
                  }
                  imgRank={"/static/icons/rank-1.png"}
                  avatarUser={  sortData(
                    dataUser,
                    function (e) {
                      return parseFloat(e.pnl);
                    },
                    "desc"
                  )[0]?.photoUrl ? `/users/avatar/${ sortData(
                    dataUser,
                    function (e) {
                      return parseFloat(e.pnl);
                    },
                    "desc"
                  )[0]?.photoUrl}` :"/static/logo/luxcoin.png"}
                  bgRadient="linear-gradient(95.4deg, rgba(216, 146, 41, 0.89) 6.95%, rgba(165, 138, 0, 0.176) 100%)"
                  border="3.28125px solid rgb(255, 222, 101)"
                />
              )}
              <RankingLeaderBoard
                handleClick={() => {
                  setSelectedPlan({
                    autoType: 1,
                    margin_dense: 100,
                    method_data: {
                      method_list: [
                        sortData(
                          dataUser,
                          function (e) {
                            return parseFloat(e.pnl);
                          },
                          "desc"
                        )[1]?.name,
                      ],
                    },
                  });
                  setOpenDrawer(true);
                  setIsEdit(true);
                }}
                profit={
                  sortData(
                    dataUser,
                    function (e) {
                      return parseFloat(e.pnl);
                    },
                    "desc"
                  )[1]?.pnl
                }
                heightRanking={233}
                isTop1={false}
                name={
                  sortData(
                    dataUser,
                    function (e) {
                      return parseFloat(e.pnl);
                    },
                    "desc"
                  )[1]?.name
                }
                imgRank={"/static/icons/rank-2.png"}
                avatarUser={  sortData(
                  dataUser,
                  function (e) {
                    return parseFloat(e.pnl);
                  },
                  "desc"
                )[1]?.photoUrl ? `/users/avatar/${ sortData(
                  dataUser,
                  function (e) {
                    return parseFloat(e.pnl);
                  },
                  "desc"
                )[1]?.photoUrl}` :"/static/logo/luxcoin.png"}
                bgRadient="linear-gradient(272.63deg, rgb(194, 194, 194) -33.55%, rgb(79, 86, 112) 96.85%)"
                border="3.28125px solid rgb(160, 174, 192)"
              />
              {/*  */}
              {!downLg && (
                <RankingLeaderBoard
                  handleClick={() => {
                    setSelectedPlan({
                      autoType: 1,
                      margin_dense: 100,
                      method_data: {
                        method_list: [
                          sortData(
                            dataUser,
                            function (e) {
                              return parseFloat(e.pnl);
                            },
                            "desc"
                          )[0]?.name,
                        ],
                      },
                    });
                    setOpenDrawer(true);
                    setIsEdit(true);
                  }}
                  profit={
                    sortData(
                      dataUser,
                      function (e) {
                        return parseFloat(e.pnl);
                      },
                      "desc"
                    )[0]?.pnl
                  }
                  heightRanking={268}
                  isTop1={true}
                  name={
                    sortData(
                      dataUser,
                      function (e) {
                        return parseFloat(e.pnl);
                      },
                      "desc"
                    )[0]?.name
                  }
                  imgRank={"/static/icons/rank-1.png"}
                  avatarUser={  sortData(
                    dataUser,
                    function (e) {
                      return parseFloat(e.pnl);
                    },
                    "desc"
                  )[0]?.photoUrl ? `/users/avatar/${ sortData(
                    dataUser,
                    function (e) {
                      return parseFloat(e.pnl);
                    },
                    "desc"
                  )[0]?.photoUrl}` :"/static/logo/luxcoin.png"}
                  bgRadient="linear-gradient(95.4deg, rgba(216, 146, 41, 0.89) 6.95%, rgba(165, 138, 0, 0.176) 100%)"
                  border="3.28125px solid rgb(255, 222, 101)"
                />
              )}
              {/*  */}
              <RankingLeaderBoard
                handleClick={() => {
                  setSelectedPlan({
                    autoType: 1,
                    margin_dense: 100,
                    method_data: {
                      method_list: [
                        sortData(
                          dataUser,
                          function (e) {
                            return parseFloat(e.pnl);
                          },
                          "desc"
                        )[2]?.name,
                      ],
                    },
                  });
                  setOpenDrawer(true);
                  setIsEdit(true);
                }}
                profit={
                  sortData(
                    dataUser,
                    function (e) {
                      return parseFloat(e.pnl);
                    },
                    "desc"
                  )[2]?.pnl
                }
                heightRanking={210}
                isTop1={false}
                name={
                  sortData(
                    dataUser,
                    function (e) {
                      return parseFloat(e.pnl);
                    },
                    "desc"
                  )[2]?.name
                }
                imgRank={"/static/icons/rank-3.png"}
                avatarUser={  sortData(
                  dataUser,
                  function (e) {
                    return parseFloat(e.pnl);
                  },
                  "desc"
                )[2]?.photoUrl ? `/users/avatar/${ sortData(
                  dataUser,
                  function (e) {
                    return parseFloat(e.pnl);
                  },
                  "desc"
                )[2]?.photoUrl}` :"/static/logo/luxcoin.png"}
                bgRadient="linear-gradient(92.33deg, rgba(7, 200, 140, 0.89) 2.82%, rgba(53, 214, 202, 0.518) 99.42%)"
                border="3.28125px solid rgb(13, 148, 109)"
              />
            </Box>
            <List sx={{ padding: downLg ? 1 : 0 }}>
              {sortData(
                dataUser,
                function (e) {
                  return parseFloat(e.pnl);
                },
                "desc"
              )
                ?.slice(3)
                .map((item, index) => (
                  <StyledListItem
                    onClick={() => {
                      setSelectedPlan({
                        autoType: 1,
                        margin_dense: 100,
                        method_data: { method_list: [item?.name] },
                      });
                      setOpenDrawer(true);
                      setIsEdit(true);
                    }}
                    key={index}
                    style={{ cursor: "pointer" }}
                  >
                    <Box display="flex" alignItems="center">
                      <Typography
                        variant="body1"
                        color="textSecondary"
                        sx={{ marginRight: 2 }}
                      >
                        #{parseInt(index) + 4}
                      </Typography>
                      <ListItemAvatar>
                        <Avatar alt={item.name} src={item.photoUrl ? `/users/avatar/${item.photoUrl}` : ""} />
                      </ListItemAvatar>
                      <ListItemText primary={item.name} />
                    </Box>
                    <Typography
                      variant="body1"
                      color="textPrimary"
                      sx={{
                        background: (theme) =>
                          isDark(theme) ? "#7d818d" : "#dbdde5",
                      }}
                      style={{
                        padding: 4,
                        borderRadius: 10,
                      }}
                    >
                      {item.pnl} %
                    </Typography>
                  </StyledListItem>
                ))}
            </List>
          </Box>
        )}
        {loading === true && (
          <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
            <CircularProgress />
          </Box>
        )}
      </Box>
      <NewPlanDrawer
        open={openDrawer}
        handleClose={() => {
          setOpenDrawer(false);
        }}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        selectedPlan={selectedPlan}
        isFromLeaderboard={true}
        // setData={setDataStat}
      />
      <CopyPlanDrawer open={openCopyPlan} setOpen={setOpenCopyPlan} selectedPlan={selectedPlan} isFromCopyPlan={true} />
    </RefreshProvider>
  );
};

export default LeaderBoard;
