// HistoryTable.js
import React, { useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  IconButton,
  Card,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Menu,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TableDetailTrade from "../component/TableDetailTrade";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
const HistoryTable = () => {
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const toggleFilterVisibility = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  return (
    <Box mt={2}>
      <Card variant="outlined">
        <Accordion sx={{ border: "none" }} expanded={isFilterVisible}>
          <AccordionSummary
            expandIcon={
              <IconButton onClick={toggleFilterVisibility}>
                <FilterAltIcon />
              </IconButton>
            }
            onClick={toggleFilterVisibility}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography onClick={toggleFilterVisibility} variant="body1">Bộ lọc</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
              mt={1}
            >
              <Box display="flex" alignItems="center">
                <Typography variant="body1" mr={2}>
                  Thời gian:
                </Typography>
                <Select disableScrollLock defaultValue="Gần đây">
                  <MenuItem value="Gần đây">Gần đây</MenuItem>
                  <MenuItem value="Xa hơn">Xa hơn</MenuItem>
                </Select>
              </Box>
              <Box display="flex" alignItems="center">
                <Typography variant="body1" mr={2}>
                  Số tiền vào lệnh:
                </Typography>
                <Select disableScrollLock defaultValue="Tất cả">
                  <MenuItem value="Tất cả">Tất cả</MenuItem>
                  <MenuItem value="Cụ thể">Cụ thể</MenuItem>
                </Select>
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>
        <Divider />
        <Box p={2}>
          <TableDetailTrade />
        </Box>
      </Card>
    </Box>
  );
};

export default HistoryTable;
