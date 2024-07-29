import portfolioApi from "api/portfolios/portfolioApi";
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import { SettingsContext } from "./settingsContext";
import RefreshProvider from "./RefreshContext";

export const PortfoliosContext = createContext();

export const PortfoliosProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const { walletMode } = useContext(SettingsContext);
  const [loading, setLoading] = useState();
  const [change, setChange] = useState(false);
  // Load user profile from localStorage and check if the user is authenticated
  const getSpotBalanceUser = async () => {
    try {
      setLoading(true);
      const response = await portfolioApi.userBotList();
      if (response?.data?.ok === true) {
        setData(response?.data?.d);
      }
    } catch (error) {
      console.error("Failed to load user profile", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if(walletMode) {
      getSpotBalanceUser();
    }
  }, [walletMode, change]);

  return (
    <PortfoliosContext.Provider
      value={{ data, change, setChange, setData, loading }}
    >
      {children}
    </PortfoliosContext.Provider>
  );
};

export default PortfoliosContext;
