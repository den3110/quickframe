import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  OutlinedInput,
  styled,
  Switch,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import portfolioApi from "api/portfolios/portfolioApi";
import { showToast } from "components/toast/toast";
import { isDark } from "util/constants";
import { ActionBotType } from "type/ActionBotType";
import { useTranslation } from "react-i18next";
import budgetStrategyApi from "api/budget-strategy/budgetStrategyApi";
import signalStrategyApi from "api/singal-strategy/signalStrategyApi";
// import AuthContext from "contexts/AuthContext";
const CustomDialogTitle = styled(DialogTitle)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

const SharePlan = ({ open, onClose, selectedPlan, setData, title, title2, title3, isFromBudgetStrategy, isFromPortfolios, isFromSignalStrategy }) => {
  const {t }= useTranslation()
  // const {selectedLinkAccount }= useContext(AuthContext)
  const [shareCode, setShareCode]= useState(selectedPlan?.shareCode)

  const handleCopySharecoee = () => {
    navigator.clipboard.writeText(shareCode);
    showToast(t("Copied to clipboard"), "success")
    onClose()
  };

  const handleGenerateCopycode= async ()=> {
    try {
      let response
      const payload = {
        action: ActionBotType.GENERATE_SHARE_CODE,
        // linkAccountId: selectedLinkAccount,
      };
      // const { data, error, loading, refetch }= useQuery()
      if(isFromPortfolios) {
        response= await portfolioApi.userBotAction(selectedPlan?._id, payload);
      }
      if(isFromBudgetStrategy) {
        response= await budgetStrategyApi.userBudgetStrategyGenerateShareCode(selectedPlan?._id);
      }
      if(isFromSignalStrategy) {
        response= await signalStrategyApi.userBudgetSignalGenerateShareCode(selectedPlan?._id);
      }
      if(response?.data?.ok=== true) {
        if(isFromPortfolios) {
          setShareCode(response?.data?.err_code)
        }
        if(isFromBudgetStrategy) {
          setShareCode(response?.data?.d?.shareCode)

        }
        if(isFromSignalStrategy) {
          setShareCode(response?.data?.d?.shareCode)
        }
      }
      else if(response?.data?.d=== false) {
        showToast(response?.data?.m, "error")
      }
    // showToast("Chạy gói plan thành công", "success")
    // onClose()
    } catch (error) {
      showToast(error?.response?.data?.m, "error")
    }
  }

  useEffect(()=> {
    setShareCode(selectedPlan?.shareCode)
  }, [selectedPlan?.shareCode])

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="confirm-delete-dialog-title"
        aria-describedby="confirm-delete-dialog-description"
        fullWidth
      >
        <CustomDialogTitle id="confirm-delete-dialog-title">
          <span>{title}</span>
          <IconButton
            edge="end"
            color="inherit"
            onClick={onClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </CustomDialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText
            id="confirm-delete-dialog-description"
            align="center"
          >
            <Box sx={{ width: "100%" }}>
              <Typography
                variant="h5"
                fontWeight={600}
                color={"success.main"}
                textAlign={"left"}
              >
                {title2}
              </Typography>
              <Typography fontSize={15} textAlign={"left"} mt={1.5} mb={2}>
                {title3}
              </Typography>
              <Box>
                <Box
                  sx={{
                    backgroundColor: (theme) =>
                      isDark(theme) ? "#5e666f" : "#f5f5f5",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "10px",
                    borderRadius: "5px", marginBottom: "10px", 
                  }}
                >
                  <Typography
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      fontSize: 18,
                      textAlign: "center",

                    }}
                    color="text.main"
                    fontWeight={600}
                  >
                    {shareCode}
                  </Typography>
                  <Typography cursor={"pointer"} onClick={handleGenerateCopycode} color={"success.main"} sx={{cursor: "pointer"}} fontWeight={600}>Generate</Typography>
                </Box>
              </Box>
            </Box>
          </DialogContentText>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Box
            sx={{ width: "100%" }}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Button
              onClick={handleCopySharecoee}
              variant="contained"
              color="primary"
              sx={{ textTransform: "none" }}
            >
              {t("Copy Code")}
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default SharePlan;
