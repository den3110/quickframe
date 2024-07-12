import {
  Box,
  Avatar,
  styled,
  Tooltip,
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
  Switch,
  Collapse,
} from "@mui/material";
import Layout from "../Layout";
import { isDark } from "utils/constants";
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
import axiosClient from "api/axiosClient";
import { showToast } from "components/toast/toast";
import userApi from "api/user/userApi";
import { SettingsContext } from "contexts/settingsContext";
import { ActionBotType } from "type/ActionBotType";
import { SignalFeatureTypesTitle } from "type/SignalFeatureTypes";
import sortData from "util/sortData";
import { useNavigate } from "react-router-dom";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  padding: "20px",
  borderBottom: isDark(theme) ? "1px solid #323b49" : "1px solid #eeeff2",
  // width: theme.breakpoints.down("lg") ? "20%" : "auto",
}));

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  paddingLeft: 4,
  paddingRight: 4,
  gap: 10,
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  borderBottom: isDark(theme) ? "1px solid #323b49" : "1px solid #eeeff2",
}));

const PaginationContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
}));

const PortfoliosList = () => {
  const { data, setData, loading } = useContext(PortfoliosContext);
  const navigate= useNavigate()
  const { walletMode } = useContext(SettingsContext);
  const [dailyTarget, setDailyTarget] = useState({
    profit: 0,
    take_profit_target: 0,
    stop_loss_target: 0,
  });
  const canvasRef = useRef();
  const [initState, setInitState] = useState(false);
  const [selectedBot, setSelectedBot] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const [isEditStringMethod, setIsEditStringMethod] = useState(false);
  const [isDeleteBot, setIsDeleteBot] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [anchorEls, setAnchorEls] = useState({});
  const [page, setPage] = useState(1);
  const downLg = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  const [openNewBotAI, setOpenNewBotAI] = useState(false);
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

  const handleOpenDeleteBot = () => {
    setIsDeleteBot(true);
  };
  const handleCloseDeleteBot = () => {
    setIsDeleteBot(false);
  };
  const handleCloseNewBotAI = () => {
    setOpenNewBotAI(false);
  };

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
  const handleCloseNewBotAIStringMethod = () => {
    setOpenNewBotAIStringMethod(false);
  };

  const handleClick = (event, index) => {
    setAnchorEls((prev) => ({ ...prev, [index]: event.currentTarget }));
  };

  const handleClose = (index) => {
    setAnchorEls((prev) => ({ ...prev, [index]: null }));
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
  };

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const handleMenuClick = (event) => {
    setAnchorElMenu(event.currentTarget);
  };

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
    const selectedPlans = data.filter(
      (_, index) => checkedRows[index] === true
    );
    // setLoading(true);

    try {
      const requests = selectedPlans.map((plan, index) =>
        axiosClient.post(`/users/bot/action/${plan?._id}`, {
          action: ActionBotType.PAUSE,
        })
      );

      const responses = await Promise.all(requests);
      const listResult = responses?.map((item) => item.data.ok);
      // setData();
      setData(
        data?.map((item, key) => {
          if (
            selectedPlans.some((obj) => obj._id === item._id) &&
            listResult[key] === true
          ) {
            return { ...item, isRunning: false };
          }
          // if(selectedPlans.some(obj=> obj._id=== item._id) && listResult[key]=== false) {
          //   return ({...item, isRunning: false})
          // }
          else {
            return { ...item };
          }
        })
      );
      showToast("Tạm ngưng các gọi đã chọn thành công", "success");
    } catch (error) {
      console.error("Error sending requests:", error);
    } finally {
      // setLoading(false);
    }
  };

  const handleResumePlan = async () => {
    const selectedPlans = data.filter(
      (_, index) => checkedRows[index] === true
    );
    // setLoading(true);

    try {
      const requests = selectedPlans.map((plan, index) =>
        axiosClient.post(`/users/bot/action/${plan?._id}`, {
          action: ActionBotType.RESUME,
        })
      );

      const responses = await Promise.all(requests);
      const listResult = responses?.map((item) => item.data.ok);
      // setData();
      showToast("Tiếp tục các gọi đã chọn thành công", "success");
      setData(
        data?.map((item, key) => {
          if (
            selectedPlans.some((obj) => obj._id === item._id) &&
            listResult[key] === true
          ) {
            return { ...item, isRunning: true };
          } else {
            return { ...item };
          }
        })
      );
    } catch (error) {
      console.error("Error sending requests:", error);
    } finally {
      // setLoading(false);
    }
  };

  const handleRestartPlan = async () => {
    const selectedPlans = data.filter(
      (_, index) => checkedRows[index] === true
    );
    // setLoading(true);

    try {
      const requests = selectedPlans.map((plan, index) =>
        axiosClient.post(`/users/bot/action/${plan?._id}`, {
          action: ActionBotType.RESUME,
        })
      );

      const responses = await Promise.all(requests);
      const listResult = responses?.map((item) => item.data.ok);
      // setData();
      showToast("Tiếp tục các gọi đã chọn thành công", "success");
      setData(
        data?.map((item, key) => {
          if (
            selectedPlans.some((obj) => obj._id === item._id) &&
            listResult[key] === true
          ) {
            return { ...item, isRunning: true };
          } else {
            return { ...item };
          }
        })
      );
    } catch (error) {
      console.error("Error sending requests:", error);
    } finally {
      // setLoading(false);
    }
  };

  const handleResetPlan = async () => {
    const selectedPlans = data.filter(
      (_, index) => checkedRows[index] === true
    );
    // setLoading(true);

    try {
      const requests = selectedPlans.map((plan, index) =>
        axiosClient.post(`/users/bot/action/${plan?._id}`, {
          action: ActionBotType.RESUME,
        })
      );

      const responses = await Promise.all(requests);
      const listResult = responses?.map((item) => item.data.ok);
      // setData();
      showToast("Tiếp tục các gọi đã chọn thành công", "success");
      setData(
        data?.map((item, key) => {
          if (
            selectedPlans.some((obj) => obj._id === item._id) &&
            listResult[key] === true
          ) {
            return { ...item, isRunning: true };
          } else {
            return { ...item };
          }
        })
      );
    } catch (error) {
      console.error("Error sending requests:", error);
    } finally {
      // setLoading(false);
    }
  };

  const handleRemovePlan = async () => {
    const selectedPlans = data.filter(
      (_, index) => checkedRows[index] === true
    );
    // setLoading(true);

    try {
      const requests = selectedPlans.map((plan, index) =>
        axiosClient.post(`/users/bot/action/${plan?._id}`, {
          action: ActionBotType.RESUME,
        })
      );

      const responses = await Promise.all(requests);
      const listResult = responses?.map((item) => item.data.ok);
      // setData();
      showToast("Tiếp tục các gọi đã chọn thành công", "success");
      setData(
        data?.map((item, key) => {
          if (
            selectedPlans.some((obj) => obj._id === item._id) &&
            listResult[key] === true
          ) {
            return { ...item, isRunning: true };
          } else {
            return { ...item };
          }
        })
      );
    } catch (error) {
      console.error("Error sending requests:", error);
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    setCheckedRows(
      data
        .slice(rowsPerPage * (page - 1), rowsPerPage * (page - 1) + rowsPerPage)
        ?.map((item) => false)
    );
  }, [data, page, rowsPerPage]);

  useEffect(() => {
    // Check if at least one row is checked to show the popup
    const isChecked = checkedRows.some((row) => row);
    setShowPopup(isChecked);
  }, [checkedRows]);

  useEffect(() => {
    (async () => {
      const response = await userApi.getUsersExchangeLinkAccountDailyTarget({
        params: { accountType: walletMode ? "LIVE" : "DEMO" },
      });
      if (response?.data?.ok === true) {
        setDailyTarget(response?.data?.d);
      }
    })();
  }, [walletMode]);

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
              <TextField
                variant="outlined"
                placeholder="Search Plan..."
                InputProps={{
                  startAdornment: (
                    <SearchIcon sx={{ color: "text.secondary", mr: 1 }} />
                  ),
                }}
              />
              <Box mt={downLg ? 2 : 0} display={downLg ? "flex" : "block"}>
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
                  {downLg ? "" : "Mục tiêu ngày"}
                </Button>
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
                  // onClick={handleDialogOpen}
                >
                  {downLg ? "" : "Copy"}
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
                  {downLg ? "" : "Tạo plan"}
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
                    Mô hình nến mới
                  </MenuItem>
                </Menu>
              </Box>
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
                        <StyledTableCell>Tên gói</StyledTableCell>
                        <StyledTableCell>Lợi nhuận 7N</StyledTableCell>
                        <StyledTableCell>
                          <Typography>Lợi nhuận</Typography>
                          <Typography>
                            ${dailyTarget?.profit?.toFixed(2)}
                          </Typography>
                        </StyledTableCell>
                        <StyledTableCell>Thao tác</StyledTableCell>
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
                      sortData(data, "createdAt", "desc")
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
                                      onClick={()=> {
                                        navigate(plan._id)
                                      }}
                                      variant="body1"
                                      fontWeight={"600"}
                                      sx={{cursor: "pointer"}}
                                    >
                                      {plan.name}
                                    </Typography>
                                    <Typography
                                      variant="body2"
                                      color="textSecondary"
                                    >
                                      Created:{" "}
                                      {moment(plan.createdAt).format(
                                        "DD-MM-YYYY, HH:mm:ss"
                                      )}
                                    </Typography>
                                  </Box>
                                </Box>
                              </StyledTableCell>
                              <StyledTableCell
                                sx={{ width: downLg ? "50%" : "aaa" }}
                              >{`$${plan?.week_profit?.toFixed(
                                2
                              )}`}</StyledTableCell>
                              <StyledTableCell
                                sx={{ width: downLg ? "50%" : "aaa" }}
                              >{`$${plan?.total_profit?.toFixed(
                                2
                              )}`}</StyledTableCell>
                              <StyledTableCell
                                sx={{
                                  width: downLg ? "100%" : "aaa",
                                  display: downLg ? "flex" : "",
                                }}
                              >
                                <RunningPlan
                                  data={data}
                                  setData={setData}
                                  plan={plan}
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
                                >
                                  <MenuItem
                                    onClick={() => {
                                      handleClose(index);
                                      handleEditBotAI();
                                      handleOpenPlanDrawer();
                                      setSelectedPlan(plan);
                                    }}
                                  >
                                    Edit Plan
                                  </MenuItem>
                                  <MenuItem onClick={() => handleClose(index)}>
                                    Duplicate Plan
                                  </MenuItem>
                                  <MenuItem
                                    onClick={() => {
                                      handleDialogOpen(plan);
                                      handleClose(index);
                                    }}
                                  >
                                    Share Achievement
                                  </MenuItem>
                                  <MenuItem onClick={() => handleClose(index)}>
                                    Share Plan
                                  </MenuItem>
                                  <MenuItem onClick={() => handleClose(index)}>
                                    Copy plan to LIVE
                                  </MenuItem>
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
                                  <IconButton
                                  >
                                    {openRows[index] ? (
                                      <KeyboardArrowUpIcon />
                                    ) : (
                                      <KeyboardArrowDownIcon />
                                    )}
                                  </IconButton>
                                  {downLg && (
                                    <Typography>
                                      {openRows[index] ? "Thu gọn" : "Xem thêm"}
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
                                        >
                                          {SignalFeatureTypesTitle[plan.signal_feature]}
                                        </Typography>
                                        <Typography fontSize={12}>
                                          Chiến lược tín hiệu
                                        </Typography>
                                      </Box>
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
                                        >
                                          {plan?.name}
                                        </Typography>
                                        <Typography fontSize={12}>
                                          Chiến lược vốn
                                        </Typography>
                                      </Box>
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
                                        >
                                          ${plan?.margin_dense?.toFixed(2)}
                                        </Typography>
                                        <Typography fontSize={12}>
                                          Hệ số vào lệnh
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
                  {loading === false && data?.length <= 0 && (
                    <TableBody>
                      <TableCell colSpan={5} rowSpan={5} sx={{ width: "100%" }}>
                        <EmptyPage />
                      </TableCell>
                    </TableBody>
                  )}
                </Table>
              </TableContainer>
              {showPopup === true && (
                <PopupControll
                  onClickStop={handlePausePlan}
                  onClickStart={handleResumePlan}
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
                <Typography>Show result:</Typography>
                <FormControl variant="outlined" sx={{ minWidth: 60 }}>
                  <Select
                    value={rowsPerPage}
                    onChange={handleChangeRowsPerPage}
                  >
                    <MenuItem value={6}>6</MenuItem>
                    <MenuItem value={12}>12</MenuItem>
                    <MenuItem value={24}>24</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Pagination
                count={Math.ceil(data.length / rowsPerPage)}
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
          setData={setData}
          dataProps={data}
          setIsEdit={setIsEdit}
        />
        <ShareArchievement
          open={dialogOpen}
          handleClose={handleDialogClose}
          selectedPlan={selectedPlan}
          ref={canvasRef}
        />
      </Box>
    </Layout>
  );
};
export default PortfoliosList;
