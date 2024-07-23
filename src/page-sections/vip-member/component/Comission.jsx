import React from 'react';
import { Box, Typography, Paper, Grid, Button, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function Commissions() {
  const [startDate, setStartDate] = React.useState(new Date('2024-07-01'));
  const [endDate, setEndDate] = React.useState(new Date('2024-07-23'));

  return (
    <Box>
      <Paper sx={{ p: 2, mt: 4, mb: 4 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={3}>
            <Typography variant="body1">Trading Commission</Typography>
          </Grid>
          <Grid item xs={3}>
            <DatePicker
              label="Start Date"
              value={startDate}
              onChange={(newValue) => setStartDate(newValue)}
              renderInput={(params) => <TextField {...params} />}
            />
          </Grid>
          <Grid item xs={3}>
            <DatePicker
              label="End Date"
              value={endDate}
              onChange={(newValue) => setEndDate(newValue)}
              renderInput={(params) => <TextField {...params} />}
            />
          </Grid>
          <Grid item xs={3}>
            <Button variant="contained" color="primary">
              Search
            </Button>
          </Grid>
        </Grid>
        <Box mt={4}>
          <Typography variant="body2" color="textSecondary">
            Note: You will receive commissions from the trading volume as soon as your peers make trades.
          </Typography>
          <Box mt={2} textAlign="center">
            <Typography variant="h6" color="textSecondary">
              There is no data here!
            </Typography>
          </Box>
        </Box>
      </Paper>

      <Paper sx={{ p: 2, mt: 4, mb: 4 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={3}>
            <Typography variant="body1">VIP Commission</Typography>
          </Grid>
          <Grid item xs={3}>
            <DatePicker
              label="Start Date"
              value={startDate}
              onChange={(newValue) => setStartDate(newValue)}
              renderInput={(params) => <TextField {...params} />}
            />
          </Grid>
          <Grid item xs={3}>
            <DatePicker
              label="End Date"
              value={endDate}
              onChange={(newValue) => setEndDate(newValue)}
              renderInput={(params) => <TextField {...params} />}
            />
          </Grid>
          <Grid item xs={3}>
            <Button variant="contained" color="primary">
              Search
            </Button>
          </Grid>
        </Grid>
        <Box mt={4}>
          <Typography variant="body2" color="textSecondary">
            Note: You will receive commissions from the trading volume as soon as your peers make trades.
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
