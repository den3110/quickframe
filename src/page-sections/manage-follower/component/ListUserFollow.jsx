import {
  Box,
  Button,
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
} from "@mui/material";
import React, { useState } from "react";
import formatCurrency from "util/formatCurrency";
import BlockFollowerDialog from "../dialog/BlockFollowerDialog";

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

const ListUserFollow = ({ data, setData }) => {
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [selected, setSelected]= useState()
  const [page, setPage] = useState(1);
  const [blockFollower, setBlockFollower]= useState(false)
  //   const [data, set]

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
  };

  const handleChangePage = (event, value) => {
    setPage(value);
  };
  return (
    <Box sx={{ padding: "16px" }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Biệt danh</StyledTableCell>
              <StyledTableCell>Loại tài khoản</StyledTableCell>
              <StyledTableCell>Trạng thái</StyledTableCell>
              <StyledTableCell>Lợi nhuận ngày </StyledTableCell>
              <StyledTableCell>Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((item, key) => (
              <TableRow key={key}>
                <StyledTableCell>{item?.nickName}</StyledTableCell>
                <StyledTableCell>{item?.accountType}</StyledTableCell>
                <StyledTableCell>
                  {item?.isRunning ? "Đang chạy" : "Đã dừng"}
                </StyledTableCell>
                <StyledTableCell>
                  <Typography fontWeight={600} fontSize={14} color={item?.day_profit >= 0 ? "success.main": "error.main"}>{formatCurrency(item?.day_profit)}</Typography>
                </StyledTableCell>
                <StyledTableCell>
                  <Button onClick={()=> {
                    setSelected(item)
                    setBlockFollower(true)
                  }} variant="contained" color="primary">
                    Block
                  </Button>
                </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <PaginationContainer>
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={1}
        >
          <Typography>Show result:</Typography>
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
      <BlockFollowerDialog open={blockFollower} onClose={()=> setBlockFollower(false)} selectedProps={selected} setData={setData} />
    </Box>
  );
};

export default ListUserFollow;
