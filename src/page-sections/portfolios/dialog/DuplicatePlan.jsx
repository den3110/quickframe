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

const DuplicatePlan = ({ open, onClose, selectedPlan, setData }) => {
  const [planName, setPlanName] = useState("");
  const [isRunning, setIsRunning] = useState(false); 
  const isDisableButton= planName?.length <= 0
  const handleChange = (event) => {
    setIsRunning(event.target.checked);
  };

  const handleDuplicatePlan= async ()=> {
    try {
        const data= {
            ...selectedPlan, name: planName, isRunning
        }
        const response= await portfolioApi.usersBotCreate(data);
        if(response?.data?.ok=== true) {
            setData(prev=> ([data, ...prev]))
            showToast("Nhân bản gói thành công", "success")
            onClose()
        }
        else if(response?.data?.ok=== false) {
            showToast(response?.data?.m, "error")
        }

    } catch (error) {
        showToast(error?.response?.data?.m)
    } 
  }

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
          <span>Tạo bản sao gói</span>
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
            <Box>
              <FormControl fullWidth>
                <InputLabel htmlFor="component-outlined">
                  Nhập tên gói
                </InputLabel>
                <OutlinedInput
                  id="component-outlined"
                  label="Name"
                  value={planName}
                  onChange={(e) => setPlanName(e.target.value)}
                />
              </FormControl>
              <Box sx={{width: "100%"}} mt={1}>
                <FormControlLabel fullWidth sx={{width: '100%'}}
                    control={
                    <Checkbox
                        checked={isRunning}
                        onChange={handleChange}
                    />
                    }
                    label={`Chạy gói này ngay sau khi  "Xác nhận và Lưu"`}
                />
              </Box>
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleDuplicatePlan}
            fullWidth
            variant="contained"
            sx={{ textTransform: "none" }}
            disabled={isDisableButton}
          >
            Xác nhận & Lưu
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default DuplicatePlan;
