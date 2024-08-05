// MultiplyIndex.js
import React, { memo, useContext, useEffect, useState } from "react";
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
  Skeleton,
} from "@mui/material";
import Header from "./Header";
import { SettingsContext } from "contexts/settingsContext";
import { SocketContext } from "contexts/SocketContext";
import copytradeApi from "api/copytrade/copytradeApi";
import { showToast } from "components/toast/toast";
import AuthContext from "contexts/AuthContext";
import { useTranslation } from "react-i18next";
import { ManualTradeContext } from "contexts/ManualTradeContext";

const MultiplyIndex = () => {
  const { isConnected, socket } = useContext(SocketContext);
  // const theme = useTheme();
  const {t }= useTranslation()
  const {
    loading
    // setData,
  } = useContext(ManualTradeContext);
  const { walletMode } = useContext(SettingsContext);
  const [countDown, setCountDown] = useState(0);
  const [betAmount, setBetAmount] = useState(1);
  const [statusTrade, setStatusTrade] = useState();
  const [multiplier, setMultiplier] = useState(1);
  const [isBrokerMode, setIsBrokerMode] = useState(typeof JSON.parse(localStorage.getItem("brokerMode"))=== "boolean" ? JSON.parse(localStorage.getItem("brokerMode")) : false);
  // const [betType, setBetType] = useState("");
  const [customMultiplier, setCustomMultiplier] = useState("");
  const {selectedLinkAccount }= useContext(AuthContext)
  const [submitting, setSubmitting]= useState(false)
  const isDisableButtonTrade = statusTrade === "WAIT" || !statusTrade;
  const isErrorBetAmount =
    betAmount.toString().length <= 0 || betAmount > 1000000 || betAmount <= 0;
  const handleMultiplier = (event, newMultiplier) => {
    if (newMultiplier !== null) {
      setMultiplier(newMultiplier);
    }
  };

  const handleChangeBrokerMode = (e) => {
    localStorage.setItem("brokerMode", e.target.checked)
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

  // useEffect(()=> {
  //   if(isConnected && selectedLinkAccount) {
  //     socket.emit("LINK_ACCOUNT_SUBCRIBE", selectedLinkAccount)
  //     return ()=> {
  //       socket.emit("LINK_ACCOUNT_UNSUBCRIBE", selectedLinkAccount)
  //     }
  //   }
  // }, [isConnected, socket, selectedLinkAccount])

  const handleSubmit = async (betType) => {
    try {
      const data = {
        betType,
        amount: parseFloat(betAmount) * parseInt(multiplier === "Khác" ? parseInt(customMultiplier) : multiplier),
        isBrokerMode,
        accountType: walletMode ? "LIVE" : "DEMO",
        linkAccountId: selectedLinkAccount
      };
      setSubmitting(true)
      const response = await copytradeApi.postUserCopytrade(data);
      if (response?.data?.ok === true) {
        showToast(t("Order successfully!"), "success");
      } else if (response?.data?.ok === false) {
        showToast(t(response?.data?.d?.err_code) || t("unknow_err"), "error");
      }
    } catch (error) {
      showToast(t(error?.response?.data?.err_code) || t("unknow_err"), "error");
    }
    finally {
      setSubmitting(false)
    }
  };

  return (
    <Box position={"relative"} overflow={"hidden"}>
      {loading=== false && <>
        <Card variant="outlined">
          <Box p={2} borderRadius={4}>
            <Header />
            <Box mb={1}>
              <TextField
                label={`${t("Trade amount")} ($)`}
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
                    ? t("Value is invalid")
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
                  {t("Other")}
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
                  statusTrade === "WAIT" ? t("Waiting time") : t("FrmCreate_OrderIndex_label")
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
                disabled={(isDisableButtonTrade=== false && submitting=== false) ? false : true}
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
                disabled={(isDisableButtonTrade=== false && submitting=== false) ? false : true}
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
                  label={t("Expert Mode")}
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
      </>}
      {loading === true && (
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
          <Skeleton variant="rectangular" width={"100%"} height={300} />
        </Box>
      )}
    </Box>
  );
};

export default memo(MultiplyIndex);
