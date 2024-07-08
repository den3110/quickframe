import React, { useState } from 'react';
import { Drawer, AppBar, Toolbar, Typography, Box, Button, IconButton, TextField, MenuItem, Select, InputLabel, FormControl, Switch, FormControlLabel, useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const NewPlanDrawer = ({ open, handleClose }) => {
  const theme= useTheme()
  const [planName, setPlanName] = useState('');
  const [investmentFund, setInvestmentFund] = useState(100);
  const [baseAmount, setBaseAmount] = useState(1);
  const [budgetStrategy, setBudgetStrategy] = useState('aaaa');
  const [takeProfit, setTakeProfit] = useState(false);
  const [selectedTab, setSelectedTab] = useState('Bot AI');
  const isDisableButton= planName?.length <= 0
  const handleIncrement = (setFunc, value) => setFunc(value + 1);
  const handleDecrement = (setFunc, value) => setFunc(value > 0 ? value - 1 : 0);

  return (
    <Drawer anchor="right" open={open} onClose={handleClose}>
      <Box width={850} p={3} display="flex" flexDirection="column" justifyContent="space-between" height="100%">
        <div>
          <AppBar position="static" color="default">
            <Toolbar>
              <Typography variant="h6" style={{ flexGrow: 1 }}>
                Step 1: Plan profile
              </Typography>
              <IconButton edge="end" color="inherit" onClick={handleClose}>
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
                <Button variant="outlined" size="small" onClick={() => handleDecrement(setInvestmentFund, investmentFund)}>-</Button>
                <Typography mx={2}>${investmentFund}</Typography>
                <Button variant="outlined" size="small" onClick={() => handleIncrement(setInvestmentFund, investmentFund)}>+</Button>
              </Box>
            </Box>
          </Box>

          <Box mt={4}>
            <Typography variant="h6">Step 2: Set up your plan</Typography>
            <Box display="flex" mt={2}>
              {['Bot AI', 'Follow Leader', 'Telegram Signal'].map((tab) => (
                <Button
                  key={tab}
                  variant={selectedTab === tab ? 'contained' : 'outlined'}
                  color={selectedTab === tab ? 'primary' : "secondary"}
                  style={{ marginRight: 8 }}
                  onClick={() => setSelectedTab(tab)}
                >
                  {tab}
                </Button>
              ))}
            </Box>
          </Box>

          <Box mt={4}>
            <Typography variant="subtitle1">Signal*</Typography>
            <TextField
              fullWidth
              placeholder="1 Copy Copy Copy Copy Copy"
              margin="normal"
              value={selectedTab}
              onChange={(e) => setSelectedTab(e.target.value)}
            />

            <Box  mt={2}>
              <Typography variant="subtitle1">Budget strategy*</Typography>
              <FormControl variant="outlined" fullWidth margin="normal">
                <Select value={budgetStrategy} onChange={(e) => setBudgetStrategy(e.target.value)}>
                  <MenuItem value="aaaa">aaaa</MenuItem>
                  {/* Thêm các tùy chọn khác nếu cần */}
                </Select>
              </FormControl>
            </Box>

            <Box display="flex" alignItems="center" mt={2}>
              <Typography variant="subtitle1">Set base amount</Typography>
              <Box ml={2} display="flex" alignItems="center">
                <Button variant="outlined" size="small" onClick={() => handleDecrement(setBaseAmount, baseAmount)}>-</Button>
                <Typography mx={2}>${baseAmount}</Typography>
                <Button variant="outlined" size="small" onClick={() => handleIncrement(setBaseAmount, baseAmount)}>+</Button>
              </Box>
            </Box>
          </Box>

          <Box mt={4}>
            <Typography variant="h6">Reset Budget Strategy Conditions</Typography>
            <FormControlLabel control={<Switch />} label="Reset budget after reaching TP/SL" />
            <FormControlLabel control={<Switch />} label="Reset budget after clicking 'Resume'" />
            <FormControlLabel control={<Switch />} label="Reset budget after clicking 'Reset PnL'" />
          </Box>

          <Box mt={4}>
            <Typography variant="h6">Take-Profit/Stop-Loss Conditions</Typography>
            <Typography variant="body2">
              A take-profit or stop-loss order will be triggered automatically for your plan if one of the following conditions is met. Today's PnL will be reset at 00:00 GMT.
            </Typography>
            <FormControlLabel control={<Switch checked={takeProfit} onChange={() => setTakeProfit(!takeProfit)} />} label="Enable TP/SL" />
          </Box>

          <Box mt={4}>
            <Button variant="outlined" fullWidth>Advanced (Optional)</Button>
          </Box>
        </div>

        <Box mt={4} display="flex" gap={1} justifyContent="space-between" position="sticky" bottom={0} bgcolor={theme.palette.background.paper} py={2}>
          <Button variant="outlined" sx={{padding: "10px"}}>Test Plan (0/40)</Button>
          <Button disabled={isDisableButton} variant="contained" color="primary" fullWidth sx={{padding: "10px"}}>Next Step</Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default NewPlanDrawer