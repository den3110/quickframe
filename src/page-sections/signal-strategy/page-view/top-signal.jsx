import {
  Box,
  styled,
  Checkbox,
  IconButton,
  useMediaQuery,
  TableCell,
  Pagination,
  MenuItem,
  FormControl,
  Typography,
  Select,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  Paper,
  useTheme,
  TextField,
  CircularProgress,
  InputLabel,
} from "@mui/material";
import StarBorder from "@mui/icons-material/StarBorder";
import useNavigate from "hooks/useNavigate";
import Layout from "../Layout";
import { isDark } from "util/constants";
import formatCurrency from "util/formatCurrency";
import { useEffect, useState } from "react";
import signalStrategyApi from "api/singal-strategy/signalStrategyApi";
import round2number from "util/round2number";
import AddIcon from "@mui/icons-material/Add";
import NewPlanDrawer from "page-sections/portfolios/drawer/NewPlanDrawer";
import { SignalFeatureTypes } from "type/SignalFeatureTypes";
import PopupControllSignalStategy from "../dialog/PopupControll";
import SearchIcon from "icons/SearchIcon";
import sortData from "util/sortData";
import EmptyPage from "layouts/layout-parts/blank-list/BlankList";
import _ from "lodash";

// STYLED COMPONENTS

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  padding: "16px",
  "&.MuiTableCell-root": {
    borderBottom: `1px solid ${theme.palette.border}`,
  },
}));

const PaginationContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
}));

const TopSignalPageView = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [data, setData] = useState([]);
  const [dataState, setDataState]= useState([])
  const [loading, setLoading] = useState();
  const downLg = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [selected, setSelected] = useState();
  const [page, setPage] = useState(1);
  // const [blockFollower, setBlockFollower] = useState(false);
  const [openFollowerPlan, setOpenFollowerPlan] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [checkedRows, setCheckedRows] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedSignal, setSelectedSignal] = useState([]);
  const [selection, setSelection] = useState(1);

  const handleChange = (event) => {
    setSelection(event.target.value);
    handleFilter(parseInt(event.target.value))
  };
  // const [selected, setSelected]=
  //   const [data, set]
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
  };

  const handleChangePage = (event, value) => {
    setPage(value);
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

  const handleNewPlan = () => {
    const selectedPlans = data.filter(
      (_, index) => checkedRows[index] === true
    );
    setSelectedSignal(selectedPlans?.map((item) => item._id));
    setIsEdit(true);
    setOpenDrawer(true);
  };

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await signalStrategyApi.userBudgetTelegramSignal();
        if (response?.data?.ok === true) {
          setData(response?.data?.d);
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    })();
  }, []);

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

  useEffect(()=> {
    setDataState(data)
  }, [data])

  const handleFilter = (value) => {
    switch (value) {
      case 1:
        setDataState(_.orderBy(data, function(e) { return (e.win_day /
          (e.win_day + e.lose_day)) *
          100}))
        break;
      case 2:
        setDataState(_.orderBy(data, function(e) { return e?.win_streak}))
        break;
      case 3:
        setDataState(_.orderBy(data, function(e) { return e?.volume}))
        break
      default:
        break;
    }
    // Here you can add the logic to filter data based on selected amount
    // setData(filteredData);
  };

  return (
    <Layout>
      <Box sx={{ paddingTop: "22px" }} pb={4}>
        <Box sx={{ padding: downLg ? 0 : "24px" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: 2,
              flexDirection: downLg ? "column" : "row",
            }}
          >
            <Box sx={{ width: "100%"}} p={1} display={"flex"} justifyContent={"space-between"}>
              <Box

                sx={{ width: "100%", paddingRight: "10px" }}
              >
                <TextField
                  fullWidth
                  variant="outlined"
                  sx={{ width: downLg ? "aaa" : 450 }}
                  size="medium"
                  placeholder="Search Strategy..."
                  InputProps={{
                    startAdornment: (
                      <SearchIcon sx={{ color: "text.secondary", mr: 1 }} />
                    ),
                    style: {
                      height: "100%"
                    },
                    inputProps: {
                      height: downLg ? "100%" : "24px",
                    },
                  }}  
                />
              </Box>
              <Box>
                <Box sx={{width: 200}}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel id="demo-simple-select-outlined-label">
                      Bộ lọc
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={selection}
                      onChange={handleChange}
                      label="Bộ lọc"
                    >
                      <MenuItem value={1}>
                        Tỷ lệ thắng cao nhất
                      </MenuItem>
                      <MenuItem value={2}>
                        Chuỗi thắng nhiều nhất
                      </MenuItem>
                      <MenuItem value={3}>KLGD hàng đầu</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Box>
            </Box>
            <Box mt={downLg ? 2 : 0} display={downLg ? "flex" : "block"}></Box>
          </Box>
          <Box sx={{ position: "relative" }}>
            <TableContainer component={Paper}>
              <Table>
                {!downLg && (
                  <TableHead>
                    <TableRow>
                      {/* <StyledTableCell sx={{width: 40}}>
                      <Checkbox
                        checked={checkedRows.every(Boolean)}
                        onChange={handleToggleAllRows}
                      />
                    </StyledTableCell> */}
                      {!downLg && (
                        <StyledTableCell>
                          <Checkbox
                            checked={checkedRows.every(Boolean)}
                            onChange={handleToggleAllRows}
                          />
                        </StyledTableCell>
                      )}
                      <StyledTableCell>Tên bot</StyledTableCell>
                      {/* <StyledTableCell>Loại tài khoản</StyledTableCell> */}
                      <StyledTableCell>Thắng/Thua</StyledTableCell>
                      <StyledTableCell>Chuỗi thắng</StyledTableCell>
                      <StyledTableCell>Chuỗi thua</StyledTableCell>
                      <StyledTableCell>Chuỗi vòng thắng</StyledTableCell>
                      <StyledTableCell>VOL</StyledTableCell>
                      <StyledTableCell>Thao tác</StyledTableCell>
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
                      ?.map((item, key) => (
                        <TableRow
                          onClick={() => {
                            setOpenFollowerPlan(true);
                          }}
                          key={key}
                          sx={{
                            display: downLg ? "flex" : "",
                            flexWrap: "wrap",
                          }}
                        >
                          {/* <StyledTableCell  >
                      <Checkbox
                        checked={checkedRows[key] ? true : false}
                        onChange={() => handleToggleRow(key)}
                      />
                    </StyledTableCell> */}
                          {!downLg && (
                            <StyledTableCell
                              sx={{
                                width: downLg ? "100%" : "",
                                display: downLg ? "flex" : "",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              <Checkbox
                                checked={checkedRows[key] ? true : false}
                                onChange={() => handleToggleRow(key)}
                              />
                            </StyledTableCell>
                          )}
                          <StyledTableCell
                            sx={{
                              width: downLg ? "100%" : "",
                              display: downLg ? "flex" : "",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              {downLg && (
                                <Checkbox
                                  checked={checkedRows[key] ? true : false}
                                  onChange={() => handleToggleRow(key)}
                                />
                              )}
                              {downLg && <Typography>Tên bot</Typography>}
                              {/* {downLg && (
                          <Typography
                            fontSize={14}
                            sx={{
                              textDecoration: "underline",
                              cursor: "pointer",
                            }}
                          >
                            Gói: {item?.count || 0}
                          </Typography>
                        )} */}
                            </Box>
                            <Box
                              sx={{ cursor: "pointer" }}
                              onClick={() => {
                                navigate(
                                  "/signal-strategies/" + item?._id
                                );
                              }}
                            >
                              <Typography>{item?.name}</Typography>
                              {/* {!downLg && (
                          <Typography
                            fontSize={14}
                            sx={{
                              textDecoration: "underline",
                              cursor: "pointer",
                            }}
                          >
                            Gói: {item?.count || 0}
                          </Typography>
                        )} */}
                            </Box>
                          </StyledTableCell>
                          <StyledTableCell
                            sx={{
                              width: downLg ? "100%" : "",
                              display: downLg ? "flex" : "",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            {downLg && <Typography>Thắng/Thua:</Typography>}
                            <Typography fontWeight={600} fontSize={14}>
                              {item.win_day}/{item.lose_day}
                            </Typography>
                            {!downLg && (
                              <Box display={"flex"} alignItems={"center"}>
                                <Typography fontSize={12}>
                                  Tỉ lệ thắng:
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
                            )}
                          </StyledTableCell>
                          <StyledTableCell
                            sx={{
                              width: downLg ? "100%" : "",
                              display: downLg ? "flex" : "",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            {downLg && <Typography>Chuỗi thắng:</Typography>}
                            <Typography
                              fontWeight={600}
                              fontSize={14}
                              color={
                                parseFloat(item?.win_streak) >= 0
                                  ? "success.main"
                                  : "error.main"
                              }
                            >
                              {item?.win_streak}
                            </Typography>
                          </StyledTableCell>
                          <StyledTableCell
                            sx={{
                              width: downLg ? "100%" : "",
                              display: downLg ? "flex" : "",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            {downLg && <Typography>Chuỗi thua:</Typography>}
                            <Typography
                              fontWeight={600}
                              fontSize={14}
                              color={
                                parseFloat(item?.lose_streak) >= 0
                                  ? "success.main"
                                  : "error.main"
                              }
                            >
                              {item?.lose_streak}
                            </Typography>
                          </StyledTableCell>
                          <StyledTableCell
                            sx={{
                              width: downLg ? "100%" : "",
                              display: downLg ? "flex" : "",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            {downLg && (
                              <Typography>Chuỗi vòng thắng:</Typography>
                            )}
                            <Typography fontWeight={600} fontSize={14}>
                              {item?.longest_win_streak}/
                              {item?.longest_lose_streak}
                            </Typography>
                          </StyledTableCell>
                          <StyledTableCell
                            sx={{
                              width: downLg ? "100%" : "",
                              display: downLg ? "flex" : "",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            {downLg && <Typography>VOL:</Typography>}
                            <Typography fontWeight={600} fontSize={14}>
                              {formatCurrency(item?.volume)}
                            </Typography>
                          </StyledTableCell>
                          <StyledTableCell
                            sx={{
                              width: downLg ? "100%" : "",
                              display: downLg ? "flex" : "",
                              justifyContent: downLg
                                ? "center"
                                : "space-between",
                              alignItems: "center",
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: downLg ? "center" : "",
                              }}
                            >
                              <Box sx={{ mr: 1 }}>
                                <IconButton
                                  fullWidth={downLg ? true : false}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelected(item);
                                    setSelectedSignal([item?._id]);
                                    setIsEdit(true);
                                    setOpenDrawer(true);
                                    // setSelected(item);
                                    // setBlockFollower(true);
                                  }}
                                  variant="contained"
                                  color="primary"
                                  sx={{
                                    border: `1px solid ${theme.palette.border}`,
                                    borderRadius: 2,
                                  }}
                                >
                                  <AddIcon />
                                </IconButton>
                              </Box>
                            </Box>
                          </StyledTableCell>
                        </TableRow>
                      ))}
                </TableBody>
              </Table>
            </TableContainer>
            {loading === false && data?.length <= 0 && (
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
                  subTitle={
                    "Bắt đầu khám phá các cơ hội đầu tư và kiếm lợi nhuận ngay hôm nay."
                  }
                  titleButton={"Tạo chiến lược mới"}
                  disableButton={true}
                  // actionClick={handleMenuClick}
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
                <Typography>Hiển thị kết quả:</Typography>
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
            {showPopup === true && (
              <PopupControllSignalStategy onClickNewPlan={handleNewPlan} />
            )}
          </Box>
        </Box>
        <NewPlanDrawer
          open={openDrawer}
          handleClose={() => {
            setOpenDrawer(false);
          }}
          isEdit={isEdit}
          allowSelectedTab={true}
          selectedPlan={{
            ...selected,
            autoType: 3,
            signal_feature:
              selectedSignal?.length > 1
                ? SignalFeatureTypes.AUTO_CHANGE_METHODS
                : SignalFeatureTypes.SINGLE_METHOD,
            budget_amount: 100,
            name: "",
            bet_second: 25,
            margin_dense: 100,
          }}
          dataProps={data}
          setIsEdit={setIsEdit}
          selectedSignal={selectedSignal}
        />
      </Box>
    </Layout>
  );
};
export default TopSignalPageView;
