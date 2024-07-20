import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Box,
  IconButton,
  styled,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { showToast } from "components/toast/toast";
import copytradeApi from "api/copytrade/copytradeApi";

const CustomDialogTitle = styled(DialogTitle)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

export default function BlockFollowerDialog({ open, onClose, selectedProps, setData, dataProps, setChange }) {

  const handleDeletBudgetStrategy= async ()=> {
    try {
        const data= {
            nickName: selectedProps?.nickName,
            clientId: selectedProps?.clientId
        }
        const response= await copytradeApi.postUserCopytradeBlock(data)
      if(response?.data?.ok=== true) {
        // setData(prev=> ({...prev, followList: dataProps?.followList?.filter(item=> item?._id !== selectedProps?._id), blockList: [...dataProps?.blockList, selectedProps]}))
        setChange(prev=> !prev)
        showToast("Đã chặn thành công", "success")
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
            Bạn có chắc chắn muốn block follower này không?
          </DialogContentText>
          <DialogContentText
            id="confirm-delete-dialog-description"
            align="center"
          >
            Follower này sẽ bị chặn ngay lập tức.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleDeletBudgetStrategy}
            fullWidth
            variant="contained"
            sx={{ textTransform: "none" }}
          >
            Xác nhận & chặn
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
