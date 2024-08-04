import * as React from "react";
import {
  Box,
  Drawer,
  Button,
  IconButton,
  Divider,
  Grid,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { makeStyles } from "@mui/styles";
import SpotBalanceContext from "contexts/SpotBalanceContext";
import { isDark } from "util/constants";
import userApi from "api/user/userApi";
import { showToast } from "components/toast/toast";
import { useTranslation } from "react-i18next";
import AuthContext from "contexts/AuthContext";

const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    width: "350px",
    padding: 10,
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footer: {
    textAlign: "center",
    marginTop: 10,
  },
  backButton: {
    marginRight: 10,
    padding: "10px 16px",
  },
}));

export default function WithdrawDrawer(props) {
  const {t }= useTranslation()
  const downLg = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  const { spotBalance, setChange } = React.useContext(SpotBalanceContext);
  const { open, setOpen } = props;
  const [amount, setAmount] = React.useState("");
  const [toAddress, setToAddress] = React.useState("");
  const [twoFACode, setTwoFACode] = React.useState("");
  // const [nickName, setNickName]= React.useState("")
  const [network, setNetwork] = React.useState("internal");
  const classes = useStyles();
  const isButtonDisabled = !amount || !toAddress || !twoFACode || parseFloat(amount) < 5;
  const [loadingSubmit, setLoadingSubmit]= React.useState(false)
  const isErrorInputAmount= parseFloat(amount) < 5
  const {selectedLinkAccount }= React.useContext(AuthContext)
  
  const onClose = () => {
    setOpen(false);
    props?.openWalletPopup();
  };

  const handleWithdrawAllBalance = () => {
    setAmount(spotBalance?.usdtAvailableBalance?.toFixed(2) || "");
  };

  const handlePaste = (setter) => {
    navigator.clipboard.readText().then((text) => {
      setter(text);
    });
  };
  const handleWithdraw= async ()=> {
    console.log(1)
    try {
      const data= {
        amount,
        toAddress,
        verifyCode: twoFACode,
        netword: "bsc",
        memo: "true"
      }
      setLoadingSubmit(true)
      const response= await userApi.userExchangeLinkAccountWithdraw(data, selectedLinkAccount)
      if(response?.data?.ok=== true) {

      }
      else if(response?.data?.ok=== false ) {
        showToast(t(response?.data?.d?.err_code), "error")
      }
    } catch (error) {
      showToast(t(error?.response?.data?.message))      
    }
    finally {
      setLoadingSubmit(false)
    }
  }
  const handleTransfer= async ()=> {
    try {
      const data= {
        amount,
        nickName: toAddress,
        verifyCode: twoFACode,
        typeWallet: "usdt",
        memo: "true"
      }
      setLoadingSubmit(true)
      const response= await userApi.userExchangeLinkAccountTransfer(data, selectedLinkAccount)
      if(response?.data?.ok=== true) {
        showToast("Rút USDT thành công", "success")
        setChange(prev=> !prev)
      }
      else if(response?.data?.ok=== false ) {
        showToast(t(response?.data?.d?.err_code), "error")
      }
    } catch (error) {
      showToast(t(error?.response?.data?.message))      
    }
    finally {
      setLoadingSubmit(false)
    }
  }

  const DrawerList = (
    <Box sx={{ width: downLg ? "100%" : 448 }} role="presentation">
      <Box className={classes.header} sx={{ padding: "24px 16px" }}>
        <Typography variant="h6">{t("transaction_wallet")}</Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />
      <Box
        sx={{
          padding: "24px 16px",
          height: downLg ? "70vh" : "calc(100vh - 89px)",
        }}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"space-between"}
      >
        <Box>
          <Typography variant="h6">{t("Withdraw USDT (BEP-20)")}</Typography>

          <Typography variant="subtitle1" fontWeight={600} sx={{ mt: 2 }}>
            {t("Transfer network")}
          </Typography>
          <Grid container spacing={1} sx={{ mt: 1 }}>
            <Grid item xs={6}>
              <Button
                variant={network === "internal" ? "contained" : "outlined"}
                fullWidth
                sx={{
                  bgcolor: network === "internal" ? "#28a745" : "inherit",
                  color: network === "internal" ? "white" : "#6c757d",
                  borderColor: "#6c757d",
                }}
                onClick={() => setNetwork("internal")}
              >
                {t("internal")}
                <br />
                Phí: 0 USDT
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant={network === "bep20" ? "contained" : "outlined"}
                fullWidth
                sx={{
                  bgcolor: network === "bep20" ? "#28a745" : "inherit",
                  color: network === "bep20" ? "white" : "#6c757d",
                  borderColor: "#6c757d",
                }}
                onClick={() => setNetwork("bep20")}
              >
                Bep-20 (BSC)
                <br />
                Phí: 1 USDT
              </Button>
            </Grid>
          </Grid>
          <Box mt={2}>
            <TextField
              error={isErrorInputAmount=== true ? true : false}
              helperText={isErrorInputAmount=== true ? "Số tiền rút tối thiểu là 5 USDT" : ""}
              label="Số lượng USDT"
              fullWidth
              size="medium"
              value={amount}
              type="number"
              onChange={(e) => setAmount(e.target.value)}
            />
            <Box
              display={"flex"}
              alignItems={"center"}
              gap={1}
              mt={1}
              sx={{ cursor: "pointer" }}
              onClick={handleWithdrawAllBalance}
            >
              <Typography fontSize={14}>
                {t("balance")}: {spotBalance?.usdtAvailableBalance?.toFixed(2)}{" "}
              </Typography>
              <Typography fontSize={14} sx={{ color: "#28a745" }}>
                {t("MAX")}
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              bgcolor: (theme) =>
                isDark(theme) ? "rgb(17, 24, 39)" : "#f8f9fa",
              borderRadius: 1,
              mt: 4,
              p: 2,
            }}
          >
            {network === "internal" &&
            <>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                {t("Recipient nickname")}
              </Typography>
              <TextField
                fullWidth
                placeholder={t("Enter nickname")}
                value={toAddress}
                onChange={(e) => setToAddress(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <Typography
                      sx={{ color: "#28a745", cursor: "pointer" }}
                      onClick={() => handlePaste(setToAddress)}
                    >
                      {t("PASTE")}
                    </Typography>
                  ),
                }}
              />

            </>}
            {network === "bep20" && <>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                {t("Receiving address")}
              </Typography>
              <TextField
                fullWidth
                placeholder="Nhập biệt danh"
                value={toAddress}
                onChange={(e) => setToAddress(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <Typography
                      sx={{ color: "#28a745", cursor: "pointer" }}
                      onClick={() => handlePaste(setToAddress)}
                    >
                      {t("PASTE")}
                    </Typography>
                  ),
                }}
              />
            </>}
            <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
              {t("2FA Code")}
            </Typography>
            <TextField
              fullWidth
              placeholder={t("Enter 2FA Code")}
              value={twoFACode}
              onChange={(e) => setTwoFACode(e.target.value)}
              InputProps={{
                endAdornment: (
                  <Typography
                    sx={{ color: "#28a745", cursor: "pointer" }}
                    onClick={() => handlePaste(setTwoFACode)}
                  >
                    {t("PASTE")}
                  </Typography>
                ),
              }}
            />
          </Box>
        </Box>
        <Box className={classes.footer}>
          <Typography variant="body2" mb={1}>
            {t("The minimum withdrawal amount is 5 USDT.")}
          </Typography>
          <Box display={"flex"} alignItems={"center"} gap={1}>
            <Button
              variant="outlined"
              color="primary"
              className={classes.backButton}
              onClick={onClose}
              startIcon={<ArrowBackIosNewIcon />}
              sx={{padding: "10px"}}
            >
              {t("Back")}
            </Button>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.copyButton}
              sx={{padding: "10px 14px"}}
              disabled={(isButtonDisabled === false && loadingSubmit=== false ) ? false : true}
              onClick={network=== "internal" ? handleTransfer : handleWithdraw}
            >
              {t("Send USDT")}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );

  return (
    <div>
      <Drawer
        open={open}
        onClose={onClose}
        anchor={downLg ? "bottom" : "right"}
        sx={{zIndex: ""}}
      >
        {DrawerList}
      </Drawer>
    </div>
  );
}
