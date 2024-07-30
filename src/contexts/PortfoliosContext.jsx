import portfolioApi from "api/portfolios/portfolioApi";
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  // useCallback,
} from "react";
import { SettingsContext } from "./settingsContext";
// import RefreshProvider from "./RefreshContext";

export const PortfoliosContext = createContext();

export const PortfoliosProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const { walletMode } = useContext(SettingsContext);
  const [loading, setLoading] = useState(false);
  const [change, setChange] = useState(false);
  const [changeNoLoading, setChangeNoLoading] = useState(false);
  // Load user profile from localStorage and check if the user is authenticated
  const getUserBotList = async () => {
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

  const getUserBotListNoLoading = async () => {
    try {
      const response = await portfolioApi.userBotList();
      if (response?.data?.ok === true) {
        setData(response?.data?.d);
      }
    } catch (error) {
      console.error("Failed to load user profile", error);
    } finally {
    }
  };

  useEffect(() => {
    getUserBotList();
  }, [walletMode, change]);

  useEffect(() => {
    getUserBotListNoLoading();
  }, [changeNoLoading]);

  return (
    <PortfoliosContext.Provider
      value={{ data, change, setChange, setData, loading, setChangeNoLoading }}
    >
      {children}
    </PortfoliosContext.Provider>
  );
};

export default PortfoliosContext;
