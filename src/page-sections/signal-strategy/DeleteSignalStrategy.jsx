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

const CustomDialogTitle = styled(DialogTitle)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

export default function DeleteSignalStrategy({
  open,
  onClose,
  selectedBot,
  setChange,
  setData,
  data,
}) {
  const [deletePackages, setDeletePackages] = React.useState(false);
  const handleCheckboxChange = (event) => {
    setDeletePackages(event.target.checked);
  };
  const handleDeletBudgetStrategy = async () => {
    try {
      let isDeletePlans;
      let response;
      if (selectedBot?.total_plans >= 2) {
        if (deletePackages === true) {
          isDeletePlans = true;
        } else {
          isDeletePlans = false;
        }
        response = await signalStrategyApi.userBudgetSignalDelete(
          selectedBot?._id,
          { params: { isDeletePlans } }
        );
      } else {
        response = await signalStrategyApi.userBudgetSignalDelete(
          selectedBot?._id
        );
      }
      if (response?.data?.ok === true) {
        showToast("Đã xoá phuơng pháp thành công", "success");
        onClose();
        // setChange(prev=> !prev)
        setData(data?.filter((item) => item?._id !== selectedBot?._id));
      } else if (response?.data?.ok === false) {
        showToast(response?.data?.m, "error");
      }
    } catch (error) {
      showToast(error?.response?.data?.m, "error");
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
            Bot AI này sẽ bị xóa ngay lập tức. Bạn không thể hoàn tác hành động
            này.
          </DialogContentText>
          {selectedBot?.total_plans >= 2 && (
            <Box display="flex" justifyContent="center">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={deletePackages}
                    onChange={handleCheckboxChange}
                    color="primary"
                  />
                }
                label={`Xóa ${selectedBot?.total_plans} gói sử dụng chiến lược này`}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleDeletBudgetStrategy}
            fullWidth
            variant="contained"
            sx={{ textTransform: "none" }}
          >
            Xác nhận & xóa
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
