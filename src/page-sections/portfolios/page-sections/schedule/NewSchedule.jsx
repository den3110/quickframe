import React, { useEffect, useState } from "react";
import Drawer from "@mui/material/Drawer";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import { TimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {
  Checkbox,
  ListItemText,
  useMediaQuery,
  useTheme,
  IconButton,
  Chip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { showToast } from "components/toast/toast";
import portfolioApi from "api/portfolios/portfolioApi";
import moment from "moment-timezone";

export default function NewSchedule({
  open,
  onClose,
  isEdit,
  dataProps,
  setDataProps,
  selectedSchedule,
  setIsEdit,
  setChange
}) {
  const [startTime, setStartTime] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
  });

  const [endTime, setEndTime] = useState(() => {
    const now = new Date();
    return new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      23,
      59,
      0
    );
  });
  const [packages, setPackages] = useState([]);
  const [scheduleName, setScheduleName] = useState("");
  const [disableEndTime, setDisableEndTime] = useState(false);
  const downLg = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  const theme = useTheme();
  const [dataBotList, setDataBotList] = useState([]);
  const [firstBot, setFirstBot] = useState();
  const [loading, setLoading] = useState();
  const handlePackageChange = (event) => {
    setPackages(event.target.value);
  };

  const handleClose = () => {
    onClose();
    setIsEdit(false);
  };

  const isButtonDisabled =
    !scheduleName || packages.length === 0 || loading === true;
  const handleAdd = async () => {
    try {
      setLoading(true);
      const startTimeGMT = moment.tz(startTime, "GMT").format("HH:mm");
      const endTimeGMT = disableEndTime
        ? null
        : moment.tz(endTime, "GMT").format("HH:mm");

      const payload = {
        name: scheduleName,
        no_stop_enabled: disableEndTime,
        start_time: startTimeGMT,
        stop_time: endTimeGMT,
        botIds: packages,
      };

      if (isEdit === true) {
        const response= await portfolioApi.userScheduleUpdate(selectedSchedule?._id, payload);
        const dataTemp = dataProps;
        const findIndex = dataProps?.findIndex(
          (item) => item?._id === selectedSchedule?._id
        );
        if (findIndex !== -1) {
          dataTemp[findIndex] = response?.data?.d;
          setDataProps(dataTemp);
        }
        // setDataProps([payload, ...dataProps]);
        showToast("Sửa cấu hình thành công", "success");
        setChange(prev=> !prev)
      } else if (isEdit !== true) {
        const response = await portfolioApi.userScheduleCreate(payload);
        setDataProps([response?.data?.d, ...dataProps]);
        showToast("Thêm cấu hình thành công", "success");
      }

      handleClose();
      setStartTime(new Date());
      setEndTime(new Date());
      setPackages([]);
      setScheduleName("");
      setDisableEndTime(false);
    } catch (error) {
      console.log(error);
      showToast(error.response?.data?.message || "Đã xảy ra lỗi", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await portfolioApi.userBotList();
        if (response?.data?.ok === true) {
          setDataBotList(response?.data?.d);
          setFirstBot(response?.data?.d?.[0]?._id);
          setPackages([response?.data?.d?.[0]?._id]);
        } else if (response?.data?.ok === false) {
          showToast(response?.data?.m);
        }
      } catch (error) {
        showToast(error?.response?.data?.m, "error");
      }
    })();
  }, []);

  useEffect(() => {
    const now = new Date();
    if (isEdit === true) {
      if (selectedSchedule?.start_time) {
        const [hoursStart, minutesStart] = selectedSchedule?.start_time
          .split(":")
          .map(Number);
        const startDate = new Date(
          new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
            hoursStart,
            minutesStart
          ).getTime() +
            7 * 60 * 60 * 1000
        );
        if (startDate.getDate() !== now.getDate()) {
          startDate.setDate(now.getDate());
        }
        setStartTime(startDate);
      }
      else {
        setStartTime(new Date())
      }
      if (selectedSchedule?.stop_time) {
        const [hoursStop, minutesStop] = selectedSchedule?.stop_time
          .split(":")
          .map(Number);
  
        const endDate = new Date(
          new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
            hoursStop,
            minutesStop
          ).getTime() +
            7 * 60 * 60 * 1000
        );
  
        if (endDate.getDate() !== now.getDate()) {
          endDate.setDate(now.getDate());
        }
  
        setEndTime(endDate);
      }
      else {
        setEndTime(new Date())
      }
      setScheduleName(selectedSchedule?.name);
      setPackages(selectedSchedule?.botIds);
      setDisableEndTime(selectedSchedule?.no_stop_enabled);
    } else {
      setStartTime(
        new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0)
      );
      setEndTime(
        new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 0)
      );
      setScheduleName("");
      setPackages([firstBot]);
      setDisableEndTime(false);
    }
  }, [isEdit, selectedSchedule, firstBot]);

  return (
    <Drawer
      anchor={downLg ? "bottom" : "right"}
      open={open}
      onClose={handleClose}
    >
      <Box
        sx={{
          width: downLg ? "100%" : 850,
          padding: 2,
          height: downLg ? "70vh" : "100%",
        }}
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        <Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6">Thiết lập hẹn giờ</Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider sx={{ marginY: 2 }} />
          <Box>
            <TextField
              label="Tên hẹn giờ"
              variant="outlined"
              fullWidth
              margin="normal"
              value={scheduleName}
              onChange={(e) => setScheduleName(e.target.value)}
            />
            <Box mt={1} display="flex" alignItems="center" width={"100%"}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Box sx={{ display: "flex", gap: 1, width: "100%" }}>
                  <Box flex={1}>
                    <TimePicker
                      label="Thời gian bắt đầu (UTC+7)"
                      value={startTime}
                      onChange={setStartTime}
                      renderInput={(params) => (
                        <TextField {...params} fullWidth />
                      )}
                    />
                  </Box>
                  <Box
                    flex={1}
                    sx={{ display: "flex", alignItems: "center" }}
                    gap={0.5}
                  >
                    <Box
                      display={"flex"}
                      justifyContent={"center"}
                      alignItems={"center"}
                    >
                      <Checkbox
                        checked={disableEndTime}
                        onChange={(e) => setDisableEndTime(e.target.checked)}
                      />
                      <Typography variant="body2">Disable</Typography>
                    </Box>
                    <TimePicker
                      label="Thời gian ngưng (UTC+7)"
                      value={endTime}
                      onChange={setEndTime}
                      renderInput={(params) => (
                        <TextField {...params} fullWidth />
                      )}
                      disabled={disableEndTime}
                      fullWidth
                    />
                  </Box>
                </Box>
              </LocalizationProvider>
            </Box>
            <FormControl fullWidth margin="normal">
              <InputLabel>Chọn gói</InputLabel>
              <Select
                multiple
                value={packages}
                onChange={handlePackageChange}
                label="Chọn gói"
                renderValue={(selected) => (
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 0.5,
                    }}
                  >
                    {selected.map((value) => (
                      <Chip
                        key={value}
                        label={
                          <Box>
                            <Box>
                              {
                                dataBotList.find((item) => item._id === value)
                                  ?.name
                              }
                            </Box>
                          </Box>
                        }
                      />
                    ))}
                  </Box>
                )}
              >
                {/* {dataBotList.map((item, key) => (
                  <MenuItem key={key} value={item._id}>
                    <Checkbox checked={packages.indexOf(item._id) > -1} />
                    <ListItemText primary={item.name} />
                  </MenuItem>
                ))} */}
              </Select>
            </FormControl>
          </Box>
        </Box>
        <Box
          display="flex"
          gap={1}
          justifyContent="space-between"
          position="sticky"
          bottom={0}
          bgcolor={theme.palette.background.paper}
          py={2}
        >
          <Button
            variant="contained"
            color="success"
            fullWidth
            sx={{ marginTop: 3 }}
            onClick={handleAdd}
            disabled={isButtonDisabled}
          >
            {isEdit === true ? "Sửa cấu hình" : "Thêm cấu hình"}
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}
