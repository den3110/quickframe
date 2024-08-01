import { Box, Button, Card, Divider, FormControlLabel, FormGroup, IconButton, Switch, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import copytradeApi from "api/copytrade/copytradeApi";
import { showToast } from "components/toast/toast";
import AuthContext from "contexts/AuthContext";
import { SettingsContext } from "contexts/settingsContext";
import { SocketContext } from "contexts/SocketContext";
import Toggle from "icons/duotone/Toggle";
import React, { memo, useContext, useEffect, useState } from "react";
import CloseIcon from "icons/duotone/CloseIcon";
import { useTranslation } from "react-i18next";


const useStyles = makeStyles((theme) => ({
    input: {
      height: "56px",
      boxSizing: "border-box",
    },
    button: {
      height: "44px",
      minWidth: "auto", // To ensure button does not expand unnecessarily
    },
  }));
  
const PopupTrade = ({selectedBot}) => {
    const {t }= useTranslation()
    const downLg = useMediaQuery((theme) => theme.breakpoints.down("lg"));
    const [openTrade, setOpenTrade] = useState(false);
    const theme= useTheme()
    const { walletMode } = useContext(SettingsContext);
    
  const [countDown, setCountDown] = useState(0);
  const [betAmount, setBetAmount] = useState(1);
  const [statusTrade, setStatusTrade] = useState();
  const [multiplier, setMultiplier] = useState(1);
  const { isConnected, socket } = useContext(SocketContext);
  const { selectedLinkAccount } = useContext(AuthContext);
    const classes = useStyles();
    const [isBrokerMode, setIsBrokerMode] = useState(
        typeof JSON.parse(localStorage.getItem("brokerModeTele")) === "boolean"
          ? JSON.parse(localStorage.getItem("brokerModeTele"))
          : false
      );
    const isDisableButtonTrade = statusTrade === "WAIT" || !statusTrade;
  const isErrorBetAmount =
    betAmount.toString().length <= 0 || betAmount > 1000000 || betAmount <= 0;

    const handleChangeBrokerMode = (e) => {
        localStorage.setItem("brokerModeTele", e.target.checked);
        setIsBrokerMode(e.target.checked);
      };
    

    useEffect(() => {
        if (isConnected) {
          socket.emit("CURRENT_SESSION_SUBCRIBE");
          socket.on("CURRENT_SESSION", (data) => {
            setCountDown(data?.r_second);
            setStatusTrade(data?.ss_t);
          });
        }
      }, [isConnected, socket]);

      const handleSubmit = async (betType) => {
        try {
          const data = {
            betType,
            amount: parseFloat(betAmount) * parseInt(multiplier),
            isBrokerMode: isBrokerMode,
            accountType: walletMode ? "LIVE" : "DEMO",
            linkAccountId: selectedLinkAccount,
          };
          const response = await copytradeApi.postUserCopytrade(data);
          if (response?.data?.ok === true) {
            showToast("Đặt lệnh thành công", "success");
          } else if (response?.data?.ok === false) {
            showToast(t(response?.data?.d?.err_code) || t("unknow_err"), "error");
          }
        } catch (error) {
          console.log(error);
          showToast(error?.response?.data?.err_code || t("unknow_err"), "error");
        }
      };

  return (
    <Box
      position={downLg ? "fixed" : "absolute"}
      bottom={downLg ? 70 : 16}
      right={downLg ? 8 : 16}
      sx={{ zIndex: 10 }}
    >
      {openTrade === true && (
        <Box
          borderRadius={"10px"}
          boxShadow={3}
          border={`1px solid ${theme.palette.border}`}
          overflow={"hidden"}
        >
          <Box position={"relative"} overflow={"hidden"}>
            <Card>
              <Box width={downLg ? "calc(100vw - 16px)" : "aaa"} p={2}>
                <Box display={"flex"} gap={1} mb={1}>
                  <Box>
                    <Typography variant="body2" fontSize={12} fontWeight={600}>
                     {t("Trade amount")}
                    </Typography>
                    <TextField
                      sx={{ width: 120 }}
                      className={classes.input}
                      variant="outlined"
                      fullWidth
                      prefix="$"
                      size="small"
                      defaultValue={1}
                      onChange={(e) => setBetAmount(e.target.value)}
                      type="number"
                      error={isErrorBetAmount ? true : false}
                      helperText={
                        isErrorBetAmount ? (
                          <Typography fontSize={8}>
                            {t("Value is invalid")}
                          </Typography>
                        ) : (
                          ""
                        )
                      }
                    />
                  </Box>
                  <Box>
                    <Typography variant="body2" fontSize={12} fontWeight={600}>
                      {t("Multiply")}
                    </Typography>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="start"
                      gap={1}
                    >
                      <Button
                        onClick={() => {
                          setMultiplier(1);
                        }}
                        className={classes.button}
                        variant={multiplier === 1 ? "contained" : "outlined"}
                      >
                        1x
                      </Button>
                      <Button
                        onClick={() => {
                          setMultiplier(2);
                        }}
                        className={classes.button}
                        variant={multiplier === 2 ? "contained" : "outlined"}
                      >
                        2x
                      </Button>
                      <TextField
                        onChange={(e) => {
                          setMultiplier(parseFloat(e.target.value));
                        }}
                        type="number"
                        placeholder={t("Other")}
                        sx={{ width: 60 }}
                        className={classes.input}
                        variant="outlined"
                      >
                        {t("Other")}
                      </TextField>
                    </Box>
                  </Box>
                  <Box mt={1}></Box>
                </Box>
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
                <Divider />
                <Box
                  mt={2}
                  display="flex"
                  justifyContent="space-between"
                  gap={1}
                >
                  <Button
                    disabled={isDisableButtonTrade}
                    fullWidth
                    variant="contained"
                    color="error"
                    onClick={() => {
                      handleSubmit("DOWN");
                    }}
                  >
                    Down
                  </Button>
                  <Button fullWidth variant="contained" color="primary">
                    {countDown}s
                  </Button>
                  <Button
                    disabled={isDisableButtonTrade}
                    onClick={() => {
                      handleSubmit("UP");
                    }}
                    fullWidth
                    variant="contained"
                    color="success"
                  >
                    Up
                  </Button>
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
                right: -30,
                textAlign: "center",
                textTransform: "uppercase",
                top: 10,
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
        </Box>
      )}
      <Box
        mt={2}
        display={"flex"}
        alignItems={"center"}
        gap={2}
        flexDirection={"row-reverse"}
      >
        <Box
          sx={{
            direction: "rtl",
            display: "flex",
            flexDirection: "row-reverse",
          }}
        >
          <Box sx={{ cursor: "pointer" }}>
            {openTrade === false && (
              <Toggle
                width={"2.5rem"}
                height={"2.5rem"}
                style={{ width: 48, height: 48 }}
                onClick={() => setOpenTrade((prev) => !prev)}
              />
            )}
            {openTrade === true && (
              <CloseIcon
                width={"2.5rem"}
                height={"2.5rem"}
                style={{ width: 48, height: 48 }}
                onClick={() => setOpenTrade((prev) => !prev)}
              />
            )}
          </Box>
        </Box>
        {selectedBot && (
          <Box>
            <IconButton
              onClick={() => {
                window.open(selectedBot?.url);
              }}
            >
              <img
                alt="Can't display"
                style={{ width: 48, height: 48 }}
                src="https://cdn.pixabay.com/photo/2021/12/27/10/50/telegram-icon-6896828_960_720.png"
              />
            </IconButton>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default memo(PopupTrade);
