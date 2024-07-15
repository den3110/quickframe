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
} from "@mui/material";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import { ManageFollowerContext } from "contexts/ManageFollowerContext";
import EmptyPage from "layouts/layout-parts/blank-list/BlankList";
import ListUser from "./component/ListUser";

const Content = styled(Box)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(3),
  boxShadow: theme.shadows[4],
}));

const TabPanel = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const History = styled(Box)(({ theme }) => ({}));

const HistoryHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
}));

const HistoryTable = styled(Box)(({ theme }) => ({}));

const NoData = styled(Box)(({ theme }) => ({
  textAlign: "center",
  padding: theme.spacing(4),
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

function ManageFollowerPage() {
    const { data, setData, loading } = useContext(ManageFollowerContext);
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
    <Box>
      <Box>
        <Content>
          <Card>
            <Box display={"flex"} justifyContent={"space-between"} p={2}>
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
                    {loading === false && data?.followList?.length <=0  && <EmptyPage />}
                  </NoData>
                  {loading === false && data?.followList?.length > 0  && <ListUser data={data?.followList} />}
                </Box>
              )}
              {tabValue === 1 && (
                <Box>
                  <NoData>
                    {loading === true && <CircularProgress />}
                    {loading === false && data?.blockList?.length <=0  && <EmptyPage />}
                  </NoData>
                  {loading === false && data?.blockList?.length > 0  && <ListUser data={data?.blockList} />}
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
                      <TableBody>
                        <TableRow>
                          <StyledTableCell>15/07/2024 03:24 SA</StyledTableCell>
                          <StyledTableCell>1</StyledTableCell>
                          <StyledTableCell>$111.00</StyledTableCell>
                          <StyledTableCell>0</StyledTableCell>
                          <StyledTableCell>0</StyledTableCell>
                          <StyledTableCell>0</StyledTableCell>
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
