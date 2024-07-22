import { Box, Card, FormControl, MenuItem, Pagination, Paper, Select, styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useMediaQuery } from "@mui/material";
import copytradeApi from "api/copytrade/copytradeApi";
import { SocketContext } from "contexts/SocketContext";
import React, { useContext, useEffect, useState } from "react";

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
  const {isConnected, socket}= useContext(SocketContext)
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [page, setPage] = useState(1);
  const [data, setData]= useState([])
  const [loading, setLoading]= useState()
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
  };

  
  const handleChangePage = (event, value) => {
    setPage(value);
  };

  useEffect(()=> {
    (async ()=> {
        // const result= await 
        try {
            setLoading(true)
            const response= await copytradeApi.userCopyTradeGlobal()
            if(response?.data?.ok=== true) {
                setData(response)
            }
        } catch (error) {
            
        }
        finally {
            setLoading(false)
        }
    })()
  }, [])

  useEffect(()=> {
    if(isConnected) {
        socket.on("COPY_TRADE_HISTORY", data=> {
            console.log(data)
        })
    }
  }, [isConnected, socket])

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
                    <StyledTableCell>Số lệnh theo</StyledTableCell>
                    <StyledTableCell>KLGD người theo</StyledTableCell>
                  </TableRow>
                </TableHead>
              )}
              <TableBody>
                <TableRow
                  sx={{
                    display: downLg ? "flex" : "",
                    flexWrap: "wrap",
                  }}
                >
                  <StyledTableCell sx={{ width: downLg ? "50%" : "" }}>
                    15/07/2024 03:24 SA
                  </StyledTableCell>
                  <StyledTableCell sx={{ width: downLg ? "50%" : "" }}>
                    $111.00
                  </StyledTableCell>
                  <StyledTableCell sx={{ width: downLg ? "50%" : "" }}>
                    0
                  </StyledTableCell>
                  <StyledTableCell sx={{ width: downLg ? "50%" : "" }}>
                    0
                  </StyledTableCell>
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
    </HistoryTable>
  );
};

export default CopytradeHistory;
