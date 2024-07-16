import React, { useContext, useEffect, useState } from "react";
import {
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  TextField,
  MenuItem,
  Select,
  // InputLabel,
  FormControl,
  Switch,
  FormControlLabel,
  useTheme,
  useMediaQuery,
  Accordion,
  AccordionSummary,
  Checkbox,
  ListItemText,
  Chip,
  Grid,
  Alert,
  FormGroup,
  Tabs,
  Tab,
  Paper,
  Container,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { MuiChipsInput } from "mui-chips-input";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import budgetStrategyApi from "api/budget-strategy/budgetStrategyApi";
import signalStrategyApi from "api/singal-strategy/signalStrategyApi";
import {
  SignalFeatureTypes,
  SignalFeatureTypesTitle,
} from "type/SignalFeatureTypes";
import { JwtContext } from "contexts/jwtContext";
import { AutoTypes, AutoTypesTitle } from "type/AutoTypes";
import { SettingsContext } from "contexts/settingsContext";
import portfolioApi from "api/portfolios/portfolioApi";
import { showToast } from "components/toast/toast";
import { useInView } from "react-intersection-observer";

const NewPlanDrawer = ({
  open,
  handleClose,
  isEdit,
  selectedPlan,
  setData,
  dataProps,
  setIsEdit,
}) => {
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
  });
  const [idPlan, setIdPlan] = useState();
  const { decodedData } = useContext(JwtContext);
  const { walletMode } = useContext(SettingsContext);
  const [step, setStep] = useState(1);
  const downLg = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  const theme = useTheme();
  const [planName, setPlanName] = useState("");
  const [autoType, setAutoType] = useState(AutoTypes.BOT);
  const [investmentFund, setInvestmentFund] = useState(100);
  const [betSecond, setBetSecond] = useState(1);
  const [baseAmount, setBaseAmount] = useState(1);
  const [isBrokerMode, setIsBrokerMode] = useState(false);
  const [budgetStrategy, setBudgetStrategy] = useState("");
  const [signalStrategy, setSignalStrategy] = useState("");
  const [arraySignalStrategy, setArraySignalStrategy] = useState([]);
  const [takeProfit, setTakeProfit] = useState(false);
  const [selectedTab, setSelectedTab] = useState("Bot AI");
  const [leaderUserName, setLeaderUserName] = useState([]);
  const [privateMode, setPrivateMode] = useState(false);
  const [reserveSignal, setReserveSignal] = useState(false);

  const [featureType, setFeatureType] = useState(
    SignalFeatureTypes.SINGLE_METHOD
  ); // signal feature
  const [expanded, setExpanded] = useState(true);
  const [dataBudgetStrategy, setDataBudgetStrategy] = useState([]);
  const [dataSignalStrategy, setDataSignalStrategy] = useState([]);
  const [
    dataSignalStrategyTelegramSignal,
    setDataSignalStrategyTelegramSignal,
  ] = useState([]);
  const [isChooseBot, setIsChooseBot] = useState(false);
  const [takeProfitTarget, setTakeProfitTarget] = useState(0);
  const [stopLossTarget, setStopLossTarget] = useState(0);
  const [winStreakTarget, setWinStreakTarget] = useState(0);
  const [loseStreakTarget, setLoseStreakTarget] = useState(0);
  const [winTotalTarget, setWinTotalTarget] = useState(0);
  const [loseTotalTarget, setLoseTotalTarget] = useState(0);
  const [telegramToken, setTelegramToken] = useState("");
  const [telegramChatId, setTelegramChatId] = useState("");
  const [telegramUrl, setTelegramUrl] = useState("");
  const [winningTotalReach, setWinningTotalReach] = useState(0);
  const [loseTotalReach, setLoseTotalReach] = useState(0);
  const [winningContinue, setWinningContinue] = useState(0);
  const [loseContinue, setLoseContinue] = useState(0);
  const [whenProfit, setWhenProfit] = useState(0);
  const [whenLosing, setWhenLosing] = useState(0);
  // const [selectedTab, setSelectedTab] = useState(0);
  const isDisableButton = planName?.length <= 0;
  const [selectedTab1, setSelectedTab1] = useState(0);
  const [shuffleMethodsOrder, setShuffleMethodsOrder] = useState(false);
  const [noRepeatMethodsNextTurn, setNoRepeatMethodsNextTurn] = useState(false);
  const [winEnabled, setWinEnabled] = useState();
  const [winReverseSignal, setWinReverseSignal] = useState();
  const [winEndWinStreak, setWinEndWinStreak] = useState();
  const [winExactlyWinStreak, setWinExactlyWinStreak] = useState(0);
  const [winStreakEntryTarget, setWinStreakEntryTarget] = useState(0);
  const [winTurnCount, setWinTurnCount] = useState(0);
  const [winChangeMethodAfterLoseStreak, setWinChangeMethodAfterLoseStreak] =
    useState(0);
  const [winChangeMethodAfterWinStreak, setWinChangeMethodAfterWinStreak] =
    useState(0);
  const [loseEnabled, setLoseEnabled] = useState(false);
  const [loseReverseSignal, setLoseReverseSignal] = useState(false);
  const [loseEndLoseStreak, setLoseEndLoseStreak] = useState(0);
  const [loseExactlyLoseStreak, setLoseExactlyLoseStreak] = useState(0);
  const [loseStreakEntryTarget, setLoseStreakEntryTarget] = useState(0);
  const [loseTurnCount, setLoseTurnCount] = useState(0);
  const [loseChangeMethodAfterLoseStreak, setLoseChangeMethodAfterLoseStreak] =
    useState(0);
  const [loseChangeMethodAfterWinStreak, setLoseChangeMethodAfterWinStreak] =
    useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab1(newValue);
  };

  const handleIncrement = (setFunc, value) => setFunc(value + 1);
  const handleDecrement = (setFunc, value) =>
    setFunc(value > 0 ? value - 1 : 0);

  const handleStep = (step) => {
    setStep(step);
  };

  // sao ko dùng formik cho nhàn . đù mé nhìn loạn thật, e cung k quen dung formik a
  const onClose = () => {
    handleClose();
    setStep(1);
  };

  const handleAccordionChange = () => {
    setExpanded(!expanded);
  };

  const handleConfirmAndSave = async () => {
    try {
      let response;
      let data;
      // switch(selectedTab)
      if (selectedTab === "Follow Leader") {
        data = {
          autoType: autoType,
          name: planName,
          accountType: walletMode ? "LIVE" : "DEMO",
          budgetStrategyId: budgetStrategy,
          bet_second: betSecond,
          margin_dense: baseAmount,
          isBrokerMode: isBrokerMode,
          isNotificationsEnabled: true,
          method_data: {
            method_list: arraySignalStrategy,
            feature_data: {},
          },
          take_profit_target: takeProfitTarget,
          stop_loss_target: stopLossTarget,
          win_streak_target: winStreakTarget,
          lose_streak_target: loseStreakTarget,
          win_total_target: winTotalTarget,
          lose_total_target: loseTotalTarget,
          budget_amount: investmentFund,
          telegram_token: telegramToken,
          telegram_chatId: telegramChatId,
          telegram_url: telegramUrl,
          isPrivate: privateMode,
          is_reverse: reserveSignal,
          signal_feature: featureType,
          enabled_tpsl: takeProfit,
        };
      } else {
        switch (featureType) {
          case SignalFeatureTypes.SINGLE_METHOD:
            data = {
              autoType: autoType,
              name: planName,
              accountType: walletMode ? "LIVE" : "DEMO",
              budgetStrategyId: budgetStrategy,
              bet_second: betSecond,
              margin_dense: baseAmount,
              isBrokerMode: isBrokerMode,
              isNotificationsEnabled: true,
              method_data: {
                method_list: [signalStrategy],
                feature_data: {},
              },
              take_profit_target: takeProfitTarget,
              stop_loss_target: stopLossTarget,
              win_streak_target: winStreakTarget,
              lose_streak_target: loseStreakTarget,
              win_total_target: winTotalTarget,
              lose_total_target: loseTotalTarget,
              budget_amount: investmentFund,
              telegram_token: telegramToken,
              telegram_chatId: telegramChatId,
              telegram_url: telegramUrl,
              isPrivate: privateMode,
              is_reverse: reserveSignal,
              signal_feature: featureType,
              enabled_tpsl: takeProfit,
            };

            break;
          case SignalFeatureTypes.MIX_METHODS:
            data = {
              autoType: autoType,
              name: planName,
              accountType: walletMode ? "LIVE" : "DEMO",
              budgetStrategyId: budgetStrategy,
              bet_second: betSecond,
              margin_dense: baseAmount,
              isBrokerMode: isBrokerMode,
              isNotificationsEnabled: true,
              method_data: {
                method_list: arraySignalStrategy,
                feature_data: {},
              },
              take_profit_target: takeProfitTarget,
              stop_loss_target: stopLossTarget,
              win_streak_target: winStreakTarget,
              lose_streak_target: loseStreakTarget,
              win_total_target: winTotalTarget,
              lose_total_target: loseTotalTarget,
              budget_amount: investmentFund,
              telegram_token: telegramToken,
              telegram_url: telegramUrl,
              telegram_chatId: telegramChatId,
              isPrivate: privateMode,
              is_reverse: reserveSignal,
              signal_feature: featureType,
              enabled_tpsl: takeProfit,
            };
            break;
          case SignalFeatureTypes.AUTO_CHANGE_METHODS:
            data = {
              autoType: autoType,
              name: planName,
              accountType: walletMode ? "LIVE" : "DEMO",
              budgetStrategyId: budgetStrategy,
              bet_second: betSecond,
              margin_dense: baseAmount,
              isBrokerMode: isBrokerMode,
              isNotificationsEnabled: true,
              method_data: {
                method_list: arraySignalStrategy,
                feature_data: {
                  win_streak_target: winningTotalReach,
                  lose_streak_target: loseTotalReach,
                  win_total_target: winningContinue,
                  lose_total_target: loseContinue,
                  take_profit_target: whenProfit,
                  stop_loss_target: whenLosing,
                },
              },
              take_profit_target: takeProfitTarget,
              stop_loss_target: stopLossTarget,
              win_streak_target: winStreakTarget,
              lose_streak_target: loseStreakTarget,
              win_total_target: winTotalTarget,
              lose_total_target: loseTotalTarget,
              budget_amount: investmentFund,
              telegram_token: telegramToken,
              telegram_chatId: telegramChatId,
              telegram_url: telegramUrl,
              isPrivate: privateMode,
              is_reverse: reserveSignal,
              signal_feature: featureType,
              enabled_tpsl: takeProfit,
            };
            break;
          case SignalFeatureTypes.WAIT_SIGNALS:
            data = {
              autoType: autoType,
              name: planName,
              accountType: walletMode ? "LIVE" : "DEMO",
              budgetStrategyId: budgetStrategy,
              bet_second: betSecond,
              margin_dense: baseAmount,
              isBrokerMode: isBrokerMode,
              isNotificationsEnabled: true,
              method_data: {
                method_list: arraySignalStrategy,
                feature_data: {
                  shuffle_methods_order: shuffleMethodsOrder,
                  no_repeat_methods_next_turn: noRepeatMethodsNextTurn,
                  win_enabled: winEnabled,
                  win_reverse_signal: winReverseSignal,
                  win_end_win_streak: winEndWinStreak,
                  win_exactly_win_streak: winExactlyWinStreak,
                  win_streak_entry_target: winStreakEntryTarget,
                  win_turn_count: winTurnCount,
                  win_change_method_after_lose_streak:
                    winChangeMethodAfterLoseStreak,
                  win_change_method_after_win_streak:
                    winChangeMethodAfterWinStreak,

                  lose_enabled: loseEnabled,
                  lose_reverse_signal: loseReverseSignal,
                  lose_end_lose_streak: loseEndLoseStreak,
                  lose_exactly_lose_streak: loseExactlyLoseStreak,
                  lose_streak_entry_target: loseStreakEntryTarget,
                  lose_turn_count: loseTurnCount,
                  lose_change_method_after_lose_streak:
                    loseChangeMethodAfterLoseStreak,
                  lose_change_method_after_win_streak:
                    loseChangeMethodAfterWinStreak,
                },
              },
              take_profit_target: takeProfitTarget,
              stop_loss_target: stopLossTarget,
              win_streak_target: winStreakTarget,
              lose_streak_target: loseStreakTarget,
              win_total_target: winTotalTarget,
              lose_total_target: loseTotalTarget,
              budget_amount: investmentFund,
              telegram_token: telegramToken,
              telegram_chatId: telegramChatId,
              telegram_url: telegramUrl,
              isPrivate: privateMode,
              is_reverse: reserveSignal,
              signal_feature: featureType,
              enabled_tpsl: takeProfit,
            };
            break;

          default:
            break;
        }
      }
      if (isEdit === true) {
        data = { ...selectedPlan, ...data };
        response = await portfolioApi.userBotUpdate(idPlan, data);
      } else {
        response = await portfolioApi.usersBotCreate(data);
      }
      if (response?.data?.ok === true) {
        if (isEdit === true) {
          let dataTemp = dataProps;
          const indexData = dataTemp?.findIndex(
            (item) => item?._id === selectedPlan?._id
          );
          dataTemp[indexData] = data;
          setData(dataTemp);
        } else {
          setData((prev) => [response?.data?.d, ...prev]);
        }
        showToast(
          isEdit ? "Cập nhật bot thành công" : "Tạo bot thành công",
          "success"
        );
        setIsEdit(false)
        onClose();
      } else {
        showToast(response?.data?.m);
      }
    } catch (error) {
      console.log(error);
      showToast(error?.response?.data?.m);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const response1 = await budgetStrategyApi.userBudgetStrategyList();
        const response2 = await signalStrategyApi.userBudgetSignalList();
        const response3 = await signalStrategyApi.userBudgetTelegramSignal();
        if (response1?.data?.ok === true) {
          setBudgetStrategy(response1?.data?.d?.[0]?._id);
          setDataBudgetStrategy(response1?.data?.d);
        }
        if (response2?.data?.ok === true) {
          setSignalStrategy(response2?.data?.d?.[0]?._id);
          setDataSignalStrategy(response2?.data?.d);
        }
        if (response3?.data?.ok === true) {
          setSignalStrategy(response2?.data?.d?.[0]?._id);
          setDataSignalStrategyTelegramSignal(response3?.data?.d);
        }
      } catch (error) {}
    })();
  }, []);

  useEffect(() => {
    if (selectedTab === "Telegram Signal") {
      // s
    }
  }, [selectedTab]);

  useEffect(() => {
    if (decodedData) {
      if (decodedData?.data?.levelStaff > 0) {
        setIsChooseBot(true);
      }
    }
  }, [decodedData]);

  useEffect(() => {
    if (isEdit === true) {
      setIdPlan(selectedPlan?._id);
      setPlanName(selectedPlan?.name);
      setInvestmentFund(selectedPlan?.budget_amount);
      setBetSecond(selectedPlan?.bet_second);
      setAutoType(selectedPlan?.autoType);
      setSelectedTab(selectedPlan?.autoType === 1 ? "Follow Leader" : "Bot AI");
      setFeatureType(selectedPlan?.signal_feature);
      setBudgetStrategy(selectedPlan?.budgetStrategyId);
      setBaseAmount(selectedPlan?.margin_dense);
      setTakeProfit(selectedPlan?.enabled_tpsl);
      setIsBrokerMode(selectedPlan?.isBrokerMode);
      setPrivateMode(selectedPlan?.isPrivate);
      setReserveSignal(selectedPlan?.is_reverse);
      setArraySignalStrategy(selectedPlan?.method_data?.method_list);
      setShuffleMethodsOrder(
        selectedPlan?.method_data?.feature_data?.shuffle_methods_order
      );
      setNoRepeatMethodsNextTurn(
        selectedPlan?.method_data?.feature_data?.no_repeat_methods_next_turn
      );
      setWinEnabled(selectedPlan?.method_data?.feature_data?.win_enabled);
      setWinReverseSignal(
        selectedPlan?.method_data?.feature_data?.win_reverse_signal
      );
      setWinEndWinStreak(
        selectedPlan?.method_data?.feature_data?.win_end_win_streak
      );
      setWinExactlyWinStreak(
        selectedPlan?.method_data?.feature_data?.win_exactly_win_streak
      );
      setWinStreakEntryTarget(
        selectedPlan?.method_data?.feature_data?.win_streak_entry_target
      );
      setWinTurnCount(selectedPlan?.method_data?.feature_data?.win_turn_count);
      setWinChangeMethodAfterWinStreak(
        selectedPlan?.method_data?.feature_data
          ?.win_change_method_after_win_streak
      );
      setWinChangeMethodAfterLoseStreak(
        selectedPlan?.method_data?.feature_data
          ?.win_change_method_after_lose_streak
      );

      setLoseEnabled(selectedPlan?.method_data?.feature_data?.lose_enabled);
      setLoseReverseSignal(
        selectedPlan?.method_data?.feature_data?.lose_reverse_signal
      );
      setLoseEndLoseStreak(
        selectedPlan?.method_data?.feature_data?.lose_end_lose_streak
      );
      setLoseExactlyLoseStreak(
        selectedPlan?.method_data?.feature_data?.lose_exactly_lose_streak
      );
      setLoseStreakEntryTarget(
        selectedPlan?.method_data?.feature_data?.lose_streak_entry_target
      );
      setLoseTurnCount(
        selectedPlan?.method_data?.feature_data?.lose_turn_count
      );
      setLoseChangeMethodAfterLoseStreak(
        selectedPlan?.method_data?.feature_data
          ?.lose_change_method_after_lose_streak
      );
      setLoseChangeMethodAfterWinStreak(
        selectedPlan?.method_data?.feature_data
          ?.lose_change_method_after_win_streak
      );
      setTelegramToken(selectedPlan?.telegram_token);
      setTelegramChatId(selectedPlan?.telegram_chatId);
      setTelegramUrl(selectedPlan?.telegram_url);
    } else {
      setIdPlan();
      setPlanName("");
      setInvestmentFund(100);
      setBetSecond(1);
      setAutoType(AutoTypes.BOT);
      setSelectedTab("Bot AI");
      setFeatureType(SignalFeatureTypes.SINGLE_METHOD);
      setBudgetStrategy(dataBudgetStrategy?.[0]?._id);
      setBaseAmount(1);
      setTakeProfit(false);
      setIsBrokerMode(false);
      setPrivateMode(false);
      setReserveSignal(false);
      setArraySignalStrategy([]);
      setShuffleMethodsOrder(false);
      setNoRepeatMethodsNextTurn(false);
      setWinEnabled(false);
      setWinReverseSignal(false);
      setWinEndWinStreak(false);
      setWinExactlyWinStreak(false);
      setWinStreakEntryTarget(0);
      setWinTurnCount(0);
      setWinChangeMethodAfterWinStreak(0);
      setWinChangeMethodAfterLoseStreak(0);

      setLoseEnabled(false);
      setLoseReverseSignal(false);
      setLoseEndLoseStreak(false);
      setLoseExactlyLoseStreak(false);
      setLoseStreakEntryTarget(0);
      setLoseTurnCount(0);
      setLoseChangeMethodAfterLoseStreak(0);
      setLoseChangeMethodAfterWinStreak(0);
      setTelegramChatId("");
      setTelegramToken("");
      setTelegramUrl("");
      // e dang lam a co gi khong a xem ti
      // a oi ba cai sau thi chua co api ha a, lam 3 cai la stop start va remove thoi e oke a
    }
  }, [isEdit, selectedPlan, dataBudgetStrategy]);

  useEffect(() => {
    if (inView === false) {
      setIsEdit(false);
    }
  }, [inView, setIsEdit]);

  return (
    <Drawer
      anchor={downLg ? "bottom" : "right"}
      open={open}
      onClose={onClose}
      sx={{ zIndex: "" }}
    >
      <Box
        ref={ref}
        width={downLg ? "100%" : 850}
        p={downLg ? 2 : 3}
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        height={downLg ? "70vh" : "100%"}
        sx={{ overflowY: "scroll" }}
      >
        {step === 1 && (
          <>
            <div>
              <AppBar position="static" color="default">
                <Toolbar>
                  <Typography
                    variant="h6"
                    style={{
                      flexGrow: 1,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    Step 1: Plan profile
                    <Typography
                      color={
                        walletMode ? theme.palette.success.main : "primary"
                      }
                      variant="body1"
                      fontWeight={600}
                      style={{ flexGrow: 1, marginLeft: "8px" }}
                    >
                      {walletMode ? "Live" : "Demo"}
                    </Typography>
                  </Typography>
                  <IconButton edge="end" color="inherit" onClick={onClose}>
                    <CloseIcon />
                  </IconButton>
                </Toolbar>
              </AppBar>

              <Box mt={1}>
                <Typography variant="subtitle1">Plan name</Typography>
                <TextField
                  fullWidth
                  placeholder="Enter plan name..."
                  required
                  margin="normal"
                  value={planName}
                  onChange={(e) => setPlanName(e.target.value)}
                />
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    flexDirection: downLg ? "column" : "row",
                  }}
                >
                  <Box
                    sx={{ width: "100%" }}
                    display="flex"
                    alignItems="center"
                  >
                    <Typography variant="subtitle1">Investment fund</Typography>
                    <Box ml={2} display="flex" alignItems="center">
                      <Button
                        variant="contained"
                        onClick={() =>
                          handleDecrement(setInvestmentFund, investmentFund)
                        }
                        style={{ minWidth: 30, padding: 5 }}
                      >
                        -
                      </Button>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          padding: "0 5px",
                        }}
                      >
                        <Typography>$</Typography>
                        <TextField
                          value={investmentFund}
                          onChange={(e) => {
                            setInvestmentFund(parseFloat(e.target.value) || 0);
                          }}
                          inputProps={{
                            min: 0,
                            style: {
                              padding: 5,
                            },
                          }}
                          InputProps={{
                            disableUnderline: true,
                          }}
                          style={{
                            width: 50,
                            margin: "0 4px",
                            textAlign: "center",
                            border: "none",
                            outline: "none",
                          }}
                          sx={{
                            "& fieldset": { border: "none", outline: "none" },
                          }}
                        />
                      </Box>
                      <Button
                        variant="contained"
                        onClick={() =>
                          handleIncrement(setInvestmentFund, investmentFund)
                        }
                        style={{ minWidth: 30, padding: 5 }}
                      >
                        +
                      </Button>
                    </Box>
                  </Box>
                  <Box
                    sx={{ width: "100%" }}
                    display="flex"
                    alignItems="center"
                    mt={2}
                  >
                    <Typography variant="subtitle1">
                      Thời gian vào lệnh
                    </Typography>
                    <Box ml={2} display="flex" alignItems="center">
                      <Button
                        variant="contained"
                        onClick={() => handleDecrement(setBetSecond, betSecond)}
                        style={{ minWidth: 30, padding: 5 }}
                      >
                        -
                      </Button>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          padding: "0 5px",
                        }}
                      >
                        <TextField
                          value={betSecond}
                          onChange={(e) => {
                            setBetSecond(parseFloat(e.target.value) || 0);
                          }}
                          inputProps={{
                            min: 0,
                            style: {
                              padding: 5,
                            },
                          }}
                          InputProps={{
                            disableUnderline: true,
                          }}
                          style={{
                            width: 50,
                            margin: "0 4px",
                            textAlign: "center",
                            border: "none",
                            outline: "none",
                          }}
                          sx={{
                            "& fieldset": { border: "none", outline: "none" },
                          }}
                        />
                      </Box>
                      <Button
                        variant="contained"
                        onClick={() => handleIncrement(setBetSecond, betSecond)}
                        style={{ minWidth: 30, padding: 5 }}
                      >
                        +
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Box>

              <Box mt={1}>
                <AppBar position="static" color="default">
                  <Toolbar>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                      Step 2: Set up your plan
                    </Typography>
                  </Toolbar>
                </AppBar>
                {!isEdit && (
                  <Box display="flex" mt={2}>
                    {["Bot AI", "Follow Leader", "Telegram Signal"].map(
                      (tab) => (
                        <Button
                          key={tab}
                          variant={
                            selectedTab === tab ? "contained" : "outlined"
                          }
                          color={selectedTab === tab ? "primary" : "secondary"}
                          style={{ marginRight: 8 }}
                          onClick={() => {
                            setSelectedTab(tab);
                            setAutoType(tab === "Follow Leader" ? 1 : 0);
                            setArraySignalStrategy([]);
                          }}
                        >
                          {tab}
                        </Button>
                      )
                    )}
                  </Box>
                )}
              </Box>
              <Box
                className="aslawkalw"
                sx={{ display: "flex", alignItems: "start", gap: 1 }}
              >
                {(selectedTab === "Bot AI" ||
                  selectedTab === "Telegram Signal") && (
                  <Box sx={{ width: "100%" }} mt={2}>
                    <Typography variant="subtitle1">
                      Tính năng sử dụng
                    </Typography>
                    <FormControl variant="outlined" fullWidth margin="normal">
                      <Select
                        value={featureType}
                        onChange={(e) => setFeatureType(e.target.value)}
                        size="medium"
                      >
                        {Object.entries(SignalFeatureTypes).map(
                          ([item, key]) => {
                            if (
                              selectedTab === "Bot AI" &&
                              SignalFeatureTypes[item] ===
                                SignalFeatureTypes.WAIT_SIGNALS
                            ) {
                              return <></>;
                            } else {
                              return (
                                <MenuItem key={key} value={item}>
                                  {SignalFeatureTypesTitle[item]}
                                </MenuItem>
                              );
                            }
                          }
                        )}
                      </Select>
                    </FormControl>
                  </Box>
                )}
                <Box sx={{ width: "100%" }} mt={2}>
                  <Typography variant="subtitle1">Set base amount</Typography>
                  <Box mt={2} display="flex" alignItems="center" height={56}>
                    <Button
                      variant="contained"
                      onClick={() => handleDecrement(setBaseAmount, baseAmount)}
                      style={{ minWidth: 30, padding: 5 }}
                    >
                      -
                    </Button>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        padding: "0 5px",
                      }}
                    >
                      <Typography>$</Typography>
                      <TextField
                        value={baseAmount}
                        onChange={(e) => {
                          setBaseAmount(parseFloat(e.target.value) || 0);
                        }}
                        inputProps={{
                          min: 0,
                          style: {
                            padding: 5,
                          },
                        }}
                        InputProps={{
                          disableUnderline: true,
                        }}
                        style={{
                          width: 50,
                          margin: "0 4px",
                          textAlign: "center",
                          border: "none",
                          outline: "none",
                        }}
                        sx={{
                          "& fieldset": { border: "none", outline: "none" },
                        }}
                      />
                    </Box>
                    <Button
                      variant="contained"
                      onClick={() => handleIncrement(setBaseAmount, baseAmount)}
                      style={{ minWidth: 30, padding: 5 }}
                    >
                      +
                    </Button>
                  </Box>
                </Box>
              </Box>
              {/*  */}
              {isChooseBot === true && selectedTab === "Bot AI" && (
                <>
                  {" "}
                  <Box mt={1}>
                    <Typography variant="subtitle1">Chọn Bot</Typography>
                    <FormControl variant="outlined" fullWidth margin="normal">
                      <Select
                        value={autoType}
                        onChange={(e) => setAutoType(e.target.value)}
                        size="medium"
                      >
                        <MenuItem value={AutoTypes.BOT}>
                          {AutoTypesTitle.BOT}
                        </MenuItem>
                        <MenuItem value={AutoTypes.TELEBOT}>
                          {AutoTypesTitle.TELEBOT}
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  {autoType === AutoTypes.TELEBOT && (
                    <Box>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={4}>
                          <TextField
                            fullWidth
                            label="Telegram token"
                            variant="outlined"
                            value={telegramToken}
                            onChange={(e) => setTelegramToken(e.target.value)}
                            margin="normal"
                          />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <TextField
                            fullWidth
                            label="Telegram chatid"
                            variant="outlined"
                            value={telegramChatId}
                            onChange={(e) => setTelegramChatId(e.target.value)}
                            margin="normal"
                          />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <TextField
                            fullWidth
                            label="Telegram url"
                            variant="outlined"
                            value={telegramUrl}
                            onChange={(e) => setTelegramUrl(e.target.value)}
                            margin="normal"
                          />
                        </Grid>
                      </Grid>
                    </Box>
                  )}
                </>
              )}
              {/*  */}
              <Box
                className="asklawa"
                sx={{ display: "flex", gap: 1, alignItems: "center" }}
                // mt={1}
              >
                {(selectedTab === "Bot AI" ||
                  selectedTab === "Telegram Signal") && (
                  <Box sx={{ width: "100%" }} fullWidth>
                    <Typography variant="subtitle1">
                      Budget strategy*
                    </Typography>
                    <FormControl variant="outlined" fullWidth margin="normal">
                      <Select
                        value={budgetStrategy}
                        onChange={(e) => setBudgetStrategy(e.target.value)}
                        size="medium"
                      >
                        {dataBudgetStrategy?.map((item, key) => (
                          <MenuItem key={key} value={item?._id}>
                            {item?.name}
                          </MenuItem>
                        ))}
                        {/* Thêm các tùy chọn khác nếu cần */}
                      </Select>
                    </FormControl>
                  </Box>
                )}
                <Box sx={{ width: "100%" }}>
                  <Typography variant="subtitle1">
                    {selectedTab === "Bot AI" && "Signal*"}
                    {selectedTab === "Follow Leader" && "Leader username*"}
                    {selectedTab === "Telegram Signal" && "Signal*"}
                  </Typography>
                  {selectedTab === "Bot AI" && (
                    <FormControl variant="outlined" fullWidth margin="normal">
                      {featureType === SignalFeatureTypes.SINGLE_METHOD ? (
                        <>
                          <Select
                            value={signalStrategy}
                            onChange={(e) => setSignalStrategy(e.target.value)}
                            size="medium"
                          >
                            {dataSignalStrategy?.map((item, key) => (
                              <MenuItem key={key} value={item?._id}>
                                {item?.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </>
                      ) : (
                        <>
                          <Select
                            multiple
                            value={arraySignalStrategy}
                            onChange={(e) =>
                              setArraySignalStrategy(e.target.value)
                            }
                            size="medium"
                            renderValue={(selected) => (
                              <Box
                                sx={{
                                  display: "flex",
                                  flexWrap: "wrap",
                                  gap: 0.5,
                                }}
                              >
                                {selected.map((value) => (
                                  <Chip
                                    key={value}
                                    label={
                                      dataSignalStrategy.find(
                                        (item) => item._id === value
                                      )?.name
                                    }
                                  />
                                ))}
                              </Box>
                            )}
                          >
                            {dataSignalStrategy?.map((item, key) => (
                              <MenuItem key={key} value={item?._id}>
                                <Checkbox
                                  checked={
                                    arraySignalStrategy.indexOf(item._id) > -1
                                  }
                                />
                                <ListItemText primary={item.name} />
                              </MenuItem>
                            ))}
                          </Select>
                        </>
                      )}
                    </FormControl>
                  )}
                  {/*  */}
                  {selectedTab === "Follow Leader" && (
                    <Box sx={{ width: "100%" }} mt={2}>
                      <MuiChipsInput
                        value={arraySignalStrategy}
                        onChange={(value) => setArraySignalStrategy(value)}
                        placeholder="Nhấn enter để thêm"
                        sx={{ width: "100%" }}
                        size={"medium"}
                      />
                    </Box>
                  )}
                  {/*  */}
                  {selectedTab === "Telegram Signal" && (
                    <Box sx={{ width: "100%" }} mt={2} mb={1}>
                      {featureType === SignalFeatureTypes.SINGLE_METHOD ? (
                        <Select
                          fullWidth
                          value={signalStrategy}
                          onChange={(e) => setSignalStrategy(e.target.value)}
                          size="medium"
                        >
                          {dataSignalStrategyTelegramSignal?.map((item, key) => (
                            <MenuItem key={key} value={item?._id}>
                              {item?.name}
                            </MenuItem>
                          ))}
                        </Select>
                      ) : (
                        <Select
                          fullWidth
                          multiple
                          value={arraySignalStrategy}
                          onChange={(e) =>
                            setArraySignalStrategy(e.target.value)
                          }
                          size="medium"
                          renderValue={(selected) => (
                            <Box
                              sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 0.5,
                              }}
                            >
                              {selected.map((value) => (
                                <Chip
                                  key={value}
                                  label={
                                    dataSignalStrategyTelegramSignal.find(
                                      (item) => item._id === value
                                    )?.name
                                  }
                                />
                              ))}
                            </Box>
                          )}
                        >
                          {dataSignalStrategyTelegramSignal?.map(
                            (item, key) => (
                              <MenuItem key={key} value={item?._id}>
                                <Checkbox
                                  checked={
                                    arraySignalStrategy.indexOf(item._id) > -1
                                  }
                                />
                                <ListItemText primary={item.name} />
                              </MenuItem>
                            )
                          )}
                        </Select>
                      )}
                    </Box>
                  )}
                </Box>
              </Box>
              <Box mt={2}>
                {featureType === SignalFeatureTypes.WAIT_SIGNALS &&
                  selectedTab === "Telegram Signal" && (
                    <>
                      <Box>
                        <Paper elevation={3} style={{ padding: "16px" }}>
                          <FormControl component="fieldset">
                            <FormGroup>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={shuffleMethodsOrder}
                                    onChange={(e) =>
                                      setShuffleMethodsOrder(e.target.checked)
                                    }
                                  />
                                }
                                label="Xáo trộn thứ tự phương pháp"
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={noRepeatMethodsNextTurn}
                                    onChange={(e) =>
                                      setNoRepeatMethodsNextTurn(
                                        e.target.checked
                                      )
                                    }
                                  />
                                }
                                label="Không lặp lại phương pháp ở lượt sau"
                              />
                            </FormGroup>

                            <Tabs
                              value={selectedTab1}
                              onChange={handleTabChange}
                              variant="fullWidth"
                            >
                              <Tab label="Win.S" />
                              <Tab label="Lose.S" />
                            </Tabs>

                            <Box hidden={selectedTab1 !== 0}>
                              <FormGroup>
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={winEnabled}
                                      onChange={(e) =>
                                        setWinEnabled(e.target.checked)
                                      }
                                    />
                                  }
                                  label="Kích hoạt Win Signal"
                                />
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={winReverseSignal}
                                      onChange={(e) =>
                                        setWinReverseSignal(e.target.checked)
                                      }
                                    />
                                  }
                                  label="Đảo lệnh"
                                />
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={winEndWinStreak}
                                      onChange={(e) =>
                                        setWinEndWinStreak(e.target.checked)
                                      }
                                    />
                                  }
                                  label="Vào lệnh khi kết thúc chuỗi thắng"
                                />
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={winExactlyWinStreak}
                                      onChange={(e) =>
                                        setWinExactlyWinStreak(e.target.checked)
                                      }
                                    />
                                  }
                                  label="Vào lệnh khi đạt chính xác lượt thắng LT"
                                />

                                <Grid container spacing={2}>
                                  <Grid item xs={12} sm={6}>
                                    <TextField
                                      fullWidth
                                      label="Vào lệnh khi lượt thắng LT đạt"
                                      variant="outlined"
                                      value={winStreakEntryTarget}
                                      onChange={(e) =>
                                        setWinStreakEntryTarget(e.target.value)
                                      }
                                      margin="normal"
                                    />
                                  </Grid>
                                  <Grid item xs={12} sm={6}>
                                    <TextField
                                      fullWidth
                                      label="Số lượt vào (1 Thắng = 1 Lượt)"
                                      variant="outlined"
                                      value={winTurnCount}
                                      onChange={(e) =>
                                        setWinTurnCount(e.target.value)
                                      }
                                      margin="normal"
                                    />
                                  </Grid>
                                  <Grid item xs={12} sm={6}>
                                    <TextField
                                      fullWidth
                                      label="Đổi phương pháp khi thua liên tiếp"
                                      variant="outlined"
                                      value={winChangeMethodAfterLoseStreak}
                                      onChange={(e) =>
                                        setWinChangeMethodAfterLoseStreak(
                                          e.target.value
                                        )
                                      }
                                      margin="normal"
                                    />
                                  </Grid>
                                  <Grid item xs={12} sm={6}>
                                    <TextField
                                      fullWidth
                                      label="Đổi phương pháp khi thắng liên tiếp"
                                      variant="outlined"
                                      value={winChangeMethodAfterWinStreak}
                                      onChange={(e) =>
                                        setWinChangeMethodAfterWinStreak(
                                          e.target.value
                                        )
                                      }
                                      margin="normal"
                                    />
                                  </Grid>
                                </Grid>
                              </FormGroup>
                            </Box>

                            <Box hidden={selectedTab1 !== 1}>
                              <FormGroup>
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={loseEnabled}
                                      onChange={(e) =>
                                        setLoseEnabled(e.target.checked)
                                      }
                                    />
                                  }
                                  label="Kích hoạt Lose Signal"
                                />
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={loseReverseSignal}
                                      onChange={(e) =>
                                        setLoseReverseSignal(e.target.checked)
                                      }
                                    />
                                  }
                                  label="Đảo lệnh"
                                />
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={loseEndLoseStreak}
                                      onChange={(e) =>
                                        setLoseEndLoseStreak(e.target.checked)
                                      }
                                    />
                                  }
                                  label="Vào lệnh khi kết thúc chuỗi thua"
                                />
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={loseExactlyLoseStreak}
                                      onChange={(e) =>
                                        setLoseExactlyLoseStreak(
                                          e.target.checked
                                        )
                                      }
                                    />
                                  }
                                  label="Vào lệnh khi đạt chính xác lượt thua LT"
                                />

                                <Grid container spacing={2}>
                                  <Grid item xs={12} sm={6}>
                                    <TextField
                                      fullWidth
                                      label="Vào lệnh khi lượt thua LT đạt"
                                      variant="outlined"
                                      value={loseStreakEntryTarget}
                                      onChange={(e) =>
                                        setLoseStreakEntryTarget(e.target.value)
                                      }
                                      margin="normal"
                                    />
                                  </Grid>
                                  <Grid item xs={12} sm={6}>
                                    <TextField
                                      fullWidth
                                      label="Số lượt vào (1 Thắng = 1 Lượt)"
                                      variant="outlined"
                                      value={loseTurnCount}
                                      onChange={(e) =>
                                        setLoseTurnCount(e.target.value)
                                      }
                                      margin="normal"
                                    />
                                  </Grid>
                                  <Grid item xs={12} sm={6}>
                                    <TextField
                                      fullWidth
                                      label="Đổi phương pháp khi thua liên tiếp"
                                      variant="outlined"
                                      value={loseChangeMethodAfterLoseStreak}
                                      onChange={(e) =>
                                        setLoseChangeMethodAfterLoseStreak(
                                          e.target.value
                                        )
                                      }
                                      margin="normal"
                                    />
                                  </Grid>
                                  <Grid item xs={12} sm={6}>
                                    <TextField
                                      fullWidth
                                      label="Đổi phương pháp khi thắng liên tiếp"
                                      variant="outlined"
                                      value={loseChangeMethodAfterWinStreak}
                                      onChange={(e) =>
                                        setLoseChangeMethodAfterWinStreak(
                                          e.target.value
                                        )
                                      }
                                      margin="normal"
                                    />
                                  </Grid>
                                </Grid>
                              </FormGroup>
                            </Box>

                            <Box hidden={selectedTab1 !== 2}>
                              {/* Nội dung của tab Victor.S */}
                            </Box>
                          </FormControl>
                        </Paper>
                      </Box>
                    </>
                  )}
                {featureType === SignalFeatureTypes.AUTO_CHANGE_METHODS && (
                  <Box mt={2} component="form" noValidate autoComplete="off">
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          type="number"
                          fullWidth
                          label="Đổi khi tổng thắng đạt"
                          variant="outlined"
                          defaultValue="0"
                          margin="normal"
                          value={winningTotalReach}
                          onChange={(e) => setWinningTotalReach(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          type="number"
                          fullWidth
                          label="Đổi khi tổng thua đạt"
                          variant="outlined"
                          defaultValue="0"
                          margin="normal"
                          value={loseTotalReach}
                          onChange={(e) => setLoseTotalReach(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          type="number"
                          fullWidth
                          label="Đổi khi thắng liên tiếp"
                          variant="outlined"
                          defaultValue="0"
                          margin="normal"
                          value={winningContinue}
                          onChange={(e) => setWinningContinue(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          type="number"
                          fullWidth
                          label="Đổi khi thua liên tiếp"
                          variant="outlined"
                          defaultValue="0"
                          margin="normal"
                          value={loseContinue}
                          onChange={(e) => setLoseContinue(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          type="number"
                          fullWidth
                          label="Đổi khi lãi ($)"
                          variant="outlined"
                          defaultValue="0"
                          margin="normal"
                          value={whenProfit}
                          onChange={(e) => setWhenProfit(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          type="number"
                          fullWidth
                          label="Đổi khi lỗ ($)"
                          variant="outlined"
                          defaultValue="0"
                          margin="normal"
                          value={whenLosing}
                          onChange={(e) => setWhenLosing(e.target.value)}
                        />
                      </Grid>
                    </Grid>
                  </Box>
                )}
              </Box>
              {/*  */}
              {/* {selectedTab === "Bot AI" && (
                <Box mt={4}>
                  <Typography variant="h6">
                    Reset Budget Strategy Conditions
                  </Typography>
                  <FormControlLabel
                    control={<Switch />}
                    label="Reset budget after reaching TP/SL"
                  />
                  <FormControlLabel
                    control={<Switch />}
                    label="Reset budget after clicking 'Resume'"
                  />
                  <FormControlLabel
                    control={<Switch />}
                    label="Reset budget after clicking 'Reset PnL'"
                  />
                </Box>
              )} */}

              <Box mt={1}>
                <Typography variant="h6">
                  Take-Profit/Stop-Loss Conditions
                </Typography>
                <Typography variant="body2">
                  A take-profit or stop-loss order will be triggered
                  automatically for your plan if one of the following conditions
                  is met. Today's PnL will be reset at 00:00 GMT.
                </Typography>
                <FormControlLabel
                  control={
                    <Switch
                      checked={takeProfit}
                      onChange={(e) => setTakeProfit(e.target.checked)}
                    />
                  }
                  label="Enable TP/SL"
                />
              </Box>
              {takeProfit === true && (
                <Box mt={1} component="form" noValidate autoComplete="off">
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        type="number"
                        fullWidth
                        label="Mục tiêu chốt lời ($)"
                        variant="outlined"
                        defaultValue="0"
                        margin="normal"
                        value={takeProfitTarget}
                        onChange={(e) => setTakeProfitTarget(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        type="number"
                        fullWidth
                        label="Mục tiêu cắt lỗ ($)"
                        variant="outlined"
                        defaultValue="0"
                        margin="normal"
                        value={stopLossTarget}
                        onChange={(e) => setStopLossTarget(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        type="number"
                        fullWidth
                        label="Dừng khi thắng LT"
                        variant="outlined"
                        defaultValue="0"
                        margin="normal"
                        value={winStreakTarget}
                        onChange={(e) => setWinStreakTarget(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        type="number"
                        fullWidth
                        label="Dừng khi thua LT"
                        variant="outlined"
                        defaultValue="0"
                        margin="normal"
                        value={loseStreakTarget}
                        onChange={(e) => setLoseStreakTarget(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        type="number"
                        fullWidth
                        label="Dừng khi thắng tổng"
                        variant="outlined"
                        defaultValue="0"
                        margin="normal"
                        value={winTotalTarget}
                        onChange={(e) => setWinTotalTarget(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        type="number"
                        fullWidth
                        label="Dừng khi thua tổng"
                        variant="outlined"
                        defaultValue="0"
                        margin="normal"
                        value={loseTotalTarget}
                        onChange={(e) => setLoseTotalTarget(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Alert severity="warning">
                        Các mục tiêu không sử dụng hãy nhập số 0
                      </Alert>
                    </Grid>
                  </Grid>
                </Box>
              )}
              {/* Advanced option */}
              <Box mt={1}>
                <Accordion expanded={expanded} onChange={handleAccordionChange}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="advanced-content"
                    id="advanced-header"
                  >
                    <Typography fontWeight={600}>
                      Advanced (Optional)
                    </Typography>
                  </AccordionSummary>
                  <Box p={2}>
                    <Box mt={2}>
                      <Typography variant="h6">Chế độ chuyên gia</Typography>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={isBrokerMode}
                            onChange={() => setIsBrokerMode(!isBrokerMode)}
                          />
                        }
                        label="Broker mode"
                      />
                    </Box>
                    <Box mt={2}>
                      <Typography variant="h6">Private Mode</Typography>
                      <Typography variant="body2">
                        Other user will not be able to copy your plan when you
                        enable Private mode
                      </Typography>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={privateMode}
                            onChange={() => setPrivateMode(!privateMode)}
                          />
                        }
                        label="Private Mode"
                      />
                    </Box>
                    <Box mt={2}>
                      <Typography variant="h6">Reverse Signal</Typography>
                      <Typography variant="body2">
                        The order you open will be the opposite of the received
                        signal
                      </Typography>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={reserveSignal}
                            onChange={() => setReserveSignal(!reserveSignal)}
                          />
                        }
                        label="Reverse Signal"
                      />
                    </Box>
                  </Box>
                </Accordion>
              </Box>
            </div>

            <Box
              // mt={4}
              display="flex"
              gap={1}
              justifyContent="space-between"
              position="sticky"
              bottom={0}
              bgcolor={theme.palette.background.paper}
              py={2}
            >
              <Button
                variant="outlined"
                sx={{ padding: "10px" }}
                fullWidth={downLg ? true : false}
              >
                Test Plan (0/40)
              </Button>
              <Button
                onClick={() => handleStep(2)}
                disabled={isDisableButton}
                variant="contained"
                color="primary"
                fullWidth
                sx={{ padding: "10px" }}
              >
                Next Step
              </Button>
            </Box>
          </>
        )}
        {/*  */}
        {step === 2 && (
          <>
            <div>
              <AppBar position="static" color="default">
                <Toolbar>
                  <Typography variant="h6" style={{ flexGrow: 1 }}>
                    View & confirm your plan!
                  </Typography>
                  <IconButton edge="end" color="inherit" onClick={onClose}>
                    <CloseIcon />
                  </IconButton>
                </Toolbar>
              </AppBar>

              <Box mt={2}>
                <Typography variant="subtitle1">{planName}</Typography>
                <Box mt={2} display="flex" justifyContent="space-between">
                  <Box sx={{ width: "calc(100% / 3)" }}>
                    <Typography variant="body2">Allocated Budget</Typography>
                    <Typography variant="subtitle1">
                      ${investmentFund.toFixed(2)}
                    </Typography>
                  </Box>
                  <Box sx={{ width: "calc(100% / 3)" }}>
                    <Typography variant="body2">Base Amount</Typography>
                    <Typography variant="subtitle1">${baseAmount}</Typography>
                  </Box>
                  <Box sx={{ width: "calc(100% / 3)" }}>
                    <Typography variant="body2">Account Type</Typography>
                    <Typography variant="subtitle1">{"DEMO"}</Typography>
                  </Box>
                </Box>
              </Box>
              <Box mt={2}>
                <Box mt={2} display="flex" justifyContent="space-between">
                  <Box sx={{ width: "calc(100% / 3)" }}>
                    <Typography variant="body2">
                      Take Profit/Stoploss
                    </Typography>
                    <Typography variant="subtitle1">
                      ${investmentFund.toFixed(2)}
                    </Typography>
                  </Box>
                  <Box sx={{ width: "calc(100% / 3)" }}>
                    <Typography variant="body2">Budget Strategy</Typography>
                    <Typography variant="subtitle1">${baseAmount}</Typography>
                  </Box>
                  <Box sx={{ width: "calc(100% / 3)" }}>
                    <Typography variant="body2">Signal Strategy</Typography>
                    <Typography variant="subtitle1">{selectedTab}</Typography>
                  </Box>
                </Box>
              </Box>
            </div>
            <Box
              mt={4}
              display="flex"
              gap={1}
              justifyContent="space-between"
              position="sticky"
              bottom={0}
              bgcolor={theme.palette.background.paper}
              py={2}
            >
              <Button
                onClick={() => handleStep(1)}
                variant="outlined"
                sx={{ padding: "10px" }}
              >
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ padding: "10px" }}
                onClick={handleConfirmAndSave}
              >
                Confirm & Save
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Drawer>
  );
};

export default NewPlanDrawer;