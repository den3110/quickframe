import React, { Fragment, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  styled,
  Box,
  Divider,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslation } from "react-i18next";
// import CopyPlanDrawer from "page-sections/dashboards/component/drawer/CopyPlanDrawer";
import NewBudgetStrategy from "./NewBudgetStrategy";
import NewBotAI from "page-sections/signal-strategy/NewBotAI";
import NewBotAIStringMethod from "page-sections/signal-strategy/NewBotAIStringMethod";
import budgetStrategyApi from "api/budget-strategy/budgetStrategyApi";
import { showToast } from "components/toast/toast";
import signalStrategyApi from "api/singal-strategy/signalStrategyApi";
const BoxFlex = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

const CopyBudgetStrategy = ({
  open,
  onClose,
  dataProps,
  setDataProps,
  setData: setDataParent,
  setChangeState,
  changeState,
  setChange,
  isFromSignalStrategy,
  isFromBudgetStrategy,
  title,
  title2,
  title3,
  selectedData,
}) => {
  const theme = useTheme();
  const [openCopyPlan, setOpenCopyPlan] = useState(false);
  const [shareCode, setShareCode] = useState("");
  const { t } = useTranslation();
  // const [dataState, setDataState] = useState({ name: "" });
  const [data, setData] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const [initState, setInitState]= useState(false)

  const handleCodeChange = (event) => {
    setShareCode(event.target.value);
  };

  const handleCopy = async () => {
    try {
      let response;
      // const result= await i
      if (isFromBudgetStrategy) {
        response = await budgetStrategyApi.userBudgetStrategyCopy(
          shareCode
        );
        if (response?.data?.ok === true) {
          setData(response?.data?.d);
          setOpenCopyPlan(true);
          setInitState(true)
          setIsEdit(true);
          onClose();
        } else {
          showToast(response?.data?.m, "error");
        }
      }
      if (isFromSignalStrategy) {
        response = await signalStrategyApi.userBudgetSignalCopy(
          shareCode
        );
        if (response?.data?.ok === true) {
          setData(response?.data?.d);
          setOpenCopyPlan(true);
          setInitState(true)
          setIsEdit(true);
          onClose();
        } else {
          showToast(response?.data?.m, "error");
        }
      }
    } catch (error) {
      
      showToast(error?.response?.data?.m, "error");
    } finally {
    }
  };

  return (
    <Fragment>
      <Dialog fullWidth open={open} onClose={onClose}>
        <BoxFlex sx={{ padding: "16px 24px" }}>
          <Typography variant="h6" fontWeight={600}>
            {title}
          </Typography>
          <BoxFlex onClick={onClose} sx={{ cursor: "pointer" }}>
            <CloseIcon />
          </BoxFlex>
        </BoxFlex>
        <Divider />
        <DialogContent>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ color: theme.palette.primary }}
          >
            {title2}
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            {title3}
          </Typography>
          <Box mt={4}>
            <TextField
              size={"medium"}
              autoFocus
              margin="dense"
              label={t("Import strategy code")}
              type="text"
              fullWidth
              value={shareCode}
              onChange={handleCodeChange}
              placeholder={t("Enter Code")}
              InputProps={{
                endAdornment: (
                  <Button
                    onClick={() =>
                      navigator.clipboard
                        .readText()
                        .then((text) => setShareCode(text))
                    }
                  >
                    {t("PASTE")}
                  </Button>
                ),
              }}
            />
            <Typography
              variant="caption"
              display="block"
              gutterBottom
              mt={1}
              mb={2}
            >
              {t("Note")}:{" "}
              {t(
                "You will be able to review strategy to confirm after importing code."
              )}
            </Typography>
          </Box>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button onClick={handleCopy} color="primary" variant="contained">
            {t("Import Now")}
          </Button>
        </DialogActions>
      </Dialog>
      {isFromBudgetStrategy && (
        <NewBudgetStrategy
          isFromBudgetStrategy={true}
          onClose={() => {
            setOpenCopyPlan(false);
          }}
          open={openCopyPlan}
          setOpen={setOpenCopyPlan}
          // selectedPlan={{ copyCode: shareCode, name: dataState?.name }}
          isAddNewCopyplan={true}
          dataProps={dataProps}
          setDataProps={setDataProps}
          setChangeState={setChangeState}
          changeState={changeState}
          isFromCopyPlan={true}
          selectedStrategy={data}
          is_edit={isEdit}
          setIsEdit={setIsEdit}
          setData={setDataParent}
        />
      )}
      {isFromSignalStrategy && (
        <>
          {data?.type === "STRING_METHOD" && (
            <NewBotAIStringMethod
              open={openCopyPlan}
              onClose={() => {
                setOpenCopyPlan(false);
              }}
              is_edit={isEdit}
              setIsEdit={setIsEdit}
              selectedBot={data}
              isFromCopyPlan={true}
              setChange={setChange}
              // setChange={setChange}
            />
          )}
          {data?.type === "BUBBLE_METHOD" && (
            <NewBotAI
              initState={initState}
              open={openCopyPlan}
              onClose={() => {
                setOpenCopyPlan(false);
              }}
              selectedBot={data}
              setSelectedBot={setData}
              is_edit={isEdit}
              setIsEdit={setIsEdit}
              isFromCopyPlan={true}
            />
          )}
        </>
      )}
    </Fragment>
  );
};

export default CopyBudgetStrategy;
