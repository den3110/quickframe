import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Box,
  Checkbox,
  FormControlLabel,
  // Checkbox,
  // FormControlLabel,
  IconButton,
  styled,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { showToast } from "components/toast/toast";
import signalStrategyApi from "api/singal-strategy/signalStrategyApi";
import { useTranslation } from "react-i18next";
import { ActionBotType } from "type/ActionBotType";
import AuthContext from "contexts/AuthContext";
import portfolioApi from "api/portfolios/portfolioApi";

const CustomDialogTitle = styled(DialogTitle)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

export default function CopySuccessPopup({
  open,
  onClose,
  selectedBot,
  setChange,
  setData,
  data,
  onClick,
  isAddNewCopyplan,
  setChangeState
}) {
  const {t }= useTranslation()
  const {selectedLinkAccount }= React.useContext(AuthContext)
  const handleStartPlan= async ()=> {
    try {
        const payload = {
            action: ActionBotType.START,
            linkAccountId: selectedLinkAccount,
          };
          // const { data, error, loading, refetch }= useQuery()
          await portfolioApi.userBotAction(selectedBot?._id, payload);
          if(isAddNewCopyplan) {
              const dataTemp= data
              const findIndex= data?.findIndex(item=> item?._id === selectedBot?._id)
              console.log("find index", findIndex)
            dataTemp[findIndex]= {...selectedBot ?? [], isRunning: true}
            setData(dataTemp)
            setChangeState(prev=> !prev)
          }

        showToast("Chạy gói plan thành công", "success")
        onClose()
    } catch (error) {
        showToast(error?.response?.data?.m || t("unknown_error"), "error")
    }
  }
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="confirm-delete-dialog-title"
        aria-describedby="confirm-delete-dialog-description"
      >
        <CustomDialogTitle id="confirm-delete-dialog-title">
          <span></span>
          <IconButton
            edge="end"
            color="inherit"
            onClick={onClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </CustomDialogTitle>
        <DialogContent>
          <Box display="flex" justifyContent="center">
            <img src="/static/icons/img_2.png" alt="Illustration" />
          </Box>
          <DialogContentText
            id="confirm-delete-dialog-description"
            align="center"
            variant="h6"
            fontWeight="bold"
          >
            {t("Import plan successfully")}
          </DialogContentText>
          <DialogContentText
            id="confirm-delete-dialog-description"
            align="center"
          >
           {t("Start exploring investment opportunities and earn profits by start an investment plan today")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Box sx={{width: "100%"}}>
            <Box sx={{width: "100%"}} mb={1}>
              <Button
            
                onClick={handleStartPlan}
                fullWidth
                variant="outlined"
                sx={{ textTransform: "none" }}
              >
                {t("Start Plan Now")}
              </Button>
            </Box>
            <Box sx={{width: "100%"}}>
              <Button
                onClick={onClick}
                fullWidth
                variant="contained"
                sx={{ textTransform: "none" }}
              >
                {t("edit_configuration")}
              </Button>
            </Box>
          </Box>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
