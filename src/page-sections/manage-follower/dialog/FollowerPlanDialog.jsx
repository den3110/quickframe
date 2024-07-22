import React, { useCallback, useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  IconButton,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Badge,
  Avatar,
  Select,
  MenuItem,
  Divider,
  FormControl,
  Pagination,
  styled,
  useMediaQuery,
  useTheme,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import RefreshIcon from "@mui/icons-material/Refresh";
import copytradeApi from "api/copytrade/copytradeApi";
import sortData from "util/sortData";
import EmptyPage from "layouts/layout-parts/blank-list/BlankList";
import formatCurrency from "util/formatCurrency";

const PaginationContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
}));


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    padding: useMediaQuery(theme.breakpoints.down("lg")) ? 0 : "20px",
  }));

const FollowerPlanDialog = (props) => {
    const theme = useTheme();
    const downLg = useMediaQuery((theme) => theme.breakpoints.down("lg"));
    console.log(theme.breakpoints.down("lg"))
  const { open, onClose, selected } = props;
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [change, setChange] = useState(false);
  const [loading, setLoading]= useState()
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
  };

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const fetchData = useCallback(async () => {
    try {
      const data = {
        params: {
          userId: selected?.userId,
        },
      };
      setLoading(true)
      const response = await copytradeApi.getUserCopytradeFollowerPlan(data);
      if (response?.data?.ok === true) {
        setData(response?.data?.d);
      }
    } catch (error) {
      console.log(error);
    }
    finally {
        setLoading(false)
    }
  }, [selected]);

  useEffect(() => {
    if (selected?.userId) {
        fetchData()
    }
  }, [fetchData, open, change, selected]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth={downLg ? true : false}
      PaperProps={{
        style: {
          margin: 0,
          width: downLg && "94%",
        },
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={2}
        sx={{ width: !downLg ? 666 : "100%" }}
      >
        <Box display="flex" alignItems="center">
          <Avatar sx={{ bgcolor: "green" }}>
            {selected?.nickName?.slice(0, 2)}
          </Avatar>
          <Typography variant="h6" sx={{ ml: 2 }}>
            {selected?.nickName}
          </Typography>
          <IconButton
            onClick={() => {
              setChange((prev) => !prev);
            }}
          >
            <RefreshIcon />
          </IconButton>
        </Box>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />
      <DialogContent sx={{ minHeight: 300 }}>
        <Table>
          <TableHead>
            {!downLg && (
              <TableRow>
                <StyledTableCell sx={{ width: "40%" }}>Tên gói</StyledTableCell>
                <StyledTableCell>Thắng/Thua</StyledTableCell>
                <StyledTableCell>Lợi nhuận</StyledTableCell>
                <StyledTableCell>Trạng thái</StyledTableCell>
              </TableRow>
            )}
          </TableHead>
          <TableBody>
            {loading=== false && sortData(data, "createdAt", "desc")
              .slice(
                rowsPerPage * (page - 1),
                rowsPerPage * (page - 1) + rowsPerPage
              )
              ?.map((item, key) => (
                <TableRow
                  key={key}
                  sx={{ display: downLg ? "flex" : "", flexWrap: "wrap",  marginBottom: downLg ? 2 : 0 }}
                >
                  <StyledTableCell
                    sx={{
                      width: downLg ? "100%" : "40%",
                      marginBottom: downLg ? 2 : 0,
                    }}
                    
                  >
                    <Box>
                      <Typography fontSize={16} fontWeight={600} mb={1}>{item?.botName}</Typography>
                      <Box borderRadius={1}>
                        <Typography
                          variant="caption"
                          color="white"
                          borderRadius={1}
                          p={1}
                          sx={{ background: theme.palette.primary[700] }}
                        >
                          {item?.accountType === "DEMO" ? "Demo" : "Live"}
                        </Typography>
                      </Box>
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell
                    sx={{
                      width: downLg ? "30%" : "aaa",
                      display: downLg ? "flex" : "",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Box>
                      <Box display="flex" alignItems={"center"}><Typography fontSize={14} color="success.main">{item?.day_win}</Typography>/<Typography fontSize={14} color="error.main">{item?.day_lose}</Typography></Box>
                      {downLg && (
                        <Box display={"flex"} alignItems={"center"}>
                          <Typography
                            fontSize={14}
                            fontWeight={600}
                            color="success.main"
                          >
                            Thắng
                          </Typography>
                          <Typography fontSize={14} fontWeight={600}>
                            /
                          </Typography>
                          <Typography fontSize={14} fontWeight={600}>
                            Thua
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell
                    sx={{
                      width: downLg ? "30%" : "aaa",
                      display: downLg ? "flex" : "",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Box>
                      <Box><Typography fontSize={14} color={item?.day_profit > 0 ? "success.main" : "error.main"}>{formatCurrency(item?.day_profit)}</Typography></Box>
                      {downLg && (
                        <Box display={"flex"} alignItems={"center"}>
                          <Typography fontSize={14} fontWeight={600}>
                            Lợi nhuận
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell
                    sx={{
                      width: downLg ? "40%" : "aaa",
                      display: downLg ? "flex" : "",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Box>
                      <Box
                        sx={{ maxWidth: "max-content" }}
                        bgcolor="lightblue"
                        borderRadius={2}
                        p={1}
                      >
                        <Typography
                          fontSize={14}
                          fontWeight={600}
                          color="primary"
                        >
                          {item?.isRunning=== true ? "Đang chạy" : "Tạm ngưng"}
                        </Typography>
                      </Box>
                    </Box>
                  </StyledTableCell>
                </TableRow>
              ))}
          </TableBody>
          {loading=== true && <Box sx={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <CircularProgress />
          </Box>}
          {loading=== false && data?.length <= 0 && <Box sx={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <EmptyPage title={"Danh sách plan trống"} disableButton={true} />
          </Box>}
        </Table>
      </DialogContent>
      <DialogActions>
        <Box sx={{ width: "100%" }}>
          <PaginationContainer>
            <Box
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              gap={1}
            >
              <Typography>Hiển thị kết quả:</Typography>
              <FormControl variant="outlined" sx={{ minWidth: 60 }}>
                <Select value={rowsPerPage} onChange={handleChangeRowsPerPage}>
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
      </DialogActions>
    </Dialog>
  );
};

export default FollowerPlanDialog;
