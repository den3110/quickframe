import React, { useContext, useEffect, useState } from "react";
import {
  Drawer,
  Box,
  Typography,
  Divider,
  Button,
  IconButton,
  useMediaQuery,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { showToast } from "components/toast/toast";
import { useInView } from "react-intersection-observer";
import portfolioApi from "api/portfolios/portfolioApi";
import { BudgetStrategyTypeTitle } from "type/BudgetStrategyType";
import { AutoTypesTitleValue } from "type/AutoTypes";
import formatCurrency from "util/formatCurrency";
import numberWithCommas from "util/numberSeparatorThousand";
import AuthContext from "contexts/AuthContext";
import CopySuccessPopup from "../popup/CopySuccessPopup";
import NewPlanDrawer from "page-sections/portfolios/drawer/NewPlanDrawer";
import { useTranslation } from "react-i18next";

const CopyPlanDrawer = ({
  selectedPlan = { copyCode: null },
  open,
  setOpen,
  isAddNewCopyplan,
  setDataProps,
  dataProps,
  changeState,
  setChangeState,
  isFromCopyPlan,
  isFromBudgetStrategy,
}) => {
  const { copyCode } = selectedPlan;
  // const copyCode = 1
  const [data, setData] = useState();
  const { selectedLinkAccount } = useContext(AuthContext);
  const [loading, setLoading] = useState();
  const [openPoupScreen, setOpenPopupScreen] = useState(false);
  const [dataPlan, setDataPlan] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [loadingSubmit, setLoadingSubmit]= useState()
  const {t} = useTranslation()
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
  });
  const downLg = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  const onClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        name: selectedPlan?.name + " Copy",
        linkAccountId: selectedLinkAccount,
      };
      setLoadingSubmit(true);
      const response = await portfolioApi.postUserBotCopyInfo(
        selectedPlan?.copyCode,
        payload
      );
      if (response?.data?.ok === true) {
        showToast("Copy gói thành công", "success");
        if (isAddNewCopyplan === true) {
          setDataProps([response?.data?.d, ...dataProps]);
          setChangeState((prev) => !prev);
        }
        setOpenPopupScreen(true);
        setDataPlan(response?.data?.d);
        onClose();
      } else if (response?.data?.ok === false) {
        showToast(response?.data?.m, "error");
      }
    } catch (error) {
      showToast(error?.response?.data?.m, "errorf");
    } finally {
      setLoadingSubmit(false);
    }
  };

  useEffect(() => {
    if (inView === true) {
      (async () => {
        try {
          setLoading(true);
          const response = await portfolioApi.getUserBotCopyInfo(copyCode, {});
          if (response?.data?.ok === true) {
            setData(response?.data?.d);
          } else if (response?.data?.ok === false) {
            showToast(response?.data?.m, "error");
          }
        } catch (error) {
          showToast(error?.response?.data?.m);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [copyCode, inView]);

  return (
    <Box>
      <Drawer
        anchor={downLg ? "bottom" : "right"}
        height={downLg ? "70vh" : "100vh"}
        open={open}
        onClose={onClose}
      >
        <Box ref={ref} width={downLg ? "100%" : 480}>
         

          <Box>
            <Box p={3}>
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Typography variant="h6" gutterBottom>
                  Review plan
                </Typography>
                <Box
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <IconButton onClick={onClose}>
                    <CloseIcon />
                  </IconButton>
                </Box>
              </Box>
            </Box>
            <Divider />
            {loading === true && (
            <>
              <Box
                height="100%"
                width="100%"
                display="flex"
                justifyContent="center"
                alignItems={"center"}
              >
                <CircularProgress />
              </Box>
            </>
          )}
            {loading === false && (
              <Box p={3}>
                <Typography
                  textAlign={"center"}
                  variant="h6"
                  color="success.main"
                  gutterBottom
                >
                  {t("DrawerCopyPlan_title")}
                </Typography>
                <Typography
                  textAlign={"center"}
                  variant="body2"
                  color="textSecondary"
                >
                  {t("DrawerCopyPlan_subtitle")}
                </Typography>
                <Box mt={4} p={3} border="1px solid #e0e0e0" borderRadius="8px">
                  <Typography fontWeight={600} variant="h6" gutterBottom>
                    {data?.name} Copy
                  </Typography>
                  <Divider />
                  <Box display="flex" justifyContent="space-between" my={2}>
                    <Typography fontSize={12}>{t("Allocated Budget")}</Typography>
                    <Typography variant="h6">
                      {numberWithCommas(formatCurrency(data?.budget_amount))}
                    </Typography>
                  </Box>
                  <Divider />
                  <Box display="flex" justifyContent="space-between" my={2}>
                    <Typography fontSize={12}>{t("account_type")}</Typography>
                    <Typography fontSize={14} fontWeight={600}>
                      {data?.accountType}
                    </Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between" my={2}>
                    <Typography fontSize={12}>{t("Take Profit/Stoploss")}</Typography>
                    <Typography fontSize={14} fontWeight={600}>
                      {formatCurrency(data?.take_profit_target)}/
                      {formatCurrency(data?.stop_loss_target)}
                    </Typography>
                  </Box>
                  <Divider />
                  <Box display="flex" justifyContent="space-between" my={2}>
                    <Typography fontSize={12}>{t("budget_strategy")}</Typography>
                    <Typography fontSize={14} fontWeight={600}>
                      {BudgetStrategyTypeTitle[data?.budget_strategy_type]}
                    </Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between" my={2}>
                    <Typography fontSize={12}>{t("signal_strategy")}</Typography>
                    <Typography fontSize={14} fontWeight={600}>
                      {AutoTypesTitleValue[data?.auto_type]}
                    </Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between" my={2}>
                    <Typography fontSize={12}>{t("Base Amount")}</Typography>
                    <Typography fontSize={14} fontWeight={600}>
                      {formatCurrency(data?.margin_dense)}
                    </Typography>
                  </Box>
                </Box>
                <Box mt={3} textAlign="right">
                  <Button
                    disabled={loadingSubmit}
                    variant="contained"
                    color="success"
                    onClick={handleSubmit}
                  >
                    {t("Confirm & Save")}
                  </Button>
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </Drawer>

      <CopySuccessPopup
        open={openPoupScreen}
        onClose={() => {
          setOpenPopupScreen(false);
        }}
        onClick={() => {
          setOpenDrawer(true);
          setOpenPopupScreen(false);
          setIsEdit(true);
        }}
        selectedBot={dataPlan}
        isAddNewCopyplan={isAddNewCopyplan}
        setData={setDataProps}
        data={dataProps}
        setChangeState={setChangeState}
      />
      <NewPlanDrawer
        open={openDrawer}
        handleClose={() => {
          setOpenDrawer(false);
        }}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        selectedPlan={dataPlan}
        isFromCopyPlan={isFromCopyPlan}
        isAddNewCopyplan={isAddNewCopyplan}
        setData={setDataProps}
        dataProps={dataProps}
        setChangeState={setChangeState}
        // setData={setDataStat}
      />
    </Box>
  );
};

export default CopyPlanDrawer;
