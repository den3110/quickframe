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
import CopyPlanDrawer from "page-sections/dashboards/component/drawer/CopyPlanDrawer";
import NewBudgetStrategy from "./NewBudgetStrategy";
import NewBotAI from "page-sections/signal-strategy/NewBotAI";
import NewBotAIStringMethod from "page-sections/signal-strategy/NewBotAIStringMethod";
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
  setChangeState,
  changeState,
  isFromSignalStrategy,
  isFromBudgetStrategy,
  title,
  title2,
  title3,
}) => {
  const theme = useTheme();
  const [openCopyPlan, setOpenCopyPlan] = useState(false);
  const [shareCode, setShareCode] = useState("");
  const { t } = useTranslation();
  // const [dataState, setDataState] = useState({ name: "" });
  const [data, setData] = useState();
  const [isEdit, setIsEdit] = useState(false);

  const handleCodeChange = (event) => {
    setShareCode(event.target.value);
  };

  const handleCopy = () => {
    setOpenCopyPlan(true);
    onClose();
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
              {t("Note")}: {t("You will be able to review strategy to confirm after importing code.")}
            </Typography>
          </Box>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button onClick={handleCopy} color="primary" variant="contained">
            Copy Now
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
          isFromCopyPlan={false}
          selectedStrategy={data}
          is_edit={isEdit}
          setIsEdit={setIsEdit}
        />
      )}
      {isFromSignalStrategy && (
        <>
          <NewBotAI
            // initState={initState}
            open={openCopyPlan}
            onClose={setOpenCopyPlan}
            // selectedBot={selectedBot}
            // setSelectedBot={setSelectedBot}
            is_edit={isEdit}
            setIsEdit={setIsEdit}
          />
          <NewBotAIStringMethod
            // open={openNewBotAIStringMethod}
            // onClose={handleCloseNewBotAIStringMethod}
            // is_edit={isEditStringMethod}
            // setIsEdit={setIsEditStringMethod}
            // selectedBot={selectedBot}
            // setChange={setChange}
          />
        </>
      )}
    </Fragment>
  );
};

export default CopyBudgetStrategy;
