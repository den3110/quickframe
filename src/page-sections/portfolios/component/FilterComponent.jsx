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
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  LocalizationProvider,
  DateCalendar,
  TimeClock,
} from "@mui/x-date-pickers-pro";
import { AdapterDateFns } from "@mui/x-date-pickers-pro/AdapterDateFns";
import { useTranslation } from "react-i18next";

function FilterComponent({
  handleAccordionToggle,
  openAccordion,
  data,
  setData,
}) {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedMenu, setSelectedMenu] = useState(null);

  // time
  const [selectedDate, setSelectedDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  // type
  const [selectedFilter, setSelectedFilter] = useState("");
  const [openDateDialog, setOpenDateDialog] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState("all");

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

  const handleFilterByDate = () => {
    if (selectedDate && startTime && endTime) {
      const startTimestamp = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate(),
        startTime.getHours(),
        startTime.getMinutes()
      ).getTime();

      const endTimestamp = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate(),
        endTime.getHours(),
        endTime.getMinutes()
      ).getTime();

      const filteredData = data.filter((item) => {
        const betTime = new Date(item.betTime).getTime();
        return betTime >= startTimestamp && betTime <= endTimestamp;
      });

      setData(filteredData);
    }
    handleCloseDateDialog();
  };

  const handleAmountChange = (event) => {
    setSelectedAmount(event.target.value);
    switch (event.target.value) {
      case "all":
        setData(data)
        break;
      case "lessThan10":
        setData(data?.filter(item=> parseFloat(item?.betAmount) <= 10))
        break;
      case "1to2":
        setData(data?.filter(item=> parseFloat(item?.betAmount) >= 1 && parseFloat(item?.betAmount) <= 2))
        break
      case "1to5":
        setData(data?.filter(item=> parseFloat(item?.betAmount) >= 1 && parseFloat(item?.betAmount) <= 5))
        break
      case "5to10":
        setData(data?.filter(item=> parseFloat(item?.betAmount) >= 5 && parseFloat(item?.betAmount) <= 10))
        break
      case "moreThan10":
        setData(data?.filter(item=> parseFloat(item?.betAmount) >= 10))
        break
      default:
        break;
    }
    // Here you can add the logic to filter data based on selected amount
    // setData(filteredData);
    handleClose();
  };

  return (
    <Box mt={1}>
      <Accordion
        sx={{ border: "none" }}
        expanded={openAccordion}
        onChange={handleAccordionToggle}
      >
        <AccordionSummary
          sx={{ display: "none" }}
          expandIcon={<ExpandMoreIcon />}
        ></AccordionSummary>
        <AccordionDetails sx={{ mt: 2 }}>
          <Box display={"flex"} alignItems={"center"} gap={2}>
            <Button
              aria-controls="type-menu"
              aria-haspopup="true"
              onClick={(event) => handleClick(event, "type")}
            >
              Loại: {t(selectedFilter) || t("All")}
            </Button>
            <Button
              aria-controls="time-menu"
              aria-haspopup="true"
              onClick={(event) => handleClick(event, "time")}
            >
              {t("time")}: Gần đây
            </Button>
            <Button
              aria-controls="amount-menu"
              aria-haspopup="true"
              onClick={(event) => handleClick(event, "amount")}
            >
              {t("Trade amount")}:{" "}
              {selectedAmount === "all" ? "Tất cả" : selectedAmount}
            </Button>

            <Menu // Menu 1
              id="type-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl) && selectedMenu === "type"}
              onClose={handleClose}
            >
              <MenuItem
                onClick={() => {
                  setSelectedFilter("All");
                  handleClose();
                  setData(data);
                }}
              >
                Tất cả
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setSelectedFilter("Command");
                  setData(data?.filter((item) => item?.message === "success"));
                  handleClose();
                }}
              >
                Lệnh
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setSelectedFilter("Activity");
                  setData(data?.filter((item) => item?.message !== "success"));
                  handleClose();
                }}
              >
                Hoạt động
              </MenuItem>
            </Menu>

            <Menu // Menu 2
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
                          disableFuture
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
                            ampm={false}
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
                            ampm={false}
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
                <Button onClick={handleFilterByDate}>OK</Button>
              </DialogActions>
            </Dialog>

            <Menu
              id="amount-menu" // menu 3
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl) && selectedMenu === "amount"}
              onClose={handleClose}
            >
              <Box px={2} py={1}>
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  sx={{ fontSize: "16px", fontWeight: "bold" }}
                >
                  {t("Trade amount")}
                </Typography>
                <RadioGroup
                  value={selectedAmount}
                  onChange={handleAmountChange}
                >
                  <FormControlLabel
                    value="all"
                    control={<Radio />}
                    label={
                      <Typography
                        sx={{ fontSize: "14px", fontWeight: "normal" }}
                      >
                        Tất cả
                      </Typography>
                    }
                  />
                  <FormControlLabel
                    value="lessThan10"
                    control={<Radio />}
                    label={
                      <Typography
                        sx={{ fontSize: "14px", fontWeight: "normal" }}
                      >
                        Nhỏ hơn $10
                      </Typography>
                    }
                  />
                  <FormControlLabel
                    value="1to2"
                    control={<Radio />}
                    label={
                      <Typography
                        sx={{ fontSize: "14px", fontWeight: "normal" }}
                      >
                        Từ $1 đến $2
                      </Typography>
                    }
                  />
                  <FormControlLabel
                    value="1to5"
                    control={<Radio />}
                    label={
                      <Typography
                        sx={{ fontSize: "14px", fontWeight: "normal" }}
                      >
                        Từ $1 đến $5
                      </Typography>
                    }
                  />
                  <FormControlLabel
                    value="5to10"
                    control={<Radio />}
                    label={
                      <Typography
                        sx={{ fontSize: "14px", fontWeight: "normal" }}
                      >
                        Từ $5 đến $10
                      </Typography>
                    }
                  />
                  <FormControlLabel
                    value="moreThan10"
                    control={<Radio />}
                    label={
                      <Typography
                        sx={{ fontSize: "14px", fontWeight: "normal" }}
                      >
                        Lớn hơn $10
                      </Typography>
                    }
                  />
                </RadioGroup>
              </Box>
            </Menu>
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}

export default FilterComponent;
