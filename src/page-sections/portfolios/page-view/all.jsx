import {
  Box,
  // Avatar,
  styled,
  // Tooltip,
  Checkbox,
  IconButton,
  useMediaQuery,
  Typography,
  TextField,
  Button,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Menu,
  MenuItem,
  FormControl,
  Select,
  Pagination,
  CircularProgress,
  // Switch,
  Collapse,
  FormControlLabel,
  Badge,
} from "@mui/material";
import Layout from "../Layout";
import { isDark } from "util/constants";
import SearchIcon from "@mui/icons-material/Search";
import { Fragment, useContext, useEffect, useRef, useState } from "react";
import { MoreVert, Add, InsertChart } from "@mui/icons-material";
import moment from "moment";
// import NewBotAI from "../NewBotAI";
// import NewBotAIStringMethod from "../NewBotAIStringMethod";
import DeleteSignalStrategy from "../DeleteSignalStrategy";
import EmptyPage from "layouts/layout-parts/blank-list/BlankList";
import { PortfoliosContext } from "contexts/PortfoliosContext";
import SettingIcon from "icons/SettingIcon";
import DailyGoalDialog from "../dialog/DailyGoalDialog";
import NewPlanDrawer from "../drawer/NewPlanDrawer";
import AddIcon from "@mui/icons-material/Add";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ShareArchievement from "../dialog/ShareArchievement";
import RunningPlan from "../component/RunningPlan";
import PopupControll from "../popup/PopupControll";
// import axiosClient from "api/axiosClient";
import { showToast } from "components/toast/toast";
import userApi from "api/user/userApi";
import { SettingsContext } from "contexts/settingsContext";
import { ActionBotType, ActionBotTypeMessageSucces } from "type/ActionBotType";
import { SignalFeatureTypesTitle } from "type/SignalFeatureTypes";
import sortData from "util/sortData";
import { Link, useLocation, useNavigate } from "react-router-dom";
import formatCurrency from "util/formatCurrency";
import DuplicatePlan from "../dialog/DuplicatePlan";
import SharePlan from "../dialog/SharePlan";
import FilterIcon from "icons/duotone/FilterIcon";
import { GlobalContext } from "contexts/GlobalContext";
import AuthContext from "contexts/AuthContext";
// import { constant } from "constant/constant";
import SelectDirectLinkAccount from "./component/SelectDirectLinkAccount";
// import { AutoTypesTitle } from "type/AutoTypes";
import { BudgetStrategyTypeTitle } from "type/BudgetStrategyType";
import { useTranslation } from "react-i18next";
import OpenCopyPlanDialog from "../dialog/OpenCopyPlanDialog";
import portfolioApi from "api/portfolios/portfolioApi";
import FilterPortfolios from "./component/FilterPortfolios";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  padding: "20px",
  borderBottom: isDark(theme) ? "1px solid #323b49" : "1px solid #eeeff2",
  // width: theme.breakpoints.down("lg") ? "20%" : "auto",
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));


// const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   paddingLeft: 4,
//   paddingRight: 4,
//   gap: 10,
// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   borderBottom: isDark(theme) ? "1px solid #323b49" : "1px solid #eeeff2",
// }));

const PaginationContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
}));

const PortfoliosList = () => {
  const {
    data,
    setData,
    loading,
    setChangeNoLoading: setChangeData,
  } = useContext(PortfoliosContext);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { walletMode } = useContext(SettingsContext);
  const [dailyTarget, setDailyTarget] = useState({
    profit: 0,
    take_profit_target: 0,
    stop_loss_target: 0,
  });
  const canvasRef = useRef();
  const { setChange } = useContext(GlobalContext);
  const { selectedLinkAccount, userLinkAccountList } = useContext(AuthContext);
  const [initState, setInitState] = useState(false);
  const [dataState, setDataState] = useState([]);
  const [selectedBot, setSelectedBot] = useState();
  const [isEdit, setIsEdit] = useState(false);
  // const [isEditStringMethod, setIsEditStringMethod] = useState(false);
  const [isDeleteBot, setIsDeleteBot] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [anchorEls, setAnchorEls] = useState({});
  const [page, setPage] = useState(1);
  const downLg = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  const [openNewBotAI, setOpenNewBotAI] = useState(false);
  const [openFilterDialog, setOpenFilterDialog] = useState(false);
  const [openNewBotAIStringMethod, setOpenNewBotAIStringMethod] =
    useState(false);
  const [anchorElMenu, setAnchorElMenu] = useState(null);
  const [isOpenSetDailyGoal, setIsOpenSetDailyGoal] = useState(false);
  const [isOpenPlanDrawer, setIsOpenPlanDrawer] = useState(false);
  const [openRows, setOpenRows] = useState({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [checkedRows, setCheckedRows] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [duplicateOpen, setDuplicateOpen] = useState(false);
  const [sharePlanOpen, setSharePlanOpen] = useState(false);
  const [showAllLinkAccountId, setShowAllLinkAccountId] = useState(false);
  const [changeState, setChangeState] = useState(false);
  const [openCopyPlanPopup, setOpenCopyPlanPopup] = useState(false);
  const [hasFilter, setHasFilter]= useState(false)
  const [countFilter, setCountFilter]= useState(0)
  const location= useLocation()

  const handleDuplicateClose = () => {
    setDuplicateOpen(false);
  };

  const handleChangeShowAllLinkAccountId = (e) => {
    setShowAllLinkAccountId(e.target.checked);
    if (e.target.checked === true) {
      setDataState(data);
    } else {
      setDataState(
        data?.filter((item) => item?.linkAccountId === selectedLinkAccount)
      );
    }
  };

  // const handleDuplicateOpen = () => {
  //   setDuplicateOpen(true);
  // };

  const handleSharePlanClose = () => {
    setSharePlanOpen(false);
  };
  const handleSharePlanOpen = () => {
    setSharePlanOpen(true);
  };

  const handleToggleAllRows = (event) => {
    const checked = event.target.checked;
    const newCheckedRows = checkedRows.map(() => checked);
    setCheckedRows(newCheckedRows);
  };

  const handleToggleRow = (index) => {
    const newCheckedRows = [...checkedRows];
    newCheckedRows[index] = !newCheckedRows[index];
    setCheckedRows(newCheckedRows);
  };

  const handleDialogOpen = (plan) => {
    setSelectedPlan(plan);
    setDialogOpen(true);
  };
  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedPlan(null);
  };
  const handleRowClick = (index) => {
    setOpenRows((prevState) => ({ ...prevState, [index]: !prevState[index] }));
  };

  // const [loading, setLoading]= useState(false)
  const handleOpenSetDailyGoal = () => {
    setIsOpenSetDailyGoal(true);
  };

  const handleCloseSetDailyGoal = () => {
    setIsOpenSetDailyGoal(false);
  };

  const handleOpenPlanDrawer = () => {
    setIsOpenPlanDrawer(true);
  };

  const handleClosePlanDrawer = () => {
    setIsOpenPlanDrawer(false);
  };

  // const handleOpenDeleteBot = () => {
  //   setIsDeleteBot(true);
  // };
  const handleCloseDeleteBot = () => {
    setIsDeleteBot(false);
  };
  // const handleCloseNewBotAI = () => {
  //   setOpenNewBotAI(false);
  // };

  const handleOpenNewBotAI = () => {
    setOpenNewBotAI(true);
    setInitState(false);
    setIsEdit(false);
  };

  const handleEditBotAI = () => {
    setOpenNewBotAI(true);
    setIsEdit(true);
  };

  const handleOpenNewBotAIStringMethod = () => {
    setOpenNewBotAIStringMethod(true);
  };
  // const handleCloseNewBotAIStringMethod = () => {
  //   setOpenNewBotAIStringMethod(false);
  // };

  // const handleClick = (event, index) => {
  //   setAnchorEls((prev) => ({ ...prev, [index]: event.currentTarget }));
  // };

  const handleClose = (index) => {
    setAnchorEls((prev) => ({ ...prev, [index]: null }));
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(1);
  };

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  // const handleMenuClick = (event) => {
  //   setAnchorElMenu(event.currentTarget);
  // };

  const handleMenuClose = () => {
    setAnchorElMenu(null);
  };

  const handleMoreClick = (event, index) => {
    setAnchorEls((prevState) => ({
      ...prevState,
      [index]: event.currentTarget,
    }));
  };

  const handlePausePlan = async () => {
    const selectedPlans = dataState.filter(
      (_, index) => checkedRows[index] === true
    );
    // setLoading(true);

    try {
      const payload = {
        ids: selectedPlans?.map((item) => item?._id),
        action: ActionBotType.PAUSE,
      };
      const responses = await portfolioApi.userBotActionList(payload);
      if (responses?.data?.ok === true) {
        showToast(ActionBotTypeMessageSucces[ActionBotType.PAUSE], "success");
        setChangeData((prev) => !prev);
      }
      // const requests = selectedPlans.map((plan, index) =>
      //   axiosClient.post(`/users/bot/action/${plan?._id}`, {
      //     action: ActionBotType.PAUSE,
      //   })
      // );

      // const responses = await Promise.all(requests);
      // const listResult = responses?.map((item) => item.data.ok);
      // setData();
      // setData(
      //   data?.map((item, key) => {
      //     if (
      //       selectedPlans.some((obj) => obj._id === item._id) &&
      //       listResult[key] === true
      //     ) {
      //       return { ...item, isRunning: false };
      //     }
      //     // if(selectedPlans.some(obj=> obj._id=== item._id) && listResult[key]=== false) {
      //     //   return ({...item, isRunning: false})
      //     // }
      //     else {
      //       return { ...item };
      //     }
      //   })
      // );
    } catch (error) {
      console.error("Error sending requests:", error);
    } finally {
      // setLoading(false);
    }
  };

  const handleStopPlan = async () => {
    const selectedPlans = dataState.filter(
      (_, index) => checkedRows[index] === true
    );
    // setLoading(true);

    try {
      // const requests = selectedPlans.map((plan, index) =>
      //   axiosClient.post(`/users/bot/action/${plan?._id}`, {
      //     action: ActionBotType.STOP,
      //   })
      // );

      // const responses = await Promise.all(requests);
      // const listResult = responses?.map((item) => item.data.ok);
      // setData();
      // setData(
      //   data?.map((item, key) => {
      //     if (
      //       selectedPlans.some((obj) => obj._id === item._id) &&
      //       listResult[key] === true
      //     ) {
      //       return { ...item, isRunning: false };
      //     }
      //     // if(selectedPlans.some(obj=> obj._id=== item._id) && listResult[key]=== false) {
      //     //   return ({...item, isRunning: false})
      //     // }
      //     else {
      //       return { ...item };
      //     }
      //   })
      // );
      const payload = {
        ids: selectedPlans?.map((item) => item?._id),
        action: ActionBotType.STOP,
      };
      const responses = await portfolioApi.userBotActionList(payload);
      if (responses?.data?.ok === true) {
        showToast(ActionBotTypeMessageSucces[ActionBotType.STOP], "success");
        setChangeData((prev) => !prev);
      }
    } catch (error) {
      console.error("Error sending requests:", error);
    } finally {
      // setLoading(false);
    }
  };
  // ok
  const handleResumePlan = async () => {
    const selectedPlans = dataState.filter(
      (_, index) => checkedRows[index] === true
    );
    // setLoading(true);

    try {
      // const requests = selectedPlans.map((plan, index) =>
      //   axiosClient.post(`/users/bot/action/${plan?._id}`, {
      //     action: ActionBotType.RESUME,
      //   })
      // );
      const payload = {
        ids: selectedPlans?.map((item) => item?._id),
        action: ActionBotType.RESUME,
      };
      const responses = await portfolioApi.userBotActionList(payload);
      if (responses?.data?.ok === true) {
        showToast(ActionBotTypeMessageSucces[ActionBotType.RESUME], "success");
        setChangeData((prev) => !prev);
      }
      // const responses = await Promise.all(requests);
      // const listResult = responses?.map((item) => item.data.ok);
      // setData();
      // setData(
      //   dataState?.map((item, key) => {
      //     if (
      //       selectedPlans.some((obj) => obj._id === item._id) &&
      //       listResult[key] === true
      //     ) {
      //       return { ...item, isRunning: true };
      //     } else {
      //       return { ...item };
      //     }
      //   })
      // );
    } catch (error) {
      console.error("Error sending requests:", error);
    } finally {
      // setLoading(false);
    }
  };

  const handleRestartPlan = async () => {
    const selectedPlans = dataState.filter(
      (_, index) => checkedRows[index] === true
    );
    // setLoading(true);

    try {
      const payload = {
        ids: selectedPlans?.map((item) => item?._id),
        action: ActionBotType.RESTART,
      };
      const responses = await portfolioApi.userBotActionList(payload);
      if (responses?.data?.ok === true) {
        showToast(ActionBotTypeMessageSucces[ActionBotType.RESTART], "success");
        setChangeData((prev) => !prev);
      }
      // const requests = selectedPlans.map((plan, index) =>
      //   axiosClient.post(`/users/bot/action/${plan?._id}`, {
      //     action: ActionBotType.RESTART,
      //   })
      // );

      // const responses = await Promise.all(requests);
      // const listResult = responses?.map((item) => item.data.ok);
      // // setData();
      // showToast(ActionBotTypeMessageSucces[ActionBotType.RESTART], "success");
      // setData(
      //   data?.map((item, key) => {
      //     if (
      //       selectedPlans.some((obj) => obj._id === item._id) &&
      //       listResult[key] === true
      //     ) {
      //       return { ...item, isRunning: true };
      //     } else {
      //       return { ...item };
      //     }
      //   })
      // );
    } catch (error) {
      console.error("Error sending requests:", error);
    } finally {
      // setLoading(false);
    }
  };

  const handleResetPlan = async () => {
    const selectedPlans = dataState.slice(
      rowsPerPage * (page - 1),
      rowsPerPage * (page - 1) + rowsPerPage
    ).filter(
      (_, index) => checkedRows[index] === true
    );
    // setLoading(true);
    // a roi oke cho e ti

    try {
      const payload = {
        ids: selectedPlans?.map((item) => item?._id),
        action: ActionBotType.RESET,
      };
      const responses = await portfolioApi.userBotActionList(payload);
      if (responses?.data?.ok === true) {
        showToast(ActionBotTypeMessageSucces[ActionBotType.RESET], "success");
        setChangeData((prev) => !prev);
      }
      // const requests = selectedPlans.map((plan, index) =>
      //   axiosClient.post(`/users/bot/action/${plan?._id}`, {
      //     action: ActionBotType.RESET,
      //   })
      // );

      // const responses = await Promise.all(requests);
      // const listResult = responses?.map((item) => item.data.ok);
      // // setData();
      // showToast(ActionBotTypeMessageSucces[ActionBotType.RESET], "success");
      // setData(
      //   data?.map((item, key) => {
      //     if (
      //       selectedPlans.some((obj) => obj._id === item._id) &&
      //       listResult[key] === true
      //     ) {
      //       return { ...item, isRunning: true };
      //     } else {
      //       return { ...item };
      //     }
      //   })
      // );
    } catch (error) {
      console.error("Error sending requests:", error);
    } finally {
      // setLoading(false);
    }
  };

  const handleRemovePlan = async () => {
    const selectedPlans = dataState.slice(
      rowsPerPage * (page - 1),
      rowsPerPage * (page - 1) + rowsPerPage
    ).filter(
      (_, index) => checkedRows[index] === true
    );
    // setLoading(true);

    try {
      const payload = {
        ids: selectedPlans?.map((item) => item?._id),
        action: ActionBotType.REMOVE,
      };
      const responses = await portfolioApi.userBotActionList(payload);
      if (responses?.data?.ok === true) {
        showToast(ActionBotTypeMessageSucces[ActionBotType.REMOVE], "success");
        setChangeData((prev) => !prev);
      }
      // const requests = selectedPlans.map((plan, index) =>
      //   axiosClient.post(`/users/bot/action/${plan?._id}`, {
      //     action: ActionBotType.REMOVE,
      //   })
      // );

      // const responses = await Promise.all(requests);
      // // const listResult = responses?.map((item) => item.data.ok);
      // // setData();
      // showToast("Xoá các gói đã chọn thành công", "success");
      // setData(
      //   dataState?.filter(
      //     (item, key) => !selectedPlans.find((a) => a._id === item._id)
      //   )
      // );
      // setChange((prev) => !prev);
    } catch (error) {
      console.error("Error sending requests:", error);
    } finally {
      // setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const filtered = data.filter((item) =>
      item.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setDataState(filtered);
  };

  useEffect(() => {
    setCheckedRows(
      dataState
        .slice(rowsPerPage * (page - 1), rowsPerPage * (page - 1) + rowsPerPage)
        ?.map((item) => false)
    );
  }, [data, page, rowsPerPage, dataState]);

  useEffect(() => {
    // Check if at least one row is checked to show the popup
    const isChecked = checkedRows.some((row) => row);
    setShowPopup(isChecked);
  }, [checkedRows]);

  useEffect(() => {
    if (selectedLinkAccount && walletMode) {
      (async () => {
        const response = await userApi.getUsersExchangeLinkAccountDailyTarget(
          {
            params: { accountType: walletMode ? "LIVE" : "DEMO" },
          },
          selectedLinkAccount
        );
        if (response?.data?.ok === true) {
          setDailyTarget(response?.data?.d);
        }
      })();
    }
  }, [walletMode, selectedLinkAccount]);

  useEffect(() => {
    if(hasFilter) {

    }
    else {
      if (showAllLinkAccountId === true) {
        if(walletMode) {
          // console.log(1)
          setDataState(sortData(data?.filter(item=> item?.accountType=== "LIVE"), "createdAt", "desc"));
        }
        else {
          // console.log(2)
  
          setDataState(sortData(data?.filter(item=> item?.accountType=== "DEMO"), "createdAt", "desc"));
        }
      } else {
        if(walletMode) {
          // console.log(3)
          
          setDataState(
            sortData(data?.filter(item=> item?.accountType=== "LIVE"), "createdAt", "desc")?.filter(
              (item) => (item?.linkAccountId === selectedLinkAccount || !userLinkAccountList?.includes(item?.linkAccountId) || userLinkAccountList?.includes(item?.linkAccountId)=== false)
            )
          );
        }
        else {
          // console.log(4)
  
          setDataState(
            sortData(data?.filter(item=> item?.accountType=== "DEMO"), "createdAt", "desc")?.filter(
              (item) => (item?.linkAccountId === selectedLinkAccount || !userLinkAccountList?.includes(item?.linkAccountId) || userLinkAccountList?.includes(item?.linkAccountId)=== false)
            )
          );
        }
        
      }
    }
  }, [data, showAllLinkAccountId, selectedLinkAccount, changeState, walletMode, userLinkAccountList, hasFilter]);

  // useEffect(() => {
  //   if (showAllLinkAccountId === true) {
  //     setDataState(data);
  //   } else {
  //     setDataState(
  //       data?.filter((item) => item?.linkAccountId === selectedLinkAccount)
  //     );
  //   }
  // }, [data, selectedLinkAccount, showAllLinkAccountId]);

  useEffect(()=> {
    if(location?.state?.isFromDeleteBot && location?.state?.isFromDeleteBot=== true) {
      // console.log(dataState?.filter(item=> item?._id !== location?.state?.botId))
      // setDataState(dataState?.filter(item=> item?._id !== location?.state?.botId))
      setChangeData(prev=> !prev)
      // window.history.replaceState({}, '')
    }
  }, [location])

  return (
    <Layout>
      <Box pt={2} pb={4}>
        <Box sx={{ padding: "10px" }}>
          <Box sx={{ padding: downLg ? "" : "20px" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 2,
                flexDirection: downLg ? "column" : "row",
              }}
            >
              <Box sx={{ width: downLg ? "100%" : "auto" }} display={"flex"}>
                <Box sx={{ width: "100%", paddingRight: "10px" }}>
                  <TextField
                    variant="outlined"
                    placeholder={t("Search Plan...")}
                    sx={{ width: downLg ? "aaa" : 450 }}
                    InputProps={{
                      startAdornment: (
                        <SearchIcon sx={{ color: "text.secondary", mr: 1 }} />
                      ),
                    }}
                    onChange={handleSearch}
                    inputProps={{
                      style: {
                        height: "24px",
                      },
                    }}
                  />
                </Box>
                {downLg && (
                  <Box sx={{ width: "40%" }}>
                    <Button
                      variant="outlined"
                      sx={{
                        mr: 2,
                        "& .MuiButton-endIcon": {
                          margin: downLg ? 0 : "",
                        },
                      }}
                      size={downLg ? "large" : "medium"}
                      fullWidth={downLg ? true : false}
                      endIcon={<SettingIcon width={16} />}
                      onClick={handleOpenSetDailyGoal}
                    >
                      {dailyTarget?.stop_loss_target === 0 &&
                        dailyTarget?.take_profit_target === 0 &&
                        t("Daily Goal")}
                      {(dailyTarget?.stop_loss_target !== 0 ||
                        dailyTarget?.take_profit_target !== 0) && (
                        <Box display={"flex"} alignItems={"center"} mr={0.5}>
                          <Typography
                            color="success.main"
                            fontSize={12}
                            fontWeight={600}
                          >
                            {formatCurrency(dailyTarget?.take_profit_target)}
                          </Typography>
                          &nbsp;/&nbsp;
                          <Typography
                            color="error.main"
                            fontSize={12}
                            fontWeight={600}
                          >
                            {formatCurrency(
                              dailyTarget?.stop_loss_target
                            )?.replace("+", "-")}
                          </Typography>
                        </Box>
                      )}
                    </Button>
                  </Box>
                )}
              </Box>
              {loading === false && (
                <Box mt={downLg ? 2 : 0} display={downLg ? "flex" : "flex"}>
                  {/* {!downLg && (
                    <Box>
                      <FormControlLabel
                        label={t("Show all account")}
                        control={
                          <Checkbox
                            checked={showAllLinkAccountId}
                            onChange={handleChangeShowAllLinkAccountId}
                          />
                        }
                      />
                    </Box>
                  )} */}
                  {!downLg && (
                    <Button
                      variant="outlined"
                      sx={{
                        mr: 2,
                        "& .MuiButton-endIcon": {
                          margin: downLg ? 0 : "",
                        },
                      }}
                      size={downLg ? "large" : "medium"}
                      fullWidth={downLg ? true : false}
                      endIcon={<SettingIcon />}
                      onClick={handleOpenSetDailyGoal}
                    >
                      {dailyTarget?.stop_loss_target === 0 &&
                        dailyTarget?.take_profit_target === 0 &&
                        t("Daily Goal")}
                      {(dailyTarget?.stop_loss_target !== 0 ||
                        dailyTarget?.take_profit_target !== 0) && (
                        <>
                          <Typography
                            color="success.main"
                            fontSize={14}
                            fontWeight={600}
                          >
                            {formatCurrency(dailyTarget?.take_profit_target)}
                          </Typography>
                          &nbsp;/&nbsp;
                          <Typography
                            color="error.main"
                            fontSize={14}
                            fontWeight={600}
                          >
                            {formatCurrency(
                              dailyTarget?.stop_loss_target
                            )?.replace("+", "-")}
                          </Typography>
                        </>
                      )}
                    </Button>
                  )}
                  {!downLg && (
                    <Button
                      
                      onClick={() => {
                        setOpenFilterDialog(true);
                      }}
                      variant="outlined"
                      sx={{
                        mr: 2,
                        "& .MuiButton-endIcon": {
                          margin: downLg ? 0 : "",
                        },
                      }}
                      size={downLg ? "large" : "medium"}
                      fullWidth={downLg ? true : false}
                      endIcon={<StyledBadge badgeContent={countFilter} color="primary">
                          <FilterIcon  />
                        </StyledBadge>
                        }
                      // onClick={handleDialogOpen}
                    >
                      {downLg ? "" : t("Filter")}
                    </Button>
                  )}
                  {downLg && (
                    <Button
                      onClick={() => {
                        setOpenFilterDialog(true);
                      }}
                      variant="outlined"
                      sx={{
                        mr: 2,
                        "& .MuiButton-endIcon": {
                          margin: downLg ? 0 : "",
                        },
                      }}
                      size={downLg ? "large" : "medium"}
                      fullWidth={downLg ? true : false}
                      endIcon={
                        <StyledBadge badgeContent={countFilter} color="primary">
                          <FilterIcon />
                        </StyledBadge>
                      }
                      // onClick={handleDialogOpen}
                    >
                      {downLg ? "" : t("Filter")}
                    </Button>
                  )}
                  <Button
                    variant="outlined"
                    sx={{
                      mr: 2,
                      "& .MuiButton-endIcon": {
                        margin: downLg ? 0 : "",
                      },
                    }}
                    size={downLg ? "large" : "medium"}
                    fullWidth={downLg ? true : false}
                    endIcon={<ContentCopyIcon />}
                    onClick={() => {
                      setOpenCopyPlanPopup(true);
                    }}
                    // onClick={handleDialogOpen}
                  >
                    {downLg ? "" : t("Copy")}
                  </Button>
                  <Button
                    variant="contained"
                    fullWidth={downLg ? true : false}
                    size={downLg ? "large" : "medium"}
                    color="success"
                    endIcon={<AddIcon />}
                    // onClick={handleOpenNewBudgetStrategy}
                    onClick={handleOpenPlanDrawer}
                    sx={{
                      "& .MuiButton-endIcon": {
                        margin: downLg ? 0 : "",
                      },
                    }}
                  >
                    {downLg ? "" : t("Create Plan")}
                  </Button>

                  <Menu
                    anchorEl={anchorElMenu}
                    open={Boolean(anchorElMenu)}
                    onClose={handleMenuClose}
                    // anchorPosition={""}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                  >
                    <MenuItem
                      onClick={() => {
                        handleOpenNewBotAIStringMethod();
                        handleMenuClose();
                      }}
                    >
                      <Add />
                      String Method mới
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        // Handle new candle model action
                        handleOpenNewBotAI();
                        handleMenuClose();
                      }}
                    >
                      <InsertChart />
                      {t(" New Candle Pattern")}
                    </MenuItem>
                  </Menu>
                </Box>
              )}
              {downLg && (
                <>
                  {/* <Box>
                    <FormControlLabel
                      label={t("Show all account")}
                      control={
                        <Checkbox
                          checked={showAllLinkAccountId}
                          onChange={handleChangeShowAllLinkAccountId}
                        />
                      }
                    />
                  </Box> */}
                  <Box>
                    <FormControlLabel
                      label={t("Select all")}
                      control={
                        <Checkbox
                          checked={checkedRows.every(Boolean)}
                          onChange={handleToggleAllRows}
                        />
                      }
                    />
                  </Box>
                </>
              )}
            </Box>
            <Box sx={{ position: "relative" }}>
              <TableContainer component={Paper}>
                <Table>
                  {!downLg && (
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>
                          <Checkbox
                            checked={checkedRows.every(Boolean)}
                            onChange={handleToggleAllRows}
                          />
                        </StyledTableCell>
                        <StyledTableCell>{t("Plan Name")}</StyledTableCell>
                        <StyledTableCell>{t("7-days profit")}</StyledTableCell>
                        <StyledTableCell>
                          <Typography>{t("profit")}</Typography>
                          <Typography
                            fontWeight={600}
                            fontSize={14}
                            color={
                              dailyTarget?.profit >= 0
                                ? "success.main"
                                : "error.main"
                            }
                          >
                            {formatCurrency(dailyTarget?.profit)}
                          </Typography>
                        </StyledTableCell>
                        <StyledTableCell>{t("linked_account")}</StyledTableCell>
                        <StyledTableCell>{t("Actions")}</StyledTableCell>
                        <StyledTableCell></StyledTableCell>
                      </TableRow>
                    </TableHead>
                  )}
                  <TableBody>
                    {loading === true && (
                      <TableRow>
                        <TableCell
                          rowSpan={10}
                          colSpan={3}
                          align="center"
                          sx={{ height: 200 }}
                        >
                          <CircularProgress />
                        </TableCell>
                      </TableRow>
                    )}

                    {loading === false &&
                      dataState
                        .slice(
                          rowsPerPage * (page - 1),
                          rowsPerPage * (page - 1) + rowsPerPage
                        )
                        ?.map((plan, index) => (
                          <Fragment key={index}>
                            <TableRow
                              sx={{
                                display: downLg ? "flex" : "",
                                flexWrap: downLg ? "wrap" : "",
                                marginBottom: "12px",
                              }}
                            >
                              {!downLg && (
                                <StyledTableCell>
                                  <Checkbox
                                    checked={checkedRows[index] ? true : false}
                                    onChange={() => handleToggleRow(index)}
                                  />
                                </StyledTableCell>
                              )}
                              <StyledTableCell
                                sx={{ width: downLg ? "100%" : "aaa" }}
                              >
                                <Box
                                  sx={{
                                    display: downLg ? "flex" : "",
                                    alignItems: "center",
                                  }}
                                >
                                  {downLg && (
                                    <Checkbox
                                      checked={
                                        checkedRows[index] ? true : false
                                      }
                                      onChange={() => handleToggleRow(index)}
                                    />
                                  )}
                                  <Box>
                                    <Typography
                                      onClick={() => {
                                        // navigate(plan._id);
                                      }}
                                      variant="body1"
                                      fontWeight={"600"}
                                      sx={{ cursor: "pointer" }}
                                    >
                                      <Link
                                        style={{ color: "unset" }}
                                        to={plan._id}
                                      >
                                        {plan.name}
                                      </Link>
                                    </Typography>
                                    <Typography
                                      variant="body2"
                                      color="textSecondary"
                                    >
                                      {t("Created")}:{" "}
                                      {moment(plan.createdAt).format(
                                        "DD-MM-YYYY, HH:mm:ss"
                                      )}
                                    </Typography>
                                  </Box>
                                </Box>
                              </StyledTableCell>
                              <StyledTableCell
                                sx={{
                                  width: downLg ? "100%" : "aaa",
                                  display: downLg ? "flex" : "",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                }}
                              >
                                {downLg && (
                                  <Typography
                                    variant="body2"
                                    color="textSecondary"
                                  >
                                    {t("7-days profit")}
                                  </Typography>
                                )}
                                <Typography
                                  fontWeight={600}
                                  variant="body2"
                                  color={
                                    plan?.week_profit >= 0
                                      ? "success.main"
                                      : "error.main"
                                  }
                                >
                                  {formatCurrency(plan?.week_profit)}
                                </Typography>
                              </StyledTableCell>
                              <StyledTableCell
                                sx={{
                                  width: downLg ? "100%" : "aaa",
                                  display: downLg ? "flex" : "",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                }}
                              >
                                {downLg && (
                                  <Box>
                                    <Typography
                                      variant="body2"
                                      color="textSecondary"
                                    >
                                      {t("profit")}
                                    </Typography>
                                    {/* <Typography
                                      fontWeight={600}
                                      fontSize={12}
                                      color={
                                        dailyTarget?.profit >= 0
                                          ? "success.main"
                                          : "error.main"
                                      }
                                    >
                                      {formatCurrency(dailyTarget?.profit)}
                                    </Typography> */}
                                  </Box>
                                )}
                                <Typography
                                  fontWeight={600}
                                  variant="body2"
                                  color={
                                    plan?.total_profit >= 0
                                      ? "success.main"
                                      : "error.main"
                                  }
                                >
                                  {formatCurrency(plan?.total_profit)}
                                </Typography>
                              </StyledTableCell>
                              <StyledTableCell
                                sx={{
                                  width: downLg ? "100%" : "aaa",
                                  display: downLg ? "flex" : "",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                }}
                              >
                                {downLg && (
                                  <Typography
                                    variant="body2"
                                    color="textSecondary"
                                  >
                                    {t("linked_account")}
                                  </Typography>
                                )}
                                <SelectDirectLinkAccount
                                  plan={plan}
                                  setData={setData}
                                  data={data}
                                  userLinkAccountList={userLinkAccountList}
                                />
                              </StyledTableCell>
                              <StyledTableCell
                                sx={{
                                  width: downLg ? "100%" : "aaa",
                                  display: downLg ? "flex" : "",
                                }}
                              >
                                <RunningPlan
                                  dataState={dataState}
                                  data={data}
                                  setData={setData}
                                  plan={plan}
                                  changeState={changeState}
                                />
                                <IconButton
                                  onClick={(event) =>
                                    handleMoreClick(event, index)
                                  }
                                >
                                  <MoreVertIcon />
                                </IconButton>
                                <Menu
                                  anchorEl={anchorEls[index]}
                                  open={Boolean(anchorEls[index])}
                                  onClose={() => handleClose(index)}
                                  disableScrollLock={true}
                                >
                                  <MenuItem
                                    onClick={() => {
                                      handleClose(index);
                                      handleEditBotAI();
                                      handleOpenPlanDrawer();
                                      setSelectedPlan(plan);
                                    }}
                                  >
                                    {t("edit_configuration")}
                                  </MenuItem>
                                  {/* <MenuItem
                                    onClick={() => {
                                      handleDuplicateOpen();
                                      setSelectedPlan(plan);
                                      handleClose(index);
                                    }}
                                  >
                                    Duplicate Plan
                                  </MenuItem> */}
                                  <MenuItem
                                    onClick={() => {
                                      handleDialogOpen(plan);
                                      setSelectedPlan(plan);
                                      handleClose(index);
                                    }}
                                  >
                                    {t("Share Media")}
                                  </MenuItem>
                                  <MenuItem
                                    onClick={() => {
                                      handleSharePlanOpen();
                                      setSelectedPlan(plan);
                                      handleClose(index);
                                    }}
                                  >
                                    {t("Share Plan")}
                                  </MenuItem>
                                  {/* <MenuItem onClick={() => handleClose(index)}>
                                    Copy plan to LIVE
                                  </MenuItem> */}
                                </Menu>
                              </StyledTableCell>

                              <StyledTableCell
                                sx={{ width: downLg ? "100%" : "aaa" }}
                              >
                                <Box
                                  display={"flex"}
                                  flexDirection={"row-reverse"}
                                  sx={{
                                    justifyContent: downLg ? "center" : "",
                                    alignItems: "center",
                                    cursor: "pointer",
                                  }}
                                  onClick={() => handleRowClick(index)}
                                >
                                  <IconButton>
                                    {openRows[index] ? (
                                      <KeyboardArrowUpIcon />
                                    ) : (
                                      <KeyboardArrowDownIcon />
                                    )}
                                  </IconButton>
                                  {downLg && (
                                    <Typography>
                                      {openRows[index]
                                        ? t("See less")
                                        : t("See more")}
                                    </Typography>
                                  )}
                                </Box>
                              </StyledTableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell
                                style={{
                                  paddingBottom: 0,
                                  paddingTop: 0,
                                  paddingLeft: 20,
                                  paddingRight: 20,
                                }}
                                colSpan={6}
                              >
                                <Collapse
                                  in={openRows[index]}
                                  timeout="auto"
                                  unmountOnExit
                                >
                                  <Box margin={1}>
                                    <Box
                                      sx={{
                                        display: "flex",
                                        justifyContent: downLg
                                          ? ""
                                          : "space-between",
                                        alignItems: downLg ? "" : "center",
                                        flexDirection: downLg
                                          ? "column"
                                          : "row",
                                      }}
                                    >
                                      <Box
                                        flex={1}
                                        mb={downLg ? 1 : 0}
                                        sx={{
                                          display: downLg ? "flex" : "",
                                          justifyContent: "space-between",
                                          alignItems: "center",
                                          flexDirection: "row-reverse",
                                        }}
                                      >
                                        <Typography
                                          variant="body1"
                                          component="div"
                                          fontSize={14}
                                        >
                                          {
                                            SignalFeatureTypesTitle[
                                              plan.signal_feature
                                            ]
                                          }
                                        </Typography>
                                        <Typography fontSize={12}>
                                          {t("signal_strategy")}
                                        </Typography>
                                      </Box>
                                      {plan?.isCopy !== true && (
                                        <Box
                                          flex={1}
                                          mb={downLg ? 1 : 0}
                                          sx={{
                                            display: downLg ? "flex" : "",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            flexDirection: "row-reverse",
                                          }}
                                        >
                                          <Typography
                                            variant="body1"
                                            component="div"
                                            fontSize={14}
                                          >
                                            {
                                              BudgetStrategyTypeTitle[
                                                plan?.lastData?.budgetStrategy
                                                  ?.bs?.budgetStrategyType
                                              ]
                                            }
                                          </Typography>
                                          <Typography fontSize={12}>
                                            {t("budget_strategy")}
                                          </Typography>
                                        </Box>
                                      )}
                                      <Box
                                        flex={1}
                                        mb={downLg ? 1 : 0}
                                        sx={{
                                          display: downLg ? "flex" : "",
                                          justifyContent: "space-between",
                                          alignItems: "center",
                                          flexDirection: "row-reverse",
                                        }}
                                      >
                                        <Typography
                                          variant="body1"
                                          component="div"
                                          fontSize={14}
                                        >
                                          ${plan?.margin_dense?.toFixed(2)}
                                        </Typography>
                                        <Typography fontSize={12}>
                                          {t("entry_coefficient")}
                                        </Typography>
                                      </Box>
                                      {/*  */}
                                      <Box
                                        flex={1}
                                        mb={downLg ? 1 : 0}
                                        sx={{
                                          display: downLg ? "flex" : "",
                                          justifyContent: "space-between",
                                          alignItems: "center",
                                          flexDirection: "row-reverse",
                                        }}
                                      >
                                        <Typography
                                          variant="body1"
                                          component="div"
                                          fontSize={14}
                                        >
                                          ${plan?.lastData.child_profit?.toFixed(2)}
                                        </Typography>
                                        <Typography fontSize={12}>
                                          {t("child_profit")}
                                        </Typography>
                                      </Box>
                                    </Box>

                                    {/* Place any additional content here */}
                                  </Box>
                                </Collapse>
                              </TableCell>
                            </TableRow>
                          </Fragment>
                        ))}
                  </TableBody>
                </Table>
              </TableContainer>
              {loading === false && dataState?.length <= 0 && (
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <EmptyPage
                    title={t("Your portfolio is empty")}
                    subTitle={t(
                      "Start exploring investment opportunities and earn profits by start an investment plan today"
                    )}
                    titleButton={t("Create Your Strategy")}
                    actionClick={handleOpenPlanDrawer}
                  />
                </Box>
              )}
              {showPopup === true && (
                <PopupControll
                  onClickPause={handlePausePlan}
                  onClickStart={handleResumePlan}
                  onClickDelete={handleRemovePlan}
                  onClickReset={handleResetPlan}
                  onClickRestart={handleRestartPlan}
                  onClickStop={handleStopPlan}
                />
              )}
            </Box>
            <PaginationContainer>
              <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                gap={1}
              >
                <Typography>{t("Show result:")}</Typography>
                <FormControl variant="outlined" sx={{ minWidth: 60 }}>
                  <Select
                    value={rowsPerPage}
                    onChange={handleChangeRowsPerPage}
                  >
                    <MenuItem value={6}>6</MenuItem>
                    <MenuItem value={12}>12</MenuItem>
                    <MenuItem value={24}>24</MenuItem>
                    <MenuItem value={dataState.length}>{t("all")}</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Pagination
                count={Math.ceil(dataState.length / rowsPerPage)}
                page={page}
                onChange={handleChangePage}
                shape="rounded"
              />
            </PaginationContainer>
          </Box>
        </Box>
        {/* <NewBotAI
          initState={initState}
          open={openNewBotAI}
          onClose={handleCloseNewBotAI}
          selectedBot={selectedBot}
          setSelectedBot={setSelectedBot}
          is_edit={isEdit}
          setIsEdit={setIsEdit}
        /> */}
        {/* <NewBotAIStringMethod open={openNewBotAIStringMethod} onClose={handleCloseNewBotAIStringMethod} is_edit={isEditStringMethod} setIsEdit={setIsEditStringMethod} selectedBot={selectedBot} /> */}
        <DeleteSignalStrategy
          open={isDeleteBot}
          onClose={handleCloseDeleteBot}
          selectedBot={selectedBot}
          setData={setData}
          data={data}
        />
        <DailyGoalDialog
          dailyTarget={dailyTarget}
          setDailyTarget={setDailyTarget}
          open={isOpenSetDailyGoal}
          handleClose={handleCloseSetDailyGoal}
        />
        <NewPlanDrawer
          open={isOpenPlanDrawer}
          handleClose={handleClosePlanDrawer}
          isEdit={isEdit}
          selectedPlan={selectedPlan}
          setData={setDataState}
          dataProps={dataState}
          setIsEdit={setIsEdit}
          setChangeState={setChangeState}
        />
        <ShareArchievement
          open={dialogOpen}
          handleClose={handleDialogClose}
          selectedPlan={selectedPlan}
          ref={canvasRef}
        />
        <DuplicatePlan
          open={duplicateOpen}
          onClose={handleDuplicateClose}
          selectedPlan={selectedPlan}
          setData={setData}
        />
        <SharePlan
          title={t("Share Investment Plan")}
          title2={t("Easy way to share your superb plan!")}
          title3={t(
            "Share your Investment Plan Code to your peers and trade together."
          )}
          open={sharePlanOpen}
          onClose={handleSharePlanClose}
          selectedPlan={selectedPlan}
          setData={setData}
          isFromPortfolios={true}
        />
        <OpenCopyPlanDialog
          dataProps={data}
          setDataProps={setData}
          open={openCopyPlanPopup}
          onClose={() => {
            setOpenCopyPlanPopup(false);
          }}
          changeState={changeState}
          setChangeState={setChangeState}
        />
        <FilterPortfolios
          open={openFilterDialog}
          onClose={() => {
            setOpenFilterDialog(false);
          }}
          setData={setDataState}
          data={data}
          setPage={setPage}
          changeState={changeState}
          showAllLinkAccountId={showAllLinkAccountId}
          hasFilter={hasFilter}
          setHasFilter={setHasFilter}
          countFilter={countFilter}
          setCountFilter={setCountFilter}
        />
      </Box>
    </Layout>
  );
};
export default PortfoliosList;
