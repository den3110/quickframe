import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Box,
  // Checkbox,
  // FormControlLabel,
  IconButton,
  styled,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { showToast } from "components/toast/toast";
import signalStrategyApi from "api/singal-strategy/signalStrategyApi";
import { useTranslation } from "react-i18next";

const CustomDialogTitle = styled(DialogTitle)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

export default function DeleteSignalStrategy({ open, onClose, selectedBot, setChange, setData, data }) {
  const {t }= useTranslation()

  const handleDeletBudgetStrategy= async ()=> {
    try {
    const response= await signalStrategyApi.userBudgetSignalDelete(selectedBot?._id)
    console.log(response?.data)
      if(response?.data?.ok=== true) {
        showToast("Đã xoá phuơng pháp thành công", "success")
        onClose()
        // setChange(prev=> !prev)
        setData(data?.filter(item=> item?._id !== selectedBot?._id))
      }
      else if(response?.data?.ok=== false) {
        showToast(response?.data?.m, "error")
      }
    } catch (error) {
      showToast(error?.response?.data?.m, "error")
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
            <img
              src="/static/icons/img_2.png" 
              alt="Illustration"
            />
          </Box>
          <DialogContentText
            id="confirm-delete-dialog-description"
            align="center"
            variant="h6"
            fontWeight="bold"
          >
            Bạn có chắc chắn muốn xóa Bot AI này không ?
          </DialogContentText>
          <DialogContentText
            id="confirm-delete-dialog-description"
            align="center"
          >
           Bot AI này sẽ bị xóa ngay lập tức. Bạn không thể hoàn tác hành
            động này.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleDeletBudgetStrategy}
            fullWidth
            variant="contained"
            sx={{ textTransform: "none" }}
          >
            {t("Confirm & delete")}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
