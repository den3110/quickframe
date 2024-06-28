import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider, CssBaseline, StyledEngineProvider } from "@mui/material";
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
import { AuthProvider } from "contexts/AuthContext";
import Toast from "components/toast/toast";
const App = () => {
  const {
    settings
  } = useSettings();
  const theme = createCustomTheme(settings);
  // ROUTER CREATE
  const router = createBrowserRouter(routes());
  return <LocalizationProvider dateAdapter={AdapterDateFns}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <AuthProvider>
            <RTL>
              <Toast />
              <CssBaseline />
              <RouterProvider router={router} />
            </RTL>
          </AuthProvider>
        </ThemeProvider>
      </StyledEngineProvider>
    </LocalizationProvider>;
};
export default App;