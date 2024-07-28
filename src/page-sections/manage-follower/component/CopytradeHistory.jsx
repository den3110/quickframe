import {
  Box,
  Card,
  FormControl,
  MenuItem,
  Pagination,
  Paper,
  Select,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
} from "@mui/material";
import copytradeApi from "api/copytrade/copytradeApi";
import { SettingsContext } from "contexts/settingsContext";
import { SocketContext } from "contexts/SocketContext";
import TrendingDown from "icons/duotone/TrendingDown";
import TrendingUp from "icons/duotone/TrendingUp";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import sortData from "util/sortData";

const HistoryTable = styled(Box)(({ theme }) => ({}));

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

const CopytradeHistory = () => {
  const downLg = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  const { isConnected, socket } = useContext(SocketContext);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState();
  const { walletMode } = useContext(SettingsContext);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(1);
  };

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    (async () => {
      // const result= await
      try {
        setLoading(true);
        const response = await copytradeApi.userCopyTradeGlobal();
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
    if (isConnected && socket) {
      socket.on("COPY_TRADE_HISTORY", (dataSocket) => {
        const dataTemp = data;
        const findIndex = dataTemp?.findIndex(
          (item) =>
            item?.userId === dataSocket?.userId &&
            item?._id === dataSocket?._id &&
            item?.sessionId === dataSocket?.sessionId
        );
        if (findIndex !== -1) {
          dataTemp[findIndex] = dataSocket;
          setData(dataTemp);
        } else {
          setData((prev) => [dataSocket, ...prev]);
        }
      });
    }
  }, [isConnected, socket, data]);

  return (
    <HistoryTable>
      <Card>
        <Box sx={{ padding: "16px" }}>
          <TableContainer component={Paper}>
            <Table>
              {!downLg && (
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Thời gian</StyledTableCell>
                    <StyledTableCell>Số người theo</StyledTableCell>
                    <StyledTableCell>Số lệnh theo (LIVE/DEMO)</StyledTableCell>
                    <StyledTableCell>
                      KLGD người theo (LIVE/DEMO)
                    </StyledTableCell>
                    <StyledTableCell>Loại lệnh</StyledTableCell>
                  </TableRow>
                </TableHead>
              )}
              <TableBody>
                {sortData(data, "createdAt", "desc")
                  .slice(
                    rowsPerPage * (page - 1),
                    rowsPerPage * (page - 1) + rowsPerPage
                  )
                  ?.map((item, key) => (
                    <TableRow
                      key={key}
                      sx={{
                        display: downLg ? "flex" : "",
                        flexWrap: "wrap",
                        marginBottom: "16px"
                      }}
                    >
                      <StyledTableCell
                        sx={{
                          width: downLg ? "100%" : "",
                          display: downLg ? "flex" : "",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        {downLg && (
                          <Typography variant="body2" color="textSecondary">
                            Created at
                          </Typography>
                        )}
                        <Typography variant="body2">
                          {moment(item.createdAt).format(
                            "DD-MM-YYYY, HH:mm:ss"
                          )}
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
                          <Typography variant="body2" color="textSecondary">
                            Số người theo
                          </Typography>
                        )}
                        <Typography variant="body2">
                          {item?.follower_count}
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
                          <Typography variant="body2" color="textSecondary">
                            Số lệnh theo (LIVE / DEMO)
                          </Typography>
                        )}
                        <Typography variant="body2">
                          {item?.live_order_count}/{item?.demo_order_count}
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
                          <Typography variant="body2" color="textSecondary">
                            KLGD người theo (LIVE / DEMO)
                          </Typography>
                        )}
                        <Typography variant="body2">
                          {item?.live_volume}/{item?.demo_volume}
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
                          <Typography variant="body2" color="textSecondary">
                            Loại lệnh
                          </Typography>
                        )}
                        <Typography variant="body2">
                          {item?.betType === "UP" ? (
                            <TrendingUp color={"success"} />
                          ) : (
                            <TrendingDown color={"error"} />
                          )}
                        </Typography>
                      </StyledTableCell>
                    </TableRow>
                  ))}
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
          <Typography>Hiển thị kết quả:</Typography>
          <FormControl variant="outlined" sx={{ minWidth: 60 }}>
            <Select value={rowsPerPage} onChange={handleChangeRowsPerPage}>
              <MenuItem value={6}>6</MenuItem>
              <MenuItem value={12}>12</MenuItem>
              <MenuItem value={24}>24</MenuItem>
                    <MenuItem value={data.length}>Tất cả</MenuItem>
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
  );
};

export default CopytradeHistory;
