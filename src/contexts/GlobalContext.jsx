import { createContext, useContext, useEffect, useState } from "react";
import portfolioApi from "api/portfolios/portfolioApi";
import { SettingsContext } from "./settingsContext";

export const GlobalContext = createContext();
const GlobalProvider = ({ children }) => {
  const [botTotal, setBotTotal] = useState(0);
  const {walletMode }= useContext(SettingsContext)
  useEffect(() => {
    (async () => {
      try {
        const response = await portfolioApi.userBotTotal({params: {type: walletMode=== true ? "LIVE" : "DEMO"}});
        if (response?.data?.ok === true) {
          setBotTotal(response?.data?.d);
        } else {
          setBotTotal(0);
        }
      } catch (error) {}
    })();
  }, [walletMode]);
  return <GlobalContext.Provider value={{botTotal}}>{children}</GlobalContext.Provider>;
};
export default GlobalProvider;
