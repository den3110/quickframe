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
import { useTranslation } from "react-i18next";
import { showToast } from "components/toast/toast";
import portfolioApi from "api/portfolios/portfolioApi";
import { useParams } from "react-router-dom";
import { ActionBotTypeMessageSucces } from "type/ActionBotType";
import AuthContext from "contexts/AuthContext";
import { PortfolioDetailContext } from "page-sections/portfolios/page-view/detail";

const CustomDialogTitle = styled(DialogTitle)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

export default function DialogAskBeforeAction({ open, onClose, title, title2, titleAction, action }) {
  const {t }= useTranslation()
  const {id }= useParams()
  const {selectedLinkAccount }= React.useContext(AuthContext)
  const {setChange }= React.useContext(PortfolioDetailContext)
  const [submitting, setSubmitting]= React.useState()

  const handleAction= async ()=> {
    // action() ? action() : ()=> {}
      try {
        setSubmitting(true)
        const payload= {
          action: action,
          linkAccountId: selectedLinkAccount,
        }
        const response= await portfolioApi.userBotAction(id, payload);
        if(response?.data?.ok=== true) {
          showToast(t(ActionBotTypeMessageSucces[action]), "success")
          setChange(prev=> !prev)
          onClose()
        }
        else if(response?.data?.ok=== false) {
          showToast(t(response?.data?.m), "error")
        }
      } catch (error) {
        showToast(t(error?.response?.data?.m), "error")
      }
      finally {
        setSubmitting(false)
      }
    // showToast("Đặt lại thành công", "success")
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
            {t(title)}
          </DialogContentText>
          <DialogContentText
            id="confirm-delete-dialog-description"
            align="center"
          >
            {t(title2)}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            disabled={submitting}
            onClick={handleAction}
            fullWidth
            variant="contained"
            sx={{ textTransform: "none" }}
          >
            {t(titleAction)}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
