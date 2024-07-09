import React, { useContext, useEffect, useState } from "react";
import {
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  TextField,
  MenuItem,
  Select,
  // InputLabel,
  FormControl,
  Switch,
  FormControlLabel,
  useTheme,
  useMediaQuery,
  Accordion,
  AccordionSummary,
  Checkbox,
  ListItemText,
  Chip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { MuiChipsInput } from "mui-chips-input";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import budgetStrategyApi from "api/budget-strategy/budgetStrategyApi";
import signalStrategyApi from "api/singal-strategy/signalStrategyApi";
import {
  SignalFeatureTypes,
  SignalFeatureTypesTitle,
} from "type/SignalFeatureTypes";
import { JwtContext } from "contexts/jwtContext";
import { AutoTypes, AutoTypesTitle } from "type/AutoTypes";
import { SettingsContext } from "contexts/settingsContext";

const NewPlanDrawer = ({ open, handleClose }) => {
  const { decodedData } = useContext(JwtContext);
  const {walletMode }= useContext(SettingsContext)
  const [step, setStep] = useState(1);
  const downLg = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  const theme = useTheme();
  const [planName, setPlanName] = useState("");
  const [autoType, setAutoType] = useState(AutoTypes.BOT);
  const [investmentFund, setInvestmentFund] = useState(100);
  const [baseAmount, setBaseAmount] = useState(1);
  const [isBrokerMode, setIsBrokerMode]= useState(false)
  const [budgetStrategy, setBudgetStrategy] = useState("");
  const [signalStrategy, setSignalStrategy] = useState("");
  const [arraySignalStrategy, setArraySignalStrategy] = useState([]);
  const [takeProfit, setTakeProfit] = useState(false);
  const [selectedTab, setSelectedTab] = useState("Bot AI");
  const [leaderUserName, setLeaderUserName] = useState([]);
  const [privateMode, setPrivateMode] = useState(false);
  const [reserveSignal, setReserveSignal] = useState(false);
  const [featureType, setFeatureType] = useState(
    SignalFeatureTypes.SINGLE_METHOD
  );
  const [expanded, setExpanded] = useState(true);
  const [dataBudgetStrategy, setDataBudgetStrategy] = useState([]);
  const [dataSignalStrategy, setDataSignalStrategy] = useState([]);
  const [isChooseBot, setIsChooseBot] = useState(false);
  const isDisableButton = planName?.length <= 0;
  const handleIncrement = (setFunc, value) => setFunc(value + 1);
  const handleDecrement = (setFunc, value) =>
    setFunc(value > 0 ? value - 1 : 0);

  const handleStep = (step) => {
    setStep(step);
  };

  const onClose = () => {
    handleClose();
    setStep(1);
  };

  const handleAccordionChange = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    (async () => {
      try {
        const response1 = await budgetStrategyApi.userBudgetStrategyList();
        const response2 = await signalStrategyApi.userBudgetSignalList();
        if (response1?.data?.ok === true) {
          setBudgetStrategy(response1?.data?.d?.[0]?._id);
          setDataBudgetStrategy(response1?.data?.d);
        }
        if (response2?.data?.ok === true) {
          setSignalStrategy(response2?.data?.d?.[0]?._id);
          setDataSignalStrategy(response2?.data?.d);
        }
      } catch (error) {}
    })();
  }, []);

  useEffect(() => {
    if (decodedData) {
      if (decodedData?.data?.levelStaff > 0) {
        setIsChooseBot(true);
      }
    }
  }, [decodedData]);

  return (
    <Drawer
      anchor={downLg ? "bottom" : "right"}
      open={open}
      onClose={onClose}
      sx={{ zIndex: "" }}
    >
      <Box
        width={downLg ? "100%" : 850}
        p={3}
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        height={downLg ? "70vh" : "100%"}
        sx={{ overflowY: "scroll" }}
      >
        {step === 1 && (
          <>
            <div>
              <AppBar position="static" color="default">
                <Toolbar>
                  <Typography variant="h6" style={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
                    Step 1: Plan profile 
                    <Typography color={walletMode ? theme.palette.success.main : "primary"} variant="body1" fontWeight={600} style={{ flexGrow: 1, marginLeft: "8px" }}>
                      {walletMode ? "Live" : "Demo"}
                    </Typography>
                  </Typography>
                  <IconButton edge="end" color="inherit" onClick={onClose}>
                    <CloseIcon />
                  </IconButton>
                </Toolbar>
              </AppBar>

              <Box mt={2}>
                <Typography variant="subtitle1">Plan name</Typography>
                <TextField
                  fullWidth
                  placeholder="Enter plan name..."
                  required
                  margin="normal"
                  value={planName}
                  onChange={(e) => setPlanName(e.target.value)}
                />
                <Box display="flex" alignItems="center" mt={2}>
                  <Typography variant="subtitle1">Investment fund</Typography>
                  <Box ml={2} display="flex" alignItems="center">
                    <Button
                      variant="contained"
                      onClick={() =>
                        handleDecrement(setInvestmentFund, investmentFund)
                      }
                      style={{ minWidth: 30, padding: 5 }}
                    >
                      -
                    </Button>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        padding: "0 5px",
                      }}
                    >
                      <Typography>$</Typography>
                      <TextField
                        value={investmentFund}
                        onChange={(e) => {
                          setInvestmentFund(parseFloat(e.target.value) || 0);
                        }}
                        inputProps={{
                          min: 0,
                          style: {
                            padding: 5,
                          },
                        }}
                        InputProps={{
                          disableUnderline: true,
                        }}
                        style={{
                          width: 50,
                          margin: "0 4px",
                          textAlign: "center",
                          border: "none",
                          outline: "none",
                        }}
                        sx={{
                          "& fieldset": { border: "none", outline: "none" },
                        }}
                      />
                    </Box>
                    <Button
                      variant="contained"
                      onClick={() =>
                        handleIncrement(setInvestmentFund, investmentFund)
                      }
                      style={{ minWidth: 30, padding: 5 }}
                    >
                      +
                    </Button>
                  </Box>
                </Box>
              </Box>

              <Box mt={4}>
                <AppBar position="static" color="default">
                  <Toolbar>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                      Step 2: Set up your plan
                    </Typography>
                  </Toolbar>
                </AppBar>
                <Box display="flex" mt={2}>
                  {["Bot AI", "Follow Leader"].map((tab) => (
                    <Button
                      key={tab}
                      variant={selectedTab === tab ? "contained" : "outlined"}
                      color={selectedTab === tab ? "primary" : "secondary"}
                      style={{ marginRight: 8 }}
                      onClick={() => setSelectedTab(tab)}
                    >
                      {tab}
                    </Button>
                  ))}
                </Box>
              </Box>
              <Box mt={4}>
                <Typography variant="subtitle1">Tính năng sử dụng</Typography>
                <FormControl variant="outlined" fullWidth margin="normal">
                  <Select
                    value={featureType}
                    onChange={(e) => setFeatureType(e.target.value)}
                    size="medium"
                  >
                    {Object.entries(SignalFeatureTypes).map(([item, key]) => (
                      <MenuItem key={key} value={item}>
                        {SignalFeatureTypesTitle[item]}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              {/*  */}
              {isChooseBot === true && (
                <>
                  {" "}
                  <Box mt={4}>
                    <Typography variant="subtitle1">Chọn Bot</Typography>
                    <FormControl variant="outlined" fullWidth margin="normal">
                      <Select
                        value={autoType}
                        onChange={(e) => setAutoType(e.target.value)}
                        size="medium"
                      >
                        <MenuItem value={AutoTypes.BOT}>
                          {AutoTypesTitle.BOT}
                        </MenuItem>
                        <MenuItem value={AutoTypes.TELEBOT}>
                          {AutoTypesTitle.TELEBOT}
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </>
              )}
              {/*  */}
              <Box mt={4}>
                <Typography variant="subtitle1">
                  {selectedTab === "Bot AI" ? "Signal*" : "Leader username"}
                </Typography>
                {selectedTab === "Bot AI" && (
                  <FormControl variant="outlined" fullWidth margin="normal">
                    {featureType === SignalFeatureTypes.SINGLE_METHOD ? (
                      <>
                        <Select
                          value={signalStrategy}
                          onChange={(e) => setSignalStrategy(e.target.value)}
                          size="medium"
                        >
                          {dataSignalStrategy?.map((item, key) => (
                            <MenuItem key={key} value={item?._id}>
                              {item?.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </>
                    ) : (
                      <>
                        <Select
                          multiple
                          value={arraySignalStrategy}
                          onChange={(e) =>
                            setArraySignalStrategy(e.target.value)
                          }
                          size="medium"
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
                                    dataSignalStrategy.find(
                                      (item) => item._id === value
                                    )?.name
                                  }
                                />
                              ))}
                            </Box>
                          )}
                        >
                          {dataSignalStrategy?.map((item, key) => (
                            <MenuItem key={key} value={item?._id}>
                              <Checkbox
                                checked={
                                  arraySignalStrategy.indexOf(item._id) > -1
                                }
                              />
                              <ListItemText primary={item.name} />
                            </MenuItem>
                          ))}
                        </Select>
                      </>
                    )}
                  </FormControl>
                )}
                {/*  */}
                {selectedTab === "Follow Leader" && (
                  <Box sx={{ width: "100%" }} mt={2}>
                    <MuiChipsInput
                      value={leaderUserName}
                      onChange={(value) => setLeaderUserName(value)}
                      placeholder="Nhấn enter để thêm"
                      sx={{ width: "100%" }}
                    />
                  </Box>
                )}
                {/*  */}
                {selectedTab === "Bot AI" && (
                  <Box mt={2}>
                    <Typography variant="subtitle1">
                      Budget strategy*
                    </Typography>
                    <FormControl variant="outlined" fullWidth margin="normal">
                      <Select
                        value={budgetStrategy}
                        onChange={(e) => setBudgetStrategy(e.target.value)}
                        size="medium"
                      >
                        {dataBudgetStrategy?.map((item, key) => (
                          <MenuItem key={key} value={item?._id}>
                            {item?.name}
                          </MenuItem>
                        ))}
                        {/* Thêm các tùy chọn khác nếu cần */}
                      </Select>
                    </FormControl>
                  </Box>
                )}

                <Box display="flex" alignItems="center" mt={2}>
                  <Typography variant="subtitle1">Set base amount</Typography>
                  <Box ml={2} display="flex" alignItems="center">
                    <Button
                      variant="contained"
                      onClick={() => handleDecrement(setBaseAmount, baseAmount)}
                      style={{ minWidth: 30, padding: 5 }}
                    >
                      -
                    </Button>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        padding: "0 5px",
                      }}
                    >
                      <Typography>$</Typography>
                      <TextField
                        value={baseAmount}
                        onChange={(e) => {
                          setBaseAmount(parseFloat(e.target.value) || 0);
                        }}
                        inputProps={{
                          min: 0,
                          style: {
                            padding: 5,
                          },
                        }}
                        InputProps={{
                          disableUnderline: true,
                        }}
                        style={{
                          width: 50,
                          margin: "0 4px",
                          textAlign: "center",
                          border: "none",
                          outline: "none",
                        }}
                        sx={{
                          "& fieldset": { border: "none", outline: "none" },
                        }}
                      />
                    </Box>
                    <Button
                      variant="contained"
                      onClick={() => handleIncrement(setBaseAmount, baseAmount)}
                      style={{ minWidth: 30, padding: 5 }}
                    >
                      +
                    </Button>
                  </Box>
                </Box>
              </Box>
              {/* {selectedTab === "Bot AI" && (
                <Box mt={4}>
                  <Typography variant="h6">
                    Reset Budget Strategy Conditions
                  </Typography>
                  <FormControlLabel
                    control={<Switch />}
                    label="Reset budget after reaching TP/SL"
                  />
                  <FormControlLabel
                    control={<Switch />}
                    label="Reset budget after clicking 'Resume'"
                  />
                  <FormControlLabel
                    control={<Switch />}
                    label="Reset budget after clicking 'Reset PnL'"
                  />
                </Box>
              )} */}
              <Box mt={4}>
                <Typography variant="h6">
                  Take-Profit/Stop-Loss Conditions
                </Typography>
                <Typography variant="body2">
                  A take-profit or stop-loss order will be triggered
                  automatically for your plan if one of the following conditions
                  is met. Today's PnL will be reset at 00:00 GMT.
                </Typography>
                <FormControlLabel
                  control={
                    <Switch
                      checked={takeProfit}
                      onChange={() => setTakeProfit(!takeProfit)}
                    />
                  }
                  label="Enable TP/SL"
                />
              </Box>
              <Box mt={4}>
                <Typography variant="h6">
                  Chế độ chuyên gia
                </Typography>
                <FormControlLabel
                  control={
                    <Switch
                      checked={isBrokerMode}
                      onChange={() => setIsBrokerMode(!isBrokerMode)}
                    />
                  }
                  label="Broker mode"
                />
              </Box>
              {/* Advanced option */}
              <Box mt={4}>
                <Accordion expanded={expanded} onChange={handleAccordionChange}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="advanced-content"
                    id="advanced-header"
                  >
                    <Typography fontWeight={600}>
                      Advanced (Optional)
                    </Typography>
                  </AccordionSummary>
                  <Box p={2}>
                    <Box mt={4}>
                      <Typography variant="h6">Private Mode</Typography>
                      <Typography variant="body2">
                        Other user will not be able to copy your plan when you
                        enable Private mode
                      </Typography>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={privateMode}
                            onChange={() => setPrivateMode(!privateMode)}
                          />
                        }
                        label="Private Mode"
                      />
                    </Box>
                    <Box mt={4}>
                      <Typography variant="h6">Reverse Signal</Typography>
                      <Typography variant="body2">
                        The order you open will be the opposite of the received
                        signal
                      </Typography>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={reserveSignal}
                            onChange={() => setReserveSignal(!reserveSignal)}
                          />
                        }
                        label="Reverse Signal"
                      />
                    </Box>
                  </Box>
                </Accordion>
              </Box>
            </div>

            <Box
              mt={4}
              display="flex"
              gap={1}
              justifyContent="space-between"
              position="sticky"
              bottom={0}
              bgcolor={theme.palette.background.paper}
              py={2}
            >
              <Button variant="outlined" sx={{ padding: "10px" }}>
                Test Plan (0/40)
              </Button>
              <Button
                onClick={() => handleStep(2)}
                disabled={isDisableButton}
                variant="contained"
                color="primary"
                fullWidth
                sx={{ padding: "10px" }}
              >
                Next Step
              </Button>
            </Box>
          </>
        )}
        {/*  */}
        {step === 2 && (
          <>
            <div>
              <AppBar position="static" color="default">
                <Toolbar>
                  <Typography variant="h6" style={{ flexGrow: 1 }}>
                    View & confirm your plan!
                  </Typography>
                  <IconButton edge="end" color="inherit" onClick={onClose}>
                    <CloseIcon />
                  </IconButton>
                </Toolbar>
              </AppBar>

              <Box mt={2}>
                <Typography variant="subtitle1">{planName}</Typography>
                <Box mt={2} display="flex" justifyContent="space-between">
                  <Box sx={{ width: "calc(100% / 3)" }}>
                    <Typography variant="body2">Allocated Budget</Typography>
                    <Typography variant="subtitle1">
                      ${investmentFund.toFixed(2)}
                    </Typography>
                  </Box>
                  <Box sx={{ width: "calc(100% / 3)" }}>
                    <Typography variant="body2">Base Amount</Typography>
                    <Typography variant="subtitle1">${baseAmount}</Typography>
                  </Box>
                  <Box sx={{ width: "calc(100% / 3)" }}>
                    <Typography variant="body2">Account Type</Typography>
                    <Typography variant="subtitle1">{"DEMO"}</Typography>
                  </Box>
                </Box>
              </Box>
              <Box mt={2}>
                <Box mt={2} display="flex" justifyContent="space-between">
                  <Box sx={{ width: "calc(100% / 3)" }}>
                    <Typography variant="body2">
                      Take Profit/Stoploss
                    </Typography>
                    <Typography variant="subtitle1">
                      ${investmentFund.toFixed(2)}
                    </Typography>
                  </Box>
                  <Box sx={{ width: "calc(100% / 3)" }}>
                    <Typography variant="body2">Budget Strategy</Typography>
                    <Typography variant="subtitle1">${baseAmount}</Typography>
                  </Box>
                  <Box sx={{ width: "calc(100% / 3)" }}>
                    <Typography variant="body2">Signal Strategy</Typography>
                    <Typography variant="subtitle1">{selectedTab}</Typography>
                  </Box>
                </Box>
              </Box>
            </div>
            <Box
              mt={4}
              display="flex"
              gap={1}
              justifyContent="space-between"
              position="sticky"
              bottom={0}
              bgcolor={theme.palette.background.paper}
              py={2}
            >
              <Button
                onClick={() => handleStep(1)}
                variant="outlined"
                sx={{ padding: "10px" }}
              >
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ padding: "10px" }}
              >
                Confirm & Save
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Drawer>
  );
};

export default NewPlanDrawer;
