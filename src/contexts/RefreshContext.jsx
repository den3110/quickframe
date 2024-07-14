// src/context/SocketContext.js

import React, { createContext, useCallback, useState } from "react";
import PullToRefresh from "pull-to-refresh-react";
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
    <RefreshContext.Provider value={{ refresh }}>
      <PullToRefresh
        options={{ pullDownHeight: 200 }}
        onRefresh={handleRefresh}
      >
        {children}
      </PullToRefresh>
    </RefreshContext.Provider>
  );
};

export default RefreshProvider;
