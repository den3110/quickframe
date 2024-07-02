import { Box, Button, Divider, Typography } from "@mui/material";
import userApi from "api/user/userApi";
import { showToast } from "components/toast/toast";
import { constant } from "constant/constant";
import SpotBalanceContext from "contexts/SpotBalanceContext";
import { ConnectExchangeContext } from "hoc/CheckConnectExchange";
// import NoTransactionIcon from "icons/wallet/NoTransaction";
import React, { useContext } from "react";
import TransactionWallet from "./TransactionWallet";

const DemoWallet = (props) => {
  const { linked } = useContext(ConnectExchangeContext);
  const {setChange }= useContext(SpotBalanceContext)
  const {spotBalance}= useContext(SpotBalanceContext)
  
  const handleResetDemoBalance= async ()=> {
    try { 
      const response= await userApi.userExchangeLinkAccountResetDemo()
      if(response?.data?.ok=== true) {
        setChange(prev=> !prev)
        showToast("Nạp lại số dư thành công", "success")
      }
      else {
        showToast(response?.data?.m, "error")
      }
    } catch (error) {
      showToast(error?.response?.data?.m, "error")
    }
  }
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Box
        width="100%"
        sx={{
          position: "relative",
          background:
            "linear-gradient(112.77deg, rgb(32, 0, 65) 14.65%, rgb(140, 98, 255) 87.93%)",
          "&::before": {
            position: "absolute",
            right: 16,
            bottom: 0,
            fontSize: 40,
            fontWeight: 900,
            color: "rgb(250, 250, 250)",
            opacity: 0.1,
            content: '"DEMO"',
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
        <Typography variant="h6" align="left" mt={1} mb={1}>
          ${spotBalance?.demoBalance?.toFixed(2)}
        </Typography>
        <Typography variant="body1" align="left" fontSize={12} mb={2}>
          Ví DEMO
        </Typography>
      </Box>
      <Button onClick={handleResetDemoBalance} variant="contained" color="primary" sx={{ mb: 2 }}>
        Nạp lại số dư
      </Button>
      <TransactionWallet handleOpenDetailTransaction={props?.handleOpenDetailTransaction} />
    </Box>
  );
};

export default DemoWallet;
