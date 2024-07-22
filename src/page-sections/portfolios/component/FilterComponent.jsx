import React, { useState } from "react";
import {
  Button,
  Menu,
  MenuItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  LocalizationProvider,
  DateCalendar,
  TimeClock,
} from "@mui/x-date-pickers-pro";
import { AdapterDateFns } from "@mui/x-date-pickers-pro/AdapterDateFns";

function FilterComponent({ handleAccordionToggle, openAccordion }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [openDateDialog, setOpenDateDialog] = useState(false);

  const handleClick = (event, menu) => {
    setAnchorEl(event.currentTarget);
    setSelectedMenu(menu);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedMenu(null);
  };

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  const handleStartTimeChange = (newTime) => {
    setStartTime(newTime);
  };

  const handleEndTimeChange = (newTime) => {
    setEndTime(newTime);
  };

  const handleOpenDateDialog = () => {
    setOpenDateDialog(true);
  };

  const handleCloseDateDialog = () => {
    setOpenDateDialog(false);
  };

  return (
    <Box mt={1}>
      <Accordion expanded={openAccordion} onChange={handleAccordionToggle}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}></AccordionSummary>
        <AccordionDetails>
          <Box display={"flex"} alignItems={"center"} gap={2}>
            <Button
              aria-controls="type-menu"
              aria-haspopup="true"
              onClick={(event) => handleClick(event, "type")}
            >
              Loại: {selectedFilter || "Tất cả"}
            </Button>
            <Button
              aria-controls="time-menu"
              aria-haspopup="true"
              onClick={(event) => handleClick(event, "time")}
            >
              Thời gian: Gần đây
            </Button>
            <Button
              aria-controls="amount-menu"
              aria-haspopup="true"
              onClick={(event) => handleClick(event, "amount")}
            >
              Số tiền vào lệnh: Tất cả
            </Button>

            <Menu
              id="type-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl) && selectedMenu === "type"}
              onClose={handleClose}
            >
              <MenuItem
                onClick={() => {
                  setSelectedFilter("Lệnh");
                  handleClose();
                }}
              >
                Lệnh
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setSelectedFilter("Hoạt động");
                  handleClose();
                }}
              >
                Hoạt động
              </MenuItem>
            </Menu>

            <Menu
              id="time-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl) && selectedMenu === "time"}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Gần đây</MenuItem>
              <MenuItem onClick={handleOpenDateDialog}>Tùy chỉnh</MenuItem>
            </Menu>

            <Dialog
              fullWidth
              maxWidth={"sm"}
              open={openDateDialog}
              onClose={handleCloseDateDialog}
            >
              <DialogTitle>Tùy chỉnh</DialogTitle>
              <DialogContent>
                <Box sx={{ overflow: "hidden" }}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Box
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                      gap={2}
                    >
                      <Box>
                        <DateCalendar
                          value={selectedDate}
                          onChange={handleDateChange}
                        />
                      </Box>
                      <Box display="flex" justifyContent="space-between">
                        <Box
                          display="flex"
                          flexDirection="column"
                          alignItems="center"
                        >
                          <Box mb={1}>Start Time</Box>
                          <TimeClock
                            value={startTime}
                            onChange={handleStartTimeChange}
                          />
                        </Box>
                        <Box
                          display="flex"
                          flexDirection="column"
                          alignItems="center"
                        >
                          <Box mb={1}>End Time</Box>
                          <TimeClock
                            value={endTime}
                            onChange={handleEndTimeChange}
                          />
                        </Box>
                      </Box>
                    </Box>
                  </LocalizationProvider>
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDateDialog}>Cancel</Button>
                <Button onClick={handleCloseDateDialog}>OK</Button>
              </DialogActions>
            </Dialog>

            <Menu
              id="amount-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl) && selectedMenu === "amount"}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Tất cả</MenuItem>
              {/* Add other menu items for Số tiền vào lệnh here */}
            </Menu>
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}

export default FilterComponent;
