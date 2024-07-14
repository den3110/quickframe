// ManualTradePage.js
import React from "react";
import { Box, Grid, useMediaQuery } from "@mui/material";
import MultiplyIndex from "./section/MultiplyIndex";
import HistoryTable from "./section/HistoryTable";
import Statistics from "./section/Statistics";

const ManualTradePage = () => {
  const downLg = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  return (
    <Box padding={downLg ? 1 : 2}>
      <Box p={3}>
        <Box sx={{ pt: 4 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <MultiplyIndex />
              <Statistics />
            </Grid>
            <Grid item xs={12} md={8}>
              <HistoryTable />
            </Grid>
            <Grid item xs={12}></Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default ManualTradePage;
