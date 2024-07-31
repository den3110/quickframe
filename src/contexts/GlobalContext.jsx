import { createContext, useContext, useEffect, useState } from "react";
import portfolioApi from "api/portfolios/portfolioApi";
import { SettingsContext } from "./settingsContext";
import AuthContext from "./AuthContext";

export const GlobalContext = createContext();
const GlobalProvider = ({ children }) => {
  const [botTotal, setBotTotal] = useState(0);
  const { selectedLinkAccount } = useContext(AuthContext);
  const { walletMode } = useContext(SettingsContext);
  const [change, setChange] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        const response = await portfolioApi.userBotTotal({
          params: { type: walletMode === true ? "LIVE" : "DEMO" },
        });
        if (response?.data?.ok === true) {
          setBotTotal(response?.data?.d);
        } else {
          setBotTotal(0);
        }
      } catch (error) {}
    })();
  }, [walletMode, change, selectedLinkAccount]);
  return (
    <GlobalContext.Provider value={{ botTotal, change, setChange }}>
      {children}
    </GlobalContext.Provider>
  );
};
export default GlobalProvider;
