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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import signalStrategyApi from "api/singal-strategy/signalStrategyApi";
import { showToast } from "components/toast/toast";

export default function NewSchedule({ open, onClose, isEdit }) {
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [packages, setPackages] = useState("");
  const [scheduleName, setScheduleName] = useState("");
  const downLg = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  const theme = useTheme();
  const [dataSignalStrategy, setDataSignalStrategy] = useState([]);
  const [firstDataSignalStrategy, setFirstDataSignalStrategy] = useState();

  const handleAdd = async () => {
    try {
      showToast("Thêm cấu hình thành công", "success");
      onClose();
      setStartTime(new Date());
      setEndTime(new Date());
      setPackages("");
      setScheduleName("");
    } catch (error) {
      // Handle the error appropriately
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await signalStrategyApi.userBudgetSignalList();
        if (response?.data?.ok === true) {
          setDataSignalStrategy(response?.data?.d);
          setFirstDataSignalStrategy(response?.data?.d?.[0]?._id);
          setPackages(response?.data?.d?.[0]?._id);
        } else if (response?.data?.ok === false) {
          showToast(response?.data?.m);
        }
      } catch (error) {
        showToast(error?.response?.data?.m, "error");
      }
    })();
  }, []);

  const isButtonDisabled = !scheduleName || !packages;

  return (
    <Drawer anchor={downLg ? "bottom" : "right"} open={open} onClose={onClose}>
      <Box
        sx={{
          width: downLg ? "100%" : 850,
          padding: 2,
          height: downLg ? "70vh" : "100%",
        }}
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        className="akslwkawa"
      >
        <Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6">Thiết lập hẹn giờ</Typography>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider sx={{ marginY: 2 }} />
          <Box className="aslkwawr">
            <TextField
              label="Tên hẹn giờ"
              variant="outlined"
              fullWidth
              margin="normal"
              value={scheduleName}
              onChange={(e) => setScheduleName(e.target.value)}
            />
            <Box mt={1}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <TimePicker
                    label="Thời gian bắt đầu (UTC+7)"
                    value={startTime}
                    onChange={setStartTime}
                    renderInput={(params) => (
                      <TextField {...params} fullWidth />
                    )}
                  />
                  <TimePicker
                    label="Thời gian ngưng (UTC+7)"
                    value={endTime}
                    onChange={setEndTime}
                    renderInput={(params) => (
                      <TextField {...params} fullWidth />
                    )}
                  />
                </Box>
              </LocalizationProvider>
            </Box>
            <FormControl fullWidth margin="normal">
              <InputLabel>Chọn gói</InputLabel>
              <Select
                value={packages}
                onChange={(e) => setPackages(e.target.value)}
                label="Chọn gói"
              >
                {dataSignalStrategy?.map((item, key) => (
                  <MenuItem key={key} value={item?._id}>
                    <ListItemText primary={item.name} />
                  </MenuItem>
                ))}
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
            Thêm cấu hình
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}
