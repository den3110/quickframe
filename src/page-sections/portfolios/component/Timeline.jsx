// src/components/Timeline.js
import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  useMediaQuery,
  useTheme,
  styled,
  FormControl,
  Select,
  MenuItem,
  Pagination,
} from "@mui/material";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from "@mui/lab";
import { green, yellow, red } from "@mui/material/colors";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import { PortfolioDetailContext } from "../page-view/detail";
import moment from "moment";
import formatCurrency from "util/formatCurrency";
import { SocketContext } from "contexts/SocketContext";

const PaginationContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
}));

const events = [
  {
    time: "12/07/2024, 14:01:03",
    type: "Dừng gói",
    profit: "$0.00",
    method: "Thủ công",
    color: green[500],
    icon: <CheckCircleIcon fontSize={"16px"} />,
  },
  {
    time: "12/07/2024, 07:04:02",
    type: "Mục tiêu ngày",
    profit: "$1.00",
    method: "Chốt lời",
    color: green[500],
    icon: <CheckCircleIcon fontSize={"16px"} />,
  },
  {
    time: "12/07/2024, 07:01:39",
    type: "Long",
    profit: "$8.00",
    result: "+$7.60",
    income: "$15.60",
    color: green[500],
    icon: <TrendingUpIcon fontSize={"16px"} />,
  },
  {
    time: "12/07/2024, 07:01:00",
    type: "Đặt lại lợi nhuận",
    profit: "$0.00",
    result: "$0.00",
    color: yellow[700],
    icon: <TrendingUpIcon fontSize={"16px"} />,
  },
  {
    time: "11/07/2024, 07:03:43",
    type: "Mục tiêu ngày",
    profit: "$1.00",
    method: "Cắt lỗ",
    color: red[500],
    icon: <CancelIcon fontSize={"16px"} />,
  },
  {
    time: "11/07/2024, 07:01:39",
    type: "Short",
    profit: "$4.00",
    result: "-$4.00",
    income: "$0.00",
    color: red[500],
    icon: <TrendingDownIcon fontSize={"16px"} />,
  },
];

const CustomTimeline = () => {
  const theme = useTheme();
  const {socket, isConnected }= useContext(SocketContext) 
  const downLg = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  // const [data, setData]= useState([])
  const { data: dataProps, loading, setData } = useContext(PortfolioDetailContext);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [page, setPage] = useState(1);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
  };

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const renderBetType = (type) => {
    switch (type) {
      case "started_bot":
        return "Khởi động bot";
      case "stopped_bot":
        return "Dừng bot";
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
      default:
        break;
    }
  };
  useEffect(()=> {
    if(isConnected) {
      let dataTemp= dataProps;
      
      // casi luc ma isConnected thi lam gi da co du lieu o dataProps nhi ? hin hnh de e thu dem
      socket.on("ADD_CLOSE_ORDER", data=> {
        const index= dataTemp?.findIndex(item=> item.betTime === data.betTime && item.botId === data.botId)
        if(index=== -1) {
          dataTemp= [data, ...dataTemp]
        }
        else {
          dataTemp[index]= data
        }
        setData(dataTemp)
      })
      socket.on("ADD_OPEN_ORDER", data=> {
        const index= dataTemp?.findIndex(item=> item.betTime === data.betTime && item.botId === data.botId)
        if(index=== -1) {
          dataTemp= [data, ...dataTemp]
        }
        else {
          dataTemp[index]= data
        }
        setData(dataTemp)
      })
    }
  }, [isConnected, dataProps])

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Quá trình đầu tư
      </Typography>
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
                  <TimelineDot style={{ backgroundColor: theme.palette.success.buy }}>
                    <CheckCircleIcon fontSize={"16px"} sx={{color: "white !important"}} />
                  </TimelineDot>
                  {index < dataProps.length - 1 && (
                    <TimelineConnector />
                  )}
                </TimelineSeparator>
                <TimelineContent sx={{ paddingRight: 0 }}>
                  <Card variant="outlined" sx={{ mb: 2 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        padding: 2.5,
                      }}
                    >
                      {/* row 1 */}
                      <Box sx={{ width: "20%" }}>
                        <Typography fontSize={12} fontWeight={600} mb={1}>
                          {moment(item.createdAt).format(
                            "DD/MM/YYYY, HH:mm:ss"
                          )}
                        </Typography>
                        <Typography fontSize={12}>
                          Thời gian (UTC + 7)
                        </Typography>
                      </Box>
                      {/* row 2 */}
                      <Box sx={{ width: "20%" }}>
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
                          <Typography fontSize={12} fontWeight={600} mb={1}>
                            {renderBetType(item.message)}
                          </Typography>
                        )}
                        <Typography fontSize={12}>Loại</Typography>
                      </Box>
                      {/* row 3 */}
                      <Box sx={{ width: "20%" }}>
                        <Typography fontSize={12} fontWeight={600} mb={1}>
                          {item.profit}
                        </Typography>
                        {(item?.betType === "UP" ||
                          item?.betType === "DOWN") && (
                          <>
                            <Typography fontSize={12} fontWeight={600} mb={1}>
                              ${item.betAmount?.toFixed(2)}
                            </Typography>
                            <Typography fontSize={12}>
                              Số tiền vào lệnh
                            </Typography>
                          </>
                        )}
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
                      <Box sx={{ width: "20%" }}>
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
                      <Box sx={{ width: "20%" }}>
                        {((item?.betType === "UP" ||
                          item?.betType === "DOWN") && item.result && item.message === "success") && (
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
                              {formatCurrency(
                                item?.winAmount
                              )}
                            </Typography>
                            <Typography fontSize={12}>Thu nhập</Typography>
                          </>
                        )}
                        {(!item.result && item.message === "success") && (
                          <>
                            <Typography
                              fontSize={12}
                              fontWeight={600}
                              mb={1}
                              color={
                                "warning.main"
                              }
                            >
                                Chờ ...s
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
            <Typography>Show result:</Typography>
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
