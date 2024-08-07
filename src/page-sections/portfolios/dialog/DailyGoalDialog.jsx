import React, { useContext, useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  TextField,
  IconButton,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { SettingsContext } from "contexts/settingsContext";
import userApi from "api/user/userApi";
import { showToast } from "components/toast/toast";
import { isDark } from "util/constants";
import AuthContext from "contexts/AuthContext";
import { useTranslation } from "react-i18next";

const DailyGoalDialog = ({
  open,
  handleClose,
  dailyTarget,
  setDailyTarget,
}) => {
  const { walletMode } = useContext(SettingsContext);
  const [profitTarget, setProfitTarget] = useState("");
  const [lossTarget, setLossTarget] = useState("");
  const isDisableButton = profitTarget?.length <= 0 || lossTarget?.length <= 0;
  const [submitting, setSubmitting]= useState(false)
  const { selectedLinkAccount, user, dataSelectedLinkAccount } =
    useContext(AuthContext);
  const { t } = useTranslation();

  const handleProfitTargetChange = (e) => {
    const value = e.target.value
        .replace(/[^0-9.]/g, "")                  
        .replace(/^\./, "")                       
        .replace(/\.{2,}/g, ".")                  
        .replace(/(\..*)\./g, "$1");              

    setProfitTarget(value ? `$${value}` : "");
};

const handleLossTargetChange = (e) => {
    const value = e.target.value
        .replace(/[^0-9.]/g, "")                  
        .replace(/^\./, "")                       
        .replace(/\.{2,}/g, ".")                  
        .replace(/(\..*)\./g, "$1");              

    setLossTarget(value ? `$${value}` : "");
};
  useEffect(() => {
    if (dailyTarget) {
      setProfitTarget(
        "$" + dailyTarget?.take_profit_target?.toString()?.replaceAll("$", "")
      );
      setLossTarget(
        "$" + dailyTarget?.stop_loss_target?.toString()?.replaceAll("$", "")
      );
    }
  }, [dailyTarget]);

  const handleSubmit = async () => {
    try {
      const data = {
        accountType: walletMode ? "LIVE" : "DEMO",
        take_profit_target: profitTarget?.replaceAll("$", ""),
        stop_loss_target: lossTarget?.replaceAll("$", ""),
        linkAccountId: selectedLinkAccount,
      };
      setSubmitting(true)
      const response = await userApi.postUserExchangeLinkAccountDailyTarget(
        data,
        selectedLinkAccount
      );
      if (response?.data?.ok === true) {
        showToast(t("GoalSetting_Save_Successful"), "success");
        setDailyTarget({
          ...dailyTarget,
          take_profit_target: profitTarget,
          stop_loss_target: lossTarget,
        });
        handleClose();
      } else if (response?.data?.ok === false) {
        showToast(response?.data?.m, "error");
      }
    } catch (error) {
      showToast(error?.response?.data?.m);
    }
    finally {
      setSubmitting(false)
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          {t(`Setup Daily Goal ${walletMode ? "(LIVE)" : "(DEMO)"}`)}
          {/* Thiết lập mục tiêu hằng ngày {walletMode ? "(LIVE)" : "DEMO"} */}
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box mt={1} display="flex" justifyContent="center">
          <Box
            bgcolor={(theme) => (isDark(theme) ? "#303838" : "#E0F2F1")}
            px={2}
            py={1}
            borderRadius={1}
          >
            <Typography
              color={(theme) => (isDark(theme) ? "#ffffff" : "textSecondary")}
              variant="subtitle2"
            >
              {t("accumulated_profits")}: ${dailyTarget?.profit?.toFixed(2)}
            </Typography>
          </Box>
        </Box>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Typography gutterBottom>
          {t(`GoalSetting_description`, {
            walletMode: walletMode ? "LIVE" : "DEMO",
            nickName: dataSelectedLinkAccount?.nickName || "",
          })}
          {/* Khi tổng lợi nhuận đạt ngưỡng như đã cài đặt dưới đây thì toàn bộ gói {walletMode ? "LIVE" : "DEMO"} thuộc tài khoản {dataSelectedLinkAccount?.nickName} sẽ được ngưng. */}
        </Typography>
        <Box mt={3} display="flex" justifyContent="space-between" gap={1}>
          <Box sx={{ width: "50%" }}>
            <Typography variant="subtitle1" color="textPrimary">
              Tổng Lợi đạt
            </Typography>
            <TextField
              value={profitTarget}
              onChange={handleProfitTargetChange}
              fullWidth
              variant="outlined"
              margin="normal"
              // inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            />
          </Box>
          <Box sx={{ width: "50%" }}>
            <Typography variant="subtitle1" color="textPrimary">
              Tổng Lỗ chạm
            </Typography>
            <TextField
              value={lossTarget}
              onChange={handleLossTargetChange}
              fullWidth
              variant="outlined"
              margin="normal"
              // inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Box width="100%" display="flex" justifyContent="center">
          <Button
            disabled={(isDisableButton=== false && submitting=== false) ? false : true}
            variant="contained"
            color="success"
            onClick={handleSubmit}
          >
            {t("Save Setting")}
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default DailyGoalDialog;
