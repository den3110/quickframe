import { Box, Button, Divider, Typography } from "@mui/material";
import { constant } from "constant/constant";
import AuthContext from "contexts/AuthContext";
import SpotBalanceContext from "contexts/SpotBalanceContext";
import { ConnectExchangeContext } from "hoc/CheckConnectExchange";
import NoTransactionIcon from "icons/wallet/NoTransaction";

import React, { useContext, useState } from "react";

const LiveWallet = (props) => {
  const { linked } = useContext(ConnectExchangeContext);
  const { user } = useContext(AuthContext);
  const {spotBalance}= useContext(SpotBalanceContext)

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Box
        width="100%"
        sx={{
          position: "relative",
          background:
            "linear-gradient(112.77deg, rgb(0, 43, 22) 14.65%, rgb(84, 206, 147) 87.93%)",
          "&::before": {
            position: "absolute",
            right: 16,
            bottom: 0,
            fontSize: 40,
            fontWeight: 900,
            color: "rgb(250, 250, 250)",
            opacity: 0.1,
            content: '"LIVE"',
            zIndex: 999,
          },
        }}
        color="white"
        borderRadius="8px"
        p={2}
        mb={2}
        textAlign="center"
        className="custom-wallet-demo"
      >
        <img
          src={
            constant.URL_ASSETS_LOGO + "/" + linked?.exchange?.clientId + ".svg"
          }
          style={{ height: 46 }}
          alt="Can't open"
        />
        <Typography variant="h6" align="left" mt={1} mb={1}>
          {user?.email}
        </Typography>
        <Typography variant="body1" align="left" fontSize={12} mb={2}>
          Tài khoản email
        </Typography>
        <Divider style={{ borderColor: " rgba(255, 255, 255, 0.2)" }} />
        <Typography variant="h6" align="left" mt={1} mb={1}>
          ${spotBalance?.usdtAvailableBalance?.toFixed(2)}
        </Typography>
        <Typography variant="body1" align="left" fontSize={12} mb={2}>
          Ví USDT
        </Typography>
        <Typography variant="h6" align="left" mt={1} mb={1}>
          ${spotBalance?.availableBalance?.toFixed(2)}
        </Typography>
        <Typography variant="body1" align="left" fontSize={12} mb={2}>
          Ví Live
        </Typography>
      </Box>
      <Box>
        <Button variant="contained" color="primary" sx={{ mb: 2, mr: 2 }}>
          Rút tiền
        </Button>
        <Button onClick={props?.handleOpenDrawer} variant="contained" color="primary" sx={{ mb: 2, mr: 2 }}>
          Nạp tiền
        </Button>
        <Button variant="contained" color="primary" sx={{ mb: 2, mr: 2 }}>
          Chuyển
        </Button>
      </Box>
      <Typography variant="h6">Giao dịch gần đây</Typography>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        mt={2}
        mb={2}
        color="grey.500"
      >
        <NoTransactionIcon />
        <Typography>Không có giao dịch nào tại đây!</Typography>
      </Box>
      <div>
    </div>
    </Box>
  );
};

export default LiveWallet;
