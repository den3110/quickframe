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
import React, { useContext, useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import portfolioApi from "api/portfolios/portfolioApi";
import { showToast } from "components/toast/toast";
import { isDark } from "util/constants";
import { ActionBotType } from "type/ActionBotType";
// import AuthContext from "contexts/AuthContext";
const CustomDialogTitle = styled(DialogTitle)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

const SharePlan = ({ open, onClose, selectedPlan, setData }) => {
  // const {selectedLinkAccount }= useContext(AuthContext)
  const [shareCode, setShareCode]= useState(selectedPlan?.shareCode)

  const handleCopySharecoee = () => {
    navigator.clipboard.writeText(shareCode);
    showToast("Sao chép thành công", "success")
    onClose()
  };

  const handleGenerateCopycode= async ()=> {
    try {
      const payload = {
        action: ActionBotType.GENERATE_SHARE_CODE,
        // linkAccountId: selectedLinkAccount,
      };
      // const { data, error, loading, refetch }= useQuery()
      const response= await portfolioApi.userBotAction(selectedPlan?._id, payload);
      if(response?.data?.ok=== true) {
        setShareCode(response?.data?.err_code)
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
              Sao chép mã
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default SharePlan;
