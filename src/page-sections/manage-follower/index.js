import React, { useContext, useState } from "react";
import {
  Typography,
  Box,
  Paper,
  Tabs,
  Tab,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
  InputAdornment,
  Card,
  FormControl,
  Select,
  MenuItem,
  Pagination,
  CircularProgress,
  Tooltip,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import { ManageFollowerContext } from "contexts/ManageFollowerContext";
import EmptyPage from "layouts/layout-parts/blank-list/BlankList";
import ListUserFollow from "./component/ListUserFollow";
import ListUserBlock from "./component/ListUserBlock";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import _ from "lodash";

const Content = styled(Box)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  padding: theme.breakpoints.down("lg") ? theme.spacing(1) : theme.spacing(3),
  boxShadow: theme.shadows[4],
}));

const TabPanel = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const History = styled(Box)(({ theme }) => ({}));

const HistoryHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center"
}));

const HistoryTable = styled(Box)(({ theme }) => ({}));

const NoData = styled(Box)(({ theme }) => ({
  textAlign: "center",
  // padding: theme.spacing(4),
}));

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

const InfoCard = ({ title, value, tooltip }) => {
  return (
    <Card variant="outlined" style={{ borderRadius: 16 }}>
      <Box sx={{ padding: 1 }}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="body2" fontSize={12} color="textSecondary">
              {title}
            </Typography>
          </Grid>
          <Grid item>
            <Tooltip placement={"top"} title={tooltip}>
              <IconButton size="small">
                <InfoOutlinedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
        <Typography variant="body1" fontSize={14}>
          {value}
        </Typography>
      </Box>
    </Card>
  );
};

function ManageFollowerPage() {
  const downLg = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  const { data, setData, loading, setChange } = useContext(ManageFollowerContext);
  const [tabValue, setTabValue] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [page, setPage] = useState(1);
  //   const [data, set]

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
  };
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  return (
    <Box paddingBottom={"32px"}>
      <Box
        sx={{
          backgroundImage:
            'url("https://quickinvest.ai/static/media/banner-img.46bb8c00534e137faed8.png")',
          backgroundSize: "cover",
          position: "relative",
          marginBottom: "88px"
        }}
      >
        <Box sx={{ minHeight: "468px" }}>
          <Box sx={{
            "&::before": {
              bottom: "-42px",
              background: "url(https://quickinvest.ai/static/media/img-1.7803fbb2ae80371d2726.png) 100% 100% no-repeat",
              content: '""',
              display: "block",
              height: "230px",
              left: "-9px",
              position: "absolute", 
              width: "388px",
            }
          }}>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                padding: downLg ? "40px 15px" : "130px 70px",
                marginBottom: "118px",
                flexDirection: downLg ? "column" : "row",
              }}
            >
              <Box>
                <Typography fontSize={downLg ? 28 : 40} color="white" fontWeight={600}>
                  Thống kê người theo
                  <br />
                  Cùng nhau phát triển
                </Typography>
              </Box>
              <Box mb={2} sx={{ width: downLg ? '100%' : 442 }}>
                <Card
                  sx={{
                    position: "relative",
                    "&::before": {
                      position: "absolute",
                      content: '""',
                      display: "block",
                      height: 107,
                      top: -101,
                      width: 129,
                      right: 20,
                      background:
                        "url(https://quickinvest.ai/static/media/img-2.2bebcb16ef4c97ea99a9.png) 100% 100% no-repeat",
                      zIndex: 2,
                      overflow: "visible",
                      display: downLg ? "none" : "",
                    },
                    overflow: "visible"
                  }}
                  className="alslqas"
                >
                  <Box className="aklsmkaws" sx={{ padding: 2 }}>
                    <Box>
                      <Typography
                        variant="body1"
                        fontSize={18}
                        fontWeight={600}
                      >
                        Số liệu thống kê
                      </Typography>
                    </Box>
                    <Box className="aksmwaaw" sx={{ width: "100" }} mt={2}>
                      <Grid container spacing={1}>
                        <Grid item xs={6}>
                          <InfoCard title="Tổng người theo dõi" value={_.uniqBy(data?.followList, 'nickName')?.length || 0} tooltip={"Số lượng người dùng đã theo dõi gói đầu tư của bạn"} />
                        </Grid>
                        <Grid item xs={6}>
                          <InfoCard title="Tổng số gói đang chạy" value={data?.total_plans_running  || 0} tooltip={"Tổng số gói đang chạy trên tài khoản của bạn (Bao gồm cả Live và Demo)"} />
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>
                </Card>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box>
        <Content>
          <Card>
            <Box display={"flex"} justifyContent={"space-between"} p={2} flexDirection={downLg ? "column" : "row"}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                indicatorColor="primary"
                textColor="primary"
                centered
              >
                <Tab label="Gói theo dõi" />
                <Tab label="Danh sách chặn" />
              </Tabs>
              <Box
                mt={downLg ? 1 : 0}
                display={"flex"}
                justifyContent="space-between"
                alignItems="center"
                gap={1}
              >
                <TextField
                  variant="outlined"
                  placeholder="Tìm biệt danh"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <Button
                  variant="contained"
                  color="success"
                  sx={{ height: "100%" }}
                >
                  Tìm kiếm
                </Button>
              </Box>
            </Box>
            <TabPanel>
              {tabValue === 0 && (
                <Box>
                  <NoData>
                    {loading === true && <CircularProgress />}
                    {loading === false && data?.followList?.length <= 0 && (
                      <EmptyPage
                        title={"Không có dữ liệu"}
                        disableButton={true}
                      />
                    )}
                  </NoData>
                  {loading === false && data?.followList?.length > 0 && (
                    <ListUserFollow data={data?.followList} setData={setData} dataProps={data} setChange={setChange} />
                  )}
                </Box>
              )}
              {tabValue === 1 && (
                <Box>
                  <NoData>
                    {loading === true && <CircularProgress />}
                    {loading === false && data?.blockList?.length <= 0 && (
                      <EmptyPage
                        title={"Không có dữ liệu"}
                        disableButton={true}
                      />
                    )}
                  </NoData>
                  {loading === false && data?.blockList?.length > 0 && (
                    <ListUserBlock data={data?.blockList} setData={setData} dataProps={data} setChange={setChange} />
                  )}
                </Box>
              )}
            </TabPanel>
          </Card>
          <History mt={2}>
            <HistoryHeader mb={2}>
              <Typography variant="h6">Lịch sử</Typography>
              <Card>
                <Box sx={{ padding: 1.5, cursor: "pointer" }}>
                  <Typography>15/07/2024 12:00 SA - 04:21 CH</Typography>
                </Box>
              </Card>
            </HistoryHeader>
            <HistoryTable>
              <Card>
                <Box sx={{ padding: "16px" }}>
                  <TableContainer component={Paper}>
                    <Table>
                      {!downLg && 
                        <TableHead>
                          <TableRow>
                            <StyledTableCell>Thời gian</StyledTableCell>
                            <StyledTableCell>Số lệnh</StyledTableCell>
                            <StyledTableCell>KLGD</StyledTableCell>
                            <StyledTableCell>Người theo dõi</StyledTableCell>
                            <StyledTableCell>Số lệnh theo</StyledTableCell>
                            <StyledTableCell>KLGD người theo</StyledTableCell>
                          </TableRow>
                        </TableHead>
                      }
                      <TableBody>
                        <TableRow sx={{display: downLg ? "flex" : "", flexWrap: "wrap"}}>
                          <StyledTableCell sx={{width: downLg ? "50%" : ""}}>15/07/2024 03:24 SA</StyledTableCell>
                          <StyledTableCell sx={{width: downLg ? "50%" : ""}}>1</StyledTableCell>
                          <StyledTableCell sx={{width: downLg ? "50%" : ""}}>$111.00</StyledTableCell>
                          <StyledTableCell sx={{width: downLg ? "50%" : ""}}>0</StyledTableCell>
                          <StyledTableCell sx={{width: downLg ? "50%" : ""}}>0</StyledTableCell>
                          <StyledTableCell sx={{width: downLg ? "50%" : ""}}>0</StyledTableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              </Card>
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
            </HistoryTable>
          </History>
        </Content>
      </Box>
    </Box>
  );
}

export default ManageFollowerPage;
