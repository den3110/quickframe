import { createContext, useState } from "react";
import { THEMES } from "utils/constants";
import useLocalStorage from "hooks/useLocalStorage";
const initialSettings = {
  direction: "ltr",
  theme: THEMES.LIGHT,
  // activeLayout: "layout1",
  responsiveFontSizes: true
};

export const SettingsContext = createContext({
  settings: initialSettings,
  saveSettings: arg => {}
});
const SettingsProvider = ({
  children
}) => {
  const storage = useLocalStorage("settings", initialSettings);
  const walletModeLocal= useLocalStorage("walletMode") || false 
  const {
    data: settings,
    storeData: setStoreSettings
  } = storage;
  const saveSettings = updateSettings => setStoreSettings(updateSettings);
  const [walletMode, setWalletMode]= useState(walletModeLocal)
  
  return <SettingsContext.Provider value={{
    settings,
    saveSettings,
    walletMode,
    setWalletMode
  }}>
      {children}
    </SettingsContext.Provider>;
};
export default SettingsProvider;