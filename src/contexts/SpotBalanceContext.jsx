import userApi from "api/user/userApi";
import React, { createContext, useState, useEffect, useContext, useCallback } from "react";
import AuthContext from "./AuthContext";

export const SpotBalanceContext = createContext();

export const SpotBalanceProvider = ({ children }) => {
  const [spotBalance, setSpotBalance] = useState(null);
  const {selectedLinkAccount }= useContext(AuthContext)
  const [change, setChange]= useState(false)
  // Load user profile from localStorage and check if the user is authenticated
  const getSpotBalanceUser = useCallback(async () => {
    try {
      const response = await userApi.userExchangeSpotBalance({}, selectedLinkAccount);
      if (response?.data?.ok === true) {
        setSpotBalance(response.data?.d);
      }
    } catch (error) {
      console.error("Failed to load user profile", error);
    }
  }, [selectedLinkAccount]);

  useEffect(() => {
    getSpotBalanceUser();
  }, [change, selectedLinkAccount]);

  return (
    <SpotBalanceContext.Provider value={{ spotBalance, change, setChange, setSpotBalance }}>
      {children}
    </SpotBalanceContext.Provider>
  );
};

export default SpotBalanceContext;
