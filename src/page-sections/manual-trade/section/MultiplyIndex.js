// MultiplyIndex.js
import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  ToggleButtonGroup,
  ToggleButton,
  useTheme,
  Card,
  Switch,
  FormGroup,
  FormControlLabel,
} from "@mui/material";
import Header from "./Header";
import { SettingsContext } from "contexts/settingsContext";
import { SocketContext } from "contexts/SocketContext";
import copytradeApi from "api/copytrade/copytradeApi";
import { showToast } from "components/toast/toast";
import AuthContext from "contexts/AuthContext";

const MultiplyIndex = () => {
  const { isConnected, socket } = useContext(SocketContext);
  const theme = useTheme();
  const { walletMode } = useContext(SettingsContext);
  const [countDown, setCountDown] = useState(0);
  const [betAmount, setBetAmount] = useState(1);
  const [statusTrade, setStatusTrade] = useState();
  const [multiplier, setMultiplier] = useState(1);
  const [isBrokerMode, setIsBrokerMode] = useState(false);
  const [betType, setBetType] = useState("");
  const [customMultiplier, setCustomMultiplier] = useState("");
  const {selectedLinkAccount }= useContext(AuthContext)
  const isDisableButtonTrade = statusTrade === "WAIT" || !statusTrade;
  const isErrorBetAmount =
    betAmount.toString().length <= 0 || betAmount > 1000000 || betAmount <= 0;
  const handleMultiplier = (event, newMultiplier) => {
    if (newMultiplier !== null) {
      setMultiplier(newMultiplier);
    }
  };

  const handleChangeBrokerMode = (e) => {
    setIsBrokerMode(e.target.checked);
  };

  const handleCustomMultiplierChange = (event) => {
    const value = event.target.value;
    if (value === '' || /^\d+$/.test(value)) {
      setCustomMultiplier(value);
    }
    // setMultiplier(event.target.value);
  };

  useEffect(() => {
    if (isConnected) {
      
      socket.on("CURRENT_SESSION", (data) => {
        // console.log("CURRENT_SESSION", data);
        setCountDown(data?.r_second);
        setStatusTrade(data?.ss_t);
      });
    }
  }, [isConnected, socket]);

  const handleSubmit = async (betType) => {
    try {
      const data = {
        betType,
        amount: parseFloat(betAmount) * parseInt(multiplier === "Khác" ? parseInt(customMultiplier) : multiplier),
        isBrokerMode,
        accountType: walletMode ? "LIVE" : "DEMO",
        linkAccountId: selectedLinkAccount
      };
      const response = await copytradeApi.postUserCopytrade(data);
      if (response?.data?.ok === true) {
        showToast("Đặt lệnh thành công", "success");
      } else if (response?.data?.ok === false) {
        showToast(response?.data?.d?.err_code || "Unknow error", "error");
      }
    } catch (error) {
      showToast(error?.response?.data?.err_code || "Unknow error", "error");
    }
  };

  return (
    <Box position={"relative"} overflow={"hidden"}>
      <Card variant="outlined">
        <Box p={2} borderRadius={4}>
          <Header />
          <Box mb={1}>
            <TextField
              label="Số tiền vào lệnh ($)"
              variant="outlined"
              fullWidth
              margin="normal"
              prefix="$"
              defaultValue={1}
              onChange={(e) => setBetAmount(e.target.value)}
              type="number"
              error={isErrorBetAmount ? true : false}
              helperText={
                isErrorBetAmount
                  ? "Không thể nhập giá trị lớn hơn 1.000.000 và nhỏ hơn 0"
                  : ""
              }
            />
          </Box>
          <Box mb={1}>
            <ToggleButtonGroup
              value={multiplier}
              exclusive
              onChange={handleMultiplier}
              fullWidth
              margin="normal"
            >
              <ToggleButton
                value={1}
                sx={{
                  "&.Mui-selected, &.Mui-selected:hover": {
                    backgroundColor: "primary.main",
                    color: "white",
                  },
                }}
              >
                1x
              </ToggleButton>
              <ToggleButton
                value={2}
                sx={{
                  "&.Mui-selected, &.Mui-selected:hover": {
                    backgroundColor: "primary.main",
                    color: "white",
                  },
                }}
              >
                2x
              </ToggleButton>
              <ToggleButton
                value={4}
                sx={{
                  "&.Mui-selected, &.Mui-selected:hover": {
                    backgroundColor: "primary.main",
                    color: "white",
                  },
                }}
              >
                4x
              </ToggleButton>
              <ToggleButton
                value={8}
                sx={{
                  "&.Mui-selected, &.Mui-selected:hover": {
                    backgroundColor: "primary.main",
                    color: "white",
                  },
                }}
              >
                8x
              </ToggleButton>
              <ToggleButton
                value="Khác"
                sx={{
                  "&.Mui-selected, &.Mui-selected:hover": {
                    backgroundColor: "primary.main",
                    color: "white",
                  },
                }}
              >
                Khác
              </ToggleButton>
            </ToggleButtonGroup>
            {multiplier === "Khác" && (
              <TextField
                label="Hệ số nhân"
                variant="outlined"
                fullWidth
                margin="normal"
                value={customMultiplier}
                onChange={handleCustomMultiplierChange}
              />
            )}
          </Box>
          <Box mb={1}>
            <TextField
              label={
                statusTrade === "WAIT" ? `Thời gian chờ` : "Thời gian giao dịch"
              }
              variant="outlined"
              fullWidth
              margin="normal"
              defaultValue="0s"
              value={countDown?.toString()?.replaceAll("s", "") + "s"}
              aria-readonly
            />
          </Box>
          <Box display="flex" justifyContent="space-between" mt={2} gap={1.5}>
            <Button
              disabled={isDisableButtonTrade}
              sx={{
                "&.Mui-disabled": {
                  opacity: 0.6, // Điều chỉnh opacity khi button bị disable
                },
              }}
              onClick={() => {
                handleSubmit("DOWN");
              }}
              fullWidth
              variant="contained"
              color="error"
              size="large"
            >
              Sell
            </Button>
            <Button
              disabled={isDisableButtonTrade}
              sx={{
                "&.Mui-disabled": {
                  opacity: 0.6, // Điều chỉnh opacity khi button bị disable
                },
              }}
              onClick={() => {
                handleSubmit("UP");
              }}
              fullWidth
              variant="contained"
              color="success"
              size="large"
            >
              Buy
            </Button>
          </Box>
          <Box mt={1}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={isBrokerMode}
                    onChange={handleChangeBrokerMode}
                  />
                }
                label="Chế độ chuyên gia"
              />
            </FormGroup>
          </Box>
        </Box>
      </Card>
      <Box
        position={"absolute"}
        sx={{
          background:
            "linear-gradient(154.83deg,#03c768 15.98%,#0062ff 85.83%)",
          fontSize: 9,
          height: 20,
          lineHeight: 2,
          right: -20,
          textAlign: "center",
          textTransform: "uppercase",
          top: 15,
          transform: "rotate(45deg)",
          width: 90,
          borderRadius: "12px",
          fontWeight: 600,
          minWidth: 70,
          overflow: "hidden",
          padding: "0 6px",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          color: "white",
        }}
      >
        {walletMode ? "LIVE" : "DEMO"}
      </Box>
    </Box>
  );
};

export default MultiplyIndex;
