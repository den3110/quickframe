import React, { createContext, useState, useEffect } from "react";

export const PortfoliosContext = createContext();

export const PortfoliosProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState();
  const [change, setChange] = useState(false);
  // Load user profile from localStorage and check if the user is authenticated
  const getSpotBalanceUser = async () => {
    try {
      setLoading(true);
      //   const response = await signalStrategyApi.userBudgetSignalList();
      //   if (response?.data?.ok === true) {
      //     setData(response.data?.d);
      //   }
      setData([]);
    } catch (error) {
      console.error("Failed to load user profile", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSpotBalanceUser();
  }, [change]);

  return (
    <PortfoliosContext.Provider
      value={{ data, change, setChange, setData, loading }}
    >
      {children}
    </PortfoliosContext.Provider>
  );
};

export default PortfoliosContext;
