import userApi from "api/user/userApi";
import React, { createContext, useState, useEffect } from "react";

export const SpotBalanceContext = createContext();

export const SpotBalanceProvider = ({ children }) => {
  const [spotBalance, setSpotBalance] = useState(null);
  const [change, setChange]= useState(false)
  // Load user profile from localStorage and check if the user is authenticated
  const getSpotBalanceUser = async () => {
    try {
      const response = await userApi.userExchangeSpotBalance();
      if (response?.data?.ok === true) {
        setSpotBalance(response.data?.d);
      }
    } catch (error) {
      console.error("Failed to load user profile", error);
    }
  };

  useEffect(() => {
    getSpotBalanceUser();
  }, [change]);

  return (
    <SpotBalanceContext.Provider value={{ spotBalance, change, setChange, setSpotBalance }}>
      {children}
    </SpotBalanceContext.Provider>
  );
};

export default SpotBalanceContext;
