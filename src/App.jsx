import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  ThemeProvider,
  CssBaseline,
  StyledEngineProvider,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// AUTH CONTEXT FILE
// RIGHT-TO-LEFT SUPPORT COMPONENT
import { RTL } from "components/rtl";
// ROUTES METHOD
import { routes } from "./routes";
// MUI THEME CREATION METHOD
import { createCustomTheme } from "./theme";
// SITE SETTINGS CUSTOM DEFINED HOOK
import useSettings from "hooks/useSettings";
// I18N FILE
import "./i18n";
import AuthContext, { AuthProvider } from "contexts/AuthContext";
import Toast from "components/toast/toast";
import { SpotBalanceProvider } from "contexts/SpotBalanceContext";
import JwtProvider from "contexts/jwtContext";
import GlobalProvider from "contexts/GlobalContext";
import SocketProvider from "contexts/SocketContext";
import { useCallback, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { authApi } from "api";
import { PortfoliosProvider } from "contexts/PortfoliosContext";

const App = () => {
  const { settings } = useSettings();
  const theme = createCustomTheme(settings);
  // ROUTER CREATE
  const router = createBrowserRouter(routes());
  const {accessToken, setAccessToken} = useContext(AuthContext);

  const refreshToken = useCallback(async () => {
    try {
      const response = await authApi.refreshToken();
      if (response?.data?.ok === true) {
        const result = response.data;
        setAccessToken(result?.access_token);
        localStorage.setItem("accessToken", result?.access_token);
        localStorage.setItem("refreshToken", result?.refresh_token);
      }
      // Optionally save the new token to localStorage or other storage
    } catch (error) {
      console.error("Failed to refresh token", error);
      // Handle refresh token error, e.g., logout user
    }
  }, [setAccessToken]);

  useEffect(() => {
    if (accessToken) {
      const decodedToken = jwtDecode(accessToken);
      const expTime = decodedToken.exp * 1000;
      const currentTime = Date.now();
      const timeLeft = expTime - currentTime;
      const refreshTime = timeLeft - 30000; // 30 seconds before exp

      if (refreshTime > 0) {
        const timeoutId = setTimeout(() => {
          refreshToken();
        }, refreshTime);

        return () => clearTimeout(timeoutId);
      } else {
        refreshToken();
      }
    }
  }, [accessToken, refreshToken]);

 

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <JwtProvider>
            <SpotBalanceProvider>
              <GlobalProvider>
                <SocketProvider>
                <PortfoliosProvider>
                  <RTL>
                    <Toast />
                    <CssBaseline />
                    <RouterProvider router={router} />
                  </RTL>
                </PortfoliosProvider>
                </SocketProvider>
              </GlobalProvider>
            </SpotBalanceProvider>
          </JwtProvider>
        </ThemeProvider>
      </StyledEngineProvider>
    </LocalizationProvider>
  );
};
export default App;
