// src/context/SocketContext.js

import { CircularProgress, Typography } from "@mui/material";
import React, { createContext, useCallback, useState } from "react";
import ReactPullToRefresh from "react-pull-to-refresh";

export const RefreshContext = createContext();

const RefreshProvider = ({ children, functionProps }) => {
  const [refresh, setRefresh] = useState(false);
  const handleRefresh = useCallback(async () => {
    try {
      setRefresh(true);
      // setRefresh(!refresh);
      // fucntionProps();
      await functionProps();
    } catch (error) {
    } finally {
      setRefresh(false);
    }
  }, [functionProps]);

  return (
    <RefreshContext.Provider value={{ handleRefresh, refresh }}>
      <ReactPullToRefresh onRefresh={handleRefresh} loading={refresh ? <Typography align="center"><CircularProgress /></Typography> : null}>
        {children}
      </ReactPullToRefresh>
    </RefreshContext.Provider>
  );
};

export default RefreshProvider;
