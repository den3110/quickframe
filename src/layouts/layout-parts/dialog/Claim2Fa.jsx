import { useState } from "react";
import { Stack } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import jackpotApi from "api/jackpot/jackpotApi";
import { showToast } from "components/toast/toast";
import { useTranslation } from "react-i18next";

export default function Claim2FA({
  open,
  setOpen,
  linkAccountId,
  requestCode,
  getHistoryWinning,
  setChange
}) {
  const { t } = useTranslation();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [code, setCode] = useState("");
  const [otpCode, setOtpCode] = useState("");

  const handleClaim = async () => {
    const data = {
      code,
      otpCode,
      requestCode,
    };

    const response = await jackpotApi.postUserJackpotClaim(linkAccountId, data);

    if (response.data.ok) {
      showToast(t("successfully_received_rewards"), "success");
      getHistoryWinning();
      handleClose();
      return;
    }
    showToast(response.data.m, "error");
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Vui lòng nhập mã gửi về Email và 2FA</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 2, mb: 2 }}>
          <TextField
            autoFocus
            label="Email Code"
            onChange={(e) => setOtpCode(e.target.value)}
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            label="2FA Code"
            type="number"
            onChange={(e) => setCode(e.target.value)}
            fullWidth
            variant="standard"
          />
          <Button variant="contained" onClick={handleClaim}>
            Nhận ngay
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
