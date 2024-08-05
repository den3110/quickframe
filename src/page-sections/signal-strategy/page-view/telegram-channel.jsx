import React, { memo, useContext, useEffect, useState } from "react";
import {
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  // ListItemIcon,
  Box,
  Button,
  TextField,
  useTheme,
  useMediaQuery,
  Card,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControl,
  Select,
  MenuItem,
  Pagination,
  styled,
  IconButton,
  Tooltip,
} from "@mui/material";
import Layout from "../Layout";
import { SocketContext } from "contexts/SocketContext";
import signalStrategyApi from "api/singal-strategy/signalStrategyApi";
import round2number from "util/round2number";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";
import formatCurrency from "util/formatCurrency";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AuthContext from "contexts/AuthContext";
import SpotBalanceContext from "contexts/SpotBalanceContext";
import sortData from "util/sortData";
import TableInvest from "./component/TableInvest";
import PopupTrade from "./component/PopupTrade";
import { sortDataAlphabet } from "util/sortDataAlphabet";
import CopyAllIcon from "@mui/icons-material/CopyAll";
import { showToast } from "components/toast/toast";
import BubbleHistory from "page-sections/manual-trade/section/BubbleHistory";

const PaginationContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  gap: 2,
}));

const TelegramChannelSignalStrategy = ({isFromTeleChannel}) => {
  const downLg = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  const theme = useTheme();
  // const navigate = useNavigate();
  const [dataBot, setDataBot] = useState([]);
  const dataBotInit = dataBot;
  const [searchTerm, setSearchTerm] = useState("");
  const { isConnected, socket } = useContext(SocketContext);
  const { selectedLinkAccount } = useContext(AuthContext);

  const [selectedBot, setSelectedBot] = useState();
  const [transactions, setTransactions] = useState();
  const [expanded, setExpanded] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [page, setPage] = useState(1);
  // const [accordionData, setAccordionData] = useState([]);
  const { setChange } = useContext(SpotBalanceContext);
  const { t } = useTranslation();

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(1);
  };

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const filteredData = dataBotInit.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    (async () => {
      const response = await signalStrategyApi.userBudgetTelegramSignal();
      if (response?.data?.ok === true) {
        setDataBot(response?.data?.d);
        setSelectedBot(response?.data?.d[0]);
      }
    })();
  }, []);

  useEffect(() => {
    if (isConnected && selectedBot) {
      socket.emit("TELEGRAM_SIGNAL_SUBCRIBE", selectedBot._id);
      socket.on("UPDATE_MESSAGE_TELE", (data) => {
        setTransactions(data);
      });

      return () => {
        socket.emit("TELEGRAM_SIGNAL_UNSUBCRIBE", selectedBot._id);
        setTransactions([]);
      };
    }
  }, [isConnected, socket, selectedBot]);

  // useEffect(() => {
  //   if (isConnected && socket && selectedLinkAccount) {
  //     socket.emit("LINK_ACCOUNT_SUBCRIBE", selectedLinkAccount);
  //     return () => {
  //       socket.emit("LINK_ACCOUNT_UNSUBCRIBE", selectedLinkAccount);
  //     };
  //   }
  // }, [isConnected, socket, selectedLinkAccount]);

  // useEffect(() => {
  //   if (isConnected && socket) {
  //     socket.on("RELOAD_SPOT_BALANCE", (data) => {
  //       setChange((prev) => !prev);
  //     });
  //   }
  // }, [isConnected, socket, setChange]);

  return (
    <Layout>
      <Box mb={2}>
        <Card
          sx={{
            display: "flex",
          }}
        >
          <Box width={"100%"} sx={{ paddingTop: "22px", position: "relative" }}>
            <Box sx={{ position: "absolute", right: 0, top: 0 }}>
              <Box p={2}>
                <Tooltip title="Copy all">
                  <IconButton
                    onClick={() => {
                        try {
                        const formattedData = filteredData
                          .map((item) => `${item.name} | ${item.url}`)
                          .join("\n");

                        const textarea = document.createElement("textarea");
                        textarea.value = formattedData;
                        document.body.appendChild(textarea);
                        textarea.select();
                        document.execCommand("copy");

                        document.body.removeChild(textarea)
                        showToast("Copy tất cả kênh telegram thành công", "success")
                      }
                      catch(e) {
                        showToast("Lỗi khi copy", "error")

                      }
                    }}
                  >
                    <CopyAllIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
            <Box sx={{ padding: downLg ? 1 : "24px" }}>
              <Typography variant="h6" gutterBottom>
                {t("Telegram Channel")}
              </Typography>
              <Box
                sx={{
                  maxHeight: "calc(-300px + 100vh)",
                  height: "calc(-300px + 100vh)",
                  border: downLg ? "none" : `1px solid ${theme.palette.border}`,
                  borderRadius: "10px",
                  position: "relative",
                }}
              >
                {!downLg && (
                  <Grid container>
                    <Grid item xs={3}>
                      <Paper>
                        <TextField
                          fullWidth
                          variant="outlined"
                          placeholder={t("Search Channel...")}
                          value={searchTerm}
                          onChange={handleSearchChange}
                          sx={{
                            "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                              {
                                borderTop: "none",
                                borderLeft: "none",
                                borderRight: "none",
                                borderRadius: 0,
                              },
                          }}
                        />
                        <Box
                          sx={{
                            overflow: "auto",
                            maxHeight: "calc(-300px - 32px - 12px + 100vh)",
                          }}
                        >
                          <List>
                            {sortDataAlphabet(filteredData, "name").map(
                              (item, index) => (
                                <ListItem
                                  onClick={() => {
                                    setSelectedBot(item);
                                  }}
                                  button
                                  key={index}
                                  sx={{
                                    backgroundColor:
                                      selectedBot._id === item._id
                                        ? "success.bg"
                                        : "transparent",
                                  }}
                                >
                                  <ListItemText
                                    primary={
                                      <Box
                                        display={"flex"}
                                        justifyContent={"space-between"}
                                        alignItems={"center"}
                                      >
                                        <Typography>{item.name}</Typography>
                                      </Box>
                                    }
                                    secondary={
                                      <Box
                                        sx={{
                                          display: "flex",
                                          alignItems: "center",
                                        }}
                                      >
                                        <Box
                                          display="flex"
                                          alignItems={"center"}
                                        >
                                          <Typography fontSize={12}>
                                            {t("Win rate:")}&nbsp;
                                          </Typography>
                                          <Typography
                                            fontSize={12}
                                            fontWeight={600}
                                            sx={{
                                              cursor: "pointer",
                                            }}
                                            color={
                                              (item.win_day /
                                                (item.win_day +
                                                  item.lose_day)) *
                                                100 >=
                                              50
                                                ? "success.main"
                                                : "error.main"
                                            }
                                          >
                                            {round2number(
                                              (item.win_day /
                                                (item.win_day +
                                                  item.lose_day)) *
                                                100
                                            )}
                                            %
                                          </Typography>
                                        </Box>
                                        <Typography fontSize={8}>
                                          | &nbsp;
                                        </Typography>
                                        <Box
                                          display="flex"
                                          alignItems={"center"}
                                        >
                                          <Typography fontSize={12}>
                                            {t("Win/Lose Streak:")}&nbsp;
                                          </Typography>
                                          <Typography
                                            fontWeight={600}
                                            fontSize={12}
                                            color={"success.main"}
                                          >
                                            {item?.longest_win_streak}
                                          </Typography>
                                          <Typography fontSize={12}>
                                            /
                                          </Typography>
                                          <Typography
                                            fontWeight={600}
                                            fontSize={12}
                                            color={"error.main"}
                                          >
                                            {item?.longest_lose_streak}
                                          </Typography>
                                        </Box>

                                        <Typography fontSize={8}>
                                          {" "}
                                          &nbsp;|&nbsp;{" "}
                                        </Typography>
                                        <Box
                                          display="flex"
                                          alignItems={"center"}
                                        >
                                          <Typography fontSize={12}>
                                            {t("Volume")}:&nbsp;
                                          </Typography>
                                          <Typography
                                            fontWeight={600}
                                            fontSize={12}
                                            color={"warning.main"}
                                          >
                                            ${round2number(item?.volume)}
                                          </Typography>
                                          {/* <Typography fontSize={12}>/</Typography>
                                      <Typography
                                        fontWeight={600}
                                        fontSize={12}
                                        color={"error.main"}
                                      >
                                        {item?.longest_lose_streak}
                                      </Typography> */}
                                        </Box>
                                      </Box>
                                    }
                                  />
                                </ListItem>
                              )
                            )}
                          </List>
                        </Box>
                      </Paper>
                    </Grid>
                    <Grid
                      item
                      xs={9}
                      borderLeft={`1px solid ${theme.palette.border}`}
                    >
                      <Paper sx={{ padding: "16px 8px 16px 24px" }}>
                        <Typography variant="h6" gutterBottom>
                          {selectedBot?.name}
                        </Typography>
                        <Box
                          sx={{
                            overflow: "auto",
                            maxHeight:
                              "calc(-300px - 32px - 32px - 12px + 100vh)",
                          }}
                        >
                          <Typography variant="body1">
                            🎉 {t("summary")}{" "}
                            {transactions?.messages?.[1]?.message?.histories
                              ?.length || 0}{" "}
                            {t("last_trading_session")} (UTC+7):
                          </Typography>
                          <List>
                            {sortData(
                              transactions?.messages?.[1]?.message?.histories,
                              "time",
                              "desc"
                            )
                              ?.reverse()
                              ?.map((transaction, index) => (
                                <Stack key={index} direction="row" spacing={1}>
                                  {/* <Iconify icon={'emojione-v1:alarm-clock'} /> */}
                                  <Typography>
                                    {" "}
                                    {`${format(
                                      new Date(transaction.time),
                                      "HH:mm"
                                    )}`}
                                  </Typography>
                                  <Typography>{t("Session")} </Typography>
                                  <Typography sx={{ fontWeight: "bold" }}>
                                    {transaction.session}{" "}
                                  </Typography>
                                  <Typography>
                                    {transaction?.result === "WIN"
                                      ? "💚"
                                      : "🔥"}
                                  </Typography>
                                  {/* <Iconify icon={transaction.result === 1 ? 'noto:green-circle' : 'fluent-emoji:red-circle'} /> */}
                                  <Typography
                                    color={
                                      transaction.profit > 0
                                        ? "success.main"
                                        : "error.main"
                                    }
                                  >
                                    {formatCurrency(transaction.profit)}{" "}
                                  </Typography>
                                </Stack>
                              ))}
                          </List>
                          <Typography variant="body1" sx={{ display: "flex" }}>
                            {t("please_trade")} :{" "}
                            <Typography
                              mb={1}
                              fontWeight={600}
                              sx={{
                                color:
                                  transactions?.messages?.[0]?.message
                                    ?.betType === "UP"
                                    ? "success.main"
                                    : "error.main",
                              }}
                            >
                              {formatCurrency(
                                transactions?.messages?.[0]?.message?.betAmount
                              )}{" "}
                              {transactions?.messages?.[0]?.message?.betType ===
                              "UP"
                                ? t("up")
                                : t("down")}
                            </Typography>
                          </Typography>
                        </Box>
                      </Paper>
                    </Grid>
                  </Grid>
                )}
                {downLg && (
                  <Box sx={{ overflow: "auto", maxHeight: "100%" }}>
                    <Box mb={1}>
                      <TextField
                        fullWidth
                        variant="outlined"
                        placeholder={t("Search Channel...")}
                        value={searchTerm}
                        onChange={handleSearchChange}
                      />
                    </Box>

                    {sortDataAlphabet(filteredData, "name")
                      ?.slice(
                        rowsPerPage * (page - 1),
                        rowsPerPage * (page - 1) + rowsPerPage
                      )
                      ?.map((item, index) => (
                        <Accordion
                          onClick={() => {
                            setSelectedBot(item);
                          }}
                          key={index}
                          expanded={expanded === `panel${index}`}
                          onChange={handleChange(`panel${index}`)}
                        >
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls={`panel${index}a-content`}
                            id={`panel${index}a-header`}
                          >
                            <ListItemText
                              primary={
                                <Box
                                  display={"flex"}
                                  justifyContent={"space-between"}
                                  alignItems={"center"}
                                >
                                  <Typography>{item.name}</Typography>
                                </Box>
                              }
                              secondary={
                                <Box
                                  sx={{ display: "flex", alignItems: "center" }}
                                >
                                  <Box display="flex" alignItems={"center"}>
                                    <Typography fontSize={12}>
                                      {t("Win rate:")}:&nbsp;
                                    </Typography>
                                    <Typography
                                      fontSize={12}
                                      fontWeight={600}
                                      sx={{
                                        cursor: "pointer",
                                      }}
                                      color={
                                        (item.win_day /
                                          (item.win_day + item.lose_day)) *
                                          100 >=
                                        50
                                          ? "success.main"
                                          : "error.main"
                                      }
                                    >
                                      {round2number(
                                        (item.win_day /
                                          (item.win_day + item.lose_day)) *
                                          100
                                      )}
                                      %
                                    </Typography>
                                  </Box>
                                  <Typography fontSize={8}>|</Typography>
                                  <Box display="flex" alignItems={"center"}>
                                    <Typography fontSize={12}>
                                      {t("Win/Lose Streak:")}&nbsp;
                                    </Typography>
                                    <Typography
                                      fontWeight={600}
                                      fontSize={12}
                                      color={
                                        parseFloat(item?.win_streak) >= 0
                                          ? "success.main"
                                          : "error.main"
                                      }
                                    >
                                      {item?.win_streak}
                                    </Typography>
                                    <Typography fontSize={12}>/</Typography>
                                    <Typography
                                      fontWeight={600}
                                      fontSize={12}
                                      color={"error.main"}
                                    >
                                      {item?.lose_streak}
                                    </Typography>
                                  </Box>
                                </Box>
                              }
                            />
                          </AccordionSummary>
                          <AccordionDetails>
                            <Typography>
                              <Box
                                sx={{
                                  overflow: "auto",
                                  maxHeight: "200px",
                                }}
                              >
                                {/* <Typography variant="body1" sx={{ display: "flex" }}>
                              Kết quả :{" "}
                              <Typography sx={{ color: "success.main" }}>
                                THẮNG : +0.95$
                              </Typography>
                            </Typography> */}

                                <Typography variant="body1">
                                  🎉 Tổng hợp{" "}
                                  {transactions?.messages?.[1]?.message
                                    ?.histories?.length || 0}{" "}
                                  phiên giao dịch gần nhất (UTC+7):
                                </Typography>
                                <List>
                                  {sortData(
                                    transactions?.messages?.[1]?.message
                                      ?.histories,
                                    "time",
                                    "desc"
                                  )
                                    ?.reverse()
                                    ?.map((transaction, index) => (
                                      <Stack
                                        key={index}
                                        direction="row"
                                        spacing={1}
                                      >
                                        {/* <Iconify icon={'emojione-v1:alarm-clock'} /> */}
                                        <Typography>
                                          {" "}
                                          {`${format(
                                            new Date(transaction.time),
                                            "HH:mm"
                                          )}`}
                                        </Typography>
                                        <Typography>{t("Session")} </Typography>
                                        <Typography sx={{ fontWeight: "bold" }}>
                                          {transaction.session}{" "}
                                        </Typography>
                                        <Typography>
                                          {transaction?.result === "WIN"
                                            ? "💚"
                                            : "🔥"}
                                        </Typography>
                                        {/* <Iconify icon={transaction.result === 1 ? 'noto:green-circle' : 'fluent-emoji:red-circle'} /> */}
                                        <Typography
                                          color={
                                            transaction.profit > 0
                                              ? "success.main"
                                              : "error.main"
                                          }
                                        >
                                          {formatCurrency(transaction.profit)}{" "}
                                        </Typography>
                                      </Stack>
                                    ))}
                                </List>
                                <Typography
                                  variant="body1"
                                  sx={{ display: "flex" }}
                                >
                                  Hãy đặt lệnh :{" "}
                                  <Typography
                                    mb={1}
                                    fontWeight={600}
                                    sx={{
                                      color:
                                        transactions?.messages?.[0]?.message
                                          ?.betType === "UP"
                                          ? "success.main"
                                          : "error.main",
                                    }}
                                  >
                                    {formatCurrency(
                                      transactions?.messages?.[0]?.message
                                        ?.betAmount
                                    )}{" "}
                                    {transactions?.messages?.[0]?.message
                                      ?.betType === "UP"
                                      ? t("up")
                                      : t("down")}
                                  </Typography>
                                </Typography>
                              </Box>
                            </Typography>
                          </AccordionDetails>
                        </Accordion>
                      ))}

                    {downLg && (
                      <PaginationContainer>
                        <Box
                          display={"flex"}
                          justifyContent={"center"}
                          alignItems={"center"}
                          gap={1}
                        >
                          <Typography style={{ whiteSpace: "nowrap" }}>
                            {t("Show result")}:
                          </Typography>
                          <FormControl variant="outlined" sx={{ minWidth: 60 }}>
                            <Select
                              value={rowsPerPage}
                              onChange={handleChangeRowsPerPage}
                            >
                              <MenuItem value={6}>6</MenuItem>
                              <MenuItem value={12}>12</MenuItem>
                              <MenuItem value={24}>24</MenuItem>
                              <MenuItem value={filteredData.length}>
                                {t("all")}
                              </MenuItem>
                            </Select>
                          </FormControl>
                        </Box>
                        <Pagination
                          count={Math.ceil(filteredData.length / rowsPerPage)}
                          page={page}
                          onChange={handleChangePage}
                          shape="rounded"
                        />
                      </PaginationContainer>
                    )}
                  </Box>
                )}
                <PopupTrade selectedBot={selectedBot} />
              </Box>
            </Box>
          </Box>
        </Card>
      </Box>
      <Box width={"100%"}>
        <Box
          width={"100%"}
          sx={{
            display: "flex",
          }}
          mb={2}
        >
          <Box width={"100%"} sx={{ padding: downLg ? 1 : 0 }}> 
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Card>
                  <BubbleHistory isFromTelegramChannel={true} />
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card>
                  <TableInvest selectedBot={{ ...selectedBot }} />
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default memo(TelegramChannelSignalStrategy);
