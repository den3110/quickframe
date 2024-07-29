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
  IconButton,
  styled,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import budgetStrategyApi from "api/budget-strategy/budgetStrategyApi";
import { showToast } from "components/toast/toast";
import { useTranslation } from "react-i18next";

const CustomDialogTitle = styled(DialogTitle)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

export default function DeleteBudgetStrategy({ open, onClose, selectedStrategy, setChange }) {
  const [deletePackages, setDeletePackages] = React.useState(false);
  const {t }= useTranslation()
  const handleCheckboxChange = (event) => {
    setDeletePackages(event.target.checked);
  };

  const handleDeletBudgetStrategy= async ()=> {
    try {
      let isDeletePlans
      let response
      if(selectedStrategy?.total_plans >= 2) {
        if(deletePackages=== true) {
          isDeletePlans= true
        }
        else {
          isDeletePlans= false
        }
        response= await budgetStrategyApi.userBudgetStrategyDelete(selectedStrategy?._id, {params: {isDeletePlans}})
      }
      else {
        response= await budgetStrategyApi.userBudgetStrategyDelete(selectedStrategy?._id)
      }
      if(response?.data?.ok=== true) {
        setChange(prev=> !prev)
        showToast("Đã xoá gói đầu tư thành công", "success")
        onClose()
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
            {t("Are you sure you want to delete this strategy?")}
          </DialogContentText>
          <DialogContentText
            id="confirm-delete-dialog-description"
            align="center"
          >
            {t("This strategy will be deleted immediately. You can’t undo this action.")}
          </DialogContentText>
          {selectedStrategy?.total_plans >= 2 && 
            <Box display="flex" justifyContent="center">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={deletePackages}
                    onChange={handleCheckboxChange}
                    color="primary"
                  />
                }
                label={`${t(`Delete ${selectedStrategy?.total_plans} plans using this strategy`, {amount: selectedStrategy?.total_plans})}`}
              />
            </Box>
          }
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
