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
  CircularProgress,
  Divider,
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
import { GlobalContext } from "contexts/GlobalContext";
import AuthContext from "contexts/AuthContext";
import userApi from "api/user/userApi";
import { constant } from "constant/constant";
import Backdrop from "components/backdrop/Backdrop";
import { useTranslation } from "react-i18next";

const NewPlanDrawer = ({
  open,
  handleClose,
  isEdit,
  selectedPlan,
  setData,
  dataProps,
  setIsEdit,
  allowSelectedTab,
  selectedSignal,
  isEditSingle,
  isFromLeaderboard,
  setChangeState,
  isFromCopyPlan,
}) => {
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
  });
  const { t } = useTranslation();
  const { selectedLinkAccount } = useContext(AuthContext);
  const [idPlan, setIdPlan] = useState();
  const { setChange } = useContext(GlobalContext);
  const { decodedData } = useContext(JwtContext);
  const { walletMode } = useContext(SettingsContext);
  const [step, setStep] = useState(1);
  const downLg = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  const theme = useTheme();
  const [planName, setPlanName] = useState("");
  const [autoType, setAutoType] = useState(AutoTypes.BOT);
  const [investmentFund, setInvestmentFund] = useState(100);
  const [betSecond, setBetSecond] = useState(25);
  const [baseAmount, setBaseAmount] = useState(1);
  const [isBrokerMode, setIsBrokerMode] = useState(false);
  const [budgetStrategy, setBudgetStrategy] = useState("");
  const [linkAccountId, setLinkAccountId] = useState("");
  const [signalStrategy, setSignalStrategy] = useState("");
  const [arraySignalStrategy, setArraySignalStrategy] = useState([]);
  const [takeProfit, setTakeProfit] = useState(false);
  const [selectedTab, setSelectedTab] = useState("Bot AI");
  // const [leaderUserName, setLeaderUserName] = useState([]);
  const [privateMode, setPrivateMode] = useState(false);
  const [reserveSignal, setReserveSignal] = useState(false);
  const [userLinkAccountListState, setUserLinkAccountListState] = useState([]);
  const [loadingSubmit, setLoadingSubmit] = useState();
  const [isCopyPlan, setIsCopyPlan] = useState();
  const [featureType, setFeatureType] = useState(
    SignalFeatureTypes.SINGLE_METHOD
  ); // signal feature
  const [expanded, setExpanded] = useState(true);
  const [dataBudgetStrategy, setDataBudgetStrategy] = useState([]);
  const [dataBudgetStrategyDefault, setDataBudgetStrategyDefault] = useState(
    []
  );
  const [initLinkAccountId, setInitLinkAccountId] = useState("");
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
  const [accountType, setAccountType] = useState("DEMO");
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
  // victor
  const [victorEnabled, setVictorEnabled] = useState(false);
  const [victorReverseSignal, setVictorReverseSignal] = useState(false);
  const [victorEndVictorStreak, setVictorEndVictorStreak] = useState(false);
  const [victorExactlyVictorStreak, setVictorExactlyVictorStreak] =
    useState(false);
  const [victorStreakEntryTarget, setVictorStreakEntryTarget] = useState(0);
  const [victorTurnCount, setVictorTurnCount] = useState(0);
  const [
    victorChangeMethodAfterLoseStreak,
    setVictorChangeMethodAfterLoseStreak,
  ] = useState(0);
  const [
    victorChangeMethodAfterWinStreak,
    setVictorChangeMethodAfterWinStreak,
  ] = useState(0);
  const [
    victorChangeMethodAfterVictorStreak,
    setVictorChangeMethodAfterVictorStreak,
  ] = useState(0);
  // advanced wait signal bot
  const [runWhenWinTotal, setRunWhenWinTotal] = useState(0);
  const [runWhenLoseTotal, setRunWhenLoseTotal] = useState(0);
  const [runWhenWinStreak, setRunWhenWinStreak] = useState(0);
  const [runWhenLoseStreak, setRunWhenLoseStreak] = useState(0);
  const [runWhenProfit, setRunWhenProfit] = useState(0);
  const [runWhenLoss, setRunWhenLoss] = useState(0);

  const [stopWhenWinTotal, setStopWhenWinTotal] = useState(0);
  const [stopWhenLoseTotal, setStopWhenLoseTotal] = useState(0);
  const [stopWhenWinStreak, setStopWhenWinStreak] = useState(0);
  const [stopWhenLoseStreak, setStopWhenLoseStreak] = useState(0);
  const [stopWhenProfit, setStopWhenProfit] = useState(0);
  const [stopWhenLoss, setStopWhenLoss] = useState(0);
  const [waitSignalOtherPlanEnabled, setWaitSignalOtherPlanEnabled] = useState(false);
  const [runWhenExactlyWinLose, setRunWhenExactlyWinLose] = useState(false);
  const [getSignalToStopFromSignalPlan, setGetSignalToStopFromSignalPlan] =
    useState(false);
  const [botList, setBotList]= useState([])
  const [botId, setBotId]= useState()
  const [initBotId, setInitBotId]= useState()
  const [loading, setLoading] = useState();

  const handleTabChange = (event, newValue) => {
    setSelectedTab1(newValue);
  };

  const handleIncrement = (setFunc, value) => {
    setFunc(parseInt(value) + 1);
  };
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
      setLoadingSubmit(true);
      let response;
      let data;
      // switch(selectedTab)
      if (selectedTab === "Follow Leader") {
        data = {
          autoType: autoType,
          name: planName,
          accountType: accountType,
          budgetStrategyId: budgetStrategy,
          bet_second: betSecond,
          margin_dense: parseFloat(baseAmount),
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
          linkAccountId: linkAccountId,
        };
      } else {
        switch (featureType) {
          case SignalFeatureTypes.SINGLE_METHOD:
            data = {
              autoType: autoType,
              name: planName,
              accountType: accountType,
              budgetStrategyId: budgetStrategy,
              bet_second: betSecond,
              margin_dense: parseFloat(baseAmount),
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
              linkAccountId: linkAccountId,
            };

            break;
          case SignalFeatureTypes.MIX_METHODS:
            data = {
              autoType: autoType,
              name: planName,
              accountType: accountType,
              budgetStrategyId: budgetStrategy,
              bet_second: betSecond,
              margin_dense: parseFloat(baseAmount),
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
              linkAccountId: linkAccountId,
            };
            break;
          case SignalFeatureTypes.AUTO_CHANGE_METHODS:
            data = {
              autoType: autoType,
              name: planName,
              accountType: accountType,
              budgetStrategyId: budgetStrategy,
              bet_second: betSecond,
              margin_dense: parseFloat(baseAmount),
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
              linkAccountId: linkAccountId,
            };
            break;
          case SignalFeatureTypes.WAIT_SIGNALS:
            data = {
              autoType: autoType,
              name: planName,
              accountType: accountType,
              budgetStrategyId: budgetStrategy,
              bet_second: betSecond,
              margin_dense: parseFloat(baseAmount),
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
                  victor_enabled: victorEnabled,
                  victor_reverse_signal: victorReverseSignal,
                  victor_end_victor_streak: victorEndVictorStreak,
                  victor_exactly_victor_streak: victorExactlyVictorStreak,
                  victor_streak_entry_target: victorStreakEntryTarget,
                  victor_turn_count: victorTurnCount,
                  victor_change_method_after_lose_streak:
                    victorChangeMethodAfterLoseStreak,
                  victor_change_method_after_win_streak:
                    victorChangeMethodAfterWinStreak,
                  victor_change_method_after_victor_streak:
                    victorChangeMethodAfterVictorStreak,
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
              linkAccountId: linkAccountId,
            };
            break;
          case SignalFeatureTypes.RANDOM_METHOD:
            data = {
              autoType: autoType,
              name: planName,
              accountType: accountType,
              budgetStrategyId: budgetStrategy,
              bet_second: betSecond,
              margin_dense: parseFloat(baseAmount),
              isBrokerMode: isBrokerMode,
              isNotificationsEnabled: true,
              method_data: {
                method_list: [],
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
              linkAccountId: linkAccountId,
            };
            break;
          default:
            break;
        }
      }
      data = {
        ...data,
        is_waiting: true,
        wait_signal_other_plan_enabled: waitSignalOtherPlanEnabled,
        wait_signal_other_plan_data: {
          botId: botId,
          run_when_win_total: runWhenWinTotal,
          run_when_lose_total: runWhenLoseTotal,
          run_when_win_streak: runWhenWinStreak,
          run_when_lose_streak: runWhenLoseStreak,
          run_when_profit: runWhenProfit,
          run_when_loss: runWhenLoss,
          stop_when_win_total: stopWhenWinTotal,
          stop_when_lose_total: stopWhenLoseTotal,
          stop_when_win_streak: stopWhenWinStreak,
          stop_when_lose_streak: stopWhenLoseStreak,
          stop_when_profit: stopWhenProfit,
          stop_when_loss: stopWhenLoss,
          run_when_exactly_win_lose: runWhenExactlyWinLose,
          get_signal_to_stop_from_signal_plan: getSignalToStopFromSignalPlan,
        }
      };
      console.log(data)
      if (isEdit === true) {
        if (isFromLeaderboard) {
          response = await portfolioApi.usersBotCreate(data);
        } else {
          response = await portfolioApi.userBotUpdate(idPlan, data);
          // data = { ...response?.data?.d ,...selectedPlan };
        }
      } else {
        response = await portfolioApi.usersBotCreate(data);
      }
      if (response?.data?.ok === true) {
        if (allowSelectedTab || isFromLeaderboard) {
          showToast("Tạo bot thành công", "success");
          setIsEdit(false);
          onClose();
          return;
        } else if (isEditSingle === true) {
          // setDataProps
          setData({ ...selectedPlan, ...data });
        } else if (isEdit === true) {
          if (isFromCopyPlan) {
          } else {
            let dataTemp = dataProps;
            const indexData = dataTemp?.findIndex(
              (item) => item?._id === selectedPlan?._id
            );
            dataTemp[indexData] = response?.data?.d;
            setData(dataTemp);
            setChangeState((prev) => !prev);
          }
        } else {
          setChange((prev) => !prev);
          setData((prev) => [response?.data?.d, ...prev]);
        }
        showToast(
          isEdit ? "Cập nhật bot thành công" : "Tạo bot thành công",
          "success"
        );
        setIsEdit(false);
        onClose();
      } else {
        showToast(response?.data?.m);
      }
    } catch (error) {
      console.log(error);
      showToast(error?.response?.data?.m);
    } finally {
      setLoadingSubmit(false);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response1 = await budgetStrategyApi.userBudgetStrategyList();
        const response2 = await signalStrategyApi.userBudgetSignalList();
        const response3 = await signalStrategyApi.userBudgetTelegramSignal();
        const response4 = await userApi.getUserLinkAccountList();
        const response5= await portfolioApi.userBotList({params: {type: "DEMO"}})
        const response6= await portfolioApi.userBotList({params: {type: "LIVE"}})
        if (response1?.data?.ok === true) {
          setBudgetStrategy(response1?.data?.d?.[0]?._id);
          setDataBudgetStrategy(response1?.data?.d);
          setDataBudgetStrategyDefault(response1?.data?.d);
        }
        if (response2?.data?.ok === true) {
          setSignalStrategy(response2?.data?.d?.[0]?._id);
          setDataSignalStrategy(response2?.data?.d);
        }
        if (response3?.data?.ok === true) {
          setSignalStrategy(response2?.data?.d?.[0]?._id);
          setDataSignalStrategyTelegramSignal(response3?.data?.d);
        }
        if (response4?.data?.ok === true) {
          setInitLinkAccountId(
            response4?.data?.d?.filter(
              (item) =>
                item?.isLogin === true && item?._id === selectedLinkAccount
            )?.[0]?._id
          );
          setLinkAccountId(
            response4?.data?.d?.filter((item) => item?.isLogin === true)?.[0]
              ?._id
          );
          setUserLinkAccountListState(
            response4?.data?.d?.filter((item) => item?.isLogin === true)
          );
        }
        if(response5?.data?.ok=== true && response6?.data?.ok=== true) {
          setInitBotId(response5?.data?.d?.[0]?._id)
          setBotList(response5?.data?.d?.concat(response6?.data?.d))
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    })();
  }, [isEdit, selectedLinkAccount]);

  useEffect(() => {
    if (selectedTab === "Telegram Signal") {
      
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
      setLinkAccountId(selectedPlan?.linkAccountId);
      setBetSecond(selectedPlan?.bet_second);
      setAutoType(selectedPlan?.autoType);
      setSelectedTab(
        selectedPlan?.autoType === 1
          ? "Follow Leader"
          : selectedPlan?.autoType === 0 || selectedPlan?.autoType === 2
          ? "Bot AI"
          : "Telegram Signal"
      );
      setFeatureType(selectedPlan?.signal_feature);
      if (!allowSelectedTab) {
        setBudgetStrategy(selectedPlan?.budgetStrategyId);
      }
      setBaseAmount(selectedPlan?.margin_dense);
      setTakeProfit(selectedPlan?.enabled_tpsl);
      setIsBrokerMode(selectedPlan?.isBrokerMode);
      setPrivateMode(selectedPlan?.isPrivate);
      setReserveSignal(selectedPlan?.is_reverse);
      if (allowSelectedTab) {
        setArraySignalStrategy(selectedSignal);
        setSignalStrategy(selectedSignal[0]);
      } else {
        setArraySignalStrategy(selectedPlan?.method_data?.method_list);
        setSignalStrategy(selectedPlan?.method_data?.method_list[0]);
      }
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
      setAccountType(selectedPlan?.accountType);
      setTakeProfitTarget(selectedPlan?.take_profit_target);
      setStopLossTarget(selectedPlan?.stop_loss_target);
      setWinStreakTarget(selectedPlan?.win_streak_target);
      setLoseStreakTarget(selectedPlan?.lose_streak_target);
      setWinTotalTarget(selectedPlan?.win_total_target);
      setLoseTotalTarget(selectedPlan?.lose_total_target);
      setIsCopyPlan(selectedPlan?.isCopy);
      setVictorEnabled(selectedPlan?.method_data?.feature_data?.victor_enabled);
      setVictorReverseSignal(selectedPlan?.method_data?.feature_data?.victor_reverse_signal);
      setVictorEndVictorStreak(selectedPlan?.method_data?.feature_data?.victor_end_victor_streak);
      setVictorExactlyVictorStreak(selectedPlan?.method_data?.feature_data?.victor_exactly_victor_streak);
      setVictorStreakEntryTarget(selectedPlan?.method_data?.feature_data?.victor_streak_entry_target);
      setVictorTurnCount(selectedPlan?.method_data?.feature_data?.victor_turn_count);
      setVictorChangeMethodAfterLoseStreak(selectedPlan?.method_data?.feature_data?.victor_change_method_after_lose_streak);
      setVictorChangeMethodAfterWinStreak(selectedPlan?.method_data?.feature_data?.victor_change_method_after_win_streak);
      setVictorChangeMethodAfterVictorStreak(selectedPlan?.method_data?.feature_data?.victor_change_method_after_victor_streak);
      setRunWhenWinTotal(selectedPlan?.wait_signal_other_plan_data?.run_when_win_total);
      setRunWhenLoseTotal(selectedPlan?.wait_signal_other_plan_data?.run_when_lose_total);
      setRunWhenWinStreak(selectedPlan?.wait_signal_other_plan_data?.run_when_win_streak);
      setRunWhenLoseStreak(selectedPlan?.wait_signal_other_plan_data?.run_when_lose_streak);
      setRunWhenProfit(selectedPlan?.wait_signal_other_plan_data?.run_when_profit);
      setRunWhenLoss(selectedPlan?.wait_signal_other_plan_data?.run_when_loss);
      setStopWhenWinTotal(selectedPlan?.wait_signal_other_plan_data?.stop_when_win_total);
      setStopWhenLoseTotal(selectedPlan?.wait_signal_other_plan_data?.stop_when_lose_total);
      setStopWhenWinStreak(selectedPlan?.wait_signal_other_plan_data?.stop_when_win_streak);
      setStopWhenLoseStreak(selectedPlan?.wait_signal_other_plan_data?.stop_when_lose_streak);
      setStopWhenProfit(selectedPlan?.wait_signal_other_plan_data?.stop_when_profit);
      setStopWhenLoss(selectedPlan?.wait_signal_other_plan_data?.stop_when_loss);
      setRunWhenExactlyWinLose(selectedPlan?.wait_signal_other_plan_data?.run_when_exactly_win_lose);
      setGetSignalToStopFromSignalPlan(selectedPlan?.wait_signal_other_plan_data?.get_signal_to_stop_from_signal_plan);
      setBotId(selectedPlan?.wait_signal_other_plan_data?.botId);
      setWaitSignalOtherPlanEnabled(selectedPlan?.wait_signal_other_plan_enabled)
      if (isFromLeaderboard === true) {
        setFeatureType(SignalFeatureTypes.SINGLE_METHOD);
        setLinkAccountId(initLinkAccountId);
        setAccountType(walletMode ? "LIVE" : "DEMO");
        setBaseAmount(selectedPlan?.margin_dense);
        setBetSecond(25);
        setInvestmentFund(100);
        setArraySignalStrategy(selectedPlan?.method_data?.method_list);
      }
      if (isFromCopyPlan) {
        setPlanName(selectedPlan?.name);
        setArraySignalStrategy(selectedPlan?.method_data?.method_list);
        setIsCopyPlan(isFromCopyPlan);
      }
    } else {
      setIdPlan();
      setPlanName("");
      setInvestmentFund(100);
      setBetSecond(25);
      setAutoType(AutoTypes.BOT);
      setSelectedTab("Bot AI");
      setFeatureType(SignalFeatureTypes.SINGLE_METHOD);
      setBudgetStrategy(dataBudgetStrategy?.[0]?._id);
      setLinkAccountId(userLinkAccountListState?.[0]?._id);
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
      setAccountType("DEMO");
      setTakeProfitTarget(0);
      setStopLossTarget(0);
      setWinStreakTarget(0);
      setLoseStreakTarget(0);
      setWinTotalTarget(0);
      setLoseTotalTarget(0);
      setIsCopyPlan();
      setVictorEnabled(false);
      setVictorReverseSignal(false);
      setVictorEndVictorStreak(false);
      setVictorExactlyVictorStreak(false);
      setVictorStreakEntryTarget(0);
      setVictorTurnCount(0);
      setVictorChangeMethodAfterLoseStreak(0);
      setVictorChangeMethodAfterWinStreak(0);
      setVictorChangeMethodAfterVictorStreak(0);
      setRunWhenWinTotal(0);
      setRunWhenLoseTotal(0);
      setRunWhenWinStreak(0);
      setRunWhenLoseStreak(0);
      setRunWhenProfit(0);
      setRunWhenLoss(0);
      setStopWhenWinTotal(0);
      setStopWhenLoseTotal(0);
      setStopWhenWinStreak(0);
      setStopWhenLoseStreak(0);
      setStopWhenProfit(0);
      setStopWhenLoss(0);
      setRunWhenExactlyWinLose(false);
      setGetSignalToStopFromSignalPlan(false);
      setWaitSignalOtherPlanEnabled(false)
      setBotId(initBotId)
    }
  }, [
    isEdit,
    selectedPlan,
    dataBudgetStrategy,
    allowSelectedTab,
    selectedSignal,
    userLinkAccountListState,
    dataProps,
    initLinkAccountId,
    isFromLeaderboard,
    walletMode,
    isFromCopyPlan,
    initBotId
    // inView
  ]);

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
        position={"relative"}
      >
        {step === 1 && (
          <>
            <Box>
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
                    Bước 1 : Thông tin gói đầu tư
                    <Typography
                      color={
                        walletMode ? theme.palette.success.main : "primary"
                      }
                      variant="body1"
                      fontWeight={600}
                      style={{ flexGrow: 1, marginLeft: "8px" }}
                    >
                      {accountType}
                    </Typography>
                  </Typography>
                  <IconButton edge="end" color="inherit" onClick={onClose}>
                    <CloseIcon />
                  </IconButton>
                </Toolbar>
              </AppBar>

              <Box mt={1}>
                <Typography variant="subtitle1">Tên gói</Typography>
                <TextField
                  fullWidth
                  placeholder="Nhập tên gói (VD : Mua xe, mua nhà)..."
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
                    <Typography variant="subtitle1">
                      Ngân sách đầu tư
                    </Typography>
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
                  {isCopyPlan !== true && (
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
                          onClick={() =>
                            handleDecrement(setBetSecond, betSecond)
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
                          <TextField
                            value={betSecond}
                            onChange={(e) => {
                              setBetSecond(parseFloat(e.target.value) || 0);
                            }}
                            inputProps={{
                              min: 0,
                              max: 25,
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
                            handleIncrement(setBetSecond, betSecond)
                          }
                          style={{ minWidth: 30, padding: 5 }}
                        >
                          +
                        </Button>
                      </Box>
                    </Box>
                  )}
                </Box>
              </Box>

              <Box mt={1}>
                <AppBar position="static" color="default">
                  <Toolbar>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                      Bước 2 : Thiết lập gói đầu tư
                    </Typography>
                  </Toolbar>
                </AppBar>
                {
                  <Box display="flex" mt={2}>
                    {["Bot AI", "Follow Leader", "", "Telegram Signal"].map(
                      (tab) => {
                        if (tab === "") {
                          return <></>;
                        }
                        return (
                          <Button
                            disabled={
                              (isEdit || allowSelectedTab) === true
                                ? true
                                : false
                            }
                            key={tab}
                            variant={
                              selectedTab === tab ? "contained" : "outlined"
                            }
                            color={
                              selectedTab === tab ? "primary" : "secondary"
                            }
                            style={{ marginRight: 8 }}
                            onClick={() => {
                              setSelectedTab(tab);
                              setAutoType(
                                tab === "Follow Leader"
                                  ? 1
                                  : tab === "Bot AI"
                                  ? 0
                                  : 3
                              );
                              setArraySignalStrategy([]);
                            }}
                          >
                            {tab}
                          </Button>
                        );
                      }
                    )}
                  </Box>
                }
              </Box>
              <Box
                sx={{ width: "100%" }}
                mt={2}
                display={"flex"}
                alignItems={"center"}
                gap={1}
              >
                <Box className="akaskwas" flex={1}>
                  <Typography variant="subtitle1">
                    {t("linked_account")}
                  </Typography>
                  <FormControl variant="outlined" fullWidth margin="normal">
                    <Select
                      value={linkAccountId}
                      onChange={(e) => {
                        setLinkAccountId(e.target.value);
                      }}
                      renderValue={(value) => (
                        <>
                          {loading === true && <Box>Loading...</Box>}
                          {loading === false && (
                            <Box display={"flex"} alignItems={"center"} gap={1}>
                              <img
                                style={{ width: 24, height: 24 }}
                                src={
                                  constant.URL_ASSETS_LOGO +
                                  "/" +
                                  userLinkAccountListState?.find(
                                    (item) => item?._id === value
                                  )?.clientId +
                                  ".ico"
                                }
                                alt="Can't open"
                              />{" "}
                              <Typography
                                fontSize={14}
                                textOverflow={"ellipsis"}
                                overflow={"hidden"}
                                whiteSpace={"nowrap"}
                              >
                                {
                                  userLinkAccountListState?.find(
                                    (item) => item?._id === value
                                  )?.nickName
                                }
                              </Typography>
                            </Box>
                          )}
                        </>
                      )}
                      size="medium"
                    >
                      {loading === true && (
                        <MenuItem value={undefined}>Đang tải</MenuItem>
                      )}
                      {loading === false &&
                        userLinkAccountListState?.map((item, key) => (
                          <MenuItem key={key} value={item?._id}>
                            <Box display={"flex"} alignItems={"center"} gap={1}>
                              <img
                                style={{ width: 32, height: 32 }}
                                src={
                                  constant.URL_ASSETS_LOGO +
                                  "/" +
                                  item?.clientId +
                                  ".ico"
                                }
                                alt="Can't open"
                              />{" "}
                              <Typography
                                fontSize={14}
                                textOverflow={"ellipsis"}
                                overflow={"hidden"}
                                whiteSpace={"nowrap"}
                              >
                                {item?.nickName}
                              </Typography>
                            </Box>
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </Box>
                <Box className="akaskwas" flex={1}>
                  <Typography variant="subtitle1">Loại tài khoản</Typography>
                  <FormControl variant="outlined" fullWidth margin="normal">
                    <Select
                      value={accountType}
                      onChange={(e) => {
                        setAccountType(e.target.value);
                      }}
                      size="medium"
                    >
                      <MenuItem value="DEMO">DEMO</MenuItem>
                      <MenuItem value="LIVE">LIVE</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Box>
              <Box
                className="aslawkalw"
                sx={{ display: "flex", alignItems: "start", gap: 1 }}
              >
                {isCopyPlan !== true && (
                  <>
                    {(selectedTab === "Bot AI" ||
                      selectedTab === "Telegram Signal") && (
                      <Box sx={{ width: "100%" }} mt={2}>
                        <Typography variant="subtitle1">
                          Tính năng sử dụng
                        </Typography>
                        <FormControl
                          variant="outlined"
                          fullWidth
                          margin="normal"
                        >
                          <Select
                            value={featureType}
                            onChange={(e) => {
                              setFeatureType(e.target.value);
                              setSignalStrategy("");
                              setArraySignalStrategy([]);
                            }}
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
                                } else if (
                                  autoType !== 2 &&
                                  SignalFeatureTypes[item] ===
                                    SignalFeatureTypes.RANDOM_METHOD
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
                  </>
                )}
                <Box sx={{ width: "100%" }} mt={2}>
                  <Typography variant="subtitle1">Hệ số vào lệnh</Typography>
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
                        type="text"
                        value={baseAmount?.toString()?.replaceAll(",", ".")}
                        defaultValue={0}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (/^\d*\.?\d*$/.test(value)) {
                            setBaseAmount(value);
                          }
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
              {isCopyPlan !== true && (
                <>
                  {isChooseBot === true && selectedTab === "Bot AI" && (
                    <>
                      {" "}
                      <Box mt={1}>
                        <Typography variant="subtitle1">Chọn Bot</Typography>
                        <FormControl
                          variant="outlined"
                          fullWidth
                          margin="normal"
                        >
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
                                onChange={(e) =>
                                  setTelegramToken(e.target.value)
                                }
                                margin="normal"
                              />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                              <TextField
                                fullWidth
                                label="Telegram chatid"
                                variant="outlined"
                                value={telegramChatId}
                                onChange={(e) =>
                                  setTelegramChatId(e.target.value)
                                }
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
                </>
              )}
              {/*  */}
              {isCopyPlan !== true && (
                <>
                  <Box
                    className="asklawa"
                    sx={{ display: "flex", gap: 1, alignItems: "start" }}
                    // mt={1}
                  >
                    {/* {console.log(budgetStrategy)} */}
                    {(selectedTab === "Bot AI" ||
                      selectedTab === "Telegram Signal") && (
                      <Box sx={{ width: "100%" }} fullWidth>
                        <Typography variant="subtitle1">
                          Chiến lược vốn*
                        </Typography>
                        <FormControl
                          variant="outlined"
                          fullWidth
                          margin="normal"
                        >
                          <Select
                            value={budgetStrategy}
                            onChange={(e) => setBudgetStrategy(e.target.value)}
                            renderValue={(value) => (
                              <>
                                {loading === true && <>Loading...</>}
                                {loading === false &&
                                  dataBudgetStrategy?.find(
                                    (item) => item?._id === value
                                  )?.name}
                              </>
                            )}
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
                    {featureType !== SignalFeatureTypes.RANDOM_METHOD && (
                      <Box sx={{ width: "100%" }}>
                        <Typography variant="subtitle1">
                          {selectedTab === "Bot AI" && "Tín hiệu*"}
                          {selectedTab === "Follow Leader" &&
                            "Leader username*"}
                          {selectedTab === "Telegram Signal" && "Tín hiệu*"}
                        </Typography>
                        {selectedTab === "Bot AI" && (
                          <FormControl
                            variant="outlined"
                            fullWidth
                            margin="normal"
                          >
                            {featureType ===
                            SignalFeatureTypes.SINGLE_METHOD ? (
                              <>
                                <Select
                                  value={signalStrategy}
                                  onChange={(e) =>
                                    setSignalStrategy(e.target.value)
                                  }
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
                                          arraySignalStrategy.indexOf(
                                            item._id
                                          ) > -1
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
                              onChange={(value) =>
                                setArraySignalStrategy(value)
                              }
                              placeholder="Nhấn enter để thêm"
                              sx={{ width: "100%" }}
                              size={"medium"}
                            />
                          </Box>
                        )}
                        {/*  */}
                        {/* {console.log("signalStrategy", signalStrategy)} */}
                        {/*  */}
                        {selectedTab === "Telegram Signal" && (
                          <Box sx={{ width: "100%" }} mt={2} mb={1}>
                            {featureType ===
                            SignalFeatureTypes.SINGLE_METHOD ? (
                              <Select
                                fullWidth
                                value={signalStrategy}
                                onChange={(e) =>
                                  setSignalStrategy(e.target.value)
                                }
                                size="medium"
                              >
                                {dataSignalStrategyTelegramSignal?.map(
                                  (item, key) => (
                                    <MenuItem key={key} value={item?._id}>
                                      {item?.name}
                                    </MenuItem>
                                  )
                                )}
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
                                    {selected?.length > 0 &&
                                      selected.map((value) => (
                                        <Chip
                                          sx={{
                                            // height: allowSelectedTab ? "" : 50,
                                            display:
                                              dataSignalStrategyTelegramSignal.find(
                                                (item) => item._id === value
                                              )
                                                ? "aa"
                                                : "none",
                                          }}
                                          key={value}
                                          label={
                                            <Box>
                                              <Box>
                                                {dataSignalStrategyTelegramSignal.find(
                                                  (item) => item._id === value
                                                )?.name || ""}
                                              </Box>
                                              {/* {!allowSelectedTab && (
                                            <Box fontSize={12}>
                                              {
                                                dataSignalStrategyTelegramSignal.find(
                                                  (item) => item._id === value
                                                )?.url
                                              }
                                            </Box>
                                          )} */}
                                            </Box>
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
                                          arraySignalStrategy.indexOf(
                                            item._id
                                          ) > -1
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
                    )}
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
                                          setShuffleMethodsOrder(
                                            e.target.checked
                                          )
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
                                  <Tab label="Victor.S" />
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
                                            setWinReverseSignal(
                                              e.target.checked
                                            )
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
                                            setWinExactlyWinStreak(
                                              e.target.checked
                                            )
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
                                            setWinStreakEntryTarget(
                                              e.target.value
                                            )
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
                                            setLoseReverseSignal(
                                              e.target.checked
                                            )
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
                                            setLoseEndLoseStreak(
                                              e.target.checked
                                            )
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
                                            setLoseStreakEntryTarget(
                                              e.target.value
                                            )
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
                                          value={
                                            loseChangeMethodAfterLoseStreak
                                          }
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
                                {/*  */}
                                <Box hidden={selectedTab1 !== 2}>
                                  <FormGroup>
                                    <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={victorEnabled}
                                          onChange={(e) =>
                                            setVictorEnabled(e.target.checked)
                                          }
                                        />
                                      }
                                      label="Kích hoạt Victor Signal"
                                    />
                                    <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={victorReverseSignal}
                                          onChange={(e) =>
                                            setVictorReverseSignal(
                                              e.target.checked
                                            )
                                          }
                                        />
                                      }
                                      label="Đảo lệnh"
                                    />
                                    <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={victorEndVictorStreak}
                                          onChange={(e) =>
                                            setVictorEndVictorStreak(
                                              e.target.checked
                                            )
                                          }
                                        />
                                      }
                                      label="Vào lệnh khi kết thúc chuỗi Victor"
                                    />
                                    <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={victorExactlyVictorStreak}
                                          onChange={(e) =>
                                            setVictorExactlyVictorStreak(
                                              e.target.checked
                                            )
                                          }
                                        />
                                      }
                                      label="Vào lệnh khi đạt chính xác lượt Victor LT"
                                    />

                                    <Grid container spacing={2}>
                                      <Grid item xs={12} sm={6}>
                                        <TextField
                                          fullWidth
                                          label="Vào lệnh khi lượt Victor LT đạt"
                                          variant="outlined"
                                          value={victorStreakEntryTarget}
                                          onChange={(e) =>
                                            setVictorStreakEntryTarget(
                                              e.target.value
                                            )
                                          }
                                          margin="normal"
                                        />
                                      </Grid>
                                      <Grid item xs={12} sm={6}>
                                        <TextField
                                          fullWidth
                                          label="Số lượt vào (2 Thắng LT = 1 Lượt hoặc Win lệnh đầu chuỗi QLV)"
                                          variant="outlined"
                                          value={victorTurnCount}
                                          onChange={(e) =>
                                            setVictorTurnCount(e.target.value)
                                          }
                                          margin="normal"
                                        />
                                      </Grid>
                                      <Grid item xs={12} sm={6}>
                                        <TextField
                                          fullWidth
                                          label="Đổi phương pháp khi thua liên tiếp"
                                          variant="outlined"
                                          value={
                                            victorChangeMethodAfterLoseStreak
                                          }
                                          onChange={(e) =>
                                            setVictorChangeMethodAfterLoseStreak(
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
                                          value={
                                            victorChangeMethodAfterWinStreak
                                          }
                                          onChange={(e) =>
                                            setVictorChangeMethodAfterWinStreak(
                                              e.target.value
                                            )
                                          }
                                          margin="normal"
                                        />
                                      </Grid>
                                      <Grid item xs={12} sm={6}>
                                        <TextField
                                          fullWidth
                                          label="Đổi phương pháp khi Victor liên tiếp"
                                          variant="outlined"
                                          value={
                                            victorChangeMethodAfterVictorStreak
                                          }
                                          onChange={(e) =>
                                            setVictorChangeMethodAfterVictorStreak(
                                              e.target.value
                                            )
                                          }
                                          margin="normal"
                                        />
                                      </Grid>
                                    </Grid>
                                  </FormGroup>
                                </Box>
                              </FormControl>
                            </Paper>
                          </Box>
                        </>
                      )}
                    {featureType === SignalFeatureTypes.AUTO_CHANGE_METHODS && (
                      <Box
                        mt={2}
                        component="form"
                        noValidate
                        autoComplete="off"
                      >
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
                              onChange={(e) =>
                                setWinningTotalReach(e.target.value)
                              }
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
                              onChange={(e) =>
                                setLoseTotalReach(e.target.value)
                              }
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
                              onChange={(e) =>
                                setWinningContinue(e.target.value)
                              }
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
                </>
              )}
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

              <Box
                mt={1}
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
                gap={1}
              >
                <Box>
                  <Typography variant="h6">
                    Điều Kiện Chốt Lời/Cắt Lỗ
                  </Typography>
                  <Typography variant="body2">
                    Gói của bạn sẽ tự động chốt lời hoặc cắt lỗ khi một trong
                    các điều kiện sau được đáp ứng. Lợi nhuận hàng ngày được cài
                    lại vào 00:00 GMT.
                  </Typography>
                </Box>
                <FormControlLabel
                  control={
                    <Switch
                      checked={takeProfit}
                      onChange={(e) => setTakeProfit(e.target.checked)}
                    />
                  }
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
                      Nâng cao (Tùy chọn)
                    </Typography>
                  </AccordionSummary>
                  <Box p={2}>
                  <Box
                      display={"flex"}
                      justifyContent={"space-between"}
                      alignItems={"center"}
                      gap={1}
                      mb={1}
                    >
                      <Typography variant="h6">Đợi tín hiệu từ bot có sẵn</Typography>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={waitSignalOtherPlanEnabled}
                            onChange={() => setWaitSignalOtherPlanEnabled(!waitSignalOtherPlanEnabled)}
                          />
                        }
                      />
                    </Box>
                    {waitSignalOtherPlanEnabled && 
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={12}>
                          <TextField 
                            onChange={(e)=> setBotId(e.target.value)}
                            value={botId}
                            size="small"
                            fullWidth
                            select
                            name="wait_signal_from_other_bot_id"
                            label={t("configuration_name_want_to_waiting")}
                            SelectProps={{
                              MenuProps: {
                                sx: { "& .MuiPaper-root": { maxHeight: 260 } },
                              },
                            }}
                            sx={{
                              maxWidth: { sm: "100%" },
                              textTransform: "capitalize",
                            }}
                          >
                            {isEdit
                              ? botList
                                  ?.filter((a) => a?._id !== selectedPlan?._id)
                                  ?.map((option) => (
                                    <MenuItem key={option?._id} value={option?._id}>
                                      {t(option?.name)}
                                    </MenuItem>
                                  ))
                              : botList?.map((option) => (
                                  <MenuItem key={option?._id} value={option?._id}>
                                    {t(option?.name)}
                                  </MenuItem>
                                ))}
                          </TextField>
                        </Grid>
                        <Grid item xs={12} md={12}>
                          <Divider>
                            <Chip label={t("condition_to_start")} />
                          </Divider>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TextField
                            fullWidth
                            name="run_when_win_total"
                            type="number"
                            label={t("start_when_win_total")}
                            size="small"
                            value={runWhenWinTotal}
                            onChange={(e) =>
                              setRunWhenWinTotal((e.target.value))
                            }
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TextField
                            fullWidth
                            name="run_when_lose_total"
                            type="number"
                            label={t("start_when_lose_total")}
                            size="small"
                            value={runWhenLoseTotal}
                            onChange={(e) =>
                              setRunWhenLoseTotal((e.target.value))
                            }
                          />
                        </Grid>

                        <Grid item xs={12} md={6}>
                          <TextField
                            fullWidth
                            name="run_when_win_streak"
                            type="number"
                            label={t("start_when_win_streak")}
                            size="small"
                            value={runWhenWinStreak}
                            onChange={(e) =>
                              setRunWhenWinStreak((e.target.value))
                            }
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TextField
                            fullWidth
                            name="run_when_lose_streak"
                            type="number"
                            label={t("start_when_lose_streak")}
                            size="small"
                            value={runWhenLoseStreak}
                            onChange={(e) =>
                              setRunWhenLoseStreak((e.target.value))
                            }
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TextField
                            fullWidth
                            name="run_when_profit"
                            type="number"
                            label={t("start_when_profit")}
                            size="small"
                            value={runWhenProfit}
                            onChange={(e) =>
                              setRunWhenProfit((e.target.value))
                            }
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TextField
                            fullWidth
                            name="run_when_loss"
                            type="number"
                            label={t("start_when_loss")}
                            size="small"
                            value={runWhenLoss}
                            onChange={(e) =>
                              setRunWhenLoss((e.target.value))
                            }
                          />
                        </Grid>

                        <Grid item xs={12} md={12}>
                          <Divider>
                            <Chip label={t("stop_condition_to_wait_signal")} />
                          </Divider>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TextField
                            fullWidth
                            name="stop_when_win_total"
                            type="number"
                            label={t("stop_for_waiting_signal_when_win_total")}
                            size="small"
                            value={stopWhenWinTotal}
                            onChange={(e) =>
                              setStopWhenWinTotal((e.target.value))
                            }
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TextField
                            fullWidth
                            name="stop_when_lose_total"
                            type="number"
                            label={t("stop_for_waiting_signal_when_lose_total")}
                            size="small"
                            value={stopWhenLoseTotal}
                            onChange={(e) =>
                              setStopWhenLoseTotal((e.target.value))
                            }
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TextField
                            fullWidth
                            name="stop_when_win_streak"
                            type="number"
                            label={t("stop_for_waiting_signal_when_win_streak")}
                            size="small"
                            value={stopWhenWinStreak}
                            onChange={(e) =>
                              setStopWhenWinStreak((e.target.value))
                            }
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TextField
                            fullWidth
                            name="stop_when_lose_streak"
                            type="number"
                            label={t("stop_for_waiting_signal_when_lose_streak")}
                            size="small"
                            value={stopWhenLoseStreak}
                            onChange={(e) =>
                              setStopWhenLoseStreak((e.target.value))
                            }
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TextField
                            fullWidth
                            name="stop_when_profit"
                            type="number"
                            label={t("stop_for_waiting_signal_when_profit")}
                            size="small"
                            value={stopWhenProfit}
                            onChange={(e) =>
                              setStopWhenProfit((e.target.value))
                            }
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TextField
                            fullWidth
                            name="stop_when_loss"
                            type="number"
                            label={t("stop_for_waiting_signal_when_loss")}
                            size="small"
                            value={stopWhenLoss}
                            onChange={(e) =>
                              setStopWhenLoss((e.target.value))
                            }
                          />
                        </Grid>
                        <Grid item xs={12} md={12}>
                          <FormControlLabel
                            name="run_when_exactly_win_lose"
                            control={
                              <Checkbox
                                checked={runWhenExactlyWinLose}
                                onChange={(e) =>
                                  setRunWhenExactlyWinLose(e.target.checked)
                                }
                              />
                            }
                            label={t(
                              "wait_signal_from_other_start_when_exactly_enabled"
                            )}
                          />
                        </Grid>
                        <Grid item xs={12} md={12}>
                          <FormControlLabel
                            name="get_signal_to_stop_from_signal_plan"
                            control={
                              <Checkbox
                                checked={getSignalToStopFromSignalPlan}
                                onChange={(e) =>
                                  setGetSignalToStopFromSignalPlan(
                                    e.target.checked
                                  )
                                }
                              />
                            }
                            label={t(
                              "wait_signal_from_other_get_stop_signal_based_on_navigation_bot_enabled"
                            )}
                          />
                        </Grid>
                        <Grid item xs={12} md={12}>
                          <Typography sx={{ color: "warning.main" }}>
                            {t("note")}: {t("unused_targets_enter_0")}
                          </Typography>
                        </Grid>
                      </Grid>
                    }
                    <Box
                      mt={2}
                      display={"flex"}
                      justifyContent={"space-between"}
                      alignItems={"center"}
                      gap={1}
                    >
                      <Typography variant="h6">Chế độ chuyên gia</Typography>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={isBrokerMode}
                            onChange={() => setIsBrokerMode(!isBrokerMode)}
                          />
                        }
                      />
                    </Box>
                    <Box
                      mt={2}
                      display={"flex"}
                      justifyContent={"space-between"}
                      alignItems={"center"}
                      gap={1}
                    >
                      <Box>
                        <Typography variant="h6">Chế độ riêng tư</Typography>
                        <Typography variant="body2">
                          Người dùng khác sẽ không thể sao chép gói khi bạn bật
                          Chế độ riêng tư
                        </Typography>
                      </Box>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={privateMode}
                            onChange={() => setPrivateMode(!privateMode)}
                          />
                        }
                      />
                    </Box>
                    <Box
                      mt={2}
                      display={"flex"}
                      justifyContent={"space-between"}
                      alignItems={"center"}
                      gap={1}
                    >
                      <Box>
                        <Typography variant="h6">Tín hiệu đảo lệnh</Typography>
                        <Typography variant="body2">
                          Lệnh bạn mở sẽ ngược lại với tín hiệu nhận được
                        </Typography>
                      </Box>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={reserveSignal}
                            onChange={() => setReserveSignal(!reserveSignal)}
                          />
                        }
                      />
                    </Box>
                  </Box>
                </Accordion>
              </Box>
            </Box>

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
              {/* <Button
                variant="outlined"
                sx={{ padding: "10px" }}
                fullWidth={downLg ? true : false}
              >
                Test Plan (0/40)
              </Button> */}
              <Button
                onClick={() => handleStep(2)}
                disabled={
                  isDisableButton === false && loading === false ? false : true
                }
                variant="contained"
                color="primary"
                fullWidth
                sx={{ padding: "10px" }}
              >
                Bước tiếp theo
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
                      ${investmentFund?.toFixed(2)}
                    </Typography>
                  </Box>
                  <Box sx={{ width: "calc(100% / 3)" }}>
                    <Typography variant="body2">Base Amount</Typography>
                    <Typography variant="subtitle1">${baseAmount}</Typography>
                  </Box>
                  <Box sx={{ width: "calc(100% / 3)" }}>
                    <Typography variant="body2">Account Type</Typography>
                    <Typography variant="subtitle1">{accountType}</Typography>
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
                      ${investmentFund?.toFixed(2)}
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
                disabled={loadingSubmit}
              >
                Confirm & Save
              </Button>
            </Box>
          </>
        )}
        {loading === true && <Backdrop />}
      </Box>
    </Drawer>
  );
};

export default NewPlanDrawer;
