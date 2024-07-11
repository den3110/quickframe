import { Button, Switch } from "@mui/material";
import portfolioApi from "api/portfolios/portfolioApi";
import { showToast } from "components/toast/toast";
import React, { useEffect, useState } from "react";
import { ActionBotType } from "type/ActionBotType";

const RunningPlan = (props) => {
  const [isRunning, setIsRunning] = useState();

  useEffect(() => {
    if (props) {
      setIsRunning(props?.isRunning);
    }
  }, [props]);

  const handleChangeIsRunning = async (e) => {
    try {
      const data = {
        action: !isRunning === true ? ActionBotType.START : ActionBotType.STOP,
      };
      const response = await portfolioApi.userBotAction(props?._id, data);
      if (response?.data?.ok === true) {
        setIsRunning(!isRunning);
        showToast( !isRunning === true ? "Chạy gói thành công" : "Ngưng gói thành công", "success")
      }
    } catch (error) {
      showToast(error?.response?.data?.m, "error");
    }
  };

  return (
    <>
      <Button
        variant="contained"
        color={isRunning ? "success" : "primary"}
        sx={{ width: 100 }}
      >
        {isRunning ? "Đang chạy" : "Tạm ngưng"}
      </Button>
      <Switch onChange={handleChangeIsRunning} checked={isRunning} />
    </>
  );
};

export default RunningPlan;
