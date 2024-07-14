import portfolioApi from "api/portfolios/portfolioApi";
import React, { createContext, useState, useEffect, useContext, useCallback } from "react";
import { SettingsContext } from "./settingsContext";
import RefreshProvider from "./RefreshContext";

export const PortfoliosContext = createContext();

export const PortfoliosProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const {walletMode }= useContext(SettingsContext)
  const [loading, setLoading] = useState();
  const [change, setChange] = useState(false);
  // Load user profile from localStorage and check if the user is authenticated
  console.log(JSON.parse(localStorage.getItem("walletMode")))
  const getSpotBalanceUser = async () => {
    try {
      setLoading(true);
      console.log(walletMode, "hihihi1")
      const response= await portfolioApi.userBotList({params: {type: JSON.parse(localStorage.getItem("walletMode")) ? "LIVE" : "DEMO"}})
      if(response?.data?.ok=== true) {
        setData(response?.data?.d)
      }
      //   const response = await signalStrategyApi.const [anchorEls, setAnchorEls] = useState({});userBudgetSignalList();
      //   if (response?.data?.ok === true) {
      //     setData(response.data?.d);
      //   }
    } catch (error) {
      console.error("Failed to load user profile", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getSpotBalanceUser();
  }, [walletMode, change]);

  return (
    <RefreshProvider functionProps={()=> getSpotBalanceUser()}>
      <PortfoliosContext.Provider
        value={{ data, change, setChange, setData, loading }}
      >
        {children}
      </PortfoliosContext.Provider>
    </RefreshProvider>
  );
};

export default PortfoliosContext;
