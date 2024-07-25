import React from "react";
import { Box, Typography, Paper, Grid, Button, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import SearchIcon from '@mui/icons-material/Search';

function Commissions() {
  const [startDate, setStartDate] = React.useState(new Date("2024-07-01"));
  const [endDate, setEndDate] = React.useState(new Date("2024-07-23"));

  return (
    <Box p={2}>
      <Paper sx={{ p: 2, mt: 4, mb: 4 }}>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems="center"
        >
          <Box item xs={3}>
            <Typography variant="body1">Trading Commission</Typography>
          </Box>
          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems="center"
            gap={1}
          >
            <Box item xs={3}>
              <DatePicker
                label="Start Date"
                value={startDate}
                onChange={(newValue) => setStartDate(newValue)}
                renderInput={(params) => <TextField {...params} />}
              />
            </Box>
            <Box item xs={3}>
              <DatePicker
                label="End Date"
                value={endDate}
                onChange={(newValue) => setEndDate(newValue)}
                renderInput={(params) => <TextField {...params} />}
              />
            </Box>
            <Box item xs={3}>
              <Button startIcon={<SearchIcon />} variant="contained" color="primary">
                Search
              </Button>
            </Box>
          </Box>
        </Box>
        <Box mt={4}>
          <Typography variant="body2" color="textSecondary">
            Note: You will receive commissions from the trading volume as soon
            as your peers make trades.
          </Typography>
          <Box mt={2} textAlign="center">
            <Typography variant="h6" color="textSecondary">
              There is no data here!
            </Typography>
          </Box>
        </Box>
      </Paper>

      <Paper sx={{ p: 2, mt: 4, mb: 4 }}>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems="center"
        >
          <Box item xs={3}>
            <Typography variant="body1">Trading Commission</Typography>
          </Box>
          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems="center"
            gap={1}
          >
            <Box item xs={3}>
              <DatePicker
                label="Start Date"
                value={startDate}
                onChange={(newValue) => setStartDate(newValue)}
                renderInput={(params) => <TextField {...params} />}
              />
            </Box>
            <Box item xs={3}>
              <DatePicker
                label="End Date"
                value={endDate}
                onChange={(newValue) => setEndDate(newValue)}
                renderInput={(params) => <TextField {...params} />}
              />
            </Box>
            <Box item xs={3}>
              <Button startIcon={<SearchIcon />} variant="contained" color="primary">
                Search
              </Button>
            </Box>
          </Box>
        </Box>
        <Box mt={4}>
          <Typography variant="body2" color="textSecondary">
            Note: You will receive commissions from the trading volume as soon
            as your peers make trades.
          </Typography>
          <Box mt={2} textAlign="center">
            <Typography variant="h6" color="textSecondary">
              There is no data here!
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default Commissions;
