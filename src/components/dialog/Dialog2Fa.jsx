import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  useTheme,
  useMediaQuery
} from "@mui/material";
import { styled } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";
import OtpInput from "react-otp-input";
import { showToast } from "components/toast/toast";
import exchangeApi from "api/exchange/exchangeApi";
import { useNavigate } from "react-router-dom";
import AuthContext from "contexts/AuthContext";
import { useTranslation } from "react-i18next";

const CustomDialogTitle = styled(DialogTitle)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  paddingBottom: 0,
}));

const CustomDialogContent = styled(DialogContent)(({ theme }) => ({
  paddingTop: theme.spacing(2),
}));

const Dialog2Fa = (props) => {
  const {t }= useTranslation()
  const downLg = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  const downXss = useMediaQuery((theme) => theme.breakpoints.down("xss"));
  
  const { setSelectedLinkAccount }= useContext(AuthContext)
  const theme= useTheme()
  const navigate = useNavigate();
  const { open, setOpen, dataExchangeUrl, token } = props;
  const [otp, setOtp] = useState("");

  const handleClose = () => {
    setOpen(false);
  };

  const handleVerify = async () => {
    try {
      const data = {
        client_id: dataExchangeUrl?.clientId,
        token,
        td_code: "",
        td_p_code: "",
        code: otp,
      };
      const response = await exchangeApi.userExchangeLinkAccount2Fa(data);
      if (response?.data?.ok === true) {
        showToast("Kết nối tài khoản thành công", "success");
        localStorage.setItem("linkAccount", response?.data?.d?._id)
        setSelectedLinkAccount(response?.data?.d?._id)
        window.history.replaceState({}, '')
        navigate("/");
      }
      else if(response?.data?.ok=== false) {
        showToast(t(response?.data?.m), "error")
      }
      // setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (/^\d{6}$/.test(text)) {
        setOtp(text);
      } else {
        showToast(t("Clipboard content is not a 6-digit code"), "error");
      }
    } catch (err) {
      showToast(t("Failed to read clipboard contents: ") + err, "error");
    }
  };

  // const renderWidth= (breakpoint)=> {
  //   switch (breakpoint) {
  //     case downLg:
  //       return 36
  //     case downXss: 
  //       return 28
  //     default:
  //       return 56
  //   }
  // }

  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <CustomDialogTitle>
          <Typography variant="h6">{t("Exchange 2FA Code")}</Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </CustomDialogTitle>
        <CustomDialogContent>
          <Typography sx={{ marginBottom: 2 }}>
            {t("Please enter the 6-digit Google Authenticator code")}
          </Typography>
          <Box
            sx={{ display: "flex", justifyContent: "center", marginBottom: 2 }}
          >
            <OtpInput
              value={otp}
              numInputs={6}
              onChange={setOtp}
              isInputNum
              renderInput={(props) => (
                <Box
                  component="input"
                  {...props}
                  sx={{
                    all: "unset",
                    minWidth: (downLg && !downXss) ? 36 : (downXss ? 28 : 56),
                    height: (downLg && !downXss) ? 36 : (downXss ? 28 : 56),
                    fontSize: (downLg && !downXss) ? 14 : 18,
                    flexBasis: 70,
                    borderRadius: 2,
                    fontWeight: 600,
                    // background: "rgb(238, 239, 242)",
                    background: theme.palette.background.cell,
                    input: {
                      textAlign: "center",
                    },
                    "::placeholder": {
                      color: "text.primary",
                    },
                  }}
                />
              )}
              containerStyle={{
                gap: "1rem",
                justifyContent: "center",
                marginBottom: "3rem",
              }}
            />
          </Box>
          <Typography
            variant=""
            style={{
              fontWeight: 600,
              color: "rgb(12, 175, 96)",
              cursor: "pointer",
            }}
            onClick={handlePaste}
          >
            {t("Paste 2FA Code")}
          </Typography>
        </CustomDialogContent>
        <DialogActions>
          <Button
            disabled={otp.length !== 6}
            fullWidth
            variant="contained"
            color="success"
            onClick={handleVerify}
            sx={{
              padding: (theme) => theme.spacing(1.5, 0),
              fontWeight: 600,
            }}
          >
            {t("Verify")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Dialog2Fa;
