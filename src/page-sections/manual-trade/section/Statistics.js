// Statistics.js
import React from 'react';
import { Box, Typography, Switch, Grid, Paper } from '@mui/material';

const Statistics = () => {
  return (
    <Box mt={2}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">Chế độ chuyên gia</Typography>
        <Switch />
      </Box>
      <Grid container spacing={2} mt={1}>
        <Grid item xs={6}>
          <Paper elevation={3} p={2}>
            <Typography variant="body2">Thắng/Thua hôm nay</Typography>
            <Typography variant="h6">1/0</Typography>
            <Typography variant="body2">100% Tỉ lệ thắng</Typography>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper elevation={3} p={2}>
            <Typography variant="body2">Thắng/Thua 7N</Typography>
            <Typography variant="h6">1/0</Typography>
            <Typography variant="body2">100% Tỉ lệ thắng</Typography>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper elevation={3} p={2}>
            <Typography variant="body2">KLGD 7N</Typography>
            <Typography variant="h6">$2.00</Typography>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper elevation={3} p={2}>
            <Typography variant="body2">Lợi nhuận 7N</Typography>
            <Typography variant="h6">$1.90</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Statistics;
