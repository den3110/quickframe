import { Fragment, useContext, useState } from "react";
import { Box, IconButton, Typography, useMediaQuery } from "@mui/material";
import ClickAwayListener from "@mui/material/ClickAwayListener";
// LAYOUT BASED HOOK
import useLayout from "./context/useLayout";
// SITE SETTINGS CONTEXT FILE
import { SettingsContext } from "contexts/settingsContext";
// CUSTOM ICON COMPONENTS
import Menu from "icons/Menu";
import MenuLeft from "icons/MenuLeft";
import ThemeIcon from "icons/ThemeIcon";
// import SearchIcon from "icons/SearchIcon";
// import Search from "icons/duotone/Search";
import MenuLeftRight from "icons/MenuLeftRight";
// CUSTOM COMPONENTS
// import SearchBar from "../layout-parts/SearchBar";
import ProfilePopover from "../layout-parts/popovers/ProfilePopover";
import ServicePopover from "../layout-parts/popovers/ServicePopover";
import LanguagePopover from "../layout-parts/popovers/LanguagePopover";
import NotificationsPopover from "../layout-parts/popovers/NotificationsPopover";
import DarkModeIcon from "@mui/icons-material/DarkMode";
// STYLED COMPONENTS
import {
  DashboardHeaderRoot,
  StyledToolBar,
} from "../layout-parts/styles/header";
import WalletPopover from "layouts/layout-parts/popovers/WalletPopover";
import { Link } from "react-router-dom";
import UserlinkAccountPopover from "layouts/layout-parts/popovers/UserlinkAccountPopover";
import JackpotPopover from "layouts/layout-parts/popovers/JackpotPopover";

const DashboardHeader = () => {
  const downLg = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  const { handleOpenMobileSidebar } = useLayout();
  // const [openSearchBar, setSearchBar] = useState(false);
  const { settings, saveSettings } = useContext(SettingsContext);

  // const upSm = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  const downMd = useMediaQuery((theme) => theme.breakpoints.down(974));
  const handleChangeDirection = (value) => {
    saveSettings({
      ...settings,
      direction: value,
    });
  };
  const handleChangeTheme = (value) => {
    saveSettings({
      ...settings,
      theme: value,
    });
  };
  return (
    <DashboardHeaderRoot position="sticky">
      <StyledToolBar>
        {/* SMALL DEVICE SIDE BAR OPEN BUTTON */}
        {downMd && (
          <Link href="/">
            <Box
              component="img"
              src="/static/logo/luxcoin.png"
              alt="logo"
              width={50}
            />
          </Link>
        )}

        {/* SEARCH ICON BUTTON */}
        {/* <ClickAwayListener onClickAway={() => setSearchBar(false)}>
          <Box>
            {!openSearchBar ? (
              <IconButton onClick={() => setSearchBar(true)}>
                <Search
                  sx={{
                    color: "grey.400",
                    fontSize: 18,
                  }}
                />
              </IconButton>
            ) : null}

            <SearchBar
              open={openSearchBar}
              handleClose={() => setSearchBar(false)}
            />
          </Box>
        </ClickAwayListener> */}

        <Box flexGrow={1} ml={1} />
        {!downLg && <UserlinkAccountPopover />}
        {downLg && <JackpotPopover />}
        <WalletPopover />
        {!downLg && (
          <>
            {settings.direction === "rtl" ? (
              <IconButton onClick={() => handleChangeDirection("ltr")}>
                <MenuLeft
                  sx={{
                    color: "grey.400",
                  }}
                />
              </IconButton>
            ) : (
              <IconButton onClick={() => handleChangeDirection("rtl")}>
                <MenuLeftRight
                  sx={{
                    color: "grey.400",
                  }}
                />
              </IconButton>
            )}
            <IconButton
              onClick={() => {
                handleChangeTheme(
                  settings.theme === "light" ? "dark" : "light"
                );
              }}
            >
              {settings.theme === "light" ? <DarkModeIcon /> : <ThemeIcon />}
            </IconButton>
            <LanguagePopover />
            <JackpotPopover />
          </>
        )}
        <NotificationsPopover />
        {/* {upSm && (
          <Fragment>
          </Fragment>
        )} */}
        <ProfilePopover />
      </StyledToolBar>
    </DashboardHeaderRoot>
  );
};
export default DashboardHeader;
