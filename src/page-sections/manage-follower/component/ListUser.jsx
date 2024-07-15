import {
  Box,
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

const ListUser = ({ data }) => {
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [page, setPage] = useState(1);
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
    </Box>
  );
};

export default ListUser;
