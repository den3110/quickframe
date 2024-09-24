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
  // Switch,
} from "@mui/material";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import portfolioApi from "api/portfolios/portfolioApi";
import { showToast } from "components/toast/toast";
import { useTranslation } from "react-i18next";
const CustomDialogTitle = styled(DialogTitle)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

const DuplicatePlan = ({ open, onClose, selectedPlan, setData }) => {
  const {t }= useTranslation()
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
            setData(prev=> ([data, ...prev ?? []]))
            showToast(t("Clone the plan successfully!"), "success")
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
          <span>{t("Duplicate Plan")}</span>
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
                  {t("Enter plan name")}
                </InputLabel>
                <OutlinedInput
                  id="component-outlined"
                  label={t("name")}
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
                    label={t("Start this plan after “Confirm & Save”")}
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
            {t("Confirm & Save")}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default DuplicatePlan;
