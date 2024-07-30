import {
  Box,
  styled,
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
} from "@mui/material";
import Layout from "../Layout";
import { isDark } from "util/constants";
import SearchIcon from "@mui/icons-material/Search";
import { Fragment, useContext, useEffect, useState } from "react";
import { MoreVert, Add, InsertChart } from "@mui/icons-material";
import moment from "moment";
import NewBotAI from "../NewBotAI";
import SignalStrategyContext from "contexts/SignalStrategyContext";
import NewBotAIStringMethod from "../NewBotAIStringMethod";
import DeleteSignalStrategy from "../DeleteSignalStrategy";
import EmptyPage from "layouts/layout-parts/blank-list/BlankList";
import sortData from "util/sortData";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
// import RefreshProvider from "contexts/RefreshContext";
// import { SignalFeatureTypesTitle } from "type/SignalFeatureTypes";
import { SignalMethodUsingTypesTitle } from "type/SignalMethodUsing";
import { JwtContext } from "contexts/jwtContext";
import { useTranslation } from "react-i18next";
import CopyBudgetStrategy from "page-sections/budget-strategy/CopyBudgetStrategy";
import SharePlan from "page-sections/portfolios/dialog/SharePlan";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  padding: "20px",
  borderBottom: isDark(theme) ? "1px solid #323b49" : "1px solid #eeeff2",
  width: useMediaQuery((theme) => theme.breakpoints.down("lg"))
    ? "50%"
    : "auto",
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

const SignalStrategyList = () => {
  const { decodedData } = useContext(JwtContext);
  const { data, setData, loading, setChange } = useContext(
    SignalStrategyContext
  );
  const { t } = useTranslation();
  const [dataState, setDataState] = useState([]);
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
  const [dialogOpen, setDialogOpen] = useState(false);
  const [openNewBotAIStringMethod, setOpenNewBotAIStringMethod] =
    useState(false);
  const [anchorElMenu, setAnchorElMenu] = useState(null);
  const [sharePlanOpen, setSharePlanOpen] = useState(false);
  const handleSharePlanOpen = () => {
    setSharePlanOpen(true);
  };

  const handleSharePlanClose = () => {
    setSharePlanOpen(false);
  };
  // const [loading, setLoading]= useState(false)

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
    setPage(1);
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

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleSearch = (e) => {
    const filtered = data.filter((item) =>
      item.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setDataState(filtered);
  };

  useEffect(() => {
    setDataState(data);
  }, [data]);

  return (
    <Layout>
      <Box pt={2} pb={4}>
        <Box sx={{ padding: "10px" }}>
          <Box sx={{ padding: downLg ? 0 : "20px" }}>
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
                sx={{ width: downLg ? "aaa" : 450 }}
                placeholder={t("Search Bot...")}
                onChange={handleSearch}
                InputProps={{
                  startAdornment: (
                    <SearchIcon sx={{ color: "text.secondary", mr: 1 }} />
                  ),
                }}
              />
              <Box mt={downLg ? 2 : 0} display={downLg ? "flex" : "block"}>
                <Button
                  variant="outlined"
                  sx={{ mr: 2 }}
                  size={downLg ? "large" : "medium"}
                  fullWidth={downLg ? true : false}
                  endIcon={<ContentCopyIcon />}
                  onClick={handleDialogOpen}
                >
                  {t("Copy")}
                </Button>
                <Button
                  variant="contained"
                  fullWidth={downLg ? true : false}
                  size={downLg ? "large" : "medium"}
                  color="success"
                  // onClick={handleOpenNewBudgetStrategy}
                  onClick={handleMenuClick}
                >
                  {t("Bot AI Builder")}
                </Button>
                <Menu
                  disableScrollLock={false}
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
            </Box>
            <TableContainer component={Paper}>
              <Table>
                {!downLg && (
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>{t("strategy_name")}</StyledTableCell>
                      <StyledTableCell>{t("Method Using")}</StyledTableCell>
                      <StyledTableCell>{t("Loại chiến lược")}</StyledTableCell>
                      <StyledTableCell>{t("actions")}</StyledTableCell>
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
                    sortData(dataState, "createdAt", "desc")
                      .slice(
                        rowsPerPage * (page - 1),
                        rowsPerPage * (page - 1) + rowsPerPage
                      )
                      .map((row, index) => (
                        <Fragment key={index}>
                          <StyledTableRow
                            sx={{
                              display: downLg ? "flex" : "",
                              flexWrap: "wrap",
                              borderBottom: downLg ? "" : "none",
                            }}
                          >
                            <StyledTableCell
                              sx={{
                                order: downLg ? 1 : 1,
                                borderBottom: downLg ? "none" : "",
                              }}
                            >
                              <Typography variant="body1" fontWeight={"600"}>
                                {row.name}
                              </Typography>
                              <Typography variant="body2" color="textSecondary">
                                {t("Created")}:{" "}
                                {moment(row.createdAt).format(
                                  "DD-MM-YYYY, HH:mm:ss"
                                )}
                              </Typography>
                            </StyledTableCell>
                            <StyledTableCell
                              sx={{
                                order: downLg ? 3 : 2,
                                borderBottom: downLg ? "none" : "",
                              }}
                            >
                              {/* {BudgetStrategyTypeTitle[row.type]} */}
                              {SignalMethodUsingTypesTitle[row?.type]}
                            </StyledTableCell>
                            <StyledTableCell
                              sx={{
                                order: downLg ? 3 : 2,
                                borderBottom: downLg ? "none" : "",
                              }}
                            >
                              <Typography
                                fontSize={14}
                                sx={{ whiteSpace: "nowrap" }}
                              >
                                {row?.is_default === true
                                  ? t("Default Strategy")
                                  : t("Custom Strategy")}
                              </Typography>
                            </StyledTableCell>
                            <StyledTableCell
                              sx={{
                                order: downLg ? 2 : 4,
                                display: downLg ? "flex" : "",
                                flexDirection: "row-reverse",
                                borderBottom: downLg ? "none" : "",
                              }}
                            >
                              <IconButton
                                onClick={(e) => handleClick(e, index)}
                              >
                                <MoreVert />
                              </IconButton>
                              <Menu
                                disableScrollLock
                                anchorEl={anchorEls[index]}
                                open={Boolean(anchorEls[index])}
                                onClose={() => handleClose(index)}
                                anchorOrigin={{
                                  vertical: "top",
                                  horizontal: "left",
                                }}
                                transformOrigin={{
                                  vertical: "top",
                                  horizontal: "right",
                                }}
                              >
                                {decodedData?.data?._id === row?.userId && (
                                  <>
                                    <StyledMenuItem
                                      onClick={() => {
                                        if (row.type === "STRING_METHOD") {
                                          handleOpenNewBotAIStringMethod();
                                          setIsEditStringMethod(true);
                                          setSelectedBot(row);
                                          handleClose(index);
                                        } else if (
                                          row.type === "BUBBLE_METHOD"
                                        ) {
                                          handleOpenNewBotAI();
                                          handleClose(index);
                                          setIsEdit(true);
                                          setSelectedBot(row);
                                          setInitState(true);
                                        }
                                      }}
                                    >
                                      {t("Edit Strategy")}
                                    </StyledMenuItem>
                                    <StyledMenuItem
                                      onClick={() => {
                                        setSelectedBot(row);
                                        handleSharePlanOpen();
                                        handleClose(index);
                                      }}
                                    >
                                      {t("Send Strategy")}
                                    </StyledMenuItem>
                                    <StyledMenuItem
                                      onClick={() => {
                                        handleClose(index);
                                        setSelectedBot(row);
                                        handleOpenDeleteBot();
                                      }}
                                    >
                                      {t("Delete Strategy")}
                                    </StyledMenuItem>
                                  </>
                                )}
                                {row?.is_default === true &&
                                  decodedData?.data?._id !== row?.userId && (
                                    <>
                                      <StyledMenuItem
                                        onClick={() => {
                                          if (row.type === "STRING_METHOD") {
                                            handleOpenNewBotAIStringMethod();
                                            setIsEditStringMethod(true);
                                            setSelectedBot(row);
                                            handleClose(index);
                                          } else if (
                                            row.type === "BUBBLE_METHOD"
                                          ) {
                                            handleOpenNewBotAI();
                                            handleClose(index);
                                            setIsEdit(true);
                                            setSelectedBot(row);
                                            setInitState(true);
                                          }
                                        }}
                                      >
                                        {t("View Strategy")}
                                      </StyledMenuItem>
                                    </>
                                  )}
                              </Menu>
                            </StyledTableCell>
                          </StyledTableRow>
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
                  title={"Danh mục tín hiệu đang trống"}
                  subTitle={t(
                    "Start exploring investment opportunities and earn profits by start an investment plan today"
                  )}
                  titleButton={t("Create Your Strategy")}
                  actionClick={handleMenuClick}
                  disableButton={true}
                />
              </Box>
            )}
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
                    <MenuItem value={dataState.length}>{t("All")}</MenuItem>
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
        <NewBotAI
          initState={initState}
          open={openNewBotAI}
          onClose={handleCloseNewBotAI}
          selectedBot={selectedBot}
          setSelectedBot={setSelectedBot}
          is_edit={isEdit}
          setIsEdit={setIsEdit}
        />
        <NewBotAIStringMethod
          open={openNewBotAIStringMethod}
          onClose={handleCloseNewBotAIStringMethod}
          is_edit={isEditStringMethod}
          setIsEdit={setIsEditStringMethod}
          selectedBot={selectedBot}
          setChange={setChange}
        />
        <CopyBudgetStrategy
          selectedData={selectedBot}
          title={t("Import Bot AI")}
          title2={t("Easy way to set up your superb Bot AI!")}
          title3={t(
            "Enter your shared Bot AI Code to start your ideal investment plan"
          )}
          open={dialogOpen}
          onClose={handleDialogClose}
          isFromSignalStrategy={true}
        />
        <SharePlan
          title={t("Share Bot AI")}
          title2={t("Easy way to share your superb Bot AI!")}
          title3={t("Share your Bot AI Code to your peers and trade together.")}
          open={sharePlanOpen}
          onClose={handleSharePlanClose}
          selectedPlan={selectedBot}
          setData={setData}
          isFromSignalStrategy={true}
        />
        <DeleteSignalStrategy
          open={isDeleteBot}
          onClose={handleCloseDeleteBot}
          selectedBot={selectedBot}
          setData={setData}
          data={data}
        />
      </Box>
    </Layout>
  );
};
export default SignalStrategyList;
