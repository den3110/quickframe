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
// import budgetStrategyApi from "api/budget-strategy/budgetStrategyApi";
import { showToast } from "components/toast/toast";
import portfolioApi from "api/portfolios/portfolioApi";
import { useTranslation } from "react-i18next";

const CustomDialogTitle = styled(DialogTitle)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

export default function DeleteSchedule({
  open,
  onClose,
  selectedSchedule,
  setChange,
  setDataProps,
  dataProps
}) {
  const {t }= useTranslation()
  const [deletePackages, setDeletePackages] = React.useState(false);

  const handleCheckboxChange = (event) => {
    setDeletePackages(event.target.checked);
  };

  const handleDeletBudgetStrategy = async () => {
    try {
      const payload= {params: {_id: selectedSchedule?._id}}
      const response= await portfolioApi.userScheduleDelete(selectedSchedule?._id, payload)
      if(response?.data?.ok=== true) {
        showToast(t("Delete the timer successfully!"), "success")
        setDataProps(dataProps?.filter(item=> item?._id !== selectedSchedule?._id))
        onClose();
      }
      else if(response?.data?.ok=== false) {
        showToast(response?.data?.m, "error")
      }
    } catch (error) {
      showToast(error?.response?.data?.m, "error")
      // console.log(error?.response?.data?.m)
    }
  };
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
            {t("Are you sure you want to delete this Timer?")}
          </DialogContentText>
          <DialogContentText
            id="confirm-delete-dialog-description"
            align="center"
          >
            {t("You have 1 plan using this timer This timer will be removed immediately. You cannot undo this action.")}
          </DialogContentText>
          {/* {selectedSchedule?.total_plans >= 2 && (
            <Box display="flex" justifyContent="center">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={deletePackages}
                    onChange={handleCheckboxChange}
                    color="primary"
                  />
                }
                label={`Xóa ${selectedSchedule?.total_plans} gói sử dụng chiến lược này`}
              />
            </Box>
          )} */}
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
