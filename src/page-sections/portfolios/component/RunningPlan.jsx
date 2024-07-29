import { Button, Switch, useMediaQuery } from "@mui/material";
import portfolioApi from "api/portfolios/portfolioApi";
import { showToast } from "components/toast/toast";
import AuthContext from "contexts/AuthContext";
import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ActionBotType } from "type/ActionBotType";

const RunningPlan = (props) => {
  const {t }= useTranslation()
  const {setData, data, plan, dataState, changeState }= props
  const [isRunning, setIsRunning] = useState();
  const downLg = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  const {selectedLinkAccount }= useContext(AuthContext)
  useEffect(() => {
    if (plan) {
      setIsRunning(plan?.isRunning);
    }
  }, [plan, data, dataState, changeState]);

  const handleChangeIsRunning = async (e) => {
    try {
      const payload = {
        action: e.target.checked === true ? ActionBotType.START : ActionBotType.STOP,
        linkAccountId: selectedLinkAccount
      };
      await portfolioApi.userBotAction(plan?._id, payload);
        let dataLocal= data
        const index= data?.findIndex(item=> item?._id=== plan?._id)
        dataLocal[index]= {...plan, isRunning: !e.target.checked}
        setIsRunning(!e.target.checked);
        setData(dataLocal)
        console.log(e.target.checked)
        // setData()
        showToast( !e.target.checked === true ? "Chạy gói thành công" : "Ngưng gói thành công", "success")
    } catch (error) {
      showToast(error?.response?.data?.m, "error");
    }
  };

  return (
    <>
      <Button
        variant="contained"
        color={isRunning ? "success" : "primary"}
        sx={{ width: downLg ? "100%" : 100 }}
      >
        {isRunning=== true ? t("On going") : t("COOL_DOWN")}
      </Button>
      <Switch onChange={handleChangeIsRunning} checked={isRunning === true ? true : false} />
    </>
  );
};

export default RunningPlan;
