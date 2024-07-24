import { Fragment, useContext, useRef, useState } from "react";
import {
  Box,
  styled,
  Avatar,
  Divider,
  ButtonBase,
  useMediaQuery,
  Typography,
  Switch,
  useTheme,
} from "@mui/material";
// CUSTOM COMPONENTS
import PopoverLayout from "./PopoverLayout";
import { FlexBox } from "components/flexbox";
import { AvatarLoading } from "components/avatar-loading";
import { H6, Paragraph, Small } from "components/typography";
// CUSTOM DEFINED HOOK
import useNavigate from "hooks/useNavigate";
// CUSTOM UTILS METHOD
import { isDark } from "util/constants";
import AuthContext from "contexts/AuthContext";
import { ConnectExchangeContext } from "hoc/CheckConnectExchange";
import { SettingsContext } from "contexts/settingsContext";
import LanguagePopover from "./LanguagePopover";
import UserlinkAccountPopover from "./UserlinkAccountPopover";
import UserLinkAccountListDrawer from "../drawers/UserLinkAccountListDrawer";

// STYLED COMPONENTS
const StyledButtonBase = styled(ButtonBase)(({ theme }) => ({
  marginLeft: 8,
  borderRadius: 30,
  border: `1px solid ${theme.palette.grey[isDark(theme) ? 800 : 200]}`,
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));
const StyledSmall = styled(Paragraph)(({ theme }) => ({
  fontSize: 13,
  display: "block",
  cursor: "pointer",
  padding: "5px 1rem",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));
const ProfilePopover = () => {
  const theme = useTheme();
  const { user, setSelectedLinkAccount, setIsLogout, setDataSelectedLinkAccount } = useContext(AuthContext);
  const { linked } = useContext(ConnectExchangeContext);
  const downLg = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  const anchorRef = useRef(null);
  const navigate = useNavigate();
  const { settings, saveSettings } = useContext(SettingsContext);
  const [open, setOpen] = useState(false);
  const [openDrawerListLinkAccount, setOpenDrawerListLinkAccount] =
    useState(false);

  const handleMenuItem = (path) => () => {
    navigate(path);
    setOpen(false);
  };

  const handleChangeTheme = (value) => {
    saveSettings({
      ...settings,
      theme: value,
    });
  };

  const logout = () => {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
    localStorage.removeItem("linkAccount")
    setIsLogout(true)
    navigate("/login")
    setSelectedLinkAccount(undefined)
    setDataSelectedLinkAccount(undefined)
    localStorage.removeItem("linkAccount")
  };

  return (
    <Fragment>
      <StyledButtonBase ref={anchorRef} onClick={() => setOpen(true)}>
        <AvatarLoading
          alt="user"
          percentage={100}
          src={user?.avatar}
          sx={{
            width: 35,
            height: 35,
          }}
        />
      </StyledButtonBase>

      <PopoverLayout
        hiddenViewButton
        maxWidth={230}
        minWidth={200}
        popoverOpen={open}
        anchorRef={anchorRef}
        popoverClose={() => setOpen(false)}
        title={
          <FlexBox alignItems="center" gap={1}>
            <Avatar
              src={user?.avatar}
              sx={{
                width: 35,
                height: 35,
              }}
            />

            <Box>
              <H6 fontSize={14}>{linked?.d?.nn || "Unset"}</H6>
              <Small color="text.secondary" display="block">
                {user?.email}
              </Small>
            </Box>
          </FlexBox>
        }
      >
        <Box pt={1}>
          {/* <StyledSmall onClick={handleMenuItem("/dashboard/profile")}>
            Set Status
          </StyledSmall> */}
          <StyledSmall onClick={handleMenuItem("/dashboard/profile")}>
            Profile & Account
          </StyledSmall>
          {downLg && (
            <StyledSmall onClick={() => {setOpen(false);setOpenDrawerListLinkAccount(true)}}>
              <Box sx={{ width: "max-content" }}>
                <UserlinkAccountPopover />
              </Box>

            </StyledSmall>
          )}
          {/* <StyledSmall onClick={handleMenuItem("/dashboard/account")}>
            Settings
          </StyledSmall>
          <StyledSmall onClick={handleMenuItem("/dashboard/profile")}>
            Manage Team
          </StyledSmall>   */}
          {downLg && (
            <StyledSmall onClick={() => {}}>
              <Box display="flex" alignItems="center">
                <Typography fontSize={13}>Light</Typography>
                <Switch
                  checked={theme.palette.mode === "dark" ? true : false}
                  onChange={() => {
                    handleChangeTheme(
                      settings.theme === "light" ? "dark" : "light"
                    );
                  }}
                />
                <Typography fontSize={13}>Dark</Typography>
              </Box>
            </StyledSmall>
          )}
          {downLg && (
            <StyledSmall onClick={() => {}}>
              <LanguagePopover />
            </StyledSmall>
          )}
          <Divider
            sx={{
              my: 1,
            }}
          />
          <StyledSmall onClick={logout}>Sign Out</StyledSmall>
        </Box>
      </PopoverLayout>
      <UserLinkAccountListDrawer
        open={openDrawerListLinkAccount}
        handleClose={() => {
          setOpenDrawerListLinkAccount(false);
        }}
      />
    </Fragment>
  );
};
export default ProfilePopover;
