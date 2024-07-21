import { Box, IconButton, Typography } from "@mui/material";
import AuthContext from "contexts/AuthContext";
import React, { useContext, useState } from "react";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import UserLinkAccountListDrawer from "../drawers/UserLinkAccountListDrawer";
import ExchangeIcon from "icons/duotone/ExchangeIcon";
import { constant } from "constant/constant";

const UserlinkAccountPopover = () => {
  const { dataSelectedLinkAccount } = useContext(AuthContext);
  const [openDrawerListLinkAccount, setOpenDrawerListLinkAccount] =
    useState(false);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
        }}
        mr={1}
        onClick={() => {
          setOpenDrawerListLinkAccount(true);
        }}
      >
        <img style={{width: 32, height: 32}} src={constant.URL_ASSETS_LOGO + "/"+  dataSelectedLinkAccount?.clientId + ".ico"} alt="Can't open" />
        <Typography fontSize={16} sx={{ cursor: "pointer" }}>
          {dataSelectedLinkAccount?.nickName}
        </Typography>
      </Box>
      <UserLinkAccountListDrawer
        open={openDrawerListLinkAccount}
        handleClose={() => {
          setOpenDrawerListLinkAccount(false);
        }}
      />
    </Box>
  );
};

export default UserlinkAccountPopover;
