// ManualTradePage.js
import React, { useContext, useEffect } from "react";
import { Box, Grid, useMediaQuery } from "@mui/material";
import MultiplyIndex from "./section/MultiplyIndex";
import HistoryTable from "./section/HistoryTable";
import Statistics from "./section/Statistics";
import BubbleHistory from "./section/BubbleHistory";
import { SocketContext } from "contexts/SocketContext";
import SpotBalanceContext from "contexts/SpotBalanceContext";

const ManualTradePage = () => {
  const downLg = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  const { isConnected, socket } = useContext(SocketContext);
  const { setSpotBalance, spotBalance, setChange } = useContext(SpotBalanceContext);

  useEffect(() => {
    if (isConnected && socket) {
      socket.on("RELOAD_SPOT_BALANCE", (data) => {
        setChange(prev=> !prev)
      });
    }
  }, [isConnected, socket, setChange]);

  return (
    <Box padding={downLg ? 1 : 2}>
      <Box p={downLg ? 0 : 3}>
        <Box sx={{ pt: 4 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <MultiplyIndex />
              <Statistics />
            </Grid>
            <Grid item xs={12} md={8}>
              <BubbleHistory />
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
