import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  Menu,
  MenuItem,
  Pagination,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  styled,
  useMediaQuery,
} from "@mui/material";
import SearchIcon from "icons/SearchIcon";
import { useCallback, useContext, useEffect, useState } from "react";
import { MoreVert } from "@mui/icons-material";
import { isDark } from "util/constants";
import EditBudgetStrategy from "icons/budget-strategy/EditBudgetStrategy";
import ShareBudgetStrategy from "icons/budget-strategy/ShareBudgetStrategy";
import CopyBudgteStrategy from "page-sections/budget-strategy/CopyBudgetStrategy";
import budgetStrategyApi from "api/budget-strategy/budgetStrategyApi";
import { showToast } from "components/toast/toast";
import NewBudgetStrategy from "page-sections/budget-strategy/NewBudgetStrategy";
// import { IncreaseValueTypeTitle } from "type/IncreaseValueType";
import { BudgetStrategyTypeTitle } from "type/BudgetStrategyType";
import moment from "moment";
import DeleteBudgetStrategy from "page-sections/budget-strategy/DeleteBudgetStrategy";
import DeleteBudgetStrategyIcon from "icons/budget-strategy/DeleteBudgetStrategy";
import EmptyPage from "layouts/layout-parts/blank-list/BlankList";
import sortData from "util/sortData";
import RefreshProvider from "contexts/RefreshContext";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { JwtContext } from "contexts/jwtContext";
import SharePlan from "page-sections/portfolios/dialog/SharePlan";
import CopyBudgetStrategy from "page-sections/budget-strategy/CopyBudgetStrategy";
import { useTranslation } from "react-i18next";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  padding: "20px",
  borderBottom: isDark(theme) ? "1px solid #323b49" : "1px solid #eeeff2",
  width: useMediaQuery((theme) => theme.breakpoints.down("lg"))
    ? "50%"
    : "auto",
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

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  paddingLeft: 4,
  paddingRight: 4,
  gap: 10,
}));

const BudgetStrategyPage = () => {
  const { decodedData } = useContext(JwtContext);
  const downLg = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  const [data, setData] = useState([]);
  const [dataState, setDataState] = useState([]);
  // const [change, setChange]= useState(false)
  const [loading, setLoading] = useState();
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [page, setPage] = useState(1);
  const [anchorEls, setAnchorEls] = useState({}); // Dùng để lưu trữ trạng thái anchorEl cho mỗi hàng
  const [dialogOpen, setDialogOpen] = useState(false);
  const [openNewBudgetStrategy, setOpenNewBudgetStrategy] = useState(false);
  const [isEditStrategy, setIsEditStrategy] = useState(false);
  const [isDeleteStrategy, setIsDeleteStrategy] = useState(false);
  const [selectedStrategy, setSelectedStrategy] = useState();
  const [onlyView, setOnlyView] = useState(false);
  const [change, setChange] = useState(false);
  const { t } = useTranslation();
  const [sharePlanOpen, setSharePlanOpen] = useState(false);
  const handleSharePlanOpen = () => {
    setSharePlanOpen(true);
  };

  const handleSharePlanClose = () => {
    setSharePlanOpen(false);
  };

  const handleOpenDeleteStrategy = () => {
    setIsDeleteStrategy(true);
  };
  const handleCloseDeleteStrategy = () => {
    setIsDeleteStrategy(false);
  };
  const handleOpenNewBudgetStrategy = () => {
    setOpenNewBudgetStrategy(true);
  };
  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleClick = (event, index) => {
    setAnchorEls((prev) => ({ ...prev ?? [], [index]: event.currentTarget }));
  };

  const handleClose = (index) => {
    setAnchorEls((prev) => ({ ...prev ?? [], [index]: null }));
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(1);
  };

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const handleSearch = (e) => {
    const filtered = data.filter((item) =>
      item.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setDataState(filtered);
  };

  const fetchUserBudgetStrategy = useCallback(async () => {
    try {
      setLoading(true);
      const response = await budgetStrategyApi.userBudgetStrategyList();
      if (response?.data?.ok === true) {
        setData(response?.data?.d);
      } else if (response?.data?.ok === false) {
        showToast(response?.data?.m, "error");
      }
    } catch (error) {
      showToast(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUserBudgetStrategy();
  }, [change, fetchUserBudgetStrategy]);

  useEffect(() => {
    setDataState(data);
  }, [data]);

  return (
    <RefreshProvider
      functionProps={async () => await fetchUserBudgetStrategy()}
    >
      <Box
        pt={downLg ? 0 : 2}
        pb={4}
        sx={{
          background: (theme) =>
            isDark(theme) ? "rgb(17, 24, 39)" : "rgb(249, 250, 251)",
        }}
      >
        <Box sx={{ padding: downLg ? "10px" : "10px 24px" }}>
          <Typography variant="h6" fontWeight={600} mb={2}>
            {t("budget_strategy")} ({data?.length})
          </Typography>
          <Box
            sx={{
              padding: downLg ? "8px" : "20px",
              background: (theme) => (isDark(theme) ? "#1f2937" : "white"),
              borderRadius: "10px",
            }}
          >
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
                placeholder={t("Search Strategy...")}
                sx={{ width: downLg ? "100%" : 450 }}
                InputProps={{
                  startAdornment: (
                    <SearchIcon sx={{ color: "text.secondary", mr: 1 }} />
                  ),
                }}
                onChange={handleSearch}
              />
              <Box
                mt={downLg ? 2 : 0}
                display={downLg ? "flex" : "block"}
                sx={{ width: downLg ? "100%" : "aaa" }}
              >
                <Button
                  variant="outlined"
                  sx={{ mr: 2 }}
                  size={downLg ? "large" : "medium"}
                  fullWidth={downLg ? true : false}
                  onClick={() => {
                    handleDialogOpen();
                  }}
                  endIcon={<ContentCopyIcon />}
                >
                  {t("Copy")}
                </Button>
                <Button
                  variant="contained"
                  fullWidth={downLg ? true : false}
                  size={downLg ? "large" : "medium"}
                  color="success"
                  onClick={handleOpenNewBudgetStrategy}
                >
                  {t("New Strategy")}
                </Button>
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
                      <StyledTableCell>{t("Actions")}</StyledTableCell>
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
                        <StyledTableRow
                          sx={{
                            display: downLg ? "flex" : "",
                            flexWrap: "wrap",
                            borderBottom: downLg ? "" : "none",
                          }}
                          key={index}
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
                            {BudgetStrategyTypeTitle[row.type]}
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
                            <IconButton onClick={(e) => handleClick(e, index)}>
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
                                      setSelectedStrategy(row);
                                      setIsEditStrategy(true);
                                      handleClose(index);
                                      handleOpenNewBudgetStrategy();
                                    }}
                                  >
                                    <EditBudgetStrategy />
                                    {t("Edit Strategy")}
                                  </StyledMenuItem>
                                  <StyledMenuItem
                                    onClick={() => {
                                      setSelectedStrategy(row);
                                      handleSharePlanOpen();
                                      handleClose(index);
                                    }}
                                  >
                                    <ShareBudgetStrategy />
                                    {t("Send Strategy")}
                                  </StyledMenuItem>
                                  <StyledMenuItem
                                    onClick={() => {
                                      setSelectedStrategy(row);
                                      handleOpenDeleteStrategy();
                                      handleClose(index);
                                    }}
                                  >
                                    <DeleteBudgetStrategyIcon />
                                    {t("Delete Strategy")}
                                  </StyledMenuItem>
                                </>
                              )}
                              {row?.is_default === true &&
                                decodedData?.data?._id !== row?.userId && (
                                  <>
                                    <StyledMenuItem
                                      onClick={() => {
                                        setSelectedStrategy(row);
                                        setIsEditStrategy(true);
                                        handleClose(index);
                                        handleOpenNewBudgetStrategy();
                                      }}
                                    >
                                      {/* <EditBudgetStrategy /> */}
                                      {t("View Strateg")}y
                                    </StyledMenuItem>
                                  </>
                                )}
                            </Menu>
                          </StyledTableCell>
                        </StyledTableRow>
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
                  title={"Danh mục vốn đang trống"}
                  subTitle={t(
                    "Start exploring investment opportunities and earn profits by start an investment plan today"
                  )}
                  titleButton={t("Create Your Strategy")}
                  actionClick={handleOpenNewBudgetStrategy}
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
                <Typography>{t("Show result")}:</Typography>
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
        {/* copy strategy */}
        <CopyBudgetStrategy
          selectedData={selectedStrategy}
          title={t("Import Budget Strategy")}
          title2={t("Easy way to set up your superb strategy!")}
          title3={t("Enter your shared Budget Strategy Code to start your ideal investment plan")}
          open={dialogOpen}
          onClose={handleDialogClose}
          setData={setData}
          isFromBudgetStrategy={true}
        />
        <SharePlan
          title={t("Share Budget Strategy")}
          title2={t("Easy way to share your superb strategy!")}
          title3={t("Share your Budget Strategy Code to your peers and trade together.")}
          open={sharePlanOpen}
          onClose={handleSharePlanClose}
          selectedPlan={selectedStrategy}
          setData={setData}
          isFromBudgetStrategy={true}
        />
        <NewBudgetStrategy
          is_edit={isEditStrategy}
          open={openNewBudgetStrategy}
          setData={setData}
          onClose={() => {
            setOpenNewBudgetStrategy(false);
            setIsEditStrategy(false);
          }}
          selectedStrategy={selectedStrategy}
          data={dataState}
          setChange={setChange}
        />
        <DeleteBudgetStrategy
          open={isDeleteStrategy}
          onClose={handleCloseDeleteStrategy}
          selectedStrategy={selectedStrategy}
          setChange={setChange}
        />
      </Box>
    </RefreshProvider>
  );
};
export default BudgetStrategyPage;
