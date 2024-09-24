import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  InputAdornment,
  useTheme,
  useMediaQuery
} from "@mui/material";
import { styled } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import OtpInput from "react-otp-input";
import { showToast } from "components/toast/toast";
import { useNavigate } from "react-router-dom";
import { authApi } from "api";
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

const DialogOtpForgotPassword = (props) => {
  const {t}= useTranslation()
  const navigate = useNavigate();
  const downLg = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  const downXss = useMediaQuery((theme) => theme.breakpoints.down("xss"));
  const { email, open, setOpen } = props;
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const theme= useTheme()

  const handleClose = () => {
    setOpen(false)
  };

  const handleVerify = async () => {
    setLoading(true);
    try {
      const data = {
        email,
        code: otp,
        siteId: "wacbot.trade",
        newPassword,
      };
      const response = await authApi.forgetPassword(data);
      if (response?.data?.ok === true) {
        showToast("Reset password success", "success")
        navigate("/login");
      } else {
        showToast(response?.data?.message || "Verification failed", "error");
      }
    } catch (error) {
      showToast(error?.response?.data?.message || "Error occurred", "error");
    } finally {
      setLoading(false);
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

  const handlePasswordChange = (event) => {
    setNewPassword(event.target.value);
    if (event.target.value !== confirmPassword) {
      setError(t("passwords_do_not_match"));
    } else {
      setError("");
    }
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    if (event.target.value !== newPassword) {
      setError(t("passwords_do_not_match"));
    } else {
      setError("");
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <CustomDialogTitle>
        <Typography variant="h6">{t("Reset your password")}</Typography>
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </CustomDialogTitle>
      <CustomDialogContent>
        <Typography sx={{ marginBottom: 2 }}>
          {t("Please enter the 6-digit OTP from your email")}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", marginBottom: 2 }}>
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
              marginBottom: "1rem",
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
          Paste OTP code
        </Typography>
        <TextField
          fullWidth
          label={t("new_password")}
          type={showPassword ? "text" : "password"}
          value={newPassword}
          onChange={handlePasswordChange}
          sx={{ marginTop: 3 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={toggleShowPassword} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          fullWidth
          label={t("Confirm new password")}
          type={showConfirmPassword ? "text" : "password"}
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          sx={{ marginTop: 3 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={toggleShowConfirmPassword} edge="end">
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          error={!!error}
          helperText={error}
        />
      </CustomDialogContent>
      <DialogActions>
        <Button
          disabled={otp.length !== 6 || loading || newPassword.length === 0 || confirmPassword.length === 0 || newPassword !== confirmPassword}
          fullWidth
          variant="contained"
          color="success"
          onClick={handleVerify}
          sx={{
            padding: (theme) => theme.spacing(1.5, 0),
            fontWeight: 600,
          }}
        >
          {loading ? "Verifying..." : "Verify"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogOtpForgotPassword;
