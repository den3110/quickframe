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
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import portfolioApi from "api/portfolios/portfolioApi";
import { showToast } from "components/toast/toast";
const CustomDialogTitle = styled(DialogTitle)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

const SharePlan = ({ open, onClose, selectedPlan, setData }) => {

  const handleCopyPlan = async () => {
    showToast("Copy gói thành công", "success");
    onClose(  )
  };

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
          <span>Chia sẻ gói đầu tư</span>
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
                Dễ dàng chia sẻ gói đầu tư hoàn hảo của bạn!
              </Typography>
              <Typography fontSize={15} textAlign={"left"} mt={1.5} mb={2}>
                Chia sẻ mã gói đầu tư cho bạn bè để cùng nhau giao dịch.
              </Typography>
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
              onClick={handleCopyPlan}
              variant="contained"
              color="primary"
              sx={{ textTransform: "none" }}
            >
              Sao chép mã
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default SharePlan;
