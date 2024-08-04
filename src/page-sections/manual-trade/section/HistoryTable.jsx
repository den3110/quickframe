import React, { memo, useContext, useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Menu,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  RadioGroup,
  FormControlLabel,
  Radio,
  CircularProgress,
  Skeleton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  LocalizationProvider,
  DateCalendar,
  TimeClock,
} from "@mui/x-date-pickers-pro";
import { AdapterDateFns } from "@mui/x-date-pickers-pro/AdapterDateFns";
import TableDetailTrade from "../component/TableDetailTrade";
import { ManualTradeContext } from "contexts/ManualTradeContext";
import { useTranslation } from "react-i18next";

const HistoryTable = ({isFromTeleChannel}) => {
  const {t }= useTranslation()
  const {
    data,
    loading
    // setData,
  } = useContext(ManualTradeContext);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  // const [data, setData] = useState([]); // Assuming you have a data state
  const toggleFilterVisibility = () => {
    setIsFilterVisible(!isFilterVisible);
  };  

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [dataState, setDataState]= useState()

  // time
  const [selectedDate, setSelectedDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  // const [selectedFilter, setSelectedFilter] = useState("");
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

      setDataState(filteredData);
    }
    handleCloseDateDialog();
  };

  const handleAmountChange = (event) => {
    setSelectedAmount(event.target.value);
    switch (event.target.value) {
      case "all":
        setDataState(data)
        break;
      case "lessThan10":
        setDataState(data?.filter(item=> parseFloat(item?.betAmount) <= 10))
        break;
      case "1to2":
        setDataState(data?.filter(item=> parseFloat(item?.betAmount) >= 1 && parseFloat(item?.betAmount) <= 2))
        break
      case "1to5":
        setDataState(data?.filter(item=> parseFloat(item?.betAmount) >= 1 && parseFloat(item?.betAmount) <= 5))
        break
      case "5to10":
        setDataState(data?.filter(item=> parseFloat(item?.betAmount) >= 5 && parseFloat(item?.betAmount) <= 10))
        break
      case "moreThan10":
        setDataState(data?.filter(item=> parseFloat(item?.betAmount) >= 10))
        break
      default:
        break;
    }
    handleClose();
  };

  useEffect(()=> {
    setDataState(data)
  }, [data])

  return (
    <Box mt={isFromTeleChannel? 0 : 2}>
      {loading=== true && <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
        <Skeleton variant="rectangular" width={"100%"} height={500} />
      </Box>}
      {loading=== false && 
        <Card variant="outlined">
          <Accordion sx={{ border: "none" }} expanded={isFilterVisible}>
            <AccordionSummary
              expandIcon={
                <Box onClick={toggleFilterVisibility}>
                  <ExpandMoreIcon />
                </Box>
              }
              onClick={toggleFilterVisibility}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography onClick={toggleFilterVisibility} variant="body1">{t("Filters")}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box display={"flex"} alignItems={"center"} gap={2}>
                <Button
                  aria-controls="time-menu"
                  aria-haspopup="true"
                  onClick={(event) => handleClick(event, "time")}
                >
                  {t("time")}: {t("Recently")}
                </Button>
                <Button
                  aria-controls="amount-menu"
                  aria-haspopup="true"
                  onClick={(event) => handleClick(event, "amount")}
                >
                  {t("Trade amount")}:{" "}
                  {selectedAmount === "all" ? "Tất cả" : t(selectedAmount)}
                </Button>

                <Menu // Menu 2
                  id="time-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl) && selectedMenu === "time"}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>{t("Recently")}</MenuItem>
                  <MenuItem onClick={handleOpenDateDialog}>{t("Custom")}</MenuItem>
                </Menu>

                <Dialog
                  fullWidth
                  maxWidth={"sm"}
                  open={openDateDialog}
                  onClose={handleCloseDateDialog}
                >
                  <DialogTitle>{t("Custom")}</DialogTitle>
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
                              <Box mb={1}>{t("Start time")}</Box>
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
                      sx={{ fontSize: "16px" }}
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
                            sx={{ fontSize: "14px" }}
                          >
                            {t("All")}
                          </Typography>
                        }
                      />
                      <FormControlLabel
                        value="lessThan10"
                        control={<Radio />}
                        label={
                          <Typography
                            sx={{ fontSize: "14px" }}
                          >
                            {t("lessThan10")}
                          </Typography>
                        }
                      />
                      <FormControlLabel
                        value="1to2"
                        control={<Radio />}
                        
                        label={
                          <Typography
                            sx={{ fontSize: "14px" }}
                          >
                            {t("1to2")}
                          </Typography>
                        }
                      />
                      <FormControlLabel
                        value="1to5"
                        control={<Radio />}
                        label={
                          <Typography
                            sx={{ fontSize: "14px" }}
                          >
                            {t("1to5")}
                          </Typography>
                        }
                      />
                      <FormControlLabel
                        value="5to10"
                        control={<Radio />}
                        label={
                          <Typography
                            sx={{ fontSize: "14px" }}
                          >
                            {t("5to10")}
                          </Typography>
                        }
                      />
                      <FormControlLabel
                        value="moreThan10"
                        control={<Radio />}
                        label={
                          <Typography
                            sx={{ fontSize: "14px" }}
                          >
                            {t("moreThan10")}
                          </Typography>
                        }
                      />
                    </RadioGroup>
                  </Box>
                </Menu>
              </Box>
            </AccordionDetails>
          </Accordion>
          <Divider />
          <Box p={2}>
            <TableDetailTrade dataState={dataState} />
          </Box>
        </Card>
      }
    </Box>
  );
};

export default memo(HistoryTable);
