import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import portfolioApi from "api/portfolios/portfolioApi";
import { showToast } from "components/toast/toast";
import { isDark } from "util/constants";
import AuthContext from "contexts/AuthContext";
import CopyPlanDrawer from "page-sections/dashboards/component/drawer/CopyPlanDrawer";
import { useTranslation } from "react-i18next";
// import AuthContext from "contexts/AuthContext";
const CustomDialogTitle = styled(DialogTitle)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

const OpenCopyPlanDialog = ({
  open,
  onClose,
  selectedPlan,
  setDataProps,
  dataProps,
  changeState,
  setChangeState,
}) => {
  const [openCopyPlan, setOpenCopyPlan] = useState(false);
  const [shareCode, setShareCode] = useState("");
  const [dataState, setDataState] = useState();
  const [loading, setLoading] = useState();
  const {t }= useTranslation()

  const handleClose = () => {
    onClose();
    // setShareCode("")
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await portfolioApi.getUserBotCopyInfo(shareCode, {});
      if (response?.data?.ok === true) {
        setOpenCopyPlan(true);
        setDataState(response?.data?.d);
        handleClose();
      } else if (response?.data?.ok === false) {
        showToast(response?.data?.m, "error");
      }
    } catch (error) {
      console.log(error);
      showToast(error?.response?.data?.m);
    } finally {
      setLoading(false);
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setShareCode(text);
    } catch (err) {
      showToast("Failed to read clipboard contents: " + err, "error");
    }
  };

  useEffect(() => {
    setShareCode(selectedPlan?.shareCode);
  }, [selectedPlan?.shareCode]);

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="confirm-delete-dialog-title"
        aria-describedby="confirm-delete-dialog-description"
        fullWidth
      >
        <CustomDialogTitle id="confirm-delete-dialog-title">
          <span>{t("Import Investment Plan")}</span>
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
                {t("Easy way to set up your superb plan!")}
              </Typography>
              <Typography fontSize={15} textAlign={"left"} mt={1.5} mb={2}>
                {t("Enter your shared plan code to start your ideal investment plan")}
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
                    borderRadius: "5px",
                    marginBottom: "10px",
                  }}
                >
                  <TextField
                    fullWidth
                    value={shareCode}
                    onChange={(e) => setShareCode(e.target.value)}
                    variant="standard"
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      fontSize: 18,
                      backgroundColor: "transparent",
                      border: "none",
                      outline: "none",
                      height: "100%",
                      // color: theme=> isDark(theme)
                    }}
                    placeholder={t("Enter code")}
                    //   color="text.main"
                    fontWeight={600}
                    InputProps={{
                      disableUnderline: true, // <== added this
                    }}
                  ></TextField>
                  <Typography
                    cursor={"pointer"}
                    onClick={handlePaste}
                    color={"success.main"}
                    sx={{ cursor: "pointer" }}
                    fontWeight={600}
                  >
                    {t("PASTE")}
                  </Typography>
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
              disabled={loading}
              onClick={handleSubmit}
              variant="contained"
              color="primary"
              sx={{ textTransform: "none" }}
            >
              {t("Import Now")}
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
      <CopyPlanDrawer
        open={openCopyPlan}
        setOpen={setOpenCopyPlan}
        selectedPlan={{ copyCode: shareCode, name: dataState?.name }}
        isAddNewCopyplan={true}
        dataProps={dataProps}
        setDataProps={setDataProps}
        setChangeState={setChangeState}
        changeState={changeState}
        isFromCopyPlan={false}
      />
    </React.Fragment>
  );
};

export default OpenCopyPlanDialog;
