import React, { useContext, useEffect, useState } from "react";
import {
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Box,
  Button,
  TextField,
  useTheme,
  useMediaQuery,
  Card,
  Divider,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { green, red } from "@mui/material/colors";
import TimerIcon from "@mui/icons-material/Timer";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import Layout from "../Layout";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "contexts/SocketContext";
import { SettingsContext } from "contexts/settingsContext";
import signalStrategyApi from "api/singal-strategy/signalStrategyApi";
import round2number from "util/round2number";
import { makeStyles } from "@mui/styles";
import copytradeApi from "api/copytrade/copytradeApi";
import { showToast } from "components/toast/toast";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";
import formatCurrency from "util/formatCurrency";
import Toggle from "icons/duotone/Toggle";
import CloseIcon from "icons/duotone/CloseIcon";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AuthContext from "contexts/AuthContext";
import SpotBalanceContext from "contexts/SpotBalanceContext";
import sortData from "util/sortData";

const useStyles = makeStyles((theme) => ({
  input: {
    height: "56px",
    boxSizing: "border-box",
  },
  button: {
    height: "44px",
    minWidth: "auto", // To ensure button does not expand unnecessarily
  },
}));

const TelegramChannelSignalStrategy = () => {
  const downLg = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  const [openTrade, setOpenTrade] = useState(false);
  const classes = useStyles();
  const theme = useTheme();
  const navigate = useNavigate();
  const [dataBot, setDataBot] = useState([]);
  const dataBotInit = dataBot;
  const [searchTerm, setSearchTerm] = useState("");
  const { isConnected, socket } = useContext(SocketContext);
  const {selectedLinkAccount }= useContext(AuthContext)
  const { walletMode } = useContext(SettingsContext);
  const [countDown, setCountDown] = useState(0);
  const [betAmount, setBetAmount] = useState(1);
  const [statusTrade, setStatusTrade] = useState();
  const [multiplier, setMultiplier] = useState(1);
  const [selectedBot, setSelectedBot] = useState();
  const [transactions, setTransactions] = useState();
  const [expanded, setExpanded] = useState(false);
  const [accordionData, setAccordionData] = useState([]);
  const { setChange } = useContext(SpotBalanceContext);
  const { t } = useTranslation();
  const isDisableButtonTrade = statusTrade === "WAIT" || !statusTrade;
  const isErrorBetAmount =
    betAmount.toString().length <= 0 || betAmount > 1000000 || betAmount <= 0;

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const filteredData = dataBotInit.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = async (betType) => {
    try {
      const data = {
        betType,
        amount: parseFloat(betAmount) * parseInt(multiplier),
        isBrokerMode: false,
        accountType: walletMode ? "LIVE" : "DEMO",
        linkAccountId: selectedLinkAccount
      };
      const response = await copytradeApi.postUserCopytrade(data);
      if (response?.data?.ok === true) {
        showToast("Đặt lệnh thành công", "success");
      } else if (response?.data?.ok === false) {
        showToast(response?.data?.d?.err_code || "Unknow error", "error");
      }
    } catch (error) {
      console.log(error);
      showToast(error?.response?.data?.err_code || "Unknow error", "error");
    }
  };

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
    if (isConnected) {
      socket.emit("CURRENT_SESSION_SUBCRIBE");
      socket.on("CURRENT_SESSION", (data) => {
        // console.log("CURRENT_SESSION", data);
        setCountDown(data?.r_second);
        setStatusTrade(data?.ss_t);
      });
    }
  }, [isConnected, socket]);

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

  useEffect(() => {
    if (isConnected && socket) {
      socket.emit("LINK_ACCOUNT_SUBCRIBE", selectedLinkAccount);
      return ()=> {
        socket.emit("LINK_ACCOUNT_UNSUBCRIBE", selectedLinkAccount)
      }
    }
  }, [isConnected, socket, selectedLinkAccount]);

  useEffect(() => {
    if (isConnected && socket) {
      socket.on("RELOAD_SPOT_BALANCE", (data) => {
        setChange(prev=> !prev)
      });
    }
  }, [isConnected, socket, setChange]);


  return (
    <Layout>
      <Box sx={{ paddingTop: "22px" }}>
        <Box sx={{ padding: downLg ? 1 : "24px" }}>
          <Typography variant="h6" gutterBottom>
            Kênh Telegram
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
                      placeholder="Tìm kiếm kênh..."
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
                        {filteredData.map((item, index) => (
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
                              primary={item.name}
                              secondary={
                                <Box
                                  sx={{ display: "flex", alignItems: "center" }}
                                >
                                  <Box display="flex" alignItems={"center"}>
                                    <Typography fontSize={12}>
                                      Tỉ lệ thắng:&nbsp;
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
                                      Chuỗi thắng / thua:&nbsp;
                                    </Typography>
                                    <Typography
                                      fontWeight={600}
                                      fontSize={12}
                                      color={
                                       "success.main"
                                      }
                                    >
                                      {item?.longest_win_streak}
                                    </Typography>
                                    <Typography fontSize={12}>/</Typography>
                                    <Typography
                                      fontWeight={600}
                                      fontSize={12}
                                      color={"error.main"}
                                    >
                                      {item?.longest_lose_streak}
                                    </Typography>
                                  </Box>
                                </Box>
                              }
                            />
                          </ListItem>
                        ))}
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
                        maxHeight: "calc(-300px - 32px - 32px - 12px + 100vh)",
                      }}
                    >
                      <Typography variant="body1" sx={{ display: "flex" }}>
                        Hãy đặt lệnh :{" "}
                        <Typography mb={1} fontWeight={600} sx={{ color:transactions?.messages?.[0]?.message?.betType=== "UP" ?  "success.main" : "error.main" }}>
                          {formatCurrency(transactions?.messages?.[0]?.message?.betAmount)} {transactions?.messages?.[0]?.message?.betType=== "UP" ? "Tăng" : "Giảm"} 
                        </Typography>
                      </Typography>
                      <Typography variant="body1">
                        🎉 Tổng hợp{" "}
                        {transactions?.messages?.[1]?.message?.histories
                          ?.length || 0}{" "}
                        phiên giao dịch gần nhất (UTC+7):
                      </Typography>
                      <List>
                        {sortData(transactions?.messages?.[1]?.message?.histories, "time", "desc")?.map(
                          (transaction, index) => (
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
                                {transaction?.result === "WIN" ? "💚" : "🔥"}
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
                          )
                        )}
                      </List>
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
                    placeholder="Tìm kiếm kênh..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                </Box>
                {filteredData?.map((item, index) => (
                  <Accordion
                    onClick={() => {
                      setSelectedBot(item);
                    }}
                    key={item.id}
                    expanded={expanded === `panel${index}`}
                    onChange={handleChange(`panel${index}`)}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls={`panel${index}a-content`}
                      id={`panel${index}a-header`}
                    >
                      <ListItemText
                        primary={item.name}
                        secondary={
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Box display="flex" alignItems={"center"}>
                              <Typography fontSize={12}>
                                Tỉ lệ thắng:&nbsp;
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
                                Chuỗi thắng / thua:&nbsp;
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
                            {transactions?.messages?.[1]?.message?.histories
                              ?.length || 0}{" "}
                            phiên giao dịch gần nhất (UTC+7):
                          </Typography>
                          <List>
                            {sortData(transactions?.messages?.[1]?.message?.histories, "time", "desc")?.map(
                              (transaction, index) => (
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
                              )
                            )}
                          </List>
                        </Box>
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Box>
            )}
            <Box position="absolute" bottom={16} right={16}>
              {openTrade === true && (
                <Box
                  borderRadius={"10px"}
                  boxShadow={3}
                  border={`1px solid ${theme.palette.border}`}
                  overflow={"hidden"}
                >
                  <Box position={"relative"} overflow={"hidden"}>
                    <Card>
                      <Box p={2}>
                        <Box display={"flex"} gap={1} mb={2}>
                          <Box>
                            <Typography
                              variant="body2"
                              fontSize={12}
                              fontWeight={600}
                            >
                              Số tiền vào lệnh
                            </Typography>
                            <TextField
                              sx={{ width: 120 }}
                              className={classes.input}
                              variant="outlined"
                              fullWidth
                              prefix="$"
                              size="small"
                              defaultValue={1}
                              onChange={(e) => setBetAmount(e.target.value)}
                              type="number"
                              error={isErrorBetAmount ? true : false}
                              helperText={
                                isErrorBetAmount ? (
                                  <Typography fontSize={8}>
                                    Không thể nhập giá trị lớn hơn 1.000.000 và
                                    nhỏ hơn 0
                                  </Typography>
                                ) : (
                                  ""
                                )
                              }
                            />
                          </Box>
                          <Box>
                            <Typography
                              variant="body2"
                              fontSize={12}
                              fontWeight={600}
                            >
                              Hệ số nhân
                            </Typography>
                            <Box
                              display="flex"
                              justifyContent="space-between"
                              alignItems="start"
                              gap={1}
                            >
                              <Button
                                onClick={() => {
                                  setMultiplier(1);
                                }}
                                className={classes.button}
                                variant={
                                  multiplier === 1 ? "contained" : "outlined"
                                }
                              >
                                1x
                              </Button>
                              <Button
                                onClick={() => {
                                  setMultiplier(2);
                                }}
                                className={classes.button}
                                variant={
                                  multiplier === 2 ? "contained" : "outlined"
                                }
                              >
                                2x
                              </Button>
                              <TextField
                                onChange={(e) => {
                                  setMultiplier(parseFloat(e.target.value));
                                }}
                                type="number"
                                placeholder="Khác"
                                sx={{ width: 60 }}
                                className={classes.input}
                                variant="outlined"
                              >
                                Khác
                              </TextField>
                            </Box>
                          </Box>
                        </Box>
                        <Divider />
                        <Box
                          mt={2}
                          display="flex"
                          justifyContent="space-between"
                          gap={1}
                        >
                          <Button
                            disabled={isDisableButtonTrade}
                            fullWidth
                            variant="contained"
                            color="error"
                            onClick={() => {
                              handleSubmit("DOWN");
                            }}
                          >
                            Down
                          </Button>
                          <Button fullWidth variant="contained" color="primary">
                            {countDown}s
                          </Button>
                          <Button
                            disabled={isDisableButtonTrade}
                            onClick={() => {
                              handleSubmit("UP");
                            }}
                            fullWidth
                            variant="contained"
                            color="success"
                          >
                            Up
                          </Button>
                        </Box>
                      </Box>
                    </Card>
                    <Box
                      position={"absolute"}
                      sx={{
                        background:
                          "linear-gradient(154.83deg,#03c768 15.98%,#0062ff 85.83%)",
                        fontSize: 9,
                        height: 20,
                        lineHeight: 2,
                        right: -30,
                        textAlign: "center",
                        textTransform: "uppercase",
                        top: 10,
                        transform: "rotate(45deg)",
                        width: 90,
                        borderRadius: "12px",
                        fontWeight: 600,
                        minWidth: 70,
                        overflow: "hidden",
                        padding: "0 6px",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        color: "white",
                      }}
                    >
                      {walletMode ? "LIVE" : "DEMO"}
                    </Box>
                  </Box>
                </Box>
              )}
              <Box mt={2}>
                <Box sx={{ width: "100%", direction: "rtl" }}>
                  <Box sx={{ cursor: "pointer" }}>
                    {openTrade === false && (
                      <Toggle
                        width={"2.5rem"}
                        height={"2.5rem"}
                        style={{ width: 48, height: 48 }}
                        onClick={() => setOpenTrade((prev) => !prev)}
                      />
                    )}
                    {openTrade === true && (
                      <CloseIcon
                        width={"2.5rem"}
                        height={"2.5rem"}
                        style={{ width: 48, height: 48 }}
                        onClick={() => setOpenTrade((prev) => !prev)}
                      />
                    )}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default TelegramChannelSignalStrategy;
