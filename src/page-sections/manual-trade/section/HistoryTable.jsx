// HistoryTable.js
import React from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem, IconButton } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';

const HistoryTable = () => {
  return (
    <Box mt={2}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Box display="flex" alignItems="center">
          <Typography variant="body1" mr={2}>Thời gian:</Typography>
          <Select defaultValue="Gần đây">
            <MenuItem value="Gần đây">Gần đây</MenuItem>
            <MenuItem value="Xa hơn">Xa hơn</MenuItem>
          </Select>
        </Box>
        <Box display="flex" alignItems="center">
          <Typography variant="body1" mr={2}>Số tiền vào lệnh:</Typography>
          <Select defaultValue="Tất cả">
            <MenuItem value="Tất cả">Tất cả</MenuItem>
            <MenuItem value="Cụ thể">Cụ thể</MenuItem>
          </Select>
        </Box>
        <IconButton>
          <FilterListIcon />
        </IconButton>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Thời gian</TableCell>
              <TableCell>Loại</TableCell>
              <TableCell>Số tiền vào lệnh</TableCell>
              <TableCell>Lợi nhuận</TableCell>
              <TableCell>Thu nhập</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>14/07/2024, 23:39:53</TableCell>
              <TableCell>Long</TableCell>
              <TableCell>$2.00</TableCell>
              <TableCell>+$1.90</TableCell>
              <TableCell>$3.90</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
        <Typography>Hiển kết quả:</Typography>
        <Select defaultValue={6}>
          <MenuItem value={6}>6</MenuItem>
          <MenuItem value={12}>12</MenuItem>
          <MenuItem value={24}>24</MenuItem>
        </Select>
      </Box>
    </Box>
  );
};

export default HistoryTable;
