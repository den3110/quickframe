// src/components/Timeline.js
import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  // CardContent,
  useMediaQuery,
  useTheme,
  styled,
  FormControl,
  Select,
  MenuItem,
  Pagination,
  Button,
} from "@mui/material";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from "@mui/lab";
// import { green, yellow, red } from "@mui/material/colors";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import CancelIcon from "@mui/icons-material/Cancel";
// import TrendingUpIcon from "@mui/icons-material/TrendingUp";
// import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import { PortfolioDetailContext } from "../page-view/detail";
import moment from "moment";
import formatCurrency from "util/formatCurrency";
import { SocketContext } from "contexts/SocketContext";
import { useParams } from "react-router-dom";
// import CountDownIcon from "icons/duotone/CountDown";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SignalDisconnected from "icons/duotone/SignalDisconnected";
import TrendingUp from "icons/duotone/TrendingUp";
import TrendingDown from "icons/duotone/TrendingDown";
import FlagCircle from "icons/duotone/FlagCircle";
import AutoStop from "icons/duotone/Autostop";
import Logout2 from "icons/duotone/Logout2";
import TaskAlt from "icons/duotone/TaskAlt";
import Dangeous from "icons/duotone/Dangeous";
import ContactSupport from "icons/duotone/ContactSupport";
import InsufficientBetBalance from "icons/duotone/InsufficientBetBalance";
import round2number from "util/round2number";
import AuthContext from "contexts/AuthContext";
import { constant } from "constant/constant";
import FilterComponent from "./FilterComponent";
import FilterListIcon from '@mui/icons-material/FilterList';

const PaginationContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
}));

const CustomTimeline = () => {
  const { id } = useParams();
  const theme = useTheme();
  const downLg = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  const [countDown, setCountDown] = useState();
  const { userLinkAccountList } = useContext(AuthContext);
  // const [data, setData]= useState([])
  const { socket, isConnected } = useContext(SocketContext);
  const [openAccordion, setOpenAccordion] = useState(false);
  const {
    data: dataProps,
    dataStat: dataStatProps,
    // loading,
    setData,
    setDataStat,
    setChange,
  } = useContext(PortfolioDetailContext);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [page, setPage] = useState(1);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
  };

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const handleAccordionToggle = () => {
    setOpenAccordion(!openAccordion);
  };

  
  const renderBetType = (type) => {
    switch (type) {
      case "started_bot":
        return "Khởi động bot";
      case "reset_pnl":
        return "Đặt lại Pnl";
      case "stopped_bot":
        return "Dừng bot";
      case "resume_bot":
        return "Tiếp tục bot";
      case "betsession_is_invalid":
        return "Phiên đặt cược không hợp lệ"
      case "pause_bot":
        return "Tạm ngưng bot";
      case "stop_plan_take_profit_target":
        return "Đạt mục tiêu lợi nhuận";
      case "stop_plan_stop_loss_target":
        return "Đạt mục tiêu cắt lỗ";
      case "stop_plan_win_total_target":
        return "Đạt mục tiêu thắng tổng";
      case "stop_plan_lose_total_target":
        return "Đạt mục tiêu thua tổng";
      case "stop_plan_win_streak_target":
        return "Đạt mục tiêu thắng liên tiếp";
      case "stop_plan_lose_streak_target":
        return "Đạt mục tiêu thua liên tiếp";
      case "network_error":
        return "Mạng lỗi";
      case "unauthorized":
        return "Tài khoản chưa đăng nhập";
      case "insufficient_bet_balance":
        return "Không đủ tiền cược";
      default:
        return type;
    }
  };

  const renderTypeIcon = (data) => {
    switch (true) {
      case data?.message === "success" && data?.betType === "UP":
        return (
          <TrendingUp fontSize={"24px"} sx={{ color: "white !important" }} />
        );
      case data?.message === "success" && data?.betType === "DOWN":
        return (
          <TrendingDown fontSize={"24px"} sx={{ color: "white !important" }} />
        );
      case data?.message === "started_bot":
        return (
          <FlagCircle fontSize={"24px"} sx={{ color: "white !important" }} />
        );
      case data?.message === "stopped_bot":
        return (
          <AutoStop fontSize={"24px"} sx={{ color: "white !important" }} />
        );
      case data?.message === "resume_bot":
        return (
          <FlagCircle fontSize={"24px"} sx={{ color: "white !important" }} />
        );
      case data?.message === "pause_bot":
        return (
          <AutoStop fontSize={"24px"} sx={{ color: "white !important" }} />
        );
      case data?.message === "unauthorized":
        return <Logout2 fontSize={"24px"} sx={{ color: "white !important" }} />;
      case data?.message === "network_error":
        return (
          <SignalDisconnected
            fontSize={"24px"}
            sx={{ color: "white !important" }}
          />
        );
      case data?.message === "insufficient_bet_balance":
        return (
          <InsufficientBetBalance
            fontSize={"24px"}
            sx={{ color: "white !important" }}
          />
        );
      case data?.message === "stop_plan_take_profit_target" ||
        data?.message === "stop_plan_win_total_target" ||
        data?.message === "stop_plan_win_streak_target":
        return <TaskAlt fontSize={"24px"} sx={{ color: "white !important" }} />;
      case data?.message === "stop_plan_stop_loss_target" ||
        data?.message === "stop_plan_lose_total_target" ||
        data?.message === "stop_plan_lose_streak_target":
        return (
          <Dangeous fontSize={"24px"} sx={{ color: "white !important" }} />
        );

      default:
        return (
          <ContactSupport
            fontSize={"24px"}
            sx={{ color: "white !important" }}
          />
        );
    }
  };

  const renderBackgroundTypeIcon = (data) => {
    switch (true) {
      case data?.message === "success" && data?.betType === "UP":
        return theme.palette.success.main;
      case data?.message === "success" && data?.betType === "DOWN":
        return theme.palette.error.main;
      case data?.message === "insufficient_bet_balance":
        return theme.palette.error.main;
      default:
        return theme.palette.success.buy;
    }
  };

  useEffect(() => {
    if (isConnected && dataProps && dataStatProps) {
      let dataTemp = dataProps;
      let dataStatTemp = dataStatProps;
      socket.on("ADD_CLOSE_ORDER", (data) => {
        const index = dataTemp?.findIndex(
          (item) =>
            item.betTime === data.betTime &&
            item.botId === data.botId &&
            item.botId === id
        );
        if (index !== -1) {
          dataTemp[index] = data;
          const newObjData = {
            ...dataStatTemp,
            win_day: data?.runningData?.win_day,
            lose_day: data?.runningData?.lose_day,
            day_profit: data?.runningData?.day_profit,
            week_profit: data?.runningData?.week_profit,
            week_volume: data?.runningData?.week_volume,
            longestWinStreak: data?.runningData?.longestWinStreak,
            longestLoseStreak: data?.runningData?.longestLoseStreak,
            // take_profit_target: data?.runningData?.take_profit_target,
            // stop_loss_target: data?.runningData?.stop_loss_target,
            lastData: {
              ...dataStatTemp.lastData,
              profit: data?.runningData?.profit,
              budgetStrategy: {
                ...dataStatTemp.lastData.budgetStrategy,
                bs: {
                  ...dataStatTemp.lastData.budgetStrategy?.bs, // chac  no la cai nay a cái anyf thì sao mà báo lỗi dc thi cai budgetstrategfy no null do a. em ? rồi thì sao nó lỗi dc the no moi vl a, hinh nhu no van tinh la undefined a
                  method_data: data?.runningData?.budgetStrategy?.method_data,
                  row: data?.runningData?.budgetStrategy?.row,
                  index: data?.runningData?.budgetStrategy?.index,
                },
              },
            },
          };
          setDataStat(newObjData);
        } else {
          const index = dataTemp?.find(
            (item) =>
              item.betTime !== data.betTime &&
              item.botId === data.botId &&
              item.botId === id
          );
          if (index) {
            dataTemp = [data, ...dataTemp];
          }
        }
        if (data?.result === "ACTION_BOT") {
          setChange((prev) => !prev);
        }
        setData(dataTemp);
      });

      socket.on("ADD_OPEN_ORDER", (data) => {
        const index = dataTemp?.findIndex(
          (item) =>
            item.betTime === data.betTime &&
            item.botId === data.botId &&
            item.botId === id
        );
        if (index !== -1) {
          dataTemp[index] = data;
          const newObjData = {
            ...dataStatTemp,
            win_day: data?.runningData?.win_day,
            lose_day: data?.runningData?.lose_day,
            day_profit: data?.runningData?.day_profit,
            week_profit: data?.runningData?.week_profit,
            week_volume: data?.runningData?.week_volume,
            longestWinStreak: data?.runningData?.longestWinStreak,
            longestLoseStreak: data?.runningData?.longestLoseStreak,
            // take_profit_target: data?.runningData?.take_profit_target,
            // stop_loss_target: data?.runningData?.stop_loss_target,
            lastData: {
              ...dataStatTemp.lastData,
              profit: data?.runningData?.profit,

              budgetStrategy: {
                ...dataStatTemp.lastData.budgetStrategy,
                bs: {
                  ...dataStatTemp.lastData.budgetStrategy.bs,
                  method_data: data?.runningData?.budgetStrategy?.method_data,
                  row: data?.runningData?.budgetStrategy?.row,
                  index: data?.runningData?.budgetStrategy?.index,
                },
              },
            },
          };
          setDataStat(newObjData);
        } else {
          const index = dataTemp?.find(
            (item) =>
              item.betTime !== data.betTime &&
              item.botId === data.botId &&
              item.botId === id
          );
          if (index) {
            dataTemp = [data, ...dataTemp];
          }
        }
        if (data?.result === "ACTION_BOT") {
          setChange((prev) => !prev);
        }

        setData(dataTemp);
      });
    }
  }, [
    isConnected,
    dataProps,
    dataStatProps,
    id,
    socket,
    setData,
    setDataStat,
    setChange,
  ]);

  useEffect(() => {
    if (isConnected) {
      socket.emit("CURRENT_SESSION_SUBCRIBE");
      socket.on("CURRENT_SESSION", (data) => {
        if (data?.ss_t === "WAIT") {
          setCountDown(data?.r_second);
        } else if (data?.ss_t === "TRADE") {
          setCountDown(data?.r_second + 30);
        }
      });
      socket.emit("LAST_RESULTS_SUBCRIBE");
      socket.on("LAST_RESULTS", (data) => {
        // console.log("LAST_RESULTS", data);
      });
      return () => {
        socket.emit("CURRENT_SESSION_UNSUBCRIBE");
        socket.emit("LAST_RESULTS_UNSUBCRIBE");
      };
    }
  }, [isConnected, socket]);

  useEffect(() => {
    if (isConnected) {
      socket.emit("PLAN_HISTORY_SUBCRIBE", id);
      return () => {
        socket.emit("PLAN_HISTORY_UNSUBCRIBE", id);
      };
    }
  }, [isConnected, id, socket]);

  return (
    <Box>
      <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
        <Typography variant="h6" gutterBottom>
          Quá trình đầu tư
        </Typography>
        <Button onClick={handleAccordionToggle}>
          <FilterListIcon /> Bộ lọc
        </Button>
      </Box>
      <FilterComponent openAccordion={openAccordion} setOpenAccordion={setOpenAccordion} handleAccordionToggle={handleAccordionToggle} />
      <Box>
        <Timeline className="askskaa" sx={{ padding: downLg ? 0 : "" }}>
          {dataProps
            ?.slice(
              rowsPerPage * (page - 1),
              rowsPerPage * (page - 1) + rowsPerPage
            )
            ?.map((item, index) => (
              <TimelineItem
                sx={{
                  "&:before": {
                    display: "none",
                  },
                }}
                key={index}
              >
                <TimelineSeparator>
                  <TimelineDot
                    style={{ backgroundColor: renderBackgroundTypeIcon(item) }}
                  >
                    {renderTypeIcon(item)}
                  </TimelineDot>
                  {index < dataProps.length - 1 && <TimelineConnector />}
                </TimelineSeparator>
                <TimelineContent sx={{ paddingRight: 0 }}>
                  <Box
                    width="100%"
                    display={"flex"}
                    flexDirection={"row-reverse"}
                  >
                    <Box
                      display={"flex"}
                      alignItems={"center"}
                      gap={0.5}
                      sx={{ opacity: 0.6 }}
                    >
                      <img
                        style={{ width: 32, height: 32 }}
                        src={
                          constant.URL_ASSETS_LOGO +
                          "/" +
                          item?.clientId +
                          ".ico"
                        }
                        alt="Can't open"
                      />
                      <Typography fontSize={14} fontWeight={600}>
                        {
                          userLinkAccountList?.find(
                            (row) => row?._id === item?.linkAccountId
                          )?.nickName
                        }
                      </Typography>
                    </Box>
                  </Box>
                  <Card variant="outlined" sx={{ mb: 2 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        padding: downLg ? 1 : 2.5,
                        flexWrap: downLg ? "wrap" : "",
                      }}
                    >
                      {/* row 1 */}
                      <Box
                        mb={downLg ? 1.5 : 0}
                        sx={{ width: downLg ? "calc(100% * 2 / 3)" : "20%" }}
                      >
                        <Typography fontSize={12} fontWeight={600} mb={1}>
                          {moment(item.betTime).format("DD/MM/YYYY, HH:mm:ss")}
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Typography fontSize={12}>
                            Thời gian (UTC + 7){" "}
                          </Typography>
                          {item?.message === "success" &&
                            item?.bet_second > 0 && (
                              <Box
                                display={"flex"}
                                alignItems="center"
                                gap={0.5}
                                ml={0.5}
                              >
                                <AccessTimeIcon
                                  fontSize="16"
                                  sx={{ color: theme.palette.success.main }}
                                />
                                <Typography
                                  fontSize={12}
                                  sx={{ color: theme.palette.success.main }}
                                >
                                  {item?.bet_second}
                                </Typography>
                              </Box>
                            )}
                        </Box>
                      </Box>
                      {/* row 2 */}
                      <Box
                        mb={downLg ? 1.5 : 0}
                        sx={{ width: downLg ? "calc(100% * 1 / 3)" : "20%" }}
                      >
                        {item?.message === "success" && (
                          <Typography
                            fontSize={12}
                            fontWeight={600}
                            mb={1}
                            color={
                              item.betType === "UP"
                                ? theme.palette.success.main
                                : "error"
                            }
                          >
                            {item.betType === "UP" ? "Buy" : "Sell"}
                          </Typography>
                        )}
                        {item?.result === "ACTION_BOT" && (
                          <Typography
                            fontSize={12}
                            fontWeight={600}
                            mb={1}
                            sx={{ color: theme.palette.primary.main }}
                          >
                            {renderBetType(item.message)}
                          </Typography>
                        )}
                        {item?.result === "ERROR" && (
                          <Typography
                            fontSize={12}
                            fontWeight={600}
                            mb={1}
                            sx={{ color: "error.main" }}
                          >
                            {renderBetType(item.message)}
                          </Typography>
                        )}
                        {/* a no */}
                        <Typography fontSize={12}>Loại</Typography>
                      </Box>
                      {/* row 3 */}
                      <Box
                        sx={{
                          width: downLg ? "aaa" : "20%",
                          flex: downLg ? 1 : "aaa",
                        }}
                      >
                        <Typography fontSize={12} fontWeight={600} mb={1}>
                          {item.profit}
                        </Typography>
                        {(item?.betType === "UP" ||
                          item?.betType === "DOWN") && (
                          <>
                            <Typography fontSize={12} fontWeight={600} mb={1}>
                              ${round2number(item.betAmount)}
                            </Typography>
                            <Typography fontSize={12}>
                              Số tiền vào lệnh
                            </Typography>
                          </>
                        )}
                        {/* tiep di a nay e  */}
                        {item?.message === "stop_plan_take_profit_target" &&
                          item?.result === "ACTION_BOT" && (
                            <>
                              <Typography fontSize={12} fontWeight={600} mb={1}>
                                $1.00/-$1.00
                              </Typography>
                              <Typography fontSize={12}>
                                Giới hạn PnL
                              </Typography>
                            </>
                          )}
                      </Box>
                      {/* row 4 */}
                      <Box
                        sx={{
                          width: downLg ? "aaa" : "20%",
                          flex: downLg ? 1 : "aaa",
                        }}
                      >
                        {(item?.betType === "UP" ||
                          item?.betType === "DOWN") && (
                          <>
                            <Typography
                              fontSize={12}
                              fontWeight={600}
                              mb={1}
                              color={
                                item.current_profit >= 0
                                  ? theme.palette.success.main
                                  : "error"
                              }
                            >
                              {formatCurrency(item.current_profit)}
                            </Typography>
                            <Typography fontSize={12}>Lợi nhuận</Typography>
                          </>
                        )}
                        {item?.message === "stop_plan_take_profit_target" &&
                          item?.result === "ACTION_BOT" && (
                            <Box>
                              <Typography fontSize={12} fontWeight={600} mb={1}>
                                Thủ công
                              </Typography>
                              <Typography fontSize={12}>Mô tả</Typography>
                            </Box>
                          )}
                      </Box>
                      {/* row 5 */}
                      <Box
                        sx={{
                          width: downLg ? "aaa" : "20%",
                          flex: downLg ? 1 : "aaa",
                        }}
                      >
                        {(item?.betType === "UP" || item?.betType === "DOWN") &&
                          item.result &&
                          item.message === "success" && (
                            <>
                              <Typography
                                fontSize={12}
                                fontWeight={600}
                                mb={1}
                                color={
                                  item?.winAmount >= 0
                                    ? theme.palette.success.main
                                    : "error"
                                }
                              >
                                {formatCurrency(item?.winAmount)}
                              </Typography>
                              <Typography fontSize={12}>Thu nhập</Typography>
                            </>
                          )}
                        {!item.result && item.message === "success" && (
                          <>
                            <Typography
                              fontSize={12}
                              fontWeight={600}
                              mb={1}
                              color={"warning.main"}
                            >
                              Chờ {countDown}s
                            </Typography>
                            <Typography fontSize={12}>Thu nhập</Typography>
                          </>
                        )}
                      </Box>
                      {/* {event.income && (
                      <Typography sx={{width: "20%"}} variant="body2">{event.income}</Typography>
                    )} */}
                    </Box>
                  </Card>
                </TimelineContent>
              </TimelineItem>
            ))}
        </Timeline>
        <PaginationContainer>
          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            gap={1}
          >
            <Typography>Hiển thị kết quả:</Typography>
            <FormControl variant="outlined" sx={{ minWidth: 60 }}>
              <Select value={rowsPerPage} onChange={handleChangeRowsPerPage}>
                <MenuItem value={6}>6</MenuItem>
                <MenuItem value={12}>12</MenuItem>
                <MenuItem value={24}>24</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Pagination
            count={Math.ceil(dataProps.length / rowsPerPage)}
            page={page}
            onChange={handleChangePage}
            shape="rounded"
          />
        </PaginationContainer>
      </Box>
    </Box>
  );
};

export default CustomTimeline;
