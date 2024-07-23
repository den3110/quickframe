import React from 'react';
import { Box, Card, CardContent, Typography, Grid } from '@mui/material';

function VIPInformation() {
  return (
    <Box mt={4} mb={4}>
      <Card sx={{ backgroundColor: '#1c1c1c', color: '#fff', padding: '20px' }}>
        <CardContent>
          <Typography variant="h5" component="div">
            VIP Information
          </Typography>
          <Typography variant="h3" component="div" mt={2}>
            Your VIP Level
          </Typography>
          <Typography variant="h1" component="div" mt={2}>
            1
          </Typography>
          <Grid container spacing={2} mt={2}>
            <Grid item xs={6}>
              <Typography variant="body1">F1 VIP</Typography>
              <Typography variant="h6">21/3</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">F1 volume (This Week)</Typography>
              <Typography variant="h6">$1.09 / $2,000.00</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}

export default VIPInformation;
