import { Box, Button, Divider, Typography, useMediaQuery } from "@mui/material";
import { constant } from "constant/constant";
import SpotBalanceContext from "contexts/SpotBalanceContext";
import { ConnectExchangeContext } from "hoc/CheckConnectExchange";
import React, { useContext } from "react";
import TransactionWallet from "./TransactionWallet";

const LiveWallet = (props) => {
  const downLg = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  const { linked } = useContext(ConnectExchangeContext);
  const { spotBalance } = useContext(SpotBalanceContext);

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
            fontSize: downLg ? 28 : 40,
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
          {linked?.d?.e}
        </Typography>
        <Typography variant="body1" align="left" fontSize={12} mb={2}>
          Tài khoản email
        </Typography>
        <Divider style={{ borderColor: " rgba(255, 255, 255, 0.2)" }} />
        <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
          <Box>
            <Typography variant="h6" align="left" mt={1} mb={1}>
              ${spotBalance?.usdtAvailableBalance?.toFixed(2)}
            </Typography>
            <Typography variant="body1" align="left" fontSize={12} mb={2}>
              Ví USDT
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6" align="left" mt={1} mb={1}>
              ${spotBalance?.availableBalance?.toFixed(2)}
            </Typography>
            <Typography variant="body1" align="left" fontSize={12} mb={2}>
              Ví Live
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box>
        <Button
          onClick={() => {
            props?.handleClosePopover();
            props?.handleOpenWithdrawDrawer();
          }}
          variant="contained"
          color="primary"
          sx={{ mb: 2, mr: 2 }}
        >
          Rút tiền
        </Button>
        <Button
          onClick={() => {
            props?.handleClosePopover();
            props?.handleOpenDrawer();
          }}
          variant="contained"
          color="primary"
          sx={{ mb: 2, mr: 2 }}
        >
          Nạp tiền
        </Button>
        <Button
          onClick={() => {
            props?.handleClosePopover();
            props?.handleOpenMoveBalanceDrawer();
          }}
          variant="contained"
          color="primary"
          sx={{ mb: 2, mr: 2 }}
        >
          Chuyển
        </Button>
      </Box>
      <TransactionWallet
        handleOpenDetailTransaction={props?.handleOpenDetailTransaction}
      />
    </Box>
  );
};

export default LiveWallet;
